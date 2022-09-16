import request from '@/utils/Traningrequest'

// 培训认证判断用户是否为管理员还是用户
export function Clientindex () {
    return request({
        url: '/cert/index_frontend/',
        method: 'get'
    })
}

// 判断用户是否为学员  已经登陆平台的用户为平台用户；
// 平台用户不一定为学员，需进入培训认证页面并完成“注册为学员”步骤才会被认为是学员。
// 用户不一定是学员，但学员一定是用户。
// 首先根据查询用户详细信息判断是否为学员 再去判断是否绑定小鹅通

export function ClientMydetail () {
    return request({
        url: '/cert/my_details/',
        method: 'get'
    })
}

// 平台用户注册为学员

export function userRestudent (data) {
    return request({
        url: '/cert/register_to_student/',
        method: 'post',
        data: data
    })
}

// 用户是否绑定店铺

export function onclick () {
    return request({
        url: '/cert/binding_xet_account/',
        method: 'get'
    })
}

// 学员报名班级

export function signupClass (id, data) {
    return request({
        url: `/cert/${id}/class_details/`,
        method: 'post',
        data: data
    })
}

// 学员取消报名
export function quxiaoClass (id, data) {
    return request({
        url: `/cert/${id}/class_details/`,
        method: 'post',
        data: data
    })
}

// 客服咨询

export function custservice (data) {
    return request({
        url: `/cert/consultation/`,
        method: 'post',
        data: data
    })
}
