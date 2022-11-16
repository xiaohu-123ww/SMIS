<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      autocomplete="on"
      class="login-form"
      label-position="left"
    >
      <div class="title-container">
        <img
          alt=""
          src="../../assets/images/logo.png"
          style="width: 230px; height: 70px"
        />
      </div>

      <el-form-item prop="username" style="background-color: #f6f6f8">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          autocomplete="on"
          name="username"
          placeholder="请输入您的账号"
          tabindex="1"
          type="text"
        />
      </el-form-item>
      <el-tooltip
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
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            autocomplete="off"
            name="password"
            placeholder="请输入密码"
            tabindex="2"
            @blur="capsTooltip = false"
            @keyup.native="checkCapslock"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon
              :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
            />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-tooltip
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
      </el-tooltip>
      <el-tooltip
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
          <el-input v-model="loginForm.email" placeholder="请输入邮箱" />
          <!-- <span class="show-pwd" >
              <svg-icon
                :icon-class="checkPassType"
              />
            </span> -->
        </el-form-item>
      </el-tooltip>
      <div class="login-btn">
        <el-button
          round
          style="width: 100%; background-color: #3c69be"
          type="primary"
          @click.native.prevent="Sign"
          >注册
        </el-button>
        <el-button
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
        </el-button>
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
import { registerUser } from '@/api/user'

export default {
  name: 'Register',
  data () {
    return {
      emailicon: 'email',
      loginForm: {
        username: '',
        password: '',
        confirm_password: '',
        email: ''
      },
      passwordType: 'password',
      checkPassType: 'password',
      capsTooltip: false
    }
  },
  mounted () {
  },
  methods: {
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
    showPwds () {
      if (this.checkPassType === 'password') {
        this.checkPassType = ''
      } else {
        this.checkPassType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.checkPass.focus()
      })
    },
    Sign () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          registerUser({
            username: this.loginForm.username,
            email: this.loginForm.email,
            password: this.loginForm.password,
            confirm_password: this.loginForm.confirm_password
          }).then(rs => {
            // console.log(rs)
            this.$message({
              message: rs.msg,
              type: 'success'
            })
            this.$router.push('/login')
          })
        } else {
          //  ('error submit!!')
          return false
        }
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
    height: 100%;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      /*<!--color: $light_gray;-->*/
      color: #808080;
      height: 100%;
      caret-color: $cursor;

      &:-webkit-autofill {
        // box-shadow: 0 0 0px 1000px $bg inset !important;
        // -webkit-text-fill-color: $cursor !important;
        -webkit-text-fill-color: #808090 !important;
        -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
        background-color: transparent;
        background-image: none;
        transition: background-color 50000s ease-in-out 0s;
      }
    }
  }

  .el-form-item {
    height: 10%;
    width: 100%;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: #f6f6f8;
    border-radius: 26px;
    color: #454545;
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
    min-width: 410px;
    /*max-width: 25%;*/
    width: calc(25vw);
    height: calc(60vh);
    min-height: 500px;
    padding: 0px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    background-color: #ffffff;

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
    height: 23%;
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
::v-deep input.el-input__inner {
  border: none !important;
  box-shadow: none !important;

  padding: 15px;
  background-color: #f6f6f6;
}
</style>
