<template>
  <div class="layer04dp login">
        <label for="name">Adresse pour hiboux électroniques</label>
        <v-input name="name">Provencal@legaulois.com</v-input>

        <label for="mdp">Mot de passe d'aventurier</label>
        <v-input password name="mdp">ghq7k!</v-input>

        <v-button class="primary" @click.native="connectUser()">Connect</v-button>

        <!-- <div class="or">
            <span></span>
            or
            <span></span>
        </div> -->

        <v-button class="signUp" outlined @click.native="goToSignUp()">Sign up</v-button>
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
                mail: this.$el.children[1].children[0].value,
                password: this.$el.children[3].children[0].value
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

        // background: $r-layer-04dp;
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
            margin-bottom:30px;
        }

        button{
            margin-top:20px;
            margin-bottom:unset;
        }

        .or{
            width:100%;
            height:max-content;
            display:grid;
            grid-template-columns: 1fr auto 1fr;
            grid-column-gap:12px;
            align-items:center;
            color: $r-color-light03;

            & span {
                width:100%;
                height:1px;
                border-radius:2px;
                background-color:$r-color-light03;
            }
        }
    }
</style>