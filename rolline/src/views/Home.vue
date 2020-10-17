<template>
  <div class="home">
    <!-- <v-login></v-login> -->
    <v-register></v-register>
  </div>
</template>

<script>
import login from '../components/molecules/login'
import register from '../components/molecules/registerForm'

export default {
  name: 'Home',
  components: {
    'v-login':login,
    'v-register': register
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
