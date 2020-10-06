<template>
  <div class="cardGame layer02dp">
      <h3>{{title}}</h3>

      <ul class="tags">
          <li v-for="tag in tags" :key="tag">{{tag}}</li>
      </ul>

      <ul class="players">
          <li v-for="player in players" :key="player"></li>
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
            type: Array,
            required: true,
        },
        players: {
            type:Array,
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