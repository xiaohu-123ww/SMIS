<template>
  <div>
    <el-dialog
      title="修改信息"
      :visible.sync="isShow"
      width="35%"
      :before-close="handleClose"
    >
      <div>
        <el-form ref="rf" :model="ruleForm" label-width="80px" :rules="rules">
          <el-form-item label="手机号码" prop="mobile">
            <el-input
              v-model="ruleForm.mobile"
              placeholder="请输入手机号码"
              style="width: 260px"
            ></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-input
              v-model="ruleForm.code"
              placeholder="请输入验证码"
              style="width: 260px"
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
        </el-form>
      </div>
      <div slot="footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="Binding">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getverification, getphoto } from '@/api/my/resume'

export default {
  props: {
    isShow: {
      type: Boolean
    },
    photo: {
      type: String
    }
  },
  data () {
    return {
      ruleForm: {
        mobile: '',
        photoEm: '',
        submitLoading: false
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            validator: (rule, value, cb) => {
              if (/^1[3-9]\d{9}$/.test(value)) {
                cb()
              } else {
                cb(new Error('手机号格式错误'))
              }
            }
          }
        ],
        code: [
          { required: true, message: '验证码不能为空' },
          { max: 4, message: '验证码必须是4个字符', trigger: 'blur' }
        ]
      },
      codeBtnWord: '获取验证码', // 获取验证码按钮文字
      waitTime: 61 // 获取验证码按钮失效时间

    }
  },
  computed: {

    // 用于校验手机号码格式是否正确

    // 控制获取验证码按钮是否可点击
    getCodeBtnDisable: {
      get () {
        if (this.waitTime == 61) {
          if (this.ruleForm.mobile) {
            return false
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
    photo: {
      handler (val) {
        console.log(val)
        this.ruleForm.mobile = val
      },
      immediate: true
    }
  },

  mounted () {

  },
  methods: {
    // 取消
    handleClose () {
      this.$confirm('确定取消手机号绑定吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'

      }).then(() => {
        this.$emit('reset', false)
      })
    },
    // 确定
    async Binding () {
      this.$refs.rf.validate()
      console.log(this.ruleForm)
      const res = await getphoto(this.ruleForm)
      if (res.code === 200) {
        this.$message.success('绑定成功')
        this.$emit('reset', false, this.ruleForm.mobile)
      }
    },
    // 验证码
    async getCode () {
      if (this.ruleForm.mobile) {
        const res = await getverification(this.ruleForm)

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
.el-button.disabled-style {
  background-color: #eeeeee;
  color: #cccccc;
}
</style>
