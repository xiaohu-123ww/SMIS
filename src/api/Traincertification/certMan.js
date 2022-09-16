
import requset from '@/utils/Traningrequest.js'

// 证书列表

export function certList () {
    return requset({
        url: '/cert/certification_editing/',
        method: 'get'
    })
}

// 证书新增
export function insertCert (data) {
    return requset({
        url: '/cert/certification_editing/',
        method: 'post',
        data: data
    })
}

// 证书删除
export function delCert (data) {
    return requset({
        url: '/cert/certification_editing/',
        method: 'post',
        data: data
    })
}

// 证书修改
export function upCert (data) {
    return requset({
        url: '/cert/certification_editing/',
        method: 'post',
        data: data
    })
}

// 证书详情
export function Certdetail (id) {
    return requset({
        url: `/cert/${id}/certification_detail/`,
        method: 'get'
    })
}

// 证书修改图片
export function upCertImg (id, data) {
    return requset({
        url: `/cert/${id}/certification_sample_uploading/`,
        method: 'POST',
        data: data,
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}

