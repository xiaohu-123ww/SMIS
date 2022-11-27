import request from '@/utils/request'

/**
 * 新招呼
 * @returns
 */
export function getpreChat (limit, offset) {
  return request.get('/user/pre-chat/', {
    params: {
      limit, offset
    }
  })
}
/**
 * 有意向
 * @returns
 */
export function getInterests (limit, offset) {
  return request.get('/user/interests/',
    {
      params: {
        limit, offset
      }
    })
}
/**
 * 感兴趣
 */
export function getInterestsLike (id) {
  return request.post(`/user/pre-chat/${id}/`)
}
/**
 * 沟通中
 */
export function getChating (limit, offset) {
  return request.get('/user/chating/',
    {
      params: {
        limit, offset
      }
    })
}

/**
 * 已投递
 */
export function getChatingList (cv_exchange, limit, offset) {
  return request.get('/user/chating/', {
    params: {
      cv_exchange, limit, offset
    }
  })
}

/**
 * 不合适
 */
export function getReject (limit, offset) {
  return request.get('/user/reject/',
    {
      params: {
        limit, offset
      }
    })
}
// 已邀约

export function getHasInterviews (limit, offset) {
  return request.get('/user/has-interviews/',
    {
      params: {
        limit, offset
      }
    })
}
//* 提醒对方 */
// /user/interests/refresh/:comm_id/
export function getRefrssh (id) {
  return request.put(`/user/interests/refresh/${id}/`)
}

/**
 * 向hr 发送简历
 */

export function getChatingId (id) {
  return request.post(`/user/chating/${id}/`)
}
