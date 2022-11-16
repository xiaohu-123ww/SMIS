import request from '@/utils/request'
// 职位
/**
 * 职位列表
 * @param {*} data
 * @param {*} limit
 * @returns
 */
export function getPostList (data, limit) {
  return request.post('/user/position-new-retrival/v1.0.2/', data, {
    params: {
      limit

    }
  })
}
/**
 * 翻页
 * @param {*} data
 * @param {*} limit
 * @param {*} offset
 * @returns
 */
export function getPostListOne (data, limit, offset) {
  return request.post('/user/position-new-retrival/', data, {
    params: {
      limit,
      offset
    }
  })
}
/**
 * 城市
 * @returns
 */
export function getPostcity () {
  return request.get('/user/hot-area/')
}
/**
 * 地铁
 * @param {*} adcode
 * @returns
 */
export function getPostMetro (adcode) {
  return request.get('/user/metro-lines-by-adcode/', {
    params: {
      adcode
    }
  })
}
/**
 * 行政区
 * @param {*} adcode
 * @returns
 */
export function getPostadministrative (adcode) {
  return request.get('/user/third-city-by-adcode/', {
    params: {
      adcode
    }
  })
}

/**
 * 其他要求
 * @returns
 */
export function getRequirement () {
  return request.get('/user/condition-lists/')
}

/**
 * 浏览记录
 * @returns
 */
export function getbrowsingHistory () {
  return request.get('/user/history-steps-list/')
}

/**
 * 岗位分类列表
 * @returns
 */
export function getQuarters () {
  return request.get('/enterprise/show-pst-class/v1.0.1/')
}
/**
 * 行业领域列表
 * @returns
 */
export function getIndustryField () {
  return request.get('/enterprise/show-field/v1.0.1/')
}
