import request from '@/utils/request'

// 融云即时通讯建立链接沟通

export function getRongyun (data) {
  return request.post('/user/get-im-token/', data)
}

/**
 * 新招呼
 * @returns
 */
export function getpreChat () {
  return request.get('/user/im-list/pre_chat/')
}
/**
 * 未回复
 * @returns
 */
export function getInterest () {
  return request.get('/user/im-list/interest/')
}

/**
 * 沟通中
 */
export function getComming () {
  return request.get('/user/im-list/comming/')
}

/**
 * 已约面P
 */
export function getPosted () {
  return request.get('/user/im-list/posted/')
}

/**
 * 不合适
 */
export function getReject () {
  return request.get('/user/im-list/rejected/')
}

