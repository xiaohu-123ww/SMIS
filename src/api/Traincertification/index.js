import request from '@/utils/Traningrequest';

// 培训认证判断用户是否为管理员还是用户
export function ismanager(){
    return request({
        url:'/cert/index_frontend/',
        method:'get'
    })
}