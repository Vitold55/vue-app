import Vue from 'vue'
import Router from 'vue-router'
import AuthGuard from './auth-guard'

import Home from '@/components/Home'
import Login from '@/components/Auth/Login'
import Registration from '@/components/Auth/Registration'
import NewAd from '@/components/Ads/NewAd'
import AdsList from '@/components/Ads/AdsList'
import Ad from '@/components/Ads/Ad'
import Orders from '@/components/User/Orders'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/registration',
      name: 'registration',
      component: Registration
    },
    {
      path: '/new',
      name: 'newAdd',
      component: NewAd,
      beforeRouteEnter: AuthGuard
    },
    {
      path: '/list',
      name: 'adsList',
      component: AdsList,
      beforeRouteEnter: AuthGuard
    },
    {
      path: '/ad/:id',
      props: true,
      name: 'ad',
      component: Ad,
      beforeRouteEnter: AuthGuard
    },
    {
      path: '/orders',
      name: 'orders',
      component: Orders,
      beforeRouteEnter: AuthGuard
    }
  ],
  mode: 'history'
})
