import request from '@/utils/request'

export function serchs () {
  return request({
    url: '/index/',
    method: 'get'
  })
}
