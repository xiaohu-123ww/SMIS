import request from '@/utils/request'
/**
 * 收藏列表
 * @returns
 */
export function getList (limit, offset) {
  return request.get('/user/collections/', {
    params: {
      limit, offset
    }
  })
}
