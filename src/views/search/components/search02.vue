<template>
  <div class="search02-container">
     <van-cell icon="search"
     v-for="(text, index) in suggestions"
     :key="index"
     @click="$emit('search', text)"
     >
     <div slot="title" v-html="highLing(text)"></div>
    </van-cell>
  </div>
</template>
<script>
import { getSearchSuggestion } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'search02',
  data () {
    return {
      suggestions: [] // 联想数据
      // text:'<span></span>'
    }
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  watch: {
    searchText: {
      immediate: true, // 监听开始之后立即调用
      // 当searchText发生改变时就会调用handler函数
      handler: debounce(function (value) {
        this.loadSearchSuggestions(value)
      }
      , 300)
    }
  },
  methods: {
    async loadSearchSuggestions (q) {
      try {
        const { data } = await getSearchSuggestion(q)
        this.suggestions = data.data.options
      } catch (err) {
        this.$toast('数据获取失败,请稍后再试')
      }
    },
    highLing (text) {
      // 正则表达式 中间的内容都会当作匹配字符来使用,而不是数据变量
      // 如果需要根据数据变量动态的创建正则表达式,则手动new RegExp
      // RegExp正则表达式构造函数
      // 参数1: 匹配模式字符串,它会根据这个字符串创建正则对象
      // 参数2: 匹配模式
      const str = `<span class="active">${this.searchText}</span>`
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, str)
    }
  }
}
</script>
<style lang="less" scoped>
/deep/.active {
  color: #3296fa;
}
</style>
