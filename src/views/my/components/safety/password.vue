<template>
  <div>
    <el-dialog
      title="修改信息"
      :visible.sync="show"
      width="40%"
      :before-close="handleClose"
    >
      <div>
        <el-form
          ref="rf"
          :model="ruleForm"
          status-icon
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="新密码" prop="new_psw">
            <el-input
              v-model="ruleForm.new_psw"
              type="password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirm_new_psw">
            <el-input
              v-model="ruleForm.confirm_new_psw"
              type="password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <div class="input">
            <el-form-item label="验证码" prop="code">
              <el-input
                v-model="ruleForm.code"
                placeholder="请输入验证码"
              ></el-input>
              <el-button
                :class="{ 'disabled-style': getCodeBtnDisable }"
                :disabled="getCodeBtnDisable"
                style="margin-left: 10px"
                type="primary"
                @click="getCode()"
                >{{ codeBtnWord }}</el-button
              >
            </el-form-item>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handle">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getverification } from '@/api/my/resume'
import { getpassword } from '@/api/my/safety'
export default {
  props: {
    show: {
      type: Boolean

    },
    list: {
      type: Object
    }

  },
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
        if (!reg.test(value)) {
          callback(new Error('密码必须是由8-16位字母+数字组合'))
        } else {
          callback()
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.new_psw) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        new_psw: '',
        confirm_new_psw: '',
        code: ''
      },
      rules: {
        new_psw: [
          { validator: validatePass, trigger: 'blur' }
        ],
        confirm_new_psw: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { max: 6, message: '长度在 6 个字符', trigger: 'blur' }
        ]
      },
      mobile: '',
      codeBtnWord: '获取验证码', // 获取验证码按钮文字
      waitTime: 61 // 获取验证码按钮失效时间
    }
  },
  computed: {
    getCodeBtnDisable: {
      get () {
        if (this.waitTime == 61) {
          if (this.mobile) {
            return false
          }
          return true
        }
        return true
      },
      set () { }

    }
  },
  watch: {
    list (newVal, oldVal) {
      console.log('111', newVal)
      this.mobile = newVal.phone
    }
  },
  mounted () {

  },
  created () {
    // this.getPhoto()
  },
  methods: {
    handleClose () {
      this.$emit('reset', false)
    },
    async handle () {
      this.$refs.rf.validate(async (valid) => {
        if (valid) {
          console.log(this.ruleForm)
          const res = await getpassword(this.ruleForm)
          console.log('修改', res)
          // this.handleClose()
          this.$message('修改成功')
          this.$emit('reset', false)
          // this.$store.commit('user/removeUserInfo')
          // this.$router.push('/login')
          // 从哪里发生的退出登录 重新登录之后再回到这个页面
          // 思想: 跳转到登录的时候把当前的页面当成一个参数传过去
          // 重新登录的时候做一个判断 如果发生路径上有这个参数 就以这个参数为主 如果没有这个参数
          // 还跳转到首页
          if (res.code === 200) {
            this.$router.push({
              path: '/',
              query: {
                // 携带的路由参数
                redirect: this.$route.fullPath
                // to.path -> 只包含路径
                // fullPatch 既有路径也有参数
              }
            })
          }
        }
      })
    },
    async getCode () {
      if (this.ruleForm.new_psw !== '' && this.ruleForm.old_psw !== '') {
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
.el-input {
  width: 240px;
}
.el-button.disabled-style {
  background-color: #eeeeee;
  color: #cccccc;
}
</style>
