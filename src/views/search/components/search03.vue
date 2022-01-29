<template>
  <div class="search03-container">
   <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error = 'error'
      error-text = "加载失败,请重试"
      @load="onLoad"
    >
      <van-cell v-for="(item, index) in list" :key="index" :title="item.title" />
    </van-list>
  </div>
</template>
<script>
import { getResult } from '@/api/search'
export default {
  name: 'search03',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [], // 搜索列表
      loading: false,
      finished: false,
      page: 1, // 页数
      perPage: 20, // 条数
      error: false
    }
  },
  methods: {
    async onLoad () {
      // 1.请求获取数据
      try {
        const { data } = await getResult({
          page: this.page, // 页码
          per_Page: this.perPage, // 每页大小
          q: this.searchText // 查询关键字
        })
        // 2.将数据添加到数组列表中
        const { results } = data.data
        this.list.push(...results)
        // 3.将本次加载中的loding关闭
        this.loading = false
        // 4.判断是否还有数据
        if (results.length) {
          // 如果有,则更新获取下一个数据的页码
          this.page++
        } else {
          // 如果没有,则将加载状态finished设置为结束
          this.finished = true
        }
      } catch (err) {
        // 加载失败
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>
<style lang="less" scoped>

</style>
