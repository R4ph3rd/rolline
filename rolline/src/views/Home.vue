<template>
  <div class="home">
    <!-- <v-login></v-login> -->
  </div>
</template>

<script>
import login from '../components/molecules/login'

export default {
  name: 'Home',
  components: {
    'v-login':login
  }
}
</script>

<style lang="scss">
.home{
  width:100%;
  height:100%;
  
  display:flex;
  // align-items:center;
  justify-content: center;
}
</style>
