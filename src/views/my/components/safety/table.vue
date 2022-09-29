<template>
  <div>
    <div class="safety">
      <div class="safety-row">
        <el-row>
          <el-col :span="6"
            ><div class="grid-content bg-purple">手机号</div></el-col
          >
          <el-col :span="12"
            ><div class="grid-content bg-purple-light">
              +86 {{ photo }}
            </div></el-col
          >
          <el-col :span="4"
            ><div class="grid-content bg-purple">
              <el-button type="primary" @click="photoChange">解绑</el-button>
            </div></el-col
          >
        </el-row>
      </div>
      <div class="safety-row">
        <el-row>
          <el-col :span="6"
            ><div class="grid-content bg-purple">邮箱</div></el-col
          >
          <el-col :span="12"
            ><div class="grid-content bg-purple-light">
              {{ email }}
            </div></el-col
          >
          <el-col :span="4"
            ><div class="grid-content bg-purple">
              <el-button type="primary" @click="emailChange">解绑</el-button>
            </div></el-col
          >
        </el-row>
      </div>
      <div class="safety-row">
        <el-row>
          <el-col :span="6"
            ><div class="grid-content bg-purple">密码</div></el-col
          >
          <el-col :span="12"
            ><div class="grid-content bg-purple-light">
              为了您的账户安全，建议您定期修改密码
            </div></el-col
          >
          <el-col :span="4"
            ><div class="grid-content bg-purple">
              <el-button type="primary" @click="changePassword">修改</el-button>
            </div></el-col
          >
        </el-row>
      </div>
      <div class="safety-row">
        <el-row>
          <el-col :span="6"
            ><div class="grid-content bg-purple">微信</div></el-col
          >
          <el-col :span="12"
            ><div class="grid-content bg-purple-light">
              {{ weChat ? weChat : '微信账号' }}
            </div></el-col
          >
          <el-col :span="4"
            ><div class="grid-content bg-purple">
              <el-button v-if="weChat === ''" type="primary" @click="chat"
                >绑定</el-button
              >
              <el-button v-else type="primary" @click="weChange"
                >解绑</el-button
              >
            </div></el-col
          >
        </el-row>
      </div>
    </div>
    <PhotoDialog :is-show="isShow" @reset="reset" />
    <EmailDialog :email-show="emailShow" @reset="reset" />
    <Password :show="show" @reset="reset" />
    <Chat :we-chat-show="weChatShow" @reset="reset" />
    <el-dialog
      title="解绑微信"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div class="text">
        解除绑定后，将不能再使用微信登录智能招聘网，确认解绑吗？
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import PhotoDialog from '../resume/photoDialog.vue'
import EmailDialog from '../resume/emailDialog.vue'
import Password from './password.vue'
import Chat from './weChat.vue'
export default {
  components: { PhotoDialog, EmailDialog, Password, Chat },
  data () {
    return {
      photo: '12889933456',
      email: '12345678@163.com',
      weChat: '123',
      isShow: false,
      emailShow: false,
      show: false,
      weChatShow: false,
      dialogVisible: false

    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    photoChange () {
      this.isShow = true
    },
    reset (i) {
      this.isShow = i
      this.emailShow = i
      this.show = i
      this.weChatShow = i
    },
    emailChange () {
      this.emailShow = true
    },
    changePassword () {
      this.show = true
    },
    chat () {
      this.weChatShow = true
    },
    handleClose () {
      this.dialogVisible = false
    },
    weChange () {
      this.dialogVisible = true
    }

  }
}
</script>
<style scoped lang="scss">
.safety {
  width: 1000px;
  // height: 500px;
  // background-color: aqua;
  margin-left: 180px;
  .safety-row {
    height: 50px;
    // background-color: blueviolet;
    line-height: 50px;
    font-size: 17px;
    margin: 40px;
    .bg-purple {
      color: rgb(105, 101, 101);
    }
  }
}
.text {
  font-size: 15px;
  color: black;
  margin: 10px;
}
</style>
