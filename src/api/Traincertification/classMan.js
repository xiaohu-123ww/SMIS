
import requset from '@/utils/Traningrequest.js'

// 班级列表

export function classList () {
    return requset({
        url: `/cert/class_editing/`,
        method: 'get'
    })
}

// 班级新增
export function insertCla (data) {
    return requset({
        url: '/cert/class_editing/',
        method: 'post',
        data: data
    })
}

// 关闭班级
export function closeClass (data) {
    return requset({
        url: '/cert/class_editing/',
        method: 'post',
        data: data
    })
}
// 撤销班级
export function revokeClass (data) {
    return requset({
        url: '/cert/class_editing/',
        method: 'post',
        data: data
    })
}
// 班级删除
export function delClass (data) {
    return requset({
        url: '/cert/class_editing/',
        method: 'post',
        data: data
    })
}

// 班级修改
export function classUp (data) {
    return requset({
        url: '/cert/class_editing/',
        method: 'post',
        data: data
    })
}

// 班级详情
export function Classdetail (id) {
    return requset({
        url: `/cert/${id}/class_details/`,
        method: 'get'
    })
}

// 新增关联教师

export function insertTea (id, data) {
    return requset({
        url: `/cert/${id}/class_details/`,
        method: 'post',
        data: data
    })
}

// 删除关联教师

export function delTea (id, data) {
    return requset({
        url: `/cert/${id}/class_details/`,
        method: 'post',
        data: data
    })
}
// 新增证书与课程
export function InsertCertCourse (id, data) {
    return requset({
        url: `/cert/${id}/class_details/`,
        method: 'post',
        data: data
    })
}

// 修改证书与课程
export function updateCertCourse (id, data) {
    return requset({
        url: `/cert/${id}/class_details/`,
        method: 'post',
        data: data
    })
}

// 获取考试列表

export function binding_exam () {
    return requset({
        url: `/cert/binding_exam/`,
        method: 'post',
        data: {
            search_content: '' // 查询内容，可以为空
        }
    })
}
// 修改新增 考试

export function updateExam (id, data) {
    return requset({
        url: `/cert/${id}/class_details/`,
        method: 'post',
        data: data
    })
}

// StudentList,
//   delClassStu,
//   ,
//   ,
//   ,

// 学员列表

export function StudentList (id) {
    return requset({
        url: `/cert/${id}/students_management/`,
        method: 'get'
    })
}

// 删除学员
export function delClassStu (id, data) {
    return requset({
        url: `/cert/${id}/students_management/`,
        method: 'post',
        data: data
    })
}

// 考试进度更新
export function Examtoupdate (data) {
    return requset({
        url: `/cert/student_exam_update/`,
        method: 'post',
        data: data
    })
}
// 证书发放资格审查
export function certSelected (id) {
    return requset({
        url: `/cert/${id}/check_issuing_qualification/`,
        method: 'get'
    })
}
// 线上课学时更新

export function Classhourstoupdate (id, data) {
    return requset({
        url: `/cert/${id}/update_online_study_record_by_hand/`,
        method: 'post',
        data: data
    })
}
