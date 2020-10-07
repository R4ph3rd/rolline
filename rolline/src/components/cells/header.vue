<template>
  <div class="header" :class="toggleClasses">
      <div class="logo"></div>
      <v-spacer></v-spacer>

      <ul class="nav">
          <li>
              <router-link to="parties" >Parties</router-link>
          </li>
          <li>
              <router-link to="community">Communauté</router-link>
          </li>
          <li>
              <router-link to="connexion" >Connexion</router-link>
          </li>
      </ul>
  </div>
</template>

<script>
import spacer from '@/components/atoms/spacer'
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
            scrollDirection: true
        }
    },
    components: {
        'v-spacer' : spacer
    },
    computed:{
        toggleClasses(){
            if(this.reveal)
            return this.scrollDirection && this.scrollTop > 0 ? 'hiddenSlide' : ''
        }
    },
    methods:{
        handleScroll(e){
            if(e.srcElement.scrollingElement.scrollTop > this.scrollTop){
                if(!this.scrollDirection){
                    this.scrollDirection = !this.scrollDirection;
                }
            } else if (this.scrollDirection){
                this.scrollDirection = !this.scrollDirection;
            }

            this.scrollTop = e.srcElement.scrollingElement.scrollTop ;
        }
    },
    created () {
        window.addEventListener('scroll', this.handleScroll);
    },
    destroyed () {
        window.removeEventListener('scroll', this.handleScroll);
    },
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
    padding-right:60px;

    display:flex;
    align-items: center;
    background: #16161d;
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
        justify-content: space-between;
        align-items: center;
        width:44em;

        a {
            position: relative;
            font-size: .9em;
            font-weight:300;
            color: $r-color-light02;
            text-transform: uppercase;

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

            &:hover::after{
                left:0;
                width:100%;
                transition: .2s ease-out;
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
}
</style>