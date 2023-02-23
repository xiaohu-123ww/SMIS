<template>
  <div v-show="sends" class="wx_dialog_toiast">
    <!-- 承载二维码容器 -->
    <div id="login_container" class="wx_dialog_toiast_delltet"></div>
    <div class="wx_dialog_button_delete">
      <i class="el-icon-circle-close" style="color: red; font-size: 70px"></i>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    sends: {
      type: Boolean,
      default: false
    }

  },
  data () {
    return {
      Wechat_authorized_login: false
    }
  },
  created () {
    // this.Get_wechat_callback_information()
  },
  mounted () {
    this.get_wx_qrcode() // 获取微信的登录二维码
  },
  methods: {
    get_wx_qrcode () {
      // 从微信的开发文档不难看出回调域名需要经过encodeURIComponent处理
      // 微信的开发文档不难看出回调域名需要经过encodeURIComponent处理
      const call_back_domain_name = window.location.href
      const domain_name_length = call_back_domain_name.indexOf('#') - 1
      const DDNS = call_back_domain_name.substring(0, domain_name_length)
      const DDNS_resolution = encodeURIComponent(DDNS)
      var obj = new WxLogin({
        self_redirect: false,
        id: 'login_container', // 需要承载二维码的容器id
        appid: 'wx795be91b97e81d8c',
        scope: 'snsapi_login', // 网页授权，目前网页只有这一种方式，静默授权
        redirect_uri: DDNS_resolution, // 回调域名
        state: Math.random(),
        style: 'white',
        href: ''
      })
    },
    // 获取微信回调信息并且绑定账号
    Get_wechat_callback_information () {
      let Wechat_return_code = window.location.href
      // 获取微信回调的code
      const wx_parseUrl = qs.parse(Wechat_return_code.split('?')[1])
      // 因为这里的需求绑定账号时需要发送验证码，所以暂存本地
      const wx_code_url = localStorage.getItem('QRCODEWX')
      const analysis_wx_code_url = JSON.parse(wx_code_url)
      // 当有验证码并且微信回调了code的时候再去做绑定操作。
      if (wx_parseUrl.code && wx_code_url != null) {
        const parse_bind_params = {
          code: wx_parseUrl.code,
          codeUuid: analysis_wx_code_url.codeUuid,
          codeValue: analysis_wx_code_url.codeValue,
          phone: analysis_wx_code_url.phone
        }
        withdrawAccountBinding(parse_bind_params).then((response) => {
          this.$message({
            message: response.msg,
            type: 'success',
            center: true,
            duration: '2000'
          })
          // 绑定成功之后需要删除之前存储的验证码和验证uuid.这样方便在导航守卫里边做操作
          localStorage.removeItem('QRCODEWX')
          // 当你绑定成功之后需要删除url后边的微信回调的code，如果不做处理那就在路由守卫里边一直进入这个页面，然后陷入无限的死循环。
          if (Wechat_return_code.indexOf('?') != -1) {
            Wechat_return_code = Wechat_return_code.replace(/(\?|#)[^'"]*/, '')
            window.history.pushState({}, 0, Wechat_return_code)
          }
          // 删除之后再次更新路由地址，以确保路由地址没有code。保证不会进入死循环
          this.$router.replace({
            path: '/agentManger/agentMoneyList'
          })
          this.is_show_withdraw_function() // 是否显示资金余额与提现账号
          this.Obtain_withdrawal_account_number() // 首先获取提现账号的所有信息
        })
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.wx_dialog_toiast {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 9854647;
  background: rgba($color: #000000, $alpha: 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  .wx_dialog_toiast_delltet {
    width: 500px;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .wx_dialog_button_delete {
    position: absolute;
    right: 0px;
    top: 0px;
    height: 100px;
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
