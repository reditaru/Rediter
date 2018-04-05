import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import { TweenMax } from 'gsap'
import PortalVue from 'portal-vue'
import Message from './components/Message'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.use(PortalVue)
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.TweenMax = Vue.prototype.$TweenMax = TweenMax
Vue.component('Message', Message);
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
