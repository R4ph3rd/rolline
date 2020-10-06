<template>
  <div class="grid" :class="styleGrid">
      <card-game 
        v-for="(card, i) in cards" :key="'card-' + i"
        :title="card.title"
        :tags="card.tags"
        :players="card.players"
        ></card-game>
  </div>
</template>

<script>
import cardGame from '@/components/atoms/cardGame'

export default {
    name: 'Grid',
    components: {
        'card-game': cardGame
    },
    props: {
        cards:{
            type: Array,
            required:true
        },
        cols:{
            type: [Number, String],
            required: false
        }
    },
    computed:{
        styleGrid(){
            if(this.cols){
                return 'cols-' + this.cols
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .grid{
        display:grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-auto-rows: 300px;
        grid-column-gap: 20px;
        grid-row-gap: 20px;

        &.cols-2{
            grid-template-columns: 1fr 1fr;
        }
        
        &.cols-4{
            grid-template-columns: 1fr 1fr 1fr 1fr;
        }
    }
</style>