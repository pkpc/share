import Vue from 'vue'
import Vuex from 'vuex'
import api from './api'
Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    token: '',
  },
  getters:{},
  mutations:{
    UPDATE_TOKEN (state, data) {
      state.token = data
    }
  },
  actions:{}
})
