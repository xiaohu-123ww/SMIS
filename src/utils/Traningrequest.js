import axios from 'axios';
import { Message, MessageBox } from 'element-ui';
import store from '@/store';
import { getToken } from '@/utils/auth';

// create an axios instance
const service = axios.create({
  baseURL:"https://znzz.tech", // url = base url + request url
  // baseURL: 'https://znzz.tech/.com', // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 100000, // request timeout

});
service.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
service.defaults.withCredentials = true;
// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    //  (store.getters.token);
    if ( getToken()) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // config.headers['X-Token'] = getToken()

      config.headers['Authorization'] = getToken();
    }
    return config;
  },
  error => {
    // do something with request error
    // for debug
    return Promise.reject(error);
  }
);

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
    const res = response.data;
   
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 1000) {
      //  (res.code);
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 0 || res.code === 50011 || res.code === 50012 || res.code === 50014) {
        // to re-login
        //  ("500");
        MessageBox.confirm('当前登录已过期 请重新登录', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //  ("501");
          store.dispatch('user/resetToken').then(() => {
            //  ("500");
            location.reload();
          });
        });
      } else {
        Message({
          message: res.msg || 'Error',
          type: 'error',
          duration: 5 * 1000
        });
      }
      // return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res;
    }
  },
  error => {
    //  (error.message);
    // for debug
    Message({
      message: error.msg,
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;
