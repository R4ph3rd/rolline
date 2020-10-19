<template>
  <li @click="$emit('select')" :class="deletable ? 'small layer02dp' : ''">
    <p v-html="_slot.text"></p>
    <button v-if="deletable" @click="$emit('delete')"></button>
  </li>
</template>

<script>
import {mapActions} from 'vuex';

export default {
    name: 'InputPin',
    props:{
        deletable: {
            type:Boolean,
            required: false
        }
    },
    computed: {
        _slot(){
            return this.$slots.default[0] ? this.$slots.default[0] : '';
        }
    },
    methods: {
        clickPin(){
            this.$emit('select')
        }
    },
}
</script>

<style lang="scss">
    li{
        width:max-content;
        height:max-content;
        display: block;
        align-items:center;
        padding:10px 15px;

        border-radius:8px;

        p{
            font-weight:300;
            color:$r-color-light04;
            text-transform: capitalize;

            em{
                font-weight:400;
                color:$r-color-light03;
                font-style:normal;
            }
        }

        &.small{
            display:flex;
            justify-content:space-between;  

            padding: 5px 10px;

            p{
                font-size:10pt;
                white-space: nowrap;
            }

            button{
                width:10pt;
                height:10pt;
                margin-left:8px;
                background: url('../../assets/icons/x-circle.svg') no-repeat center;
                background-size:contain;
                filter:invert(1);
                border:none;

                &:hover{
                    cursor:pointer;
                }
            }
        }
    }
</style>