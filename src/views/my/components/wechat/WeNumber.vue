<template>
  <div>
    <el-dialog
      title="微信绑定"
      :visible.sync="wetnumber"
      width="30%"
      :before-close="dialogBeforeClose"
    >
      <div>
        <el-form
          ref="ruleForm"
          :model="wetchat"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="微信号" prop="wetchat">
            <el-input
              v-model="wetchat.wetchat"
              style="width: 300px"
              disabled
            ></el-input>
            <div v-if="red" style="color: red; font-size: 12px">
              *查看微信号是否正确
            </div>
          </el-form-item>
        </el-form>
      </div>

      <div slot="footer">
        <el-button type="warning" @click="resume">确定</el-button>
        <el-button type="danger" @click="wetChatResume">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    wetnumber: {
      type: Boolean
    },
    wechatnumber: {
      type: String
    }
  },
  data () {
    return {
      red: true,
      wetchat: { wetchat: '' },

      rules: {
        wetchat: [
          { required: true, message: '请输入微信号码', trigger: 'blur' }

        ]
      }

    }
  },
  computed: {

  },
  watch: {
    wechatnumber (newVal, oldVal) {
      console.log('newVal', newVal)
      this.wetchat.wetchat = newVal
    }
  },
  mounted () {
    // this.dialogBeforeClose()
    // this.$message.success('未绑定微信！')
  },
  created () {

  },
  methods: {
    // 取消
    dialogBeforeClose () {
      this.$emit('wetSubmit')
      // this.$message.success('未绑定微信号！')
      // this.wetchat.wetchat = ''
    },
    wetChatResume () {
      this.$refs.ruleForm.validate((vaild) => {
        if (vaild) {
          console.log('微信绑定')
          this.$emit('wetExchanges')
          this.dialogBeforeClose()
        } else {
          // this.red = false
        }
      })
    },
    // 确定发送
    resume () {
      this.$emit('wetresumeSend', this.wetchat.wetchat)
      this.dialogBeforeClose()
    }
  }
}
</script>
<style scoped lang="scss">
::v-deep .el-dialog {
  display: flex;
  flex-direction: column;
  margin: 0 !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /*height:600px;*/
  max-height: calc(100% - 200px);
  max-width: calc(100% - 30px);
}
::v-deep .el-dialog .el-dialog__body {
  flex: 1;
  overflow: auto;
}
::v-deep .el-dialog__header {
  background: none;
}
</style>
