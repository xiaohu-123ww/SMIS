import request from '@/utils/request'
/**
 * 岗位详情
 * @param {*} id
 * @returns
 */
export function getParticulars (id) {
  return request.get(`/user/position-details/${id}`)
}

export function getInRecruit (id, data) {
  return request.post(`/user/position-opening/${id}/`, data)
}
