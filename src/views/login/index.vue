<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar title="登录">
      <van-icon slot="left" name="cross"  @click="$router.back()"/>
    </van-nav-bar>
    <!-- 登录表单 -->
    <van-form  ref="loginRef" @submit="onSubmit">
      <van-field
      v-model="user.mobile"
      type="number"
      name="mobile"
      placeholder="请输入手机号"
       :rules="userFormRules.mobile"
      maxlength="11"
      >
      <i slot="left-icon" class="iconfont icon-wode"></i>
      </van-field>
      <van-field
      v-model="user.code"
      type="password"
      name="code"
      placeholder="请输入验证码"
      :rules="userFormRules.code"
      >
      <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
      <!-- 验证码 -->
      <template #button>
        <van-count-down :time="1000 * 60"  format="ss s" v-if="isShow" @finish="isShow = false"/>
         <van-button class="send-btn" round size="small" native-type="button"
         type="default" v-else @click="onSends">
           发送验证码</van-button>
      </template>
      </van-field>
      <div class="login-btn">
      <van-button class="login-btn-col" block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sends } from '@/api/user'
export default {
  name: 'login',
  data () {
    return {
      user: {
        mobile: '13911111111', // 手机号
        code: '246810' // 验证码
      },
      // 表单验证规则
      userFormRules: {
        mobile: [{
          required: true,
          message: '手机号不能为空'
        }, {
          pattern: /^1[3|5|7|8|4|6]\d{9}$/,
          message: '手机号格式错误'
        }],
        code: [{
          required: true,
          message: '验证码不能为空'
        }, {
          pattern: /^\d{6}$/,
          message: '验证码格式错误'
        }]
      },
      // 倒计时显示隐藏
      isShow: false
    }
  },
  methods: {
    // 表单验证
    async onSubmit () {
      // 获取表单数据
      const user = this.user
      // 表单验证 通过this.$toast 调用vant 组件 轻吐司提示
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true, // 禁用背景点击
        duration: 0 // 持续时间默认2秒 如果为0 则持续提示
      })
      // 提交表单请求登入
      try {
        const { data } = await login(user)
        console.log(data)
        this.$store.commit('setUser', data.data)
        this.$toast.success('登录成功')
        this.$router.back()
      } catch (err) {
        console.log('登录失败', err)
        this.$toast.fail('登录失败')
      }
      // 根据请求响应结果处理后续操作
      // console.log(values)
    },
    // 发送验证码
    async  onSends () {
      // 校验手机号
      try {
        await this.$refs.loginRef.validate('mobile')
      } catch (err) {
        return console.log('验证失败', err)
      }

      // 验证通过,显示倒计时
      this.isShow = true
      // 请求发送验证码
      try {
        await sends(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        // 失败关闭倒计时
        this.isShow = false
        if (err.response.status === 429) {
          this.$toast('发送太频繁,请稍后再试')
        }
        this.$toast('发送失败', err)
      }
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
.login-container {
  .iconfont {
    font-size: 37px;
    color: black;
  }
  .send-btn {
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn {
    padding: 53px 33px;
    .login-btn-col{
      background-color: #6db4fb;
      border: none;
    }
  }
}

</style>
