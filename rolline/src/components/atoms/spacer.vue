<template>
    <div :style="spacer"></div>
</template>

<script>
export default {
    name:'spacer',
    props: {
        height : {
            type: String,
            required: false,
        },
        width: {
            type: String,
            required: false
        }
    },
    computed:{
        spacer(){
            return {
                'width' : this.width ? this.width : '100%',
                'height': this.height ? this.height : '100%'

            }
        }
    }
}
</script>

<style scoped lang="scss">
;spacer{
    flex-grow: 1;
}
</style>