<template>
  <div class="createGame">
    <h2>Créer une nouvelle histoire</h2>
    <p>Poser les fondations du récit de vos futures aventures.</p>

    <section class="form">
      <v-input name="Nom de la partie">Chroniques oubliées</v-input>
      <input-search name="Tags affiliés">Super</input-search>

      <v-input name="Mode de jeu"></v-input>
      <v-input name="Template de la fiche de personnage"></v-input>

      <input-search name="Joueurs invités">Super</input-search>

      <v-input name="publication" type="toggle"></v-input>

      <drop-zone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"></drop-zone>
    </section>
  </div>
</template>

<script>
import input from '@/components/atoms/input'
import inputSearch from '@/components/molecules/inputSearch'

import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

export default {
  name: 'CreateGame',
  components:{
    'v-input': input,
    'input-search': inputSearch,
    'drop-zone': vue2Dropzone
  },
  data(){
    return{
      dropzoneOptions: {
          url: 'https://httpbin.org/post',
          thumbnailWidth: 150,
          maxFilesize: 0.5,
          headers: { "My-Awesome-Header": "header value" },
          dictDefaultMessage: "<i class='upload'></i>Drag & drop ton image ici"
      }
    }
  }
}
</script>
// https://rowanwins.github.io/vue-dropzone/docs/dist/#/iconDemo/
<style lang="scss">
.upload{
  display:inline-block;
  width:30px;
  height:30px;
  background:$r-color-primary;
}
</style>