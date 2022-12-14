import request from '@/utils/request'
/**
 * 热门岗位
 * @param {*} limit
 * @returns
 */
export function getPosition (limit) {
  return request.get('/user/position-hot/', {
    params: {
      limit
    }
  })
}

/**
 * 热门职位刷新
 * @param {*} limit
 * @param {*} offset
 * @returns
 */
export function getPositionJob (limit, offset) {
  return request.get('/user/position-hot/', {
    params: {
      limit,
      offset
    }
  })
}

/** 精选职位
 *
 * @param {*} limit
 * @returns
 */
export function getHandpickJob (limit) {
  return request.get('/user/position-rec/', {
    params: {
      limit
    }
  })
}

/**
 * 精选职位刷新
 * @param {} limit
 * @param {*} offset
 * @returns
 */
export function getHandpickJobChange (limit, offset) {
  return request.get('/user/position-rec/', {
    params: {
      limit,
      offset
    }
  })
}
