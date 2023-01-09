import request from '@/utils/request'
/**
 * 图片上传
 * @param {*} formData
 * @returns
 */
export function getFirm (formData) {
  return request.post('/user/user-feedback-input/', formData)
}
/**
 * 退出及删除
 */

export function getImageDelete (data) {
  return request.delete('/user/user-feedback/', { data: data })
}
/**
 * 反馈提交
 * @param {*} data
 * @returns
 */
export function getForm (data) {
  return request.post('/user/user-feedback/', data)
}
