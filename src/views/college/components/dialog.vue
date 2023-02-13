<template>
  <div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="实训类型" prop="type">
          <el-radio-group v-model="ruleForm.type">
            <el-radio
              v-for="item in exemType"
              :key="item.id"
              :label="item.id"
              >{{ item.name }}</el-radio
            >
            <!-- <el-radio label="日常练习"></el-radio> -->
          </el-radio-group>
        </el-form-item>
        <el-form-item label="身份校验" prop="password" style="width: 400px">
          <el-input
            v-model="ruleForm.password"
            :type="passw"
            autocomplete="off"
            placeholder="请输入密码"
          >
            <i slot="suffix" :class="icon" @click="showPass"></i
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
      <!-- <a :href="`${SimRobo.exe} zq://15071418009 123456 student exam`">123</a> -->
    </el-dialog>
  </div>
</template>
<script>
import { getList } from '@/api/my/safety'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }

  },
  data () {
    return {
      passw: 'password',
      icon: 'el-input__icon el-icon-view',
      ruleForm: {
        type: '',
        password: '',
        identity: 'student',
        username: ''
      },
      rules: {
        type: [
          { required: true, message: '请选择实训类型', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入账号密码', trigger: 'blur' }

        ]
      },
      exemType: [
        {
          name: '正式考试',
          id: 'exam'
        },
        {
          name: '日常练习',
          id: 'test'
        }
      ]

    }
  },
  mounted () {
    this.getSafety()
  },
  created () {
    this.getSafety()
  },
  methods: {
    showPass () {
      if (this.passw === 'text') {
        this.passw = 'password'
        // 更换图标
        this.icon = 'el-input__icon el-icon-view'
      } else {
        this.passw = 'text'
        this.icon = 'el-input__icon el-icon-loading'
      }
    },
    handleClose (done) {
      this.$emit('reset')
      this.num()
    },
    // 确定
    submit () {
      this.$refs.ruleForm.validate((valida) => {
        if (valida) {
          console.log('1', this.ruleForm)
          if (this.ruleForm.username === null || this.ruleForm.username === '') {
            this.$message.success('该账号还没有绑定手机号，去绑定吧')
            this.$router.push('/safety')
          } else {
            var url = `SimRobo:${this.ruleForm.username}$${this.ruleForm.password}$${this.ruleForm.identity}$${this.ruleForm.type}`
            // var url = 'SimRobo:' + this.ruleForm.username
            // var url1 = this.ruleForm.password
            // var url2 = this.ruleForm.identity
            // var url3 = this.ruleForm.type
            window.open(url, '_blank')
            console.log(url)
            this.handleClose()
            //  window.location.href = 'test://123'
            // window.open('SimRobo:/', '_blank')
            // var  cmd = new ActiveXObject("WScript.Shell");
            // var ws = WScript.CreateObject('WScript.Shell')
            // ws.Run('D:\SimRobo\SimRoboPack\SimRobo.exe ')
          }
        }
      })
    },
    async getSafety () {
      const { data } = await getList()
      console.log('安全中心', data)
      this.ruleForm.username = data.phone

      // this.list = data
    },
    num () {
      this.ruleForm.type = ''
      this.ruleForm.password = ''
    }
  }
};
</script>
<style scoped>
</style>
