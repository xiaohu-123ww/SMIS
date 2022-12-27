import request from '@/utils/request'
/**
 * 岗位详情
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
// export function getInRecruit (id, data) {
//   return request.post(`/user/position-opening/${id}/`, data)
// }

// 企业详情
export function getPositionDetails (id) {
  return request.get(`/user/enterprise-details/${id}/`)
}

// 相似职位
export function getList (id) {
  return request.get(`/user/similar-position/${id}/`)
}
export function getInRecruit (id, data, limit, offset) {
  return request.post(`/user/position-opening/${id}/`, data, {
    params: {
      limit, offset
    }
  })
}

/**
 *感兴趣
 */
export function getInterests (id) {
  return request.post(`/user/interests/${id}/`)
}

// 收藏

export function getCollections (data) {
  return request.post(`/user/collections/`, data)
}
// 取消收藏
export function getCollectionsDelete (data) {
  return request.delete(`/user/collections/`, { data: data })
}

