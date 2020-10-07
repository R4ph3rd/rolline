<template>
  <div class="parties">
    <v-grid :cols="4" :cards="games"></v-grid>
  </div>
</template>

<script>
import grid from '../components/molecules/grid'
import {mapActions} from 'vuex'

export default {
  name: 'Home',
  components: {
    'v-grid': grid,
  },
  data(){
    return {
      games: []
    }
  },
  methods:{
    ...mapActions({
      getGames: 'getGames',
      getGame: 'getGame'
    }),
    generateGamesData(){
      this.getGames().then (response => {
        response.data.forEach(gameData => {
          this.getGame(gameData.id).then(rep => {
            this.games.push({
              title: rep.data.game_infos[0].name,
              tags: Object.values(rep.data.game_tags[0]),
              players: rep.data.game_users_id,
            })
          })
        })
      })
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
}
</style>
