import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import auth from './modules/auth'
import townships from './modules/townships'
import companies from './modules/companies'
import jobs from './modules/jobs'
import students from './modules/students'
import interviews from './modules/interviews'

Vue.use(Vuex)

axios.defaults.baseURL = 'http://localhost:8000/api';
Vue.prototype.$http = axios
const access_token = localStorage.getItem('access_token')
if(access_token)
  Vue.prototype.$http.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;


export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth, townships, companies, jobs, students, interviews
  }
})
