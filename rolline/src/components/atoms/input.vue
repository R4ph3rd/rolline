<template>
<div>
  <input :type="type" :class="style" :placeholder="placeholderText" :value="valueText" :name="name">
  <label :for="name" class="reveal" v-if="password || checkbox" @click="labelClick()">{{checkboxText}}</label>
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
        name: {
            type: String,
            required: false
        }
    },
    data(){
        return {
            visiblePasswordOrNot: false,
            securityLevel: 'Nulle',
            alertSecurity: false
        }
    },
    computed:{
        type(){
            if (this.password) return this.visiblePasswordOrNot ? 'text' :'password' ;
            if (this.submit) return 'submit' ;
            if (this.checkbox) return 'checkbox' ;
            return 'text'
        },
        style(){
            if (this.submit) return 'submit' ;
            if (this.submit) return 'checkbox' ;
            if(this.password) return this.securityLevel;
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
                let inputValue = this.$el.children[0].value;
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

div{
    position:relative;

    input{
        position:relative;
        width:100%;
        height: max-content;
        padding: 15px 10px;

        border: $r-color-light01 1px solid;
        background:none;
        box-shadow:$r-shadow-02dp; 
        border-radius: 8px;

        color:$r-color-light02;
        font-weight:400;

        &::placeholder{
            color: $r-color-light04;
        }

        &[type="password"].Insufisant{
            border-color:darkred;
            transition: .3s ease-in;
        }
        &[type="password"].Correct{
            border-color:gold;
            transition: .3s ease-in;
        }
        &[type="password"].Robuste{
            border-color:lawngreen;
            transition: .3s ease-in;
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
        filter: invert(.9);

        position: absolute;
        top: 1.05em;
        right:16px;
        font-size:.95em;

        &:hover{
            cursor: pointer;
        }
    }
}
</style>