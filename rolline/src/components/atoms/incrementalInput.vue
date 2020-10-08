<template>
<div>
    <button @click="updateValue(false)">-</button>
    <input type="number" :min="min" :max="max" :placeholder="placeholderText" :name="name">
    <button @click="updateValue(true)">+</button>
</div>
</template>

<script>
export default {
    name: 'InputText',
    props:{
        name:{
            type: String,
            required: true
        },
        min:{
            type: [String, Number],
            required: false
        },
        max:{
            type: [String, Number],
            required: false
        },
        outlined:{
            type:Boolean,
            required: false
        }
    },
    computed:{
        placeholderText(){
            if(this.$slots.default){
                return this.$slots.default[0].text ;
            } else {
                return 0;
            }
        }
    },
    methods:{
        updateValue(sign){
            let value = this.$el.children[1].value;
            value = !value ? this.$el.children[1].placeholder : value;

            if(sign){
                value ++;
            } else {
                value --;
            }
            this.$el.children[1].value = value
        }
    }
}
</script>

<style scoped lang="scss">

div{
    position:relative;
    display:grid;
    grid-template-columns: 20% auto 20%;
    // padding: 15px 10px;

    background:$r-layer-03dp;
    box-shadow:$r-shadow-02dp; 
    border-radius: 8px;

    input{
        position:relative;
        width:100%;
        height: 100%;
        min-height: max-content;
        background:none;
        border:none;
        

        color:$r-color-light02;
        font-weight:600;
        font-size:1.5em;
        text-align:center;

        -moz-appearance: textfield;

        &::placeholder{
            color: $r-color-light04;
        }

        &.outlined{
            border: $r-color-light01 1px solid;
            background:none;
        }

        &::-webkit-outer-spin-button, &::-webkit-inner-spin-button{
            -webkit-appearance: none;
            margin: 0;
        }
    }

    button{
        width:100%;
        height:100%;

        display:flex;
        justify-content: center;
        align-items: center;
        border:none;

        background: $r-layer-02dp;
        color: $r-color-light04;
        font-size:1.5em;
        font-weight:600;

        opacity:0;

        &:hover{
            opacity:1;
        }

        &:last-child{
            right:0;
        }
        &:first-child{
            left:0;
        }
    }
}
</style>