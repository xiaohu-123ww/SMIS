import request from '@/utils/request'
/**
 * 手机号验证码
 * @param {*} data
 * @returns
 */
export function getverification (data) {
  return request.post('/user/bind-number/v1.0.0/', data)
}

/**
 * 绑定手机号
 * @param {*} data
 * @returns
 */
export function getphoto (data) {
  return request.get('/user/bind-number/v1.0.0/', data)
}

/**
 * 邮箱验证码
 * @param {*} data
 * @returns
 */
export function getEmail (data) {
  return request.post('/user/bind-email/v1.0.0/', data)
}
/**
 *邮箱绑定
 * @param {*} data
 * @returns
 */
export function getEmailBound (data) {
  return request.get('/user/bind-email/v1.0.0/', data)
}

/**
 * 个人信息修改
 * @param {*} data
 * @returns
 */
export function getchangeInformation (data) {
  return request.post('/user/self-information/', data)
}

/**
 * 个人优势修改
 * @param {*} data
 * @returns
 */
export function getpersonalAdvantage (data) {
  return request.post('/user/self-evaluation/', data)
}
/**
 * 个人优势查询
 * @returns
 */
export function getpersonal () {
  return request.get('/user/self-evaluation/')
}
/**
 * 工作经历查询
 * @returns
 */
export function getexperiences () {
  return request.get('/user/job-experiences/')
}
/**
 * 教育经历查询
 * @returns
 */

export function geteducation () {
  return request.get('/user/education-experiences/')
}
