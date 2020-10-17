<template>
  <div class="connexion">
    <v-login></v-login>
  </div>
</template>

<script>
import login from '../components/molecules/login'

export default {
  name: 'Home',
  components: {
    'v-login': login,
  }
}
</script>

<style lang="scss">
.connexion{
  width:100%;
  height:100%;
}
</style>
