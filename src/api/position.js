import request from '@/utils/request'

/**
 * 热门岗位
 * @param {*} limit
 * @returns
 */
export function getposition (limit) {
  return request.get('/user/position-hot/', {
    params: {
      limit
    }
  })
}
