<template>
  <div class="login-container">
    <el-form
      v-show="isuser == true"
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      autocomplete="on"
      class="login-form"
      label-position="left"
    >
      <div class="title-container">
        <!-- <img
          alt=""
          src="../../assets/images/logo.png"
          style="width: 230px; height: 70px; margin: 0 auto"
        /> -->
      </div>
      <div class="Qiehuan" style="margin-bottom: 20px">
        <p :class="isuser == true ? 'active' : ''" @click="user">账号登录</p>
        <p :class="isuser == false ? 'active' : ''" @click="cepateLogin">
          验证码登录
        </p>
      </div>
      <!-- 验证码登录 -->
      <el-form-item
        v-show="isuser == false ? 'active' : ''"
        prop="mobile"
        style="background-color: #f6f6f8"
      >
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="mobile"
          v-model="loginForm.mobile"
          autocomplete="on"
          name="username"
          placeholder="请输入您的手机号"
          tabindex="1"
          type="text"
        />
      </el-form-item>
      <el-form-item
        v-show="isuser == false ? 'active' : ''"
        style="background: none"
        prop="code"
      >
        <el-row>
          <el-col :span="18"
            ><el-input
              ref="code"
              v-model="loginForm.code"
              type="text"
              style="
                border: 1px solid rgba(255, 255, 255, 0.1);
                background: #f6f6f8;
                border-radius: 20px;
                height: 52px;
              "
              placeholder="请输入验证码"
          /></el-col>
          <el-col :span="5">
            <!-- <el-button :disabled="isclick" @click="sendCapte">{{
              sendineer
            }}</el-button> -->
            <el-button
              :class="{ 'disabled-style': getCodeBtnDisable }"
              :disabled="getCodeBtnDisable"
              style="margin-left: 10px"
              type="primary"
              @click="getCode"
              >{{ codeBtnWord }}</el-button
            >
          </el-col>
        </el-row>
      </el-form-item>

      <!-- 账号登录 -->
      <el-form-item
        v-show="isuser == true ? 'active' : ''"
        prop="username"
        label="账号"
      >
        <!-- <span class="svg-container">
          <svg-icon icon-class="user" />
        </span> -->
        <el-input
          ref="username"
          v-model="loginForm.username"
          autocomplete="on"
          name="username"
          placeholder="请输入您的账号"
          tabindex="1"
          type="text"
          class="elInput"
        />
      </el-form-item>

      <el-tooltip
        v-show="isuser == true ? 'active' : ''"
        v-model="capsTooltip"
        content="Caps lock is On"
        manual
        placement="right"
      >
        <el-form-item prop="password" label="密码">
          <!-- <span class="svg-container">
            <svg-icon icon-class="password" />
          </span> -->
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            autocomplete="off"
            name="password"
            placeholder="请输入密码"
            tabindex="2"
            class="elInput"
            @blur="capsTooltip = false"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon
              :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
            />
          </span>
        </el-form-item>
      </el-tooltip>

      <div class="login-btn">
        <el-button
          v-show="isuser == true ? 'active' : ''"
          :loading="userloading"
          round
          style="
            width: 100%;

            background-color: rgb(37, 110, 253);
            color: #fff;
          "
          type="primary"
          @click.native.prevent="UserLogin"
          >账号登录
        </el-button>

        <el-button
          v-show="isuser == true ? 'active' : ''"
          :loading="loading"
          round
          style="width: 100%; background-color: rgb(37, 110, 253); color: #fff"
          type="primary"
          >微信扫码登录
        </el-button>

        <!-- <el-button
          v-show="isuser == false ? 'active' : ''"
          :loading="userloading"
          round
          style="
            width: 100%;

            background-color: #3c69be;
            top: 0;
            color: #fff;
          "
          type="primary"
          @click.native.prevent="CapteLogin"
          >验证码登录
        </el-button> -->
        <!-- <el-button
          round
          style="
            width: 100%;

            color: #191919;
            background-color: #ffffff;
            border: none;
            margin-top: 100px;
          "
          type="info"
          @click.native.prevent="register"
          >没有账号？点此去注册>>
        </el-button> -->
      </div>
      <div
        style="
          width: 100%;

          text-align: center;
          margin: 50px 0px 50px 0px;
          font-size: 15px;
        "
      >
        <a href="javascript:;" @click="register">没有账号？点此去注册>></a>
      </div>
    </el-form>
    <el-form
      v-show="isuser == false"
      ref="CapteloginForm"
      :model="CapteloginForm"
      :rules="CapteloginRules"
      autocomplete="on"
      class="login-form"
      label-position="left"
    >
      <div class="title-container">
        <!-- <img
          alt=""
          src="../../assets/images/logo.png"
          style="width: 230px; height: 70px; margin: 0 auto"
        /> -->
      </div>
      <div class="Qiehuan" style="margin-bottom: 20px">
        <p :class="isuser == true ? 'active' : ''" @click="user">账号登录</p>
        <p :class="isuser == false ? 'active' : ''" @click="cepateLogin">
          验证码登录
        </p>
      </div>
      <!-- 验证码登录 -->
      <el-form-item
        v-show="isuser == false ? 'active' : ''"
        prop="mobile"
        label="手机号"
        style="border: 0"
      >
        <!-- <span class="svg-container">
          <svg-icon icon-class="user" />
        </span> -->
        <div style="display: flex" class="elInput">
          <div class="elInput-photo">+86</div>
          <el-input
            ref="mobile"
            v-model="CapteloginForm.mobile"
            autocomplete="on"
            name="username"
            placeholder="请输入您的手机号"
            tabindex="1"
            type="text"
          />
        </div>
      </el-form-item>
      <el-form-item
        v-show="isuser == false ? 'active' : ''"
        style="background: none"
        prop="code"
        label="验证码"
      >
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
            v-model="CapteloginForm.code"
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
        <!-- </el-col>
          <el-col :span="5">
            <el-button ></el-button>
          </el-col>
        </el-row> -->
      </el-form-item>

      <div class="login-btn" style="height: 150px">
        <el-button
          v-show="isuser == false ? 'active' : ''"
          :loading="userloading"
          round
          style="
            width: 100%;

            background-color: rgb(37, 110, 253);
            top: 0;
            color: #fff;
          "
          type="primary"
          @click.native.prevent="CapteLogin"
          >验证码登录
        </el-button>
        <div
          style="
            width: 100%;

            text-align: center;
            margin: 30px 0px 50px 0px;
            font-size: 15px;
          "
        >
          <a href="javascript:;" @click="register">没有账号？点此去注册>></a>
        </div>
        <!-- <el-button
          round
          style="
            width: 100%;

            color: #191919;
            background-color: #ffffff;
            border: none;
            margin-top: 50px;
          "
          type="info"
          @click.native.prevent="register"
          >没有账号？点此去注册>>
        </el-button> -->
      </div>
    </el-form>
    <el-dialog :visible.sync="showDialog" title="Or connect with">
      Can not be simulated on local, so please combine you own business
      simulation! ! !
      <br />
      <br />
      <br />
      <social-sign />
    </el-dialog>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { Captelogin, sendCapte } from '@/api/user'
import { getverification } from '@/api/my/resume'
export default {
  name: 'Login',
  data () {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入账号'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码至少有6位'))
      } else {
        callback()
      }
    }
    return {
      sendineer: '发送验证码',
      timer: null, // 定时器
      isclick: false,
      isuser: true,
      CapteloginForm: {
        mobile: '',
        code: ''
      },
      loginForm: {
        username: '',
        password: ''
      },
      CapteloginRules: {
        mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      },

      loginRules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      userloading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      codeBtnWord: '获取验证码', // 获取验证码按钮文字
      waitTime: 61 // 获取验证码按钮失效时间
    }
  },
  computed: {

    // 用于校验手机号码格式是否正确
    phoneNumberStyle () {
      const reg = /^1[3456789]\d{9}$/
      if (!reg.test(this.CapteloginForm.mobile)) {
        return false
      }
      return true
    },
    // 控制获取验证码按钮是否可点击
    getCodeBtnDisable: {
      get () {
        if (this.waitTime == 61) {
          if (this.phoneNumberStyle) {
            if (this.CapteloginForm.mobile) {
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
    $route: {
      handler: function (route) {
        const query = route.query
        //  (query)
        // console.log(query);
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  mounted () {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },

  methods: {
    sendCapte () {

    }, // 发送验证码
    async getCode () {
      if (this.CapteloginForm.mobile) {
        const mobile = this.CapteloginForm.mobile

        sendCapte({ type: '1', mobile: this.CapteloginForm.mobile }).then(
          (res) => {
            if (res.code == 1000) {
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
    // 验证码登录
    CapteLogin () {
      this.$refs.CapteloginForm.validate((valid) => {
        if (valid) {
          Captelogin({
            type: '2',
            mobile: this.CapteloginForm.mobile,
            code: this.CapteloginForm.code
          }).then((res) => {
            if (res.code == 1000) {
              this.$message({
                type: 'success',
                message: res.msg
              })
              localStorage.setItem('Admin-Token', res.skey)
              this.$router.push('/userdash')
            }
          })
        }
      })
    },
    cepateLogin () {
      this.isuser = false
    },
    user () {
      this.isuser = true
    },
    checkCapslock (e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && key >= 'A' && key <= 'Z'
    },
    showPwd () {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true

          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({
                // path: this.redirect || "/",
                path: '/Mandashboard',
                query: this.otherQuery
              })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          //  ('error submit!!')
          return false
        }
      })
    },
    UserLogin () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.userloading = true

          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              //  ();
              this.$router.push({
                // path: this.redirect || "/404",
                path: '/'
              })
              this.userloading = false
            })
            .catch(() => {
              this.userloading = false
            })
        } else {
          //  ('error submit!!')
          return false
        }
      })
    },
    register () {
      this.$router.push({
        path: '/register'
      })
    },
    getOtherQuery (query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }

  }
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #ffffff;
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
    height: 100%;
    // width: 85%;

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

  .el-form-item {
    height: 58px;
    width: 100%;
    // border: 1px solid rgba(255, 255, 255, 0.1);
    // background: #f6f6f8;
    // border-radius: 26px;
    // color: #454545;
  }
  .el-row {
    height: 100%;
  }
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
    min-width: 430px;
    /*max-width: 25%;*/
    width: calc(25vw);
    height: calc(60vh);
    min-height: 410px;
    padding: 0px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    background-color: #ffffff;
    border-radius: 40px;

    .login-btn {
      width: 100%;
      margin: 0 auto;
      position: relative;
      height: 120px;
      // padding-top: 20px;

      button:nth-child(2) {
        position: absolute;
        right: 0;
        top: 60%;
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
    // padding: 1px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    // margin-right: 10px;
    margin-left: 10px;
    // margin-top: 7px;
  }

  .title-container {
    // position: relative;
    // height: 23%;
    // padding-top: 20px;
    // text-align: center;
    width: 80%;
    height: 50px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;

    // .title {
    //   font-size: 26px;
    //   color: $light_gray;
    //   margin: 0px auto 40px auto;
    //   text-align: center;
    //   font-weight: bold;
    // }
  }
  .title-container p {
    width: 50%;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 15px;
    cursor: pointer;
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
.Qiehuan {
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 80px;
}
.Qiehuan p {
  width: 40%;
  text-align: center;
  font-size: 20px;
  cursor: pointer;
}
.Qiehuan .active {
  width: 40%;
  text-align: center;
  font-size: 20px;
  border-bottom: 2px solid #1890ff;
  color: #1890ff;
  padding-bottom: 10px;
  cursor: pointer;
}
.sendCode {
  position: absolute;
  top: -5px;
  right: 20px;
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
</style>
