<template>
<div :class="blockStyle">
    <label  :for="name">{{name}}</label>
    <input :type="type" :class="style"  :value="valueText" :name="name">
    <label :for="name" class="reveal" v-if="password || checkbox" @click="labelClick()">{{checkboxText}}</label>
    <span v-if="toggle" class="control"></span>
    <p class="alert" v-if="password" v-show="alertSecurity">Le mot de passe doit contenir au moins 6 caractères et comporter au moins une majuscule, une minuscule et un caractère spécial.</p>
</div>
</template>

<script>
export default {
    name: 'InputText',
    props:{
        password: {
            type: Boolean,
            required: false
        },
        submit: {
            type: Boolean,
            required: false
        },
        checkbox: {
            type: Boolean,
            required: false
        },
        toggle: {
            type: Boolean,
            required: false
        },
        name: {
            type: String,
            required: false
        },
    },
    data(){
        return {
            visiblePasswordOrNot: false,
            securityLevel: 'Nulle',
            alertSecurity: false
        }
    },
    computed:{
        blockStyle(){
            if (this.password) return this.securityLevel;
            if (this.toggle) return 'toggleBox'
        },
        type(){
            if (this.password) return this.visiblePasswordOrNot ? 'text' :'password' ;
            if (this.submit) return 'submit' ;
            if (this.checkbox) return 'checkbox' ;
            if( this.toggle) return 'checkbox' ;
            return 'text'
        },
        style(){
            if (this.submit) return 'submit' ;
            if (this.submit) return 'checkbox' ;
            if(this.password) return 'password';
            if( this.toggle) return 'toggle' ;
        },
        valueText(){
            if (this.submit) return this.$slots.default[0].text ;
        },
        placeholderText(){
            if (this.submit && this.checkbox) return '' ;
            return this.$slots.default[0].text ;
        },
        checkboxText(){
            if (this.checkbox) return this.$slots.default[0].text ;
            return  '';
        },
        security(){
            let inputValue = this.$el.children[0].value;
            return inputValue.match(/[A-Z]/g) 
                && inputValue.match(/[a-z]/g)
                && inputValue.match(/[0-9]/g)
                && inputValue.match(/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{6,}$/g)
        }
    },
    methods:{
        labelClick(){
            if(this.checkbox){
                if(this.$el.children[0].checked){
                    this.$el.children[0].checked = false;
                } else {
                    this.$el.children[0].checked = true;
                }
            } else {
                this.visiblePasswordOrNot = !this.visiblePasswordOrNot ;
            }
        }
    },
    mounted () {
        if (this.password){
            this.$el.oninput = () => {
                let inputValue = this.$el.children[1].value;
                if (inputValue.length == 0) this.securityLevel = 'Nulle' ;
                // if (inputValue.length < 6 && inputValue.length > 0) this.securityLevel = 'Insufisant' ;
                // if (inputValue.length < 8 && inputValue.length > 6) this.securityLevel = 'Correct' ;
                // if (inputValue.length > 8) this.securityLevel = 'Robuste' ;

                console.log(this.securityLevel, inputValue  )
            }

            this.$el.onchange = () => {
                // if (!this.security){
                //     this.alertSecurity = true ;
                // } else {
                //     this.alertSecurity = false ;
                // }
            }
        }
    }
}
</script>

<style scoped lang="scss">
$toggle-width:60px;
$toggle-height: 34px;
$toggle-gutter: 5px;
$toggle-radius: 50%;
$toggle-control-speed: .15s;
$toggle-control-ease: ease-in;
$toggle-radius: $toggle-height / 2;
$toggle-control-size: $toggle-height - ($toggle-gutter * 2);

div{
    position:relative;
    padding: 10px 15px 10px 15px;
    border: $r-color-dark04 1px solid;
    box-shadow:$r-shadow-02dp; 
    border-radius: 8px;

    &.toggleBox{
        padding-left:0 !important;
        border:none;
        box-shadow: none;
        display: block;
        padding-left: $toggle-width;
        margin-bottom: 12px;
        cursor: pointer;
        font-size: 22px;
        user-select: none;

        & label {
            display:block;
            margin-bottom:12px;
            font-size:14pt;
            text-transform: capitalize;
        }

        /* toggle style */
        .toggle{
            z-index:2;
            position: absolute;
            opacity: 0;
            cursor: pointer;
            width: $toggle-width !important;
            height: $toggle-height !important;

            &:checked  + .control {
                background-color: $r-color-primary;
                
                &:after {
                    left: $toggle-width - $toggle-control-size - $toggle-gutter;
                    background: $r-color-light01;
                }
            }
        }

        .control {
            z-index:1;
            position:relative;
            display:inline-block;
            height: $toggle-height;
            width: $toggle-width;
            border-radius: $toggle-radius;
            background-color: $r-color-light01;
            box-shadow:$r-shadow-02dp; 
            transition: background-color $toggle-control-speed $toggle-control-ease;

            &:after {
                content: "";
                position: absolute;
                left: $toggle-gutter;
                top: $toggle-gutter;
                width: $toggle-control-size;
                height: $toggle-control-size;
                border-radius: $toggle-radius;
                background: $r-color-primary;
                transition: left $toggle-control-speed $toggle-control-ease;
            }
        }
    }

    &.Insufisant{
        border-color: darkred;
        transition: .3s ease-in;
    }
    &.Correct{
        border-color:gold;
        transition: .3s ease-in;
    }
    &.Robuste{
        border-color:lawngreen;
        transition: .3s ease-in;
    }

    & > label{
        font-size:.98em;
        font-weight:200;
        color: $r-color-dark05;
    }

    input{
        position:relative;
        width:100%;
        height: max-content;

        border:none;
        background:none;

        color:$r-color-light01;
        font-weight:500;
        font-size:1em;

        &::placeholder{
            color: $r-color-light01;
        }

        &[type="checkbox"]{
            width:16px;
            height:16px;
            border: $r-color-light01 2px solid;
            background:none;

            & + label {
                position: relative;
                color: $r-color-light02;
                filter : unset;
                background:none;
                top:unset;
                left:unset;
                right:unset;
                bottom:.4em;
                left:12px;
            }
        }
    }

    .submit{
        padding: 20px 30px;
        background: $r-color-primary;
        font-weight:600;
        border:none;

        &:hover{
            cursor:pointer;
        }
    }

    .reveal {
        width:20px;
        height:20px;
        background:url('~@/assets/icons/eye-off.svg') center;
        background-size: contain;
        filter: invert(.7);

        position: absolute;
        top: calc(50% - 10px);
        right:16px;
        font-size:.95em;

        &:hover{
            cursor: pointer;
        }
    }
}
</style>