import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap'

import 'bootstrap/dist/css/bootstrap.css'


Vue.component('pagination', require('laravel-vue-pagination'));

import api from './api_resources';
Vue.prototype.$api = api;

require('dotenv').config()

export default Vue.prototype.$http;

Vue.config.productionTip = false

window.$ = require('jquery');

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
