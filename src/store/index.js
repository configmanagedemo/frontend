import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: "",
    roleID: "",
    isLogin: false,
  },
  mutations: {
    setUserInfo(state, payload) {
      state.username = payload.username;
      state.roleID = payload.roleID;
    },
    setLogin(state) {
      state.isLogin = true;
    },
    setLogout(state) {
      state.isLogin = false;
    }
  },
  actions: {
  },
  modules: {
  },
  strict: process.env.NODE_ENV !== 'production',
})
