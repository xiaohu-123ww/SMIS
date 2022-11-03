import request from '@/utils/request'
/**
 * 用户数据
 * @returns
 */
export function getList () {
  return request.get('/user/safe/')
}
/**
 * 修改密码
 */
// /user/edit-password/

export function getpassword () {
  return request.get('/user/edit-password/')
}
