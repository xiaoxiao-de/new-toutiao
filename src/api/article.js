// 列表请求模块
import request from '@/utils/request'
// 列表tab
export const getJournalism = (params) => {
  return request({
    method: 'GET',
    url: '/v1_0/articles',
    params

  })
}
// 新闻详情
export const getArticleDetails = id => {
  return request({
    method: 'GET',
    url: `/v1_0/articles/${id}`
  })
}
// 取消关注用户
export const getUserCancel = id => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${id}`
  })
}
// 关注用户
export const getUserFollow = target => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target
    }
  })
}
// 收藏文章
export const UserCollection = target => {
  return request({
    method: 'POST',
    url: '/v1_0/article/collections',
    target
  })
}
// 取消收藏
export const cancelCollections = target => {
  return request({
    method: 'DELETE',
    url: ` /v1_0/article/collections/${target}`
  })
}
// 点赞
export const stick = target => {
  return request({
    method: 'POST',
    url: '/v1_0/article/likings',
    target
  })
}
// 取消点赞文章
export const cancelStick = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/likings/${target}`
  })
}
