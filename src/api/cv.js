import request from '@/utils/request'

// 获取列表
export function getCv (userid, cvid) {
  //  ('/cv/' + userid / +cvid / +'show-cv/')
  // /cv/8/9/show-cv/
  return request({
    url: `/cv/${userid}/${cvid}/show-cv/`,
    method: 'post'
  })
}

//  下载简历  /cv/<int:user_id>/<int:cv_id>/download-cv/
export function downCv (userid, cvid) {
  return request({
    url: `/cv/${userid}/${cvid}/download-cv/`,
    method: 'get',
    responseType: 'multipart/form-data'
  })
}
