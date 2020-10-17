<template>
  <div class="parties">
    <section v-if="!isConnected" class="enrolled_parties">
      <h2>Parties en cours</h2>
      <v-grid :cols="4" :cards="enrolled_games">
        <card-game 
        v-for="(card, i) in enrolled_games" :key="'card-' + i"
        :title="card.title"
        :tags="card.tags"
        :players="card.players"
        :description="card.description"
        :cover="card.cover"
        ></card-game>

        <button @click="goToCreateGame()" class="create_game">+</button>
      </v-grid>
    </section>

    <section class="public_parties">
      <h2>Des histoires qui n'attendent que toi, aventurier !</h2>
      <v-grid :cols="4" :cards="public_games">
        <card-game 
        v-for="(card, i) in public_games" :key="'card-' + i"
        :title="card.title"
        :tags="card.tags"
        :players="card.players"
        :description="card.description"
        :cover="card.cover"
        ></card-game>
      </v-grid>
    </section>

    <router-view></router-view>
  </div>
</template>

<script>
import grid from '../components/molecules/grid'
import cardGame from '@/components/atoms/cardGame'

import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'Home',
  components: {
    'v-grid': grid,
    'card-game': cardGame
  },
  data(){
    return {
      public_games: [],
      enrolled_games: []
    }
  },
  computed:{
    ...mapGetters(['getToken']),
    isConnected(){
      return this.getToken == (undefined || '');
    }
  },
  methods:{
    ...mapActions({
      getGames: 'getGames',
      getEnrolledGames: 'getEnrolledGames',
      getGame: 'getGame'
    }),
    generateGamesData(){
      this.getGames().then (response => {
        response.data.forEach(gameData => {
          this.getGame(gameData.id).then(rep => {
            this.public_games.push({
              title: rep.data.game_infos.name,
              tags: rep.data.game_tags,
              players: rep.data.game_users_id,
              cover: rep.data.game_infos.cover,
              // description : rep.data.game_infos[0].description
            })
          })
        })
      })

      if (!this.isConnected){
        this.getEnrolledGames().then (rep => {
          rep.forEach(game => {
            this.enrolled_games.push({
              title: game.game_infos.name,
              tags: game.game_tags,
              players: game.game_users_id,
              cover: game.game_infos.cover,
              // description : game.data.game_infos[0].description
            })
          })
            
      })
      }
    },
    goToCreateGame(){
      this.$router.push('/games/create');
    }
  },
  mounted(){
    this.generateGamesData()
  }
}
</script>

<style lang="scss">
.parties{
  width:100%;
  height:100%;

  section{
    margin-bottom:130px;
  }

  .create_game{
    display:flex;
    justify-content: center;
    align-items:center;

    background: $r-layer-02dp;
    border:none;
    border-radius:8px;

    font-weight:700;
    font-size:2em;
    color: $r-color-light02;

    &:hover{
      cursor:pointer;
    }
  }
}
</style>
