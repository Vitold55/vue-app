// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import * as fb from 'firebase/app'
import config from '../config/config'
import BuyModalComponent from '@/components/Shared/BuyModal'

Vue.use(Vuetify)
Vue.component('AppBuyModal', BuyModalComponent)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    fb.initializeApp(config.fb)

    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLogin', user)
      }
    })

    this.$store.dispatch('fetchAds')
  }
})
