<template>
  <div class="my-container">
    <!-- 点击登录 -->
       <!-- 已登录 -->
     <div  v-if="user" class="header user-info">
      <div class="base-info">
        <div class="left">
          <van-image
            class="portrait"
            round
            fit="cover"
            :src="userinfo.photo"
          />
          <span class="name">{{ userinfo.name }}</span>
        </div>
        <div class="rigth">
          <van-button size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <div class="data-top">
         <div class="item">
           <span class="count">{{ userinfo.art_count}}</span>
           <span class="text">头条</span>
         </div>
         <div class="item">
            <span class="count">{{ userinfo.fans_count}}</span>
           <span class="text">关注</span>
         </div>
         <div class="item">
            <span class="count">{{ userinfo.follow_count}}</span>
           <span class="text">粉丝</span>
         </div>
         <div class="item">
            <span class="count">{{ userinfo.like_count}}</span>
            <span class="text">获赞</span>
         </div>
      </div>
    </div>
    <!-- 未登录 -->
    <div v-else class="header not-login" @click="$router.push('/login')">
     <div class="login-box">
      <img class="mobile-img" src="~@/assets/手机.png" alt="">
      <span class="text">登录 / 注册</span>
     </div>
    </div>
    <!-- 收藏 历史 -->
  <van-grid class="nav-grid" :column-num="2" clickable>
    <van-grid-item class="nav-grid-item">
      <i slot="icon" class="iconfont icon-shoucang"></i>
      <span slot="text" class="text">收藏</span>
    </van-grid-item>
    <van-grid-item class="nav-grid-item">
        <i slot="icon" class="iconfont icon-shouye1"></i>
        <span slot="text" class="text">历史</span>
    </van-grid-item>
  </van-grid>
<!-- 消息提示 退出登录 -->
  <van-cell class="mb" title="消息通知"  is-link />
  <van-cell  title="小智同学"  is-link />
  <van-cell v-if="user" class="logout" title="退出登录" clickable @click="onLogout"/>
  </div>
</template>

<script>
// 从store中获得token进行登录判断
import { mapState } from 'vuex'
import { getUser } from '@/api/user'
export default {
  name: 'My',
  data () {
    return {
      userinfo: {} // 用户信息
    }
  },
  computed: {
    // 用户token
    ...mapState(['user'])
  },
  created () {
    if (this.user) {
      this.loadUser()
    }
  },
  methods: {
    onLogout () {
      this.$dialog.confirm({
        title: '确定退出吗？'
      })
        .then(() => {
          // on confirm
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
        })
    },
    async loadUser () {
      try {
        const { data } = await getUser()
        console.log(data)
        this.userinfo = data.data
      } catch (err) {
        this.$toast('获取数据失败', err)
      }
    }
  }
}
</script>
<style lang="less">
.my-container{
  .header{
  height: 361px;
  background:url('~@/assets/15.jpg');
  background-size: cover;
}
 .not-login {
   display: flex;
   justify-content: center;
   align-items: center;
 }
 .login-box {
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   .mobile-img {
     width: 132px;
     height: 132px;
     margin-bottom: 15px;
   }
   .text {
     font-size: 28px;
     color: #fff;
   }
 }
 .user-info {
   .base-info {
     box-sizing: border-box;
     display: flex;
     justify-content: space-between;
     align-items: center;
     height: 231px;
     padding: 76px 32px 23px;
     .left {
        display: flex;
        align-items: center;
       .portrait{
         width: 132px;
         height: 132px;
       }
       .name {
         margin-left: 23px;
         font-size: 30px;
         color: #fff;
       }
     }
   }
   .data-top {
     height: 130px;
     display: flex;
     .item {
       flex: 1;
       height: 100%;
       display: flex;
       justify-content: center;
       align-items: center;
       flex-direction: column;
       color: #fff;
       .count {
         font-size: 36px;
       }
       .text {
         font-size: 23px;
       }
     }
   }
 }
 .nav-grid {
   .nav-grid-item {
     height: 141px;
     i {
       font-size: 45px;
     }
     .icon-shoucang {
       color: #eb5253;
     }
     .icon-shouye1 {
       color: #ff9d1d;
     }
     .text {
       font-size: 28px;
     }
   }
 }
 .logout {
   text-align: center;
   color: #eb5253;
 }
}
</style>
