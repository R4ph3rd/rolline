<template>
<div id="app">
    <router-view/>
</div>
</template>

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
