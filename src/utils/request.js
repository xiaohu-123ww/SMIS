/* eslint-disable no-undef */
import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import router from '@/router'
import store from '@/store'
import { getToken, removeToken, getTokenInvalidFlag, setTokenInvalidFlag } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  // console.log(process.env),
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  baseURL: 'http://1.13.8.165/', // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 600000// request timeout

})
service.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
service.defaults.withCredentials = true
// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    //  (store.getters.token);
    // console.log(getToken())
    if (getToken()) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // config.headers['X-Token'] = getToken()

      config.headers['Authorization'] = getToken()
    }

    return config
  },
  error => {
    // do something with request error
    // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    if (res.code === 2000 || res.code === 0) {
      const tokenInvalidFlag = getTokenInvalidFlag()
      console.log(tokenInvalidFlag)
      if (tokenInvalidFlag === 0 || tokenInvalidFlag === '0' || tokenInvalidFlag === null) {
        setTokenInvalidFlag(1)
        MessageBox.confirm('当前登录已过期 请重新登录', '提示', {
          confirmButtonText: '确定', // 确认按钮的文字显示
          type: 'warning',
          center: true, // 文字居中显示
          showCancelButton: false, // 不显示取消按钮
          showClose: false, // 是否显示右上角的x
          closeOnClickModal: false
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            //  ("500");
            location.reload()
            router.push('/')
            removeToken()
          })
        })
      }
    } else if (res.code === 2001) {
      // console.log('123')
      Message({
        message: res.msg,
        type: 'error',
        duration: 5 * 1000
      })
    } else {
      return res
    }
    // if the custom code is not 20000, it is judged as an error.
    // if (res.code !== 1000 && res.code !== 200 && res.code !== 101 && res.code !== 500) {
    //   //  (res.code);
    //   // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
    //   if (res.code === 0 || res.code === 2000 || res.code === 50011 || res.code === 50012 || res.code === 50014) {
    //     // to re-login
    //     //  ("500");
    //     MessageBox.confirm('当前登录已过期 请重新登录', '提示', {
    //       confirmButtonText: '确认',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }).then(() => {
    //       //  ("501");
    //       store.dispatch('user/resetToken').then(() => {
    //         //  ("500");
    //         location.reload()
    //         router.push('/')
    //         removeToken()
    //       })
    //     })
    //   } else {
    //     Message({
    //       message: res.msg || res.data.msg,
    //       type: 'error',
    //       duration: 5 * 1000
    //     })
    //   }
    //   return res
    //   // return Promise.reject(new Error(res.msg || 'Error'))
    // } else {
    //   return res
    // }
  },
  error => {
    //  (error.message);
    // for debug
    Message({
      message: error.msg,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

service.onerror = function handleError () {
  reject(new Error('Network Error'))
}
export default service
