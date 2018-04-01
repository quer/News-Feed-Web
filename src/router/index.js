import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/pages/Home'
import Login from '@/components/pages/Login'
import Channels from '@/components/pages/Channels'
import Create from '@/components/pages/Create'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Create',
      name: 'Create',
      component: Create
    },
    {
      path: '*',
      name: 'Channels',
      component: Channels
    }
  ]
})
