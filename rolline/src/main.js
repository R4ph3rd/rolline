import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

Vue.config.productionTip = false

require('dotenv').config({ path: __dirname+'/../../.env' })

console.log(process.env)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
