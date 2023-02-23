import request from '@/utils/request'

// 获取二维码
export function wxLogin () {
  return request.get('/get-ticket/')
}

// 是否扫码
export function wxTicket (login_scene) {
  return request.get(`/get-openid/`, {
    params: {
      login_scene
    }
  })
}

// 未绑定手机号绑定手机
export function getpassword (data) {
  return request.post('/login_mobile/', data)
}
// 注册手机号登录  https://znzz.tech/wx-QR=login/

export function getLogin (data) {
  return request.post('/wx-QR=login/', data)
}
