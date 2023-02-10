<template>
  <button type="primary" @click="handLogin()">微信授权登录</button>
</template>

<script>
import './wwLogin.js'
export default {
  data () {
    '' // 前端获取 code 传给后端调用相应接口
  },
  created () {
    // 从 window.location.href 中截取 code 并且赋值
    if (window.location.href.indexOf('CSDN_state') !== -1) { // 此方法仅供参考！！！
      this.code = window.location.href.split('?')[1].split('=')[1].split('&')[0]
    }

    if (this.code) { // 存在 code 直接调用接口
      this.handGetUserInfo(this.code)
    }
  },
  methods: {
    handLogin () {
      // 重定向地址重定到当前页面，在路径获取 code
      const hrefUrl = window.location.href

      if (this.code === '') {
        window.location.href = `
						https://open.weixin.qq.com/connect/oauth2/authorize
						?appid=appid
						&redirect_uri=${encodeURIComponent(hrefUrl)}
						&response_type=code
						&scope=snsapi_userinfo
						&state=CSDN_state#wechat_redirect
					`
      }
    },
    handGetUserInfo (code) {
      // 调用后端接口，参数为 code 剩下工作量交给后端即可
      wxLogin({
        data: {
          code: code
        },
        method: 'GET'
      }).then(res => {
        // res => 登陆成功！

      })
    }
  }
}
</script>
