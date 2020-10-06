<template>
  <div class="parties">
    <v-grid :cols="4" :cards="cards"></v-grid>
  </div>
</template>

<script>
import grid from '../components/molecules/grid'

export default {
  name: 'Home',
  components: {
    'v-grid': grid,
  },
  data(){
    return {
      cards: [
        {
          title: 'Un super titre',
          tags: ['fantasy', 'CO', 'débutant'],
          players: ['Michele Obama', 'Van Halen', 'Pascal Obispo']
        },
        {
          title: 'Un super titre2',
          tags: ['SF', 'Blade Runner', 'hardcore'],
          players: ['François Hollande', 'Bérenger Recoules']
        },
        {
          title: 'Un super titre3',
          tags: ['fantasy', 'DnD', 'confirmé'],
          players: ['Georges Brassens', 'Mobby Dick', 'Slipman']
        },
        {
          title: 'Un super titre4',
          tags: ['fantasy', 'CO', 'débutant'],
          players: ['Michele Obama', 'Van Halen', 'Pascal Obispo']
        },
        {
          title: 'Un super titre5',
          tags: ['Enquete', 'policier', 'débutant'],
          players: ['Commisaire Moutarde', 'Madame Rose', 'Christian Guellerin']
        },
      ]
    }
  }
}
</script>

<style lang="scss">
.parties{
  width:100%;
  height:100%;
}
</style>
