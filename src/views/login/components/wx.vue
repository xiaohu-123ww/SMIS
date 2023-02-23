<template>
  <div v-if="wxState" class="wx_login">
    <el-form ref="rf" :model="ruleForm" :rules="rules" label-width="25px">
      <el-form-item prop="mobile" style="border: 0">
        <!-- <span class="svg-container">
          <svg-icon icon-class="user" />
        </span> -->
        <div style="display: flex" class="elInput">
          <div class="elInput-photo">+86</div>
          <el-input
            ref="mobile"
            v-model="ruleForm.mobile"
            autocomplete="on"
            name="username"
            placeholder="请输入您的手机号"
            tabindex="1"
            type="text"
          />
        </div>
      </el-form-item>
      <el-form-item style="background: none" prop="code">
        <!-- <el-row>
          <el-col
            :span="18"
            style="
              width: 100%;
              position: relative;
              height: 100%;
              border: 1px solid rgba(255, 255, 255, 0.1);

              border-radius: 20px;
            "
            > -->
        <div class="elInput" style="display: flex">
          <el-input
            ref="code"
            v-model="ruleForm.code"
            type="text"
            placeholder="请输入验证码"
          />
          <!-- <p class="sendCode" :disabled="isclick" @click="sendCapte">
              {{ sendineer }}
            </p> -->
          <div>
            <el-button
              :class="{ 'disabled-style': getCodeBtnDisable }"
              :disabled="getCodeBtnDisable"
              style="margin-left: 10px"
              type="primary"
              @click="getCode"
              >{{ codeBtnWord }}</el-button
            >
          </div>
        </div>

        <!-- </el-form-item> -->
        <!-- </el-col>
          <el-col :span="5">
            <el-button ></el-button>
          </el-col>
        </el-row> -->
      </el-form-item>
      <el-form-item prop="radio">
        <el-checkbox-group v-model="ruleForm.radio">
          <el-checkbox label="1" name="type"
            >我已同意<span style="color: rgb(37, 110, 253)"
              >《###使用协议》</span
            >和
            <span style="color: rgb(37, 110, 253)"
              >《用户隐私协议》</span
            ></el-checkbox
          >
        </el-checkbox-group>
      </el-form-item>
      <div class="login-btn">
        <el-button
          round
          style="
            width: 100%;
            background-color: rgb(37, 110, 253);
            color: rgb(255, 255, 255);
          "
          type="primary"
          @click.native.prevent="Sign"
          >立即注册
        </el-button>
        <div
          style="
            width: 100%;

            text-align: center;
            margin: 30px 0px 50px 0px;
            font-size: 15px;
          "
        >
          <a href="javascript:;" @click="backLogin">返回登录>></a>
        </div>
        <!-- <el-button
          round
          style="
            width: 100%;
            color: #191919;
            background-color: #ffffff;
            border: none;
          "
          type="info"
          @click.native.prevent="backLogin"
          >返回登录>>
        </el-button> -->
      </div>
    </el-form>
  </div>
</template>
<script>
import { getverification, getphoto } from '@/api/my/resume'
import { string } from 'clipboard'

export default {
  props: {
    wxState: {
      type: Boolean
    }

  },
  data () {
    const checkPhone = (rule, value, callback) => {
      const reg = /^1[3456789]\d{9}$/
      if (!reg.test(value)) {
        callback(new Error('请输入11位手机号'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        mobile: '',
        code: '',
        radio: ''

      },
      mobile: '',

      rules: {
        mobile: [
          { required: true, type: 'number', validator: checkPhone, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
          { max: 4, message: '验证码必须是4个字符' }
        ],
        radio: [
          { required: true, message: '请勾选后注册', trigger: 'change' }
        ]
      },
      codeBtnWord: '获取验证码', // 获取验证码按钮文字
      waitTime: 61 // 获取验证码按钮失效时间

    }
  },
  computed: {

    // 用于校验手机号码格式是否正确
    phoneNumberStyle () {
      const reg = /^1[3456789]\d{9}$/
      if (!reg.test(this.ruleForm.mobile)) {
        return false
      }
      return true
    },

    // 控制获取验证码按钮是否可点击
    getCodeBtnDisable: {
      get () {
        if (this.waitTime == 61) {
          if (this.phoneNumberStyle) {
            if (this.ruleForm.mobile) {
              return false
            }
          }

          return true
        }
        return true
      },
      // 注意：因为计算属性本身没有set方法，不支持在方法中进行修改，而下面我要进行这个操作，所以需要手动添加
      set () { }

    }

  },
  watch: {

  },

  mounted () {

  },
  methods: {
    // 取消
    backLogin () {
      this.$refs.rf.clearValidate()
      this.$emit('wxReset')
      // this.$emit('reset1', false)
      // this.ruleForm.code = ''
      // this.ruleForm.mobile = ''
    },
    // 确定
    Sign () {
      this.$refs.rf.validate(async (vaild) => {
        if (vaild) {
          console.log(this.ruleForm)
          // const res = await getphoto(this.ruleForm)
          // console.log('手机号', res)
          // if (res.code === 200) {
          //   this.$message.success('绑定成功')
          //   this.$emit('reset', false, this.ruleForm.mobile)

          //   this.ruleForm.code = ''
          //   this.ruleForm.mobile = ''
          // } else {
          //   this.$message.error(res.data.msg)
          // }
        }
      })
    },
    // 验证码
    async getCode () {
      if (this.ruleForm.mobile) {
        this.mobile = this.ruleForm.mobile

        const res = await getverification(this.mobile)

        if (res.code == 200) {
          this.$message({
            message: '验证码已发送，请稍候...',
            type: 'success',
            center: true
          })
        }

        // 因为下面用到了定时器，需要保存this指向
        const that = this
        that.waitTime--
        that.getCodeBtnDisable = true
        this.codeBtnWord = `${this.waitTime}s 后重新获取`
        const timer = setInterval(function () {
          if (that.waitTime > 1) {
            that.waitTime--
            that.codeBtnWord = `${that.waitTime}s 后重新获取`
          } else {
            clearInterval(timer)
            that.codeBtnWord = '获取验证码'
            that.getCodeBtnDisable = false
            that.waitTime = 61
          }
        }, 1000)
      }
    }
  }
}
</script>
<style scoped lang="scss">
.wx_login {
  //  position: relative;
  min-width: 430px;
  /*max-width: 25%;*/
  width: calc(25vw);
  height: calc(50vh);
  min-height: 410px;
  padding: 90px 35px 0;
  margin: 0 auto;
  overflow: hidden;
  background-color: #ffffff;
  border-radius: 40px;
}
::v-deep .elInput[data-v-37dfd6fc] {
  width: 310px;
  height: 40px;
  border: 1px solid #dcdfe6;
  border-radius: 5px;
}
.el-button.disabled-style {
  background-color: #eeeeee;
  color: #cccccc;
}
::v-deep .el-button.disabled-style[data-v-37dfd6fc] {
  background-color: #f6f6f8;
  // color: #0f0f10;
  border: 0;
}
::v-deep .el-button--primary {
  color: #fff;
  background-color: #1890ff;
  // border-color: #f2f4f7;
}
::v-deep form.el-form.login-form.el-form--label-left {
  height: 100%;
}
::v-deep element.style {
  // background-color: #fff;
}
::v-deep .el-form-item__error {
  // color: #ad2a2a;
  /* font-size: 12px; */
  line-height: 1;
  padding-top: 4px;
  position: absolute;
  top: 80%;
  // left: 15%;
}

::v-deep .el-form-item__content {
  height: 100%;
  display: flex;
  // margin-left: 25px;
}
.elInput {
  width: 310px;
  height: 40px;
  border: 1px solid rgb(220, 223, 230);
  border-radius: 5px;
  .elInput-photo {
    width: 50px;
    height: 26px;
    // background-color: pink;
    margin-top: 8px;
    border-right: 1px solid rgb(220, 223, 230);
    text-align: center;
    font-size: 16px;
    line-height: 26px;
  }
}
::v-deep input.el-input__inner {
  // border: 0;
}
.el-input__inner {
  height: 35px !important;
}
::v-deep input.el-input__inner {
  height: 38px;
}
::v-deep .el-input__icon {
  height: 45px;
}
.passw {
  // background-color: pink;
  padding-left: 245px;
  font-size: 13px;
  color: #d09d8a;
  line-height: 5px;
  margin-top: 15px;
}
.register {
  // background-color: pink;
  text-align: center;
  margin-top: 30px;
  font-size: 14.5px;
  color: #999;
}
::v-deep input.el-input__inner {
  border: 0;
}
// .el-button.disabled-style {
//   background-color: #eeeeee;
//   color: #cccccc;
// }
::v-deep button.el-button.el-button--primary.is-disabled.disabled-style {
  border: 0;
  border-radius: 0;
  border-left: 1px solid rgb(220, 223, 230);
}
::v-deep input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0px 1000px white inset;
}
.login-container .el-form-item {
  height: 50px;
  width: 100%;
}

::v-deep element.style {
  margin-left: 25px;
}
</style>
