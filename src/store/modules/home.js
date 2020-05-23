import Axios from 'axios'
import qs from 'qs'
import api from '../../services/api'
// ---mutationTypes
import { 
  HOME_DATA_MUTATION,
  HOME_DIFFERENT_MUTATION
} from '../../constants/mutationTypes'
// ---actionTypes
import { 
  FETCH_HOME_DATA, 
  FETCH_HOME_ADD,
  FETCH_HOME_UPDATE,
  FETCH_HOME_DELETE 
} from '../../constants/actionTypes'


export default {
  //设置独立的命名空间
  namespaced: true,
  state: {
    listData: [],
    title: null,
    currentId: null
  },
  mutations: {

    //存放用户数据
    [HOME_DATA_MUTATION] (state, payload) {
      state.listData = payload
    },

    //区分添加和编辑
    [HOME_DIFFERENT_MUTATION] (state, payload) {
      state.title = payload.text
      state.currentId = payload.id
    }

  },
  actions: {

    //异步请求用户数据
    async [FETCH_HOME_DATA] ({ commit }) {
      const res = await Axios.get(api.getData)
      commit('HOME_DATA_MUTATION', res.data.data)
    },

    //添加用户数据
    async [FETCH_HOME_ADD] (context, payload) {
      const res = await Axios.post(api.myAdd, qs.stringify(payload))
      if (res.status === 200) {
        alert(res.statusText)
      } else {
        alert(res.statusText)
      }
    },

    //修改用户数据
    async [FETCH_HOME_UPDATE] (context, payload) {
      const res = await Axios.post(api.myUpdate, qs.stringify(payload))
      if (res.data.code === 200) {
        alert(res.data.message)
      } else {
        alert(res.data.message)
      }
    },

    //删除用户数据
    async [FETCH_HOME_DELETE] (context, payload) {
      const res = await Axios.post(api.Delete, qs.stringify(payload))
      if (res.data.code === 200) {
        alert(res.data.message)
      } else {
        alert(res.data.message)
      }
    }
    
  }
}