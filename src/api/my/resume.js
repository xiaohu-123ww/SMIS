import request from '@/utils/request'
/**
 * 手机号验证码
 * @param {*} data
 * @returns
 */
export function getverification (mobile) {
  return request.get('/user/bind-number/v1.0.0/', {
    params: {
      mobile
    }
  })
}

/**
 * 绑定手机号
 * @param {*} data
 * @returns
 */
export function getphoto (data) {
  return request.post('/user/bind-number/v1.0.0/', data)
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
  return request.post('/user/bind-email/v1.0.0/', data)
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
 * 工作经历新增
 */
export function getexperiencesList (data) {
  return request.post('/user/job-experiences/', data)
}

/**
 * 工作经历删除
 */
export function getjobExperiences (id) {
  return request.delete(`/user/job-experiences/${id}/`)
}

/**
 * 工作经历修改
 */
export function getjobExperiencesAdemn (id, data) {
  return request.put(`/user/job-experiences/${id}/`, data)
}
/**
 * 城市三级选择
 * @returns
 */
export function getcity () {
  return request.get('/user/adcode/v1.0.1/')
}
/**
 * 求职意向
 * @returns
 */

export function getjobIntention () {
  return request.get('/cv/career-objective/')
}
/**
 * 新增求职意向
 * @param {*} data
 * @returns
 */
export function getjobIntentionList (data) {
  return request.post('/cv/career-objective/', data)
}
/**
 *删除求职意向
 */
export function getjobIntentionDelete (id) {
  return request.delete(`/cv/career-objective/${id}/`)
}

// 修改
export function getjobIntentionAmend (id, data) {
  return request.put(`/cv/career-objective/${id}/`, data)
}
/**
 * 证书
 * @param {*} id
 * @returns
 */
export function getcertificate () {
  return request.get(`/user/certification/`)
}
// 系统证书列表

export function getCertList () {
  return request.get(`/user/cert-list/`)
}

/**
 * 绑定证书
 * @param {*} data
 * @returns
 */
export function getCertification (data) {
  return request.post('/user/certification/', data)
}

/**
 * 删除证书
 * @param {*} id
 * @returns
 */

export function getCertificationDelete (id) {
  return request.delete(`/user/certification/${id}/`)
}

/**
 * 修改证书
 * @param {*} id
 * @returns
 */
export function getCertificationAmend (id, data) {
  return request.put(`/user/certification/${id}/`, data)
}

/**
 * 教育经历查询
 * @returns
 */

export function geteducation () {
  return request.get('/user/education-experiences/')
}

// 教育经历删除
export function getEducationDelete (id) {
  return request.delete(`/user/education-experiences/${id}/`)
}
// 教育经历修改
export function getEducatioAmend (id, data) {
  return request.put(`/user/education-experiences/${id}/`, data)
}
// 教育经历添加/user/education-experiences/
export function getEducationExperiences (data) {
  return request.post('/user/education-experiences/', data)
}

// 项目经历列表
export function getProjectList () {
  return request.get('/user/project-experiences/')
}
// 项目经历新增

export function getProjectExperiences (data) {
  return request.post('/user/project-experiences/', data)
}
// 项目经历删除
export function getProjectExperiencesDelete (id) {
  return request.delete(`/user/project-experiences/${id}/`)
}
// 项目经历修改
export function getProjectExperiencesAdd (id, data) {
  return request.put(`/user/project-experiences/${id}/`, data)
}
// 职位技能
export function getShowJobkeywords () {
  return request.get('/enterprise/show-jobkeywords/v1.0.1/')
}
/**
 * 简历
 * @param {*} param
 * @returns
 */
export function planInsert (formData) {
  return request.post('/cv/upload_cv/v1.0.0/', formData)
}
/** *
 * 简历解析
 */
export function getResumeCv () {
  return request.get('/cv/resume-cv/')
}

/**
 * 简历文件地址
 */
export function getCv () {
  return request.get('/cv/get-cv/')
}
// 删除简历
export function getCvDelete () {
  return request.delete('/cv/upload_cv/v1.0.0/')
}
