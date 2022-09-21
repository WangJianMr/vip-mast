import Vue from 'vue'
import Vuex from 'vuex'
import { setToken, getToken, setUserInfo, getUserInfo } from '../utils/auth'
import { login,userInfoGo } from "../utils/api";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: getToken()||'',
    userInfo: getUserInfo()||'',
  },
  getters: {
    SET_TOKEN(state) {
      return state.token
    },
    SET_INFO(state) {
      return state.userInfo
    },
  },
  mutations: {
    USE_TOKEN(state, token) {
      state.token = token
      setToken(token)
    },
    USE_INFO(state, info) {
      state.userInfo = info
      setUserInfo(info)
    },
  },
  actions: {
    async handleLOgin({commit},form){
      await login(form).then(res=>{
        console.log(res,'res');
        commit('USE_TOKEN',res.data.token)
      })
    },

    async handleInfo({commit}){
      await userInfoGo().then(res=>{
        console.log(res,'userinofo');
        commit('USE_INFO',res.data)
      })
    },

    // async handleUseToken({ commit }, token) {
    //   commit('USE_TOKEN', token)
    // },
    // async handleUseInfo({ commit }, info) {
    //   commit('USE_INFO', info)
    // }
  },
  modules: {
  }
})
