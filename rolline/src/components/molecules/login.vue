<template>
  <div class="login">
        <!-- <label for="Email">Adresse pour hiboux électroniques</label> -->
        <v-input name="Email">Provencal@legaulois.com</v-input>

        <!-- <label for="Mot de passe">Mot de passe d'aventurier</label> -->
        <v-input password name="Mot de passe"> </v-input>

        <router-link to="getAccount" class="mdpforgot">Mot de passe oublié ?</router-link>

        <v-button class="primary rounded large" @click.native="connectUser()">Se connecter</v-button>

        <!-- <div class="or">
            <span></span>
            or
            <span></span>
        </div> -->
        <p>Tu n'as pas de compte ? <router-link to="register">S'enregistrer</router-link></p>

        <!-- <v-button class="signUp" outlined @click.native="goToSignUp()">Sign up</v-button> -->
  </div>
</template>

<script>
import button from '../atoms/button'
import input from '../atoms/input'

import {mapActions} from 'vuex'

export default {
    name: 'Login',
    components: {
        'v-button': button,
        'v-input': input
    },
    methods: {
        ...mapActions({
            connect: 'connect'
        }),
        connectUser(){
            
            this.connect({
                mail: this.$el.children[0].children[0].value,
                password: this.$el.children[1].children[0].value
            }).then( (rep) => {
                console.log(rep)
                if(rep.token){
                    this.$router.push('/profile');
                }
            })
        },
        keyPressed(e){
            if(e.key === 'Enter'){
                this.connectUser();
            }
        }
    },
    created () {
        window.addEventListener('keypress', this.keyPressed);
    },
    destroyed () {
        window.removeEventListener('scroll', this.keyPressed);
    }
}
</script>

<style scoped lang="scss">
    .login{
        display:flex;
        flex-direction: column;

        width:max-content;
        min-width: 35vw;
        height:max-content;
        padding:30px;
        border-radius:8px;

        background: $r-gradient-dark;
        box-shadow: $r-shadow-04dp;

        label{
            color: $r-color-light01;
            font-weight:600;
            margin-bottom:12px;
        }

        input{
            width: 100%;
            min-height: calc(1em + 30px);
        }

        div{
            margin-bottom:20px;

            &:nth-child(2){
                margin-bottom:12px;
            }
        }

        button{
            margin-top:20px;
            margin-bottom:unset;

            &.large{ 
                text-transform:uppercase;
                font-size:400;
            }
        }

        .mdpforgot{
            margin-bottom:20px;
        }

        a{color:$r-color-primary}

        p:last-child{
            color:$r-color-dark04;
            font-weight:300;
            margin-top:20px;

            a {
                margin-left:10px;
                font-weight:500;
            }
        }
    }
</style>