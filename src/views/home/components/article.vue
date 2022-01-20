<template>
  <div class="article-container">
    <van-pull-refresh v-model="isLoading" :success-text="SuccessText" @refresh="onRefresh">
      <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          :error.sync="error"
          error-text="请求失败，点击重新加载"
          @load="onLoad"
      >
      <articleItem  v-for="(item, index) in list" :key="index" :article="item">

      </articleItem>
    </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { getJournalism } from '@/api/article'
import articleItem from '@/components/articleitem'

export default {
  name: 'articleList',
  props: {
    channel: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      list: [], // 存储列表数据数组
      loading: false, // loading加载状态
      finished: false, // 控制加载结束状态
      timestamp: null, // 请求下一页时间戳
      error: false, // 列表失败提示
      isLoading: false, // 控制下拉刷新的loading状态
      SuccessText: '刷新成功'
    }
  },
  methods: {
    // 初始化 滚动时调用 onload
    async onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      try {
        // 请求获取数据
        const { data } = await getJournalism({
          channel_id: this.channel.id, // 频道id
          timestamp: this.timestamp || Date.now()
        })
        console.log(data)
        // 把数据结果放在list数组上
        const { results } = data.data
        this.list.push(...results)
        // 本次数据加载完 要把加载状态设置为结束状态
        this.loading = false
        // 判断数据是否全部加载完成
        results.length ? this.timestamp = data.data.pre_timestamp : this.finished = true
      } catch (err) {
        this.error = true
        this.loading = false
      }

      // 加载状态结束

      // 数据全部加载完成
    },
    // 下拉刷新时会触发掉用
    async onRefresh () {
      // 请求获取数据
      try {
        const { data } = await getJournalism({
          channel_id: this.channel.id, // 频道id
          timestamp: Date.now()
        })
        // 将数据追加到列表的顶部
        const { results } = data.data
        this.list.unshift(...results)
        console.log(this.list)
        // 关闭下拉刷新的状态
        this.isLoading = false
        // 更新下拉刷新成功文本
        this.SuccessText = `刷新成功,更新了${results.length}条数据`
      } catch (err) {
        this.isLoading = false
        this.SuccessText = '刷新失败'
      }
    }
  },
  components: {
    articleItem
  }
}
</script>
<style lang="less" scoped>
.article-container {
  height: 79vh;
  overflow-y: auto;
}
</style>
