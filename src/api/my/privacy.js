import request from '@/utils/request'
/**
 * 隐私中心
 * @returns
 */
export function getList (limit, offset) {
  return request.get('/user/hidden-enterprise/', {
    params: {
      limit, offset
    }
  })
}
//

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
  return request.delete('/user/hidden-enterprise/', { data: data })
}

/**
 * 屏蔽所有
 * @param {*} data
 * @returns
 */
export function getListSearch (data) {
  return request.post('/user/enterprise-quick-search/', data)
}
