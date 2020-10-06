import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

// axios.defaults.headers =  {"Access-Control-Allow-Origin": "*"};

const urls = {
  user : 'http://localhost:5050/user',
  userConnect: 'http://localhost:5050/user_connect'
}

Vue.use(Vuex)

const state = {
  userState:{
    token: ''
  }
}

const mutations = {
  connect(state, payload){
    state.userState.token = payload.token ;
  }
}

const actions = {
  connect(context, payload){
    axios.post(userConnect, {
      username: payload.username,
      password: payload.password
    })
    .then( response => {
      console.log(response)
      context.commit('connect', response)
    })
    .catch( (err) => {
      console.warn('Couldn"t connect to the server : ', err)
    })
  },
  register(context, payload){
    console.log('Registration demand :', payload)
    axios.post(urls.user, {
      mail: payload.mail,
      discord_id: payload.discord_id,
      password: payload.password
    }).then( () => {
      console.warn('Registration sent to DB !')
    })
  },
  getUsers(context, payload){
    return axios(urls.user).then( function(response){
      return response.data ;
    })
    .catch( function(err){
      console.error(err)
    })
  }
}

const getters = {

}

const modules = {

}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules
})
