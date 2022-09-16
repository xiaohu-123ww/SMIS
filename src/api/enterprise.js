import request from '@/utils/request'

// 获取企业信息
export function enterpriseInfo() {
  return request({
    url: '/enterprise/enterprise-info/',
    method: 'get'
  })
}

// 修改企业信息
export function updateInfo(data) {
  return request({
    url: '/enterprise/enterprise-info/',
    method: 'post',
    data
  })
}

// 企业端首页/enterprise/index/
export function enterprisePage() {
  return request({
    url: '/enterprise/index/',
    method: 'get'
  })
}

// 获取企业岗位 /enterprise/positions/
export function postList() {
  return request({
    url: '/enterprise/positions/',
    method: 'get'
  })
}

// 编辑岗位和招聘 /enterprise/positions/
export function changePost(data) {
  return request({
    url: '/enterprise/positions/',
    method: 'post',
    data
  })
}

// 人才管理 /enterprise/hr/
export function enterpriseHr() {
  return request({
    url: '/enterprise/hr/',
    method: 'get'
  })
}

// 人才管理 退回/申请 /enterprise/hr/
export function resumeHr(data) {
  return request({
    url: '/enterprise/hr/',
    method: 'post',
    data
  })
}

// 人才广场
export function Foundthattalent() {
  return request({
    url: '/enterprise/finding/',
    method: 'get'
  })
}

// 人才搜索
export function searchFoundtalent(data) {
  return request({
    url: '/cv/search_cv_page/',
    method: 'post',
    data
  })
}

// 人才邀请
export function inviteFind(data) {
  return request({
    url: '/enterprise/finding/',
    method: 'post',
    data
  })
}
