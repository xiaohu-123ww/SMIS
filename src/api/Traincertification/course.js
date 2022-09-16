import requset from '@/utils/Traningrequest.js'

// 课程列表

export function courseList () {
    return requset({
        url: '/cert/course_editing/',
        method: 'get'
    })
}

// 课程新增
export function insertCourse (data) {
    return requset({
        url: '/cert/course_editing/',
        method: 'post',
        data: data
    })
}

// 课程删除
export function delCourse (data) {
    return requset({
        url: '/cert/course_editing/',
        method: 'post',
        data: data
    })
}

// 课程修改
export function upCourse (data) {
    return requset({
        url: '/cert/course_editing/',
        method: 'post',
        data: data
    })
}

// 课程详情
export function Curosedetail (id) {
    return requset({
        url: `/cert/${id}/course_detail/`,
        method: 'get'
    })
}

// 课程修改图片
export function upCourseImg (id, data) {
    return requset({
        url: `/cert/${id}/course_ads_picture_uploading/`,
        method: 'POST',
        data: data,
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}

