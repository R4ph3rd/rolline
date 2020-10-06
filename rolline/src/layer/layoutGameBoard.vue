<template>
  <div id="app">
    <div class="gameboard">
        <!-- <vue-router></vue-router> -->
        <v-button ></v-button>
    </div>
    <v-chat></v-chat>
  </div>
</template>

<script>
import chat from '../components/molecules/chat'
import button from '../components/atoms/button'

export default {
name: 'LayoutGameBoard',
components: {
    'v-chat': chat,
    'v-button' : button
}
}
</script>

<style >
#app{
    display:grid;
    width:100vw;
    height:100vh;
    grid-template-columns: 80% 20%;
}

.gameboard{
    width:100%;
    height:100%;
    background: rgb(30,30,30);
}
</style>    