import request from '@/utils/request'
/**
 * 收藏列表
 * @returns
 */
export function getList () {
  return request.get('/user/collections/')
}
