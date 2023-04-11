<template>
  <div>
    <el-dialog
      title="微信绑定"
      :visible.sync="wetchatvisible"
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
            <el-input v-model="wetchat.wetchat" style="width: 300px"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <div slot="footer">
        <el-button @click="dialogBeforeClose">取 消</el-button>
        <el-button type="primary" @click="wetChatResume">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    wetchatvisible: {
      type: Boolean
    },
    wechatnumber: {
      type: String
    }
  },
  data () {
    return {
      wetchat: { wetchat: '' },

      rules: {
        wetchat: [
          { required: true, message: '请输入微信号码', trigger: 'blur' }

        ]
      }

    }
  },
  mounted () {
    // this.dialogBeforeClose()
    // this.$message.success('未绑定微信！')
  },
  computed: {

  },
  created () {

  },
  watch: {
    wechatnumber (newVal, oldVal) {
      console.log('newVal', newVal)
      this.wetchat.wetchat = newVal
    }
  },
  methods: {
    // 取消
    dialogBeforeClose () {
      this.$emit('wetcancel')
      // this.$message.success('未绑定微信号！')
      this.wetchat.wetchat = ''
    },
    wetChatResume () {
      this.$refs.ruleForm.validate((vaild) => {
        if (vaild) {
          console.log('微信绑定')
          this.$emit('wetExchange', this.wetchat.wetchat)
          this.dialogBeforeClose()
        }
      })
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
