<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      autocomplete="on"
      class="login-form"
      label-position="left"
      :rules="rules"
    >
      <div class="title-container">
        <div class="registers">立即注册</div>
        <!-- <img
          alt=""
          src="../../assets/images/logo.png"
          style="width: 230px; height: 70px"
        /> -->
      </div>

      <el-form-item prop="mobile">
        <!-- <span class="svg-container">
          <svg-icon icon-class="user" />
        </span> -->
        <el-input
          v-model="loginForm.mobile"
          autocomplete="on"
          class="elInput"
          name="username"
          placeholder="请输入您的手机号"
          tabindex="1"
          type="text"
        />
      </el-form-item>
      <el-form-item prop="code">
        <!-- <el-row>
          <el-col :span="1">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
          </el-col>
          <el-col :span="13"> -->
        <div class="elInput" style="display: flex">
          <el-input
            v-model="loginForm.code"
            type="text"
            placeholder="请输入验证码"
          />
          <!-- </el-col>
          <el-col :span="5"> -->
          <!-- <el-button :disabled="isclick" @click="sendCapte">{{
              sendineer
            }}</el-button> -->
          <el-button
            :class="{ 'disabled-style': getCodeBtnDisable }"
            :disabled="getCodeBtnDisable"
            type="primary"
            @click="Code()"
            >{{ codeBtnWord }}</el-button
          >
        </div>
        <!-- </el-col>
        </el-row> -->
      </el-form-item>
      <el-tooltip
        v-model="capsTooltip"
        content="Caps lock is On"
        manual
        placement="right"
      >
        <el-form-item prop="password">
          <!-- <span class="svg-container">
            <svg-icon icon-class="password" />
          </span> -->

          <el-input
            :key="passwordType"
            v-model="loginForm.password"
            :type="passwordType"
            autocomplete="off"
            name="password"
            placeholder="请输入密码"
            tabindex="2"
            class="elInput"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon
              :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
            />
          </span>
        </el-form-item>
      </el-tooltip>
      <el-form-item prop="radio">
        <el-checkbox-group v-model="loginForm.radio">
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

      <!-- <el-tooltip
        v-model="capsTooltip"
        content="Caps lock is On"
        manual
        placement="right"
      >
        <el-form-item prop="password" style="background-color: #f6f6f8">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="checkPassType"
            ref="checkPass"
            v-model="loginForm.confirm_password"
            :type="checkPassType"
            autocomplete="off"
            name="checkPass"
            placeholder="请重复输入密码"
            tabindex="2"
            @blur="capsTooltip = false"
            @keyup.native="checkCapslock"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwds">
            <svg-icon
              :icon-class="checkPassType === 'password' ? 'eye' : 'eye-open'"
            />
          </span>
        </el-form-item>
      </el-tooltip> -->
      <!-- <el-tooltip
        v-model="capsTooltip"
        content="Caps lock is On"
        manual
        placement="right"
      >
        <el-form-item
          :rules="[
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            {
              type: 'email',
              message: '请输入正确的邮箱地址',
              trigger: ['blur', 'change']
            }
          ]"
          prop="email"
        >
          <span class="svg-container">
            <svg-icon icon-class="email" />
          </span>
          <el-input v-model="loginForm.email" placeholder="请输入邮箱" /> -->
      <!-- <span class="show-pwd" >
              <svg-icon
                :icon-class="checkPassType"
              />
            </span> -->
      <!-- </el-form-item>
      </el-tooltip> -->
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
          >注册
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

    <!-- <el-dialog title="Or connect with" :visible.sync="showDialog">
      Can not be simulated on local, so please combine you own business
      simulation! ! !
      <br />
      <br />
      <br />
      <social-sign />
    </el-dialog> -->
  </div>
</template>

<script>
import { sendCapte, skip, sendCapteLogin } from '@/api/user'

export default {
  name: 'Register',
  data () {
    const validateUsername = (rule, value, callback) => {
      if (!/^1[3-9]\d{9}$/.test(value)) {
        callback(new Error('请输入合法的手机号'))
      } else {
        callback()
      }
    }
    const validPassword = (rule, value, callback) => {
      const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
      if (!reg.test(value)) {
        callback(new Error('密码必须是由8-16位字母+数字组合'))
      } else {
        callback()
      }
    }
    return {
      emailicon: 'email',
      loginForm: {
        mobile: '',
        password: '',
        confirm_password: '',
        email: '',
        code: '',
        radio: []
      },
      passwordType: 'password',
      checkPassType: 'password',
      capsTooltip: false,
      codeBtnWord: '获取验证码', // 获取验证码按钮文字
      waitTime: 61, // 获取验证码按钮失效时间
      rules: {
        mobile: [{ required: true, trigger: 'blur', validator: validateUsername }],
        code: [
          { required: true, trigger: 'blur', message: '验证码不能为空' },
          { max: 4, message: '长度4字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validPassword, trigger: 'blur' }
        ],
        radio: [
          { required: true, message: '请勾选后注册', trigger: 'change' }
        ]
      }
    }
  },
  computed: {

    // 用于校验手机号码格式是否正确
    phoneNumberStyle () {
      const reg = /^1[3456789]\d{9}$/
      if (!reg.test(this.loginForm.mobile)) {
        return false
      }
      return true
    },
    // 控制获取验证码按钮是否可点击
    getCodeBtnDisable: {
      get () {
        if (this.waitTime == 61) {
          if (this.phoneNumberStyle) {
            if (this.loginForm.mobile) {
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
  mounted () {
  },
  methods: {
    // 注册
    Code () {
      if (this.loginForm.mobile) {
        sendCapte({ type: '1', mobile: this.loginForm.mobile }).then(
          (res) => {
            console.log(res)
            if (res.code === 1000) {
              this.$message({
                type: 'success',
                message: res.msg
              })
            }
          }
        )

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
    },
    // checkCapslock (e) {
    //   const { key } = e
    //   this.capsTooltip = key && key.length === 1 && key >= 'A' && key <= 'Z'
    // },
    showPwd () {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      // this.$nextTick(() => {
      //   this.$refs.password.focus()
      // })
    },
    // showPwds () {
    //   if (this.checkPassType === 'password') {
    //     this.checkPassType = ''
    //   } else {
    //     this.checkPassType = 'password'
    //   }
    //   this.$nextTick(() => {
    //     this.$refs.checkPass.focus()
    //   })
    // },
    Sign () {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          const res = skip(this.loginForm.mobile)
          console.log('res12', res)
          // if (res.code === 200) {
          this.loginForm.mobile = Number(this.loginForm.mobile)
          this.loginForm.code = Number(this.loginForm.code)
          const res1 = await sendCapteLogin(this.loginForm)
          console.log('注册', res1)
          // this.$message.success(res1.data.msg)
          if (res1.code === 200) {
            this.$router.push('/login')
          } else {
            this.$message.success(res1.data.msg)
          }
          // if (res.code === 200) {
          //   setToken(res.data.data)
          //   this.registerShow = false
          //   this.show = true
          //   // this.retrievePassword = false
          //   this.flagShow = false
          //   // this.$router.push('/register')
          //   // this.show = true
          //   // eslint-disable-next-line object-curly-spacing
          //   // this.$router.push({ name: 'register', params: { number: res.data.number } })
          // } else {
          //   this.$message.error(res.data.msg)
          // }
          // this.$router.push('/register')
          // }
        }
        // registerUser({
        //   username: this.loginForm.username,
        //   email: this.loginForm.email,
        //   password: this.loginForm.password,
        //   confirm_password: this.loginForm.confirm_password
        // }).then(rs => {
        //   // console.log(rs)
        //   this.$message({
        //     message: rs.msg,
        //     type: 'success'
        //   })
        //   this.$router.push('/login')
        // })
        // } else {
        //   //  ('error submit!!')
        //   return false
        // }
      })
    },
    backLogin () {
      this.$router.push('/login')
    }
  }
};
</script>

<style lang="scss" scoped>
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: transparent;
$light_gray: #101010;
$cursor: #101010;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;

  .el-input {
    display: inline-block;
    // height: 100%;
    // width: 85%;
    // text-align: justify;
    // text-align-last: justify;

    // input {
    //   background: transparent;
    //   border: 0px;
    //   -webkit-appearance: none;
    //   border-radius: 0px;
    //   padding: 12px 5px 12px 15px;
    //   /*<!--color: $light_gray;-->*/
    //   color: #808080;
    //   height: 100%;
    //   caret-color: $cursor;

    //   &:-webkit-autofill {
    //     // box-shadow: 0 0 0px 1000px $bg inset !important;
    //     // -webkit-text-fill-color: $cursor !important;
    //     -webkit-text-fill-color: #808090 !important;
    //     -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
    //     background-color: transparent;
    //     background-image: none;
    //     transition: background-color 50000s ease-in-out 0s;
    //   }
    // }
  }

  // .el-form-item {
  //   height: 10%;
  //   width: 100%;
  //   border: 1px solid rgba(255, 255, 255, 0.1);
  //   background: #f6f6f8;
  //   border-radius: 26px;
  //   color: #454545;
  // }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  background-image: url('../../assets/images/logoback.png');
  background-position: center 0;
  background-size: cover;
  -webkit-background-size: cover;
  overflow: hidden;

  .login-form {
    /*max-height: 650px;*/
    position: relative;
    min-width: 410px;
    /*max-width: 25%;*/
    width: calc(25vw);
    // height: calc(75vh);
    // min-height: 500px;
    padding: 0px 50px 0;
    margin: 0 auto;
    overflow: hidden;
    background-color: #ffffff;
    border-radius: 40px;

    .login-btn {
      width: 100%;
      margin: 0 auto;
      position: relative;
      height: 30%;
      padding-top: 20px;

      button:nth-child(2) {
        position: absolute;
        right: 0;
        top: 40%;
      }

      button:nth-child(3) {
        position: absolute;
        right: 0;
        top: 100%;
      }
    }
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;
    height: 15%;
    padding-top: 20px;
    text-align: center;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
// ::v-deep input.el-input__inner {
//   border: none !important;
//   box-shadow: none !important;

//   padding: 15px;
//   background-color: #f6f6f6;
// }
// ::v-deep input.el-input__inner {
//   border-radius: 100px;
//   // margin-top: 3px;
// }
::v-deep .el-button.disabled-style[data-v-37dfd6fc] {
  background-color: #f6f6f8;
  color: #0f0f10;
  border: 0;
}
::v-deep .el-button--primary {
  color: #fff;
  background-color: #1890ff;
}
.el-button.disabled-style {
  background-color: #eeeeee;
  color: #cccccc;
}
::v-deep .el-button--primary.is-disabled,
.el-button--primary.is-disabled:hover,
.el-button--primary.is-disabled:focus,
.el-button--primary.is-disabled:active {
  color: #272525;
  background-color: #f6f6f6;
  border-color: #f6f6f6;
}
// .el-button.disabled-style {
//   background-color: #eeeeee;
//   color: #cccccc;
// }
::v-deep .el-input {
  // margin-left: 10px;
}
.registers {
  width: 100%;
  // height: 20px;
  text-align: center;
  font-size: 20px;
  margin: 30px 0px;
}
// ::v-deep .el-form-item__content {
//   height: 100%;
//   display: flex;
// }
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
// ::v-deep .el-input__icon {
//   height: 45px;
// }
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
::v-deep .elInput.el-input {
  height: 40px;
}
.login-container .el-form-item {
  height: 48px;
  width: 100%;
}
</style>
