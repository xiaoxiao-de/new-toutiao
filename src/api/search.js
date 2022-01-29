import request from '@/utils/request'
// 联系建议
export const getSearchSuggestion = q => {
  return request({
    method: 'GET',
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}
// 搜索结果
export const getResult = params => {
  return request({
    method: 'GET',
    url: '/v1_0/search',
    params
  })
}
