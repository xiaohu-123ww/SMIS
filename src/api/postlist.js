import request from '@/utils/request'

export function getPostList (data, limit) {
  return request.post('/user/position-new-retrival/', data, {
    params: {
      limit
    }
  })
}
