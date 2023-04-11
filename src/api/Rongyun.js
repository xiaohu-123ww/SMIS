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

/**
 * /**
 * 确定交换手机号
 */

export function getPhoneChange (id) {
  // return request.put('/user/phone-exchange/', id)
  return request.put(`/user/phone-exchange/?comm_id=${id}`)
}

/**
 * 查询微信号
 */

export function getWetChat () {
  return request.get('/user/set-wechat/')
}

/**
 * 修改微信号及绑定微信号
 *
 */

export function getWetChatChange (id) {
  // return request.put('/user/phone-exchange/', id)
  return request.put(`/user/set-wechat/?wechat=${id}`)
}
/**
 * 确定交换微信号
 */

export function getWetChange (id) {
  // return request.put('/user/phone-exchange/', id)
  return request.put(`/user/wechat-exchange/?comm_id=${id}`)
}

