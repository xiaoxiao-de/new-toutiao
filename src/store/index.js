import Vue from 'vue'
import Vuex from 'vuex'
// 导入本地数据存储模块
import { setItem, getItem } from '@/utils/stroage'

Vue.use(Vuex)

const TOKEN_KEY = 'Token_value'

export default new Vuex.Store({
  state: {
    // 存储登录信息 token
    user: getItem(TOKEN_KEY)
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      // 防止丢失 备份到本地
      setItem(TOKEN_KEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
