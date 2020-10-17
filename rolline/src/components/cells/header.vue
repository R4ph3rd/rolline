<template>
  <div class="header" :class="toggleClasses">
      <div class="logo" @click="clearLocalStorage()"></div>
      <v-spacer></v-spacer>

      <ul class="nav">
          <li>
              <router-link to="/games" >Parties</router-link>
          </li>
          <li>
              <router-link to="/community">Communauté</router-link>
          </li>
          <li v-if="!isConnected">
              <router-link  to="/bibliotheque">Bibliothèque</router-link>
          </li>
          <li>
              <a v-if="isConnected" @click="connectWindow()" class="rounded primary">Connexion</a>
              <router-link v-else to="/profile" >Profil</router-link>
          </li>
      </ul>

      <v-login v-if="isConnected" v-show="loginWindow" class="login_window"></v-login>
  </div>
</template>

<script>
import spacer from '@/components/atoms/spacer'
import login from '@/components/molecules/login'

import {mapActions, mapGetters} from 'vuex'

export default {
    name: 'Header',
    props:{
        reveal:{
            type:Boolean,
            required:false,
            default: () => false
        }
    },
    data(){
        return {
            scrollTop : 0,
            scrollDirection: true,
            loginWindow: false
        }
    },
    components: {
        'v-spacer' : spacer,
        'v-login':login
    },
    computed:{
        ...mapGetters(['getToken']),
        toggleClasses(){
            if(this.reveal)
            return this.scrollDirection && this.scrollTop > 0 ? 'hiddenSlide' : ''
        },
        isConnected(){
            return this.getToken == (undefined || '');
        }
    },
    methods:{
        ...mapActions({
            clearLocalStorage: 'clearLocalStorage'
        }),
        handleScroll(e){
            if(e.srcElement.scrollingElement.scrollTop > this.scrollTop){
                if(!this.scrollDirection){
                    this.scrollDirection = !this.scrollDirection;
                }
            } else if (this.scrollDirection){
                this.scrollDirection = !this.scrollDirection;
            }

            this.scrollTop = e.srcElement.scrollingElement.scrollTop ;
            this.loginWindow = false;
        },
        connectWindow(){
            this.loginWindow = true;
            return false;
        }
    },
    created () {
        window.addEventListener('scroll', this.handleScroll);
    },
    destroyed () {
        window.removeEventListener('scroll', this.handleScroll);
    },
    watch:{
        $route(oldval, newval){
            this.loginWindow = false;
        }
    }
}
</script>

<style scoped lang="scss">
.header{
    position: fixed;
    z-index:100;
    top:0;
    left:0;
    width:100vw;
    height:max-content;
    padding:20px;
    padding-right:80px;

    display:flex;
    align-items: center;
    background: $r-gradient-dark;
    box-shadow: $r-shadow-08dp;

    transition: .3s ease-in;

    .logo {
        width:20%;
        height:44px;
        background-color:$r-color-primary;
        border-radius:4px;
    }

    ul{
        display:flex;
        // justify-content: space-between;
        align-items: center;
        width:max-content;

        li{
            margin-left:5vw;
        }

        a {
            position: relative;
            font-size: 10pt;
            font-weight:300;
            color: $r-color-light02;
            text-transform: uppercase;

            &.rounded{
                font-weight:400
            }

            &::after{
                content: ' ';
                position: absolute;
                bottom:-2px;
                left:50%;
                width:0;
                height:2px;
                border-radius:2px;
                background: $r-color-light02;

                transition: .2s ease-out;
            }

            &:hover{
                cursor:pointer;

                a::after{
                    left:0;
                    width:100%;
                    transition: .2s ease-out;
                }
            }
        }
    }

    &.hiddenSlide{
        transform: translateY(-100%);
        opacity:0;
        transition: .3s ease-in;
    }

    .router-link-active{
        color:$r-color-primary !important;

        &::after{
            left:0;
            width:100%;
            background: $r-color-primary;
            transition: .2s ease-out;
        }
    }

    .login_window{
        position:absolute;
        top:110%;
        right:80px;
    }
}
</style>