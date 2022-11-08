import request from '@/utils/request'

export function login (data) {
  return request({
    url: '/login/',
    method: 'post',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    data: 'username=' + data.username + '&password=' + data.password
  })
}

/* export function login(data) {
  return request({
    url: '/login/',
    method: 'post',
    data
  })
} */
export function registerUser (item) {
  // console.log(item);
  return request({
    url: '/register/',
    method: 'post',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    data: 'username=' + item.username + '&email=' + item.email + '&password=' + item.password + '&confirm_password=' + item.confirm_password
  })
}

export function getInfo () {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

export function getCarousel () {
  return request({
    url: '/index/',
    method: 'get'
  })
}

// 个人信息
export function getPersonalinfo () {
  return request({
    url: '/user/home/',
    method: 'post'
  })
}

export function logout () {
  return request({
    url: '/logout/',
    method: 'post'
  })
}

// 在线简历页面数据获取

export function getUservitae () {
  return request({
    url: '/user/edit_selfinfo/',
    method: 'get'
  })
}

// 个人简历列表
export function getVitaelist () {
  return request({
    url: '/user/edit_my_cv/',
    method: 'get'
  })
}

// 修改简历列表
export function modCv (data) {
  return request({
    url: '/user/edit_my_cv/',
    method: 'post',
    data
  })
}

// 新增简历列表
export function addCv (data) {
  return request({
    url: '/user/edit_my_cv/',
    method: 'post',
    data
  })
}

// 删除简历列表
export function delCv (data) {
  return request({
    url: '/user/edit_my_cv/',
    method: 'post',
    data
  })
}

// 修改个人信息  /user/edit_selfinfo/
export function editUserdetails (data) {
  return request({
    url: '/user/edit_selfinfo/',
    method: 'post',
    data
  })
}

// 工作经历 /user/edit_experiences/
export function editExperiences (data) {
  return request({
    url: '/user/edit_selfinfo/',
    method: 'post',
    data
  })
}

// 关于我们
export function aboutUser () {
  return request({
    url: '/about-us/',
    method: 'get'
  })
}

// 联系我们 /contact-us/
export function contactWe () {
  return request({
    url: '/contact-us/',
    method: 'get'
  })
}

// 修改密码
export function editPassword (data) {
  return request({
    url: '/user/edit_password/',
    method: 'post',
    data
  })
}
// 培训认证 Training/
export function getTrain () {
  return request({
    url: '/Training/',
    method: 'get'
  })
}
// 发送验证码
export function sendCapte (data) {
  return request({
    url: '/login_mobile/',
    method: 'post',
    data: data
  })
}

// 验证码登录
export function Captelogin (data) {
  return request({
    url: '/login_mobile/',
    method: 'post',
    data: data
  })
}
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

// 用户信息
export function personal () {
  return request.get('/user/navigation/')
}
// 个人信息

export function getMessage () {
  return request.get('/user/self-information/')
}

// 刷新状态
export function getStates () {
  return request.get('/utils/online_status/v1.0.0/')
}
