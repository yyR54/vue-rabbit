import request from '@/utils/http'

// 详情数据
export const getDetail = (id) => {
  return request({
    url: '/goods',
    params: {
      id
    }
  })
}