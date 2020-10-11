<template>
<div>
    <button @click="updateValue(false)">-</button>
    <input :type="type" :min="min" :max="max" :placeholder="placeholderText" :name="name">
    <button v-if="labelFunction" @click="updateValue(true)" >+</button>
    <label :for="name" :class="type">{{labelValue}}</label>
</div>
</template>

<script>
export default {
    name: 'InputText',
    props:{
        type:{
            type: String,
            default: () => 'number',
            required:false,
        },
        name:{
            type: String,
            required: true
        },
        label:{
            type: String,
            required: false
        },
        labelFunction: {
            type: Function,
            required: false
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
    data(){
        return {
            labelValue:0
        }
    },
    computed:{
        placeholderText(){
            if(this.$slots.default){
                return this.$slots.default[0].text ;
            } else {
                if (this.type == 'number'){
                    return 0;
                } else {
                    return 'Value'
                }
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

            if(this.labelFunction){
                this.labelValue = this.labelFunction(value);
            }
        }
    },
    mounted(){
        if(this.labelFunction){
            this.labelValue = this.labelFunction(this.labelValue);
        }
        if(this.label){
            this.labelValue = this.label;
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

    label{
        position:absolute;
        width:100%;
        left:0;
        bottom:10%;

        color:$r-color-dark03;
        text-align:center;

        &.number{
            font-weight:600;
        }

        &.text{
            font-weight:300;
        }
    }
}
</style>