// import { param } from '@/utils';
import request from '@/utils/request'

// 获取列表
export function jobList () {
  return request({
    url: '/enterprise/positions',
    method: 'get'
  })
}

// 岗位搜索推荐
export function cvJob () {
  return request({
    url: '/user/search_positions/',
    method: 'get'
  })
}

// 岗位搜索
export function jobSearch (name) {
  //  (name);
  return request({
    url: '/user/search_positions/?q=' + name,
    method: 'post'
  })
}

// 求职列表
export function sendList () {
  //  (name);
  return request({
    url: '/user/my-applications/',
    method: 'get'
    // params:{
    //   type:"101",
    //   id:"30"
    // }
  })
}

// 企业驳回求职
export function repList (data) {
  //  (name);
  return request({
    url: '/user/my-applications/',
    method: 'post',
    data
    // params:{
    //   type:"101",
    //   id:"30"
    // }
  })
}

export function jobDetail (id) {
  //  (name);
  return request({
    url: `/user/position_details/${id}/`,
    method: 'get'
  })
}

export function postJob (id, data) {
  //  (name);
  return request({
    url: `/user/position_details/${id}/`,
    method: 'post',
    data
  })
}
