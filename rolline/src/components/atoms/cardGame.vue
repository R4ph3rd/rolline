<template>
  <div class="cardGame layer02dp">

      <div :style="`background: url('${cover});`" class="cover"></div>

      <h3>{{title}}</h3>

      <ul class="tags">
          <li v-for="tag in tags" :key="tag" class="layer02dp">{{tag}}</li>
      </ul>

      <p>{{description}}</p>

        <div class="bottom">
            <a @click="openTab()">Voir la fiche complète</a>

            <ul class="players">
                <li v-for="(player, i) in players" :key="player" :style="transformItem(i)"></li>
            </ul>
        </div>
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
        description:{
            type: String,
            required: false,
            default: () => "Aucune description n'a été fournie pour cette partie."
        },
        players: {
            type:[Array, Object],
            required: true
        },
        cover:{
            type: String,
            // default: () => 'https://source.unsplash.com/random/400x300',
            required:false
        }
    },
    methods:{
        openTab(){
            console.log('open tab')
        },
        transformItem(i){
            if (i != 0) return `transform:translateX(${i * 8}px)`;
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

        padding:14px;
        border-radius:8px;

        

        .cover {
            width:100%;
            height:50%;
            border-radius: 8px;
            background-position: center !important;
            background-size:cover !important;
            background-repeat: no-repeat;

            margin-bottom:12px;
        }   


        h3{
            font-weight:700;
            font-size:1.1em;
            color: $r-color-light02;  
            margin-bottom:6px;
        }

        p{
            color:$r-color-dark04;
            font-weight:300;
            font-size:10pt;
        }

        .tags{
            display:flex;
            flex-direction: row;
            margin-bottom:12px;

            li{
                display:block;
                font-weight:300;
                font-size:.96em;
                color: $r-color-light05;  
                text-transform: capitalize;

                padding:4px 8px;
                border-radius: 4px;
                margin-right:8px;
            }
        }

        .bottom{
            position: absolute;
            bottom:16px;
            width:calc(100% - 28px);
            display: flex;
            justify-content: space-between;
            align-content: center;

            a{
                display:block;
                width:max-content;
                flex-grow:2;
                color:$r-color-primary;
                font-weight:600;
                font-size:10pt;
            }

            .players{
                flex-shrink: 2;
                display:flex;
                flex-direction: row-reverse;

                li{
                    width:25px;
                    height:25px;
                    border: solid 3px #28282f;
                    border-radius:22px;
                    background: url('https://source.unsplash.com/random/30x30');
                }
            }
        }
    }
    
</style>