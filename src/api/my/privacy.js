import request from '@/utils/request'
/**
 * 隐私中心
 * @returns
 */
export function getList () {
  return request.get('/user/hidden-enterprise/')
}
// /user/enterprise-quick-search/?qw=科技

export function getEnterpriseQuick (qw, limit, offset) {
  return request.get(`/user/enterprise-quick-search/?`, {
    params: {
      qw,
      limit,
      offset
    }
  })
}

export function getListHidden (data) {
  return request.post('/user/hidden-enterprise/', data)
}

export function getListDelete (data) {
  return request.delete('/user/hidden-enterprise/', data)
}
