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
