<template>
  <div>
    <!-- 用户未注册学员弹窗框 -->
    <el-dialog
      title=""
      :visible.sync="dialogRegVisible"
      style="margin: 0 auto"
      :close-on-press-escape="EscClose"
      @close="Closedialog"
      :close-on-click-modal="EscClose"
    >
      <h3
        style="
          width: 80%;
          margin: 0px auto;
          height: 40px;
          color: #1890ff;
          text-align: center;
          font-size: 30px;
          letter-spacing: 3px;
        "
      >
        注册学员
      </h3>
      <p style="text-align: center">请注册为学员，获取更多好课推荐</p>
      <el-form :model="Regform">
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名" :label-width="formLabelWidth">
              <el-input
                v-model="Regform.name"
                autocomplete="off"
              ></el-input> </el-form-item
          ></el-col>
          <el-col :span="12">
            <el-form-item label="手机号" :label-width="formLabelWidth">
              <el-input
                v-model.number="Regform.phone"
                autocomplete="off"
              ></el-input> </el-form-item
          ></el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="微信号" :label-width="formLabelWidth">
              <el-input
                v-model="Regform.wechat"
                autocomplete="off"
              ></el-input> </el-form-item
          ></el-col>
          <el-col :span="12"
            ><el-form-item label="身份证号" :label-width="formLabelWidth">
              <el-input
                v-model="Regform.id_number"
                autocomplete="off"
              ></el-input> </el-form-item
          ></el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="erweima">立即注册</el-button>
      </div>
    </el-dialog>
    <!-- // 注册学员未关注二维码 -->
    <el-dialog
      title=""
      :visible.sync="dialogErweiVisible"
      style="width: 75%; margin: 0 auto"
      :close-on-press-escape="EscClose"
      @close="Closedialog"
      :close-on-click-modal="EscClose"
    >
      <div class="online">
        <div class="online_text">
          <h3>去绑定小鹅通账号</h3>
        </div>
        <div class="online_img">
          <img
            src="https://znzz.tech/static/img/sys-img/xet_store_icon.jpg"
            alt=""
            width="100%"
            height="100%"
          />
        </div>
        <div class="online_t">
          <h3 @click="Oneclickbinding">一键绑定</h3>
        </div>
      </div>
      <div class="online_bottom">
        <div class="online_bottom_text" @click="tiaozhaunxet">
          <h3>没有小鹅通账号?</h3>
          <p>去注册>></p>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  Clientindex,
  ClientMydetail,
  userRestudent,
  onclick,
} from "@/api/Traincertification/Clinetindex";
export default {
  data() {
    return {
      has_signed: null, //判断是否注册为学员
      has_certificated: null, //判断绑定小鹅通
      dialogRegVisible: false,
      dialogErweiVisible: false,
       EscClose: false,
      Regform: {
        name: "",
        phone: "",
        wechat: "",
        id_number: "",
      },
      formLabelWidth: "120px",
    };
  },
  methods:{
    // 关闭dialog返回首页
    Closedialog(){
      // this.$router.push('/clientlayout')
      this.Regform={
        name: "",
          phone: "",
          wechat: "",
          id_number: "",
      }
    },
      // 获取用户个人信息
    getUserDetail() {
      ClientMydetail().then((res) => {
        // console.log(res);
        this.has_signed = res.data.has_signed;
        this.has_certificated = res.data.has_certificated;
        if (this.has_signed == false) {
          this.dialogRegVisible = true;
        } else {
          if (this.has_certificated == false) {
            this.dialogErweiVisible = true;
          } else {
            this.dialogErweiVisible = false;
            // console.log(123);
          }
          this.dialogRegVisible = false;
        }
      });
    },
       // 跳转小鹅通
    tiaozhaunxet() {
      // this.$router.replace
      window.open(
        "https://admin.xiaoe-tech.com/login_page#/register",
        "_blank"
      );
    },
    Oneclickbinding() {
      onclick().then((res) => {
        if (res.code == 1000) {
          this.$message({
            type: "success",
            message: res.msg,
          });
          this.getUserDetail();
        }
      });
    },
    // 注册按钮
    erweima() {
      this.Regform.type = "101";
      userRestudent(this.Regform).then((res) => {
        // console.log(res);
        if (res.code == 1000) {
          this.$message({
            type: "success",
            message: res.msg,
          });
          this.getUserDetail();
        }
      });
    },
  }
};
</script>
<style scoped>
.online {
  width: 100%;
  /* background-color: brown; */
}
.online_text {
  width: 100%;
  height: 80px;
}
.online_text h3 {
  text-align: center;
  line-height: 80px;
}
.online_img {
  width: 260px;
  height: 260px;
  margin: 0 auto;
}
.online_t {
  width: 100%;
  height: 30px;
  /* background-color: antiquewhite; */
  text-align: center;
  cursor: pointer;
}
.online_bottom {
  width: 100%;
  height: 80px;
}
.online_bottom_text {
  height: 80px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
</style>
