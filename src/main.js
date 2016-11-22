import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import VueEvents from 'vue-events'

Vue.use(VueEvents)

/* eslint-disable no-new */
const app = new Vue({
  router,
  store,
  ...App
})

app.$mount('#app')
