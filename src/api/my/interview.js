import request from '@/utils/request'
/**
 * 用户数据
 * @returns
 */
export function getList (limit, offset) {
  return request.get('/user/interviews/all/', {
    params: {
      limit, offset
    }
  })
}

// 待处理
export function getIndisposed (limit, offset) {
  return request.get('/user/interviews/indisposed/',
    {
      params: {
        limit, offset
      }
    })
}
// 已接受
export function getReceived (limit, offset) {
  return request.get('/user/interviews/received/', {
    params: {
      limit, offset
    }
  })
}
// 已拒绝
export function getReject (limit, offset) {
  return request.get('/user/interviews/reject/', {
    params: {
      limit, offset
    }
  })
}
// 已完成
export function getCompleted (limit, offset) {
  return request.get('/user/interviews/completed/', {
    params: {
      limit, offset
    }
  })
}
// 拒绝 接受
export function getResults (data) {
  return request.post('/user/interview-process/', data)
}
