<template>
  <div class="grid" :class="styleGrid" :style="paramsGrid">
        <slot></slot>
  </div>
</template>

<script>
export default {
    name: 'Grid',
    props: {
        cols:{
            type: [Number, String],
            required: false
        },
        rowHeight:{
            type: [Number, String],
            required: false
        }
    },
    computed:{
        styleGrid(){
            if(this.cols){
                return 'cols-' + this.cols
            }
        },
        paramsGrid(){
            let params = '';
            if(this.rowHeight){
                params += 'grid-auto-rows:' + this.rowHeight + 'px'; 
            }

            return params;
        }
    }
}
</script>

<style lang="scss" scoped>
    .grid{
        display:grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-auto-rows: 300px;
        grid-column-gap: 20px;
        grid-row-gap: 20px;

        &.cols-2{
            grid-template-columns: 1fr 1fr;
        }
        
        &.cols-4{
            grid-template-columns: 1fr 1fr 1fr 1fr;
        }
        &.cols-5{
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        }
        &.cols-6{
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        }
    }
</style>