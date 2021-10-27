<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar>
       <van-button class="search-btn" slot="title" type="info" size="small" round icon="search">
         搜索</van-button>
    </van-nav-bar>
    <!-- 列表 -->
  <van-tabs class="tabs" v-model="active" animated swipeable>
    <van-tab title="标签 1">内容 1</van-tab>
    <van-tab title="标签 2">内容 2</van-tab>
    <van-tab title="标签 3">内容 3</van-tab>
    <van-tab title="标签 4">内容 4</van-tab>
    <van-tab title="标签 4">内容 4</van-tab>
    <van-tab title="标签 4">内容 4</van-tab>
    <van-tab title="标签 4">内容 4</van-tab>
    <van-tab title="标签 4">内容 4</van-tab>
  </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      active: 0
    }
  }
}
</script>
<style lang="less">
.van-nav-bar {
  background-color: #3296fa;
  .van-nav-bar__title,.van-icon {
    color: #fff;
  }
}
.home-container {
  .van-nav-bar__title{
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
  .tabs {
    .van-tabs_wrap {
      height: 82px;
    }
    .van-tab {
      width: 200px;
      height: 82px;
      border-right: 1px solid #edeff3;
      font-size: 30px;
      color: #777;
    }
    .van-tab--active {
      color: #333;
    }
    .van-tabs__line {
       bottom: 8px;
       width: 31px;
       height: 6px;
       background-color: #3296fa;
    }
    .van-tabs__nav {
      padding-bottom: 0;
    }
  }
}
</style>
