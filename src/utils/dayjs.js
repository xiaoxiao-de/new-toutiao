import Vue from 'vue'
import dayjs from 'dayjs'
// 加载中文语言包
import 'dayjs/locale/zh-cn'
// 处理相对时间
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
// 配置中文
dayjs.locale('zh-cn')

Vue.filter('relativetime', value => {
  return dayjs().to(dayjs(value))
})
