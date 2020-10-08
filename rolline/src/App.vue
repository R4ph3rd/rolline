<template>
<div id="app">
    <router-view/>
</div>
</template>
<script>
import {mapActions} from 'vuex'
export default {
  methods:{
    ...mapActions({
      initializeUserState : 'initializeUserState'
    })
  },
  beforeCreate(){
    this.$store.commit('initializeUserState');
  }
}
</script>
<style lang="scss">
*{
  box-sizing: border-box;
  margin:0;
  padding:0;

  list-style: none;
  text-decoration: none;

  font-family: 'Heebo';
}

#app{
  min-width:100vw;
  min-height:100vh;
  background: $r-layer-background;
}

</style>
