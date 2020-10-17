<template>
  <div class="layout">
    <v-header reveal></v-header>
        <router-view/>  
  </div>
</template>

<script>
import header from '@/components/cells/header'

export default {
    name: 'LayoutWebsite',
    components: {
        'v-header': header     
    }
}
</script>

<style >
.layout{
    display:grid;
    width:100vw;
    height:max-content;
    /* background: $r-layer; */
    padding-top:130px;
    padding-left:10%;
    padding-right:10%;
}
</style>    