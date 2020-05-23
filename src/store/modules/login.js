import Axios from 'axios'
import qs from 'qs'
import api from '../../services/api'
import { FETCH_LOGIN_INTO } from '../../constants/actionTypes'
import { LOGIN_PUSH_MUTATION } from '../../constants/mutationTypes'


export default {
  //设置独立的命名空间
  namespaced: true,
  state: {
    loginStatus: null,
    loginMessage: null
  },
  mutations: {

    //登录存放返回数据
    [LOGIN_PUSH_MUTATION] (state, payload) {
      state.loginStatus = payload.status
      state.loginMessage = payload.message
    }

  },
  actions: {

    //异步请求登录
    async [FETCH_LOGIN_INTO] ({ commit }, payload) {
      const res = await Axios.post(api.loginPage, qs.stringify(payload))
      commit('LOGIN_PUSH_MUTATION', res.data)
    }

  }
}