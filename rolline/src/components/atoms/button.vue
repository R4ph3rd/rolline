<template>
  <button class="button" :class="specialStyles">
      {{content}}
  </button>
</template>

<script>
export default {
    name: 'Button',
    props: {
        type: {
            type: String,
            required: false,
            default: () => ''
        },
        outlined: {
            type:Boolean,
            required: false
        }
    },
    computed: {
        content(){
            return this.$slots.default[0].text;
        },
        specialStyles(){
            let classes = '';
            if (this.outlined) classes += 'outlined';
            
            return classes;
        }
    }

}
</script>

<style scoped lang="scss">
.button{
    position:relative;
    width:100%;
    height: 100%;
    padding: 15px 10px;

    box-shadow:$r-shadow-02dp; 
    border-radius: 8px;

    border: none;
    background:$r-color-primary;

    color:$r-color-light02;
    font-weight:600;

    &:hover{
        cursor:pointer;
    }

    &.outlined{
        border: $r-color-light01 1px solid;
        background:none;
        font-weight:400;
    }
}

</style>