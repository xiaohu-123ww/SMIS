import request from '@/utils/request'
/**
 * 企业详情
 * @param {*} id
 * @returns
 */
export function getParticulars (id) {
  return request.get(`/user/position-details/${id}`)
}

// 企业在招列表
// export function getInRecruit (id, data) {
//   return request.post(`/user/position-opening/${id}/`, data)
// }
// 企业在招列表分页
export function getInRecruit (id, data, limit, offset) {
  return request.post(`/user/position-opening/${id}/`, data, {
    params: {
      limit, offset
    }
  })
}

// 岗位详情
export function getPositionDetails (id) {
  return request.get(`/user/enterprise-details/${id}/`)
}