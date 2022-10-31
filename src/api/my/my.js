import request from '@/utils/request'
/**
 * 用户数据
 * @returns
 */
export function getList () {
  return request.get('/user/user_data/')
}
