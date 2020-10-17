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
        path: 'games',
        name: 'Parties',
        component: () => import( '../views/Parties.vue'),
      },
      {
        path: 'games/create',
        name: 'CreateGame',
        component: () => import( '../views/CreateGame.vue')
      },
      {
        path: 'community',
        name: 'Community',
        component: () => import( '../views/Community.vue')
      },
      {
        path: 'bibliotheque',
        name: 'Bibliothèque',
        component: () => import( '../views/Bibliotheque.vue')
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import( '../views/Profile.vue')
      },
    ]
  },
  {
    path: 'game',
    name: 'Game_undefined',
    children:[
      {
        path: '/game/:id',
        name: 'Game',
        component: () => import( '../layer/layoutGameBoard.vue'),
      }
    ]
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
