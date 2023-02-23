
<template>
  <div v-if="sends">
    <el-dialog
      title="微信扫码登录"
      :visible.sync="sends"
      width="35%"
      :before-close="handleClose"
    >
      <div class="flex-box">
        <vue-qr
          :text="imgs"
          :size="200"
          :margin="0"
          style="margin-left: 150px"
        ></vue-qr>
      </div>
      <div
        style="
          width: 100%;
          height: 100%;
          text-align: center;
          margin-top: 50px;
          font-weight: 700;
          fomt-size: 18px;
        "
      >
        扫描二维码并关注公众号，即可开启扫码登录功能
      </div>
    </el-dialog>
    <!-- <div
      style="height: 50px; font-size: 18px; line-height: 50px; margin-top: 20px"
    >
      微信扫码登录
    </div> -->
    <!-- <hr /> -->
  </div>
</template>
<script>
import axios from 'axios'
import QRCode from 'qrcodejs2'
import VueQr from 'vue-qr'
export default {
  components: { VueQr },
  props: {
    sends: {
      type: Boolean,
      default: false
    }

  },
  data () {
    return {
      logoSrc: 'http://weixin.qq.com/q/02IKAvw6god2D1NISP1zcM',
      imgs: '',
      tick: ''
    }
  },
  computed: {

  },
  mounted () {
    // this.creatQrCode() // 创建二维码
  },
  created () {
    this.createQrcode()
    this.num()
  },
  methods: {
    handleClose () {
      this.$emit('weChatClone')
    },
    createQrcode () {
      var th = this
      // console.log('哈哈哈')
      axios.get('http://5eba16ef.r3.cpolar.top/getQrCode').then(function (response) { // 成功回调方法（访问后台成功，后台有数据返回，则进入该方法）
        console.log(response)
        console.log(response.data.url)
        th.imgs = response.data.url
        th.tick = response.data.ticket
        var task = setInterval(function () {
          axios.post(`http://5eba16ef.r3.cpolar.top/checkLogin?ticket=${response.data.ticket}`, function (ok) {
            // 扫码成功登陆成功
            if (ok) {
              clearInterval(task)
              // location.href = '/success'
            }
          })
        }, 2000)
      })
      // .catch(function (error) { // 失败回调方法（访问后台失败，返回失败的信息，则进入该方法）
      //   console.log(error)
      // })
      console.log(this.imgs)
    },
    num () {
      const aa = [1, 2, 3, 4, 5, 6]
      const bb = [5, 3, 2]
      const cc = []
      for (var i = 0; i < aa.length; i++) {
        for (var j = 0; j < bb.length; j++) {
          // console.log(aa[i], bb[j])
          if (aa[i] === bb[j]) {
            cc.push(aa[i])
            console.log(cc)
          }
        }
      }
    }

  }
}

  // 二维码关闭回调
  // qrClose () {
  //   this.$refs.qrBox.innerHTML = ''
  //   clearInterval(this.requestTimer)
  // },
  // // 绑定公众号
  // confirmBind () {
  //   // 二维码URL
  //   getCodeUrl(this.seller_id).then(res => {
  //     this.qrUrl = res.data.url
  //     this.QRVisible = true
  //     this.$nextTick(() => {
  //       this.crateQrcode()
  //     })
  //     // 请求绑定返回（1分钟内）
  //     let time = 60
  //     new Promise((resolve, reject) => {
  //       this.requestTimer = setInterval(() => {
  //         this.seller_id = getSellerId()
  //         if (time > 0) {
  //           time--
  //           getBindResult(this.seller_id)
  //             .then((res) => {
  //               resolve(res)
  //             })
  //             .catch((res) => {
  //               reject(res)
  //             })
  //           // console.log(time)
  //         } else {
  //           clearInterval(this.requestTimer)
  //           this.$notify({
  //             title: '失败',
  //             message: '公众号绑定失败，请重新绑定！',
  //             type: 'error',
  //             duration: 4000
  //           })
  //           this.QRVisible = false
  //           this.authDialog = true
  //         }
  //       }, 6000)
  //     }).then(res => {
  //       if (res.data === true) {
  //         this.$notify({
  //           title: '成功',
  //           message: '公众号绑定成功！',
  //           type: 'success',
  //           duration: 4000
  //         })
  //         this.QRVisible = false
  //         this.authDialog = false
  //         this.getHomeToday()
  //       }
  //     }).catch(res => {
  //       this.$notify({
  //         title: '失败',
  //         message: '公众号绑定失败，请重新绑定！',
  //         type: 'error',
  //         duration: 4000
  //       })
  //       this.QRVisible = false
  //       this.authDialog = true
  //     })
  //   }).catch(() => {
  //     clearInterval(this.requestTimer)
  //   })
  // },
  // crateQrcode () {
  //   const qrcode = new QRCode(this.$refs.qrBox, {
  //     text: this.qrUrl,
  //     width: 120,
  //     height: 120,
  //     colorDark: '#000',
  //     colorLight: '#fff',
  //     correctLevel: QRCode.CorrectLevel.L // 容错率，L/M/H
  //   })
  // }

</script>
<style scoped lang="scss">
::v-deep .el-dialog > .el-dialog__body {
  border-top: 1px solid #e9e9e9;
  border-bottom: 1px solid #e9e9e9;
}
::v-deep .el-dialog__title {
  color: #1657d8;
}
::v-deep .el-dialog {
  display: flex;
  flex-direction: column;
  margin: 0 !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
