<template>
    <div class="layer04dp register">
        <img src="@/assets/images/register/dice_bag.jpg" alt="Dice bag">

        <div class="register_infos">
            <h2>Explorez une infinité d'univers de jeux</h2>
            <p>Accès en libre accès ezflhzabfzepib zepif hzepf hzefh uzia pf.</p>

            <label for="name">Mail</label>
            <v-input name="name">super@mail.com</v-input>
            
            <label for="discord_id">Discord ID</label>
            <v-input name="discord_id">1234</v-input>

            <label for="mdp">Mot de passe</label>
            <v-input password name="mdp">ghq7k!qs</v-input>

            <label for="repeat_mdp" @click="registerUser()" >Répéter le mot de passe</label>
            <v-input password name="repeat_mdp">ghq7k!qs</v-input>

            <v-input checkbox name="CGU">J'ai lu et j'accepte les condtions d'utilisation du service.</v-input>
            <span class="alert" v-show="cguValidation">Tu as oublié de te soumettre aux règles édictées par Judge Dead, fougeux aventurier !</span>

            <v-button class="submit" @click.native="registerUser()">Sign In</v-button>

            <div class="or">
                <span></span>
                or
                <span></span>
            </div>

            <v-button class="signUp" outlined @click.native="goToSignUp()">Sign up</v-button>
        </div>

        <button @click="close()"></button>
    </div>
</template>

<script>
import input from '../atoms/input'
import button from '../atoms/button'
import {mapGetters, mapActions} from 'vuex'

export default {
    name: 'Register',
    data(){
        return{
            cguValidation: false
        }
    },
    components: {
        'v-input': input,
        'v-button': button
    },
    computed:{
        ...mapGetters([''])
    },
    methods: {
        ...mapActions({
            register : 'register',
            getUsers : 'getUsers'
        }),
        registerUser(){
            // if()
            let inputsContainer = Array.from(this.$el.children[1].children).filter( child => child.localName == 'div')
            let cgu = inputsContainer[4].children[0];

            if (cgu.checked){
                let inputsCollections = inputsContainer.map( input => input.children);

                this.register({
                    mail : inputsCollections[0][0].value,
                    discord_id: inputsCollections[1][0].value,
                    password: inputsCollections[2][0].value
                });

            } else {
                this.cguValidation = !this.cguValidation;
            }

            return false;
        },
        goToSignUp(){
            this.getUsers().then ((response) => {
                console.log('getUsers : ', response)
            });
        }
    }
}
</script>

<style scoped lang="scss">
    .register{
        position: relative;
        display:grid;
        grid-template-columns: 40vw auto;

        width:max-content;
        min-width: 35vw;
        max-width: 80vw;
        height:max-content;
        border-radius:8px;
        overflow:hidden;

        // background: $r-layer-04dp;
        box-shadow: $r-shadow-04dp;
        backdrop-filter: blur(12px);


        & > button{
            position: absolute;
            top: 25px;
            right:25px;
            width:24px;
            height:24px;
            border-radius:30px;
            background:white;
            border:none;
        }

        & .register_infos{
            display:flex;
            flex-direction: column;
            width:100%;
            height:max-content;
            padding: 60px 80px;

            label{
            color: $r-color-light01;
            font-weight:600;
            margin-bottom:12px;
        }

        & .submit{
            margin-bottom:20px;
        }

        div{
            width: 100%;
            min-height: calc(1em + 30px);
            margin-bottom:30px;
            border-radius:8px;

            & input[name="mdp"]{
                margin-bottom:12px;

                & + div {
                    margin-bottom: 30px;
                }
            }
        }

        h2{
            color: $r-color-light01;
            font-size:1.9em;

            & + p {
                color: $r-color-light02;
                font-weight: 300;
                margin-bottom:30px;
            }
        }
        }

        img {
            width:100%;
            height:100%;
            object-fit: cover;
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

        .alert{
            position: relative;
            top:-2.2em;
        }

    }
</style>