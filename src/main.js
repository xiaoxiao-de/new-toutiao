import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 加载全局样式
import './style/index.less'
// 导入vant组件
import Vant from 'vant'
// vant样式
import 'vant/lib/index.css'
// 加载rem基准值
import 'amfe-flexible'
import '@/utils/dayjs'
// 挂载vant组件
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
