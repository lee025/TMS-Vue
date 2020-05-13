import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import News from '@/components/News'
import Grid from '@/components/Grid'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/news',
      name: 'News',
      component: News
    },
    {
      path: '/grid',
      name: 'Grid',
      component: Grid
    }
  ]
})
