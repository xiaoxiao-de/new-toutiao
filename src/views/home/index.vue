<template>
  <div class="home-container">
    <!-- 搜索导航栏 -->
    <van-nav-bar fixed>
       <van-button class="search-btn" slot="title" type="info" size="small"
       round icon="search" to="/search">
         搜索</van-button>
    </van-nav-bar>
    <!-- 频道列表 -->
  <van-tabs class="tabs" v-model="active"  animated swipeable>
    <van-tab :title="item.name" v-for="item in channelsList" :key="item.id">
      <!-- 文章列表 -->
     <articleList :channel="item" />
     </van-tab>
   <div slot="nav-right" class="placeholder"></div>
   <div slot="nav-right" class="btn" @click="show = true">
        <i class="iconfont icon-gengduo"></i>
   </div>
  </van-tabs>
  <!-- 弹出层 -->
  <van-popup
    v-model="show"
    closeable
    position="bottom"
    :style="{ height: '100%' }"
  >
  <Channel :mychannels = 'channelsList' :active = 'active' @updata-active='onUpdata'></Channel>
  </van-popup>
  </div>
</template>

<script>
import { getUserList } from '@/api/user'
import articleList from './components/article'
import Channel from '@/components/Channel/index'

export default {
  name: 'Home',
  data () {
    return {
      active: 0,
      channelsList: [], // 频道列表
      show: false // 控制弹出层
    }
  },
  created () {
    this.loadUserList()
  },
  methods: {
    async loadUserList () {
      try {
        const { data } = await getUserList()
        this.channelsList = data.data.channels
        console.log(this.channelsList)
      } catch (err) {
        this.$toast('获取数据失败', err)
      }
    },
    onUpdata (index, show = true) {
      // console.log(index)
      this.active = index
      this.show = show
    }
  },
  components: {
    articleList,
    Channel
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
  padding-top: 174px;
  padding-bottom: 100px;
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
   .van-tabs__wrap {
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
      height: 82px;
    }
    .van-tab {
      min-width: 200px;
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
    .placeholder {
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }
    .btn {
      position: fixed;
      display: flex;
      justify-content: center;
      align-items: center;
      right: 0;
      width: 66px;
      height: 82px;
      i {
        font-size: 43px;
      }
    }
  }
}
</style>
