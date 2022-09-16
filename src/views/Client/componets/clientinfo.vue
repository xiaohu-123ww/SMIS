<template>
  <div class="wrapper">
    <p style="font-size: 20px; margin: 20px 0px">
      Hi,{{ this.Studentinfo.student_info.name }}!
      <span class="el-icon-edit-outline" @click="updateGeren" />
    </p>
    <div class="detailnav">
      <div class="navcl">
        <div class="round">
          <i class="el-icon-check" />
        </div>
        <span style="font-size: 18px; margin-left: 10px">已注册</span>
      </div>
      <div class="navcl">
        <div class="round">
          <i class="el-icon-check" />
        </div>
        <span style="font-size: 18px; margin-left: 10px">已认证</span>
      </div>
      <div v-show="this.Studentinfo.has_joined==true" class="navcl">
        <div class="round">
          <i class="el-icon-check" />
        </div>
        <span style="font-size: 18px; margin-left: 10px">已报名</span>
      </div>
      <div v-show="this.Studentinfo.has_joined==false" class="navcl">
        <div class="round">
          <i class="el-icon-check" />
        </div>
        <span style="font-size: 18px; margin-left: 10px">未报名</span>
      </div>
    </div>
    <el-dialog
      title="修改个人信息"
      :visible.sync="dialogRegVisible"
      style="width: 75%; margin: 0 auto"
    >
      <el-form :model="Regform">
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名" :label-width="formLabelWidth">
              <el-input
                v-model="Regform.name"
                autocomplete="off"
              /> </el-form-item></el-col>
          <el-col :span="12">
            <el-form-item label="手机号" :label-width="formLabelWidth">
              <el-input
                v-model.number="Regform.phone"
                autocomplete="off"
              /> </el-form-item></el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="微信号" :label-width="formLabelWidth">
              <el-input
                v-model="Regform.wechat"
                autocomplete="off"
              /> </el-form-item></el-col>
          <el-col
            :span="12"
          ><el-form-item label="身份证号" :label-width="formLabelWidth">
            <el-input
              v-model="Regform.id_number"
              autocomplete="off"
            /> </el-form-item></el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="update">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  Clientindex,
  ClientMydetail,
  userRestudent,
  onclick
} from '@/api/Traincertification/Clinetindex';
export default {
  data() {
    return {
      Studentinfo: { has_joined: null, student_info: null },
      Regform: {
        name: '',
        phone: '',
        wechat: '',
        id_number: ''
      },
      dialogRegVisible: false,
      formLabelWidth: '120px'
    };
  },
  created() {
    this.getStudentinfo();
  },

  methods: {
    updateGeren() {
      this.dialogRegVisible = true;
      this.Regform = {
        name: this.Studentinfo.student_info.name,
        phone: this.Studentinfo.student_info.phone_number,
        wechat: this.Studentinfo.student_info.wechat,
        id_number: this.Studentinfo.student_info.id_number
      };
    },
    update() {
      this.Regform.type = '102';
      this.Regform.phone = Number(this.Regform.phone);
      userRestudent(this.Regform).then((res) => {
        // console.log(res);
        if (res.code == 1000) {
          this.$message({
            type: 'success',
            message: res.msg
          });
          this.getStudentinfo();
          this.dialogRegVisible = false;
        }
      });
    },
    getStudentinfo() {
      ClientMydetail().then((res) => {
        // console.log(res);
        res.data.student_info.id_numbers = '******************';
        this.Studentinfo = {
          student_info: res.data.student_info,
          has_joined: res.data.has_joined
        };
      });
    }
  }
};
</script>

<style scoped>
.detailnav {
  height: 80px;
  display: flex;
  align-items: center;
      justify-content: space-around;
}
.navcl {
  width: 10%;
  display: flex;
  align-items: center;
}
.round {
  height: 25px;
  border-radius: 50%;
  width: 25px;
  background-color: #1890ff;
  color: white;
  text-align: center;
  line-height: 27px;
  font-size: 18px;
}
/deep/.el-collapse-item__header {
  font-size: 20px !important;
  /* padding-left: 50px; */
}
.wrapper {
  width: 80%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}
.right_top {
  width: 100%;
  height: 400px;
  /* background-color: burlywood; */
  /* border-bottom: 1px solid gainsboro; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.right_text {
  width: 80%;
  margin: 0 auto;
}
.right_text h3 {
  font-size: 20px;
  margin: 20px;
}
</style>
