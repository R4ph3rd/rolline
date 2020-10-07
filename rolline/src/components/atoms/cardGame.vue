<template>
  <div class="cardGame layer02dp" @click="testGet()">
      <h3>{{title}}</h3>

      <ul class="tags">
          <li v-for="tag in tags" :key="tag">{{tag}}</li>
      </ul>

      <ul class="players">
          <li v-for="player in players" :key="player">{{player}}</li>
      </ul>
  </div>
</template>

<script>
export default {
    name: 'Cardgame',
    props: {
        title:{
            type: String,
            required: true,
        },
        tags:{
            type: [Array, Object],
            required: true,
        },
        players: {
            type:[Array, Object],
            required: true
        }
    }
}
</script>

<style scoped lang="scss">
    .cardGame{
        position:relative;
        // z-index:2;
        width:100%;
        height:100%;

        display:flex;
        flex-direction: column;

        padding:20px;
        border-radius:8px;

        background: url('https://source.unsplash.com/random/400x300');

        h3{
            font-weight:700;
            font-size:1.1em;
            color: $r-color-light02;  
            margin-bottom:20px;
        }

        .tags{
            display:flex;
            flex-direction: column;

            li{
                font-weight:300;
                font-size:.96em;
                color: $r-color-light05;  
                text-transform: capitalize;
            }
        }

        .players{
            position: absolute;
            bottom:30px;
            display:flex;
            flex-direction: row;

            li{
                width:22px;
                height:22px;
                border-radius:22px;
                background:white;
                margin-right:8px;
            }
        }
    }
    
</style>