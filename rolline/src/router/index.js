import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes =  [
  {
    path: '/',
    name: 'Home',
    component: () => import( '../layer/layoutWebsite.vue'),
    children:[
      {
        path: 'parties',
        name: 'Parties',
        component: () => import( '../views/Parties.vue')
      },
      {
        path: 'community',
        name: 'Community',
        component: () => import( '../views/Community.vue')
      },
      {
        path: 'connexion',
        name: 'Connexion',
        component: () => import( '../views/Connexion.vue')
      },
    ]
  },
  {
    path: '/game',
    name: 'Game',
    component: () => import( '../layer/layoutGameBoard.vue')
  },
  {
    path: '/home',
    name: 'test',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
