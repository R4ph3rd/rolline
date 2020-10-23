<template>
    <div class="layer04dp register">
        <img src="@/assets/images/register/dice_bag.jpg" alt="Dice bag">

        <div class="register_infos">
            <h2>Explorez une infinité d'univers de jeux</h2>
            <p>Accès en libre accès ezflhzabfzepib zepif hzepf hzefh uzia pf.</p>

            <v-input name="Mail">super@mail.com</v-input>
            <v-input name="Name">super@mail.com</v-input>
            <v-input name="Discord ID">1234</v-input>
            <v-input password name="Mot de passe">ghq7k!qs</v-input>
            <span class="alert" v-show="passwordValidation">Les mots de passe ne sont pas identiques.</span>
            <v-input password name="Répéter le mot de passe">ghq7k!qs</v-input>

            <v-input checkbox name="CGU">J'ai lu et j'accepte les condtions d'utilisation du service.</v-input>
            <span class="alert" v-show="cguValidation">Tu as oublié de te soumettre aux règles édictées par Judge Dead, fougeux aventurier !</span>

            <v-button class="submit" @click.native="registerUser()">Sign up</v-button>

            <div class="or">
                <span></span>
                or
                <span></span>
            </div>

            <v-button class="signUp" outlined @click.native="goToSignUp()">Sign in</v-button>
        </div>
    </div>
</template>

<script>
import input from '@/components/atoms/input'
import button from '@/components/atoms/button'
import {mapGetters, mapActions} from 'vuex'

export default {
    name : 'Register',
    components: {
        'v-input': input,
        'v-button': button
    },
    data(){
        return{
            cguValidation: false,
            passwordValidation : false
        }
    },
    methods:{
        ...mapActions({
            register : 'register',
            getUsers : 'getUsers'
        }),
        registerUser(){
            if (this.$children[5].$el.children[0].checked){ // cgu
                if (this.$children[4].$el.children[1].value == this.$children[3].$el.children[1].value){ // check password inputs 
                    this.register({
                        mail : this.$children[0].$el.children[1].value,
                        pseudo: this.$children[1].$el.children[1].value,
                        discord_id: this.$children[2].$el.children[1].value,
                        password: this.$children[3].$el.children[1].value
                    });
                } else {
                    this.passwordValidation = !this.passwordValidation;
                }
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
        width:100%;
        height:max-content;
        border-radius:8px;
        // overflow:hidden;
        margin-bottom:50px;

        // background: $r-layer-04dp;
        box-shadow: $r-shadow-04dp;
        backdrop-filter: blur(12px);

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