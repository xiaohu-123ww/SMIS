
<template>
  <div v-if="sends">
    <el-dialog
      title="微信扫码登录"
      :visible.sync="sends"
      width="35%"
      :before-close="handleClose"
    >
      <div class="flex-box">
        <img :src="tick" alt="" style="width: 300px" />
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
import { numberFormatter } from '@/filters'
import { wxLogin, wxTicket, getLogin } from '@/api/wx'
import { getToken, removeToken, setToken } from '@/utils/auth'
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
      wx: {},
      tick: '',
      list: {
        code: null
      }
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
    async createQrcode () {
      const { data } = await wxLogin()
      console.log('微信二维码', data.data)
      this.wx = data.data
      this.tick = `https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=${data.data.ticket}`
      var task = setInterval(async () => {
        const { data } = await wxTicket(this.wx.login_scene)
        console.log('是否登录', data)
        // this.list = data

        if (data.openid !== '' && data.phone !== null) {
          this.list.phone = data.phone
          this.list.openid = data.openid

          const res = await getLogin(this.list)

          // console.log('data1', data1)
          console.log('扫码了', this.list, res)
          if (res.code === 1000) {
            setToken(res.skey)
            this.$router.push('/userdash')
            clearInterval(task)
          } else {
            this.$message.success(res.data.msg)
          }
        } else if (data.openid !== '' && data.phone === null) {
          console.log('1233')
          this.$emit('getPhoto', data.openid)
          this.$message.success('扫码成功，绑定下手机号吧')
          clearInterval(task)
        }
      }, 1000)
    },
    async initMap () {
      console.log(121324)
      // if (this.list.phone === null || this.phone === '') {
      //   console.log(123)
      //   this.$emit('getPhoto', data.openid)
      //   this.$message.success('扫码成功，绑定下手机号吧')
      // }
      // clearInterval(task)
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

</script>
<style scoped lang="scss">
.flex-box {
  // background-color: pink;
  padding: 0px 100px;
}
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
