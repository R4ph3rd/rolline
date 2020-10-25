<template>
  <div class="createGame">
    <h2>Créer une nouvelle histoire</h2>
    <p>Poser les fondations du récit de vos futures aventures</p>

    <section class="form">
      <v-input name="Nom de la partie" class="name">Chroniques oubliées</v-input>
      <input-search name="Tags affiliés" autocomplete class="tags">Super</input-search>

      <div class="inline_inputs">
        <v-list name="Mode de jeu" class="gamemode" :list="gamemodes"></v-list>
        <v-list name="Template de la fiche de personnage" class="template" :list="templates"></v-list>
      </div>

      <input-search name="Joueurs invités" autocomplete class="players">Super</input-search>

      <v-input name="publication" toggle class="publication"></v-input>

      <drop-file id="dropzone"></drop-file>

      <v-button class="submit primary rounded large" @click.native="submitGame()"> Créer ma partie </v-button>
    </section>
  </div>
</template>
<script>
import input from '@/components/atoms/input'
import button from '@/components/atoms/button'
import dropFile from '@/components/atoms/dropFile'
import list from '@/components/atoms/list'
import inputSearch from '@/components/molecules/inputSearch'

import { mapActions } from 'vuex'

export default {
  name: 'CreateGame',
  components:{
    'v-input': input,
    'v-list' : list,
    'v-button' : button,
    'input-search' : inputSearch,
    'input-search': inputSearch,
    'drop-file': dropFile,
  },
  data(){
    return{
      gamemodes : ['cool', 'super', 'top', 'banene', 'mangue'],
      templates : ['DnD', 'shadow runner', 'simple']
    }
  },
  methods: {
    ...mapActions({
      createGame : 'createGame',
    }),
    submitGame(){
      const body = new FormData();
      let file = this.$children[6].$el.files[0];
      if (file) body.append("file",this.$children[6].$el.files[0]);

      body.append('name', this.$children[0].$el.children[1].value)
      body.append('tags', JSON.stringify(this.$children[1].selectedPins))
      body.append('gamemode', this.$children[2].$el.value)
      body.append('template', this.$children[3].$el.value)
      body.append('players', JSON.stringify(this.$children[4].selectedPins))
      body.append('publication', this.$children[5].$el.children[1].checked)

      this.createGame(body);
    }
  }
}
</script>
// https://rowanwins.github.io/vue-dropzone/docs/dist/#/iconDemo/
<style lang="scss" scoped>
.upload{
  display:inline-block;
  width:30px;
  height:30px;
  background:$r-color-primary;
}

h2{
  margin-bottom:0;

  & + p{
    color:$r-color-dark05;
    font-weight:300;
    font-size:14pt;

    margin-bottom:50px;
  }
}

.form{
  display:grid;
  grid-template-columns: 40% 60%;
  grid-template-rows: max-content repeat(4, max-content);

  grid-column-gap: 100px;
  grid-row-gap: 40px;

  & .name{
    grid-area: 1 / 1 / 2 / 2;
  }

  & .inline_inputs{
    grid-area : 1 / 2 / 2 / 3 ;
    display:flex;

    & .template{
      width : 60%;
    }

    & .gamemode{
      width: 30%;
      margin-right: 10%;
    }
  }

  & .tags {
    grid-area : 2 / 1 / 3 / 2 ;
  }

  & .publication{
    grid-area : 3 / 1 / 4 / 2;
  }

  & .players{
    grid-area: 2 / 2 / 3 / 3;
  }

  & #dropzone{
    grid-column: 1/ 3;
    height:20vh;
    display:flex;
    justify-content: center;
    align-items:center;

    border: none;
    border-radius:8px;
    background : $r-layer-02dp;
    box-shadow: $r-shadow-04dp;
  }

  & .submit{
    $pad : 40px;
    grid-column: 2/3;
    width:max-content;
    padding-left:$pad;
    padding-right:$pad;

    justify-self:end;
  }
}

</style>