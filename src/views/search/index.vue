<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isShow = false"
      />
    </form>
    <!-- 搜索历史记录 -->
      <!-- 搜索结果 -->
    <Search03 v-if="isShow"></Search03>
    <!-- 搜索建议 -->
    <Search02 v-else-if="searchText"></Search02>
    <!-- 搜索历史 -->
    <Search01 v-else></Search01>
  </div>
</template>
<script>
import Search01 from '../search/components/search01'
import Search02 from '../search/components/search02'
import Search03 from '../search/components/search03'

export default {
  name: 'search',
  data () {
    return {
      searchText: '', // 搜索文本
      isShow: false // 展示列表
    }
  },
  methods: {
    onSearch (val) {
      this.isShow = true
    },
    onCancel () {
      // 跳转上一次记录
      this.$router.back()
    }
  },
  components: {
    Search01,
    Search02,
    Search03
  }
}
</script>
<style lang="less" scoped>
.search-container {
  .van-search__action {
    color: #fff;
  }
}
</style>
