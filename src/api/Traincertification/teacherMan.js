import requset from '@/utils/Traningrequest.js'

// 教师列表

export function teachList () {
    return requset({
        url: '/cert/teacher_editing/',
        method: 'get'
    })
}

// 教师新增

export function insertTeacher (data) {
    return requset({
        url: '/cert/teacher_editing/',
        method: 'post',
        data: data
    })
}

// 教师删除

export function delTeacher (data) {
    return requset({
        url: '/cert/teacher_editing/',
        method: 'post',
        data: data
    })
}

// 教师详情

export function Teacherdetail (id) {
    return requset({
        url: `/cert/${id}/teacher_details/`,
        method: 'get'
    })
}

// 修改教师头像

export function upteaImg (id, data) {
    return requset({
        url: `/cert/${id}/teacher_photo_uploading/`,
        method: 'POST',
        data: data,
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}

// 修改教师个人信息

export function upteacher (data) {
    return requset({
        url: '/cert/teacher_editing/',
        method: 'post',
        data: data
    })
}
