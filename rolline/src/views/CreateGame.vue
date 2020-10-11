<template>
  <div class="createGame">
    <h2>Créer une nouvelle histoire</h2>
    <p>Poser les fondations du récit de vos futures aventures.</p>

    <section class="form">
      <v-input name="Nom de la partie">Chroniques oubliées</v-input>
      <input-search name="Tags affiliés">Super</input-search>

    </section>
  </div>
</template>

<script>
import input from '@/components/atoms/input'
import inputSearch from '@/components/molecules/inputSearch'

export default {
  name: 'CreateGame',
  components:{
    'v-input': input,
    'input-search': inputSearch
  }
}
</script>

<style>

</style>