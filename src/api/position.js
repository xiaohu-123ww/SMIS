import request from '@/utils/request'

// 首页

/**
 *
 * @returns 证书
 */
export function getCertificate () {
  return request.get('/user/cert-rec/')
}

/**
 * 岗位
 * @returns
 */
export function getSerchlist () {
  return request.get('/enterprise/show-pst-class/')
}

/**
 * 轮播图
 * @returns
 */
export function getSlideshow () {
  return request.get('/carousel/')
}
