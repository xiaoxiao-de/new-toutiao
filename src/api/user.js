// 用户请求模块
import request from '@/utils/request'
// import store from '../store'

export const login = data => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}
// 验证码接口 一分钟一次
export const sends = mobile => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}

// 获取用户自己信息
export const getUser = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user'
    // 发送请求头
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}

// 用户频道列表
export const getUserList = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/channels'

  })
}
