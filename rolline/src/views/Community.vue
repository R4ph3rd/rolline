<template>
  <div class="community">
    <v-grid cols="6" rowHeight="120">
      <incremental-input 
      v-for="i in 6" 
      :key="'inc-' + i" 
      name="input1"
      :labelFunction="(x) => {
        let y = Math.round((x - 10) / 2);
        let sign = y > 0 ? '+' : '';
        return sign + y;
        }"
      />

      <incremental-input
      type="text"
      name="input2"
      label="SUper"
      />
    </v-grid>
  </div>
</template>

<script>
import incrementalInput from '../components/atoms/incrementalInput'
import grid from '../components/molecules/grid'

export default {
  name: 'Home',
  components: {
    'v-grid': grid,
    'incremental-input': incrementalInput
    
  },
  data(){
    return {
    
    }
  }
}
</script>

<style lang="scss">
.parties{
  width:100%;
  height:100%;
}
</style>
