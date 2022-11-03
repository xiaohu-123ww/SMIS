<template>
  <div>
    <el-dialog
      title="修改信息"
      :visible.sync="show"
      width="30%"
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
          <el-form-item label="新密码" prop="pass">
            <el-input
              v-model="ruleForm.pass"
              type="password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input
              v-model="ruleForm.checkPass"
              type="password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <div class="input">
            <el-form-item label="验证码" prop="code">
              <el-input
                v-model="ruleForm.photoEm"
                placeholder="请输入验证码"
              ></el-input>
              <el-button type="primary" style="margin-left: 8px"
                >验证码</el-button
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
export default {
  props: {
    show: {
      type: Boolean

    }

  },
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        new_psw: '',
        old_psw: '',
        confirm_new_psw: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { max: 6, message: '长度在 6 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    handleClose () {
      this.$emit('reset', false)
    },
    handle () {
      this.$refs.rf.validate()
      // this.handleClose()
    }

  }
}
</script>
<style scoped lang="scss">
.el-input {
  width: 240px;
}
</style>
