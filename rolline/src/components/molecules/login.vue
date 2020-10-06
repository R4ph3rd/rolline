<template>
  <form action="" method="POST" class="layer04dp login">
      <label for="name">Nom d'aventurier</label>
      <v-input name="name">Provencal le Gaulois</v-input>

      <label for="mdp">Mot de passe d'aventurier</label>
      <v-input password name="mdp">ghq7k!</v-input>

      <v-input submit class="primary">Connect</v-input>
  </form>
</template>

<script>
import input from '../atoms/input'

export default {
    name: 'Login',
    components: {
        'v-input': input
    },
    methods: {
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
            margin-bottom:30px;

            &[type="submit"]{
                margin-top:20px;
                margin-bottom:unset;
            }
        }
    }
</style>