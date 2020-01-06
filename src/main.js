import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap'
import vSelect from 'vue-select'

Vue.component('v-select', vSelect)
import 'vue-select/dist/vue-select.css'

import Datepicker from 'vuejs-datepicker'
Vue.component('date-picker', Datepicker);

import 'bootstrap/dist/css/bootstrap.css'


Vue.component('pagination', require('laravel-vue-pagination'));

import api from './api_resources';

require('dotenv').config()

export default Vue.prototype.$http;

Vue.config.productionTip = false

window.$ = require('jquery');
window.api = api;

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
