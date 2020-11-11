<template>
  <div class="home">
    <iframe src="https://discord.com/widget?id=457600600297963552&theme=dark" width="350" height="500" allowtransparency="true" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
    <iframe src="https://e.widgetbot.io/channels/457600600297963552/760213259826495519" height="600" width="800"></iframe>


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
