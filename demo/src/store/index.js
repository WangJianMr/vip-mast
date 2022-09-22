import Vue from 'vue'
import Vuex from 'vuex'
import { setToken, getToken, setUserInfo, getUserInfo } from '../utils/auth'
import { login, userInfoGo, logout } from "../utils/api";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: getToken() || '',
    userInfo: getUserInfo() || '',
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
    //登录
    async handleLOgin({ commit }, form) {
      try {
        const tokenPro = await login(form)
        console.log(tokenPro);
        commit('USE_TOKEN', tokenPro.data.token)
        return tokenPro.data.token
      } catch (error) {
      }
    },
    //用户信息
    async handleInfo({ commit }) {
      try {
        const infoPro = await userInfoGo()
        console.log(infoPro, 'userinofo');
        commit('USE_INFO', infoPro.data)
        return infoPro.data
      } catch (error) {
      }
    },
    // 退出登录
    async handleLogout({commit}){
      try {
        const logoutPro = await logout()
        console.log(logoutPro);
        commit('USE_TOKEN','')
        commit('USE_INFO','{}')
        return logoutPro
      } catch (error) {
        
      }
    }
  },
  modules: {
  }
})
