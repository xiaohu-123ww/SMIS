<template>
  <div class="loginWrapper">
    <div class="form">
      <div class="form_text">
        <h3>账号登录</h3>
        <h3>验证码登录</h3>
      </div>
      <div class="form_form">
        <el-form
          
          label-width="80px"
          :model="formLabelAlign"
        >
          <el-form-item :label-width="formLabelWidth">
            <el-input
              v-model="formLabelAlign.name"
              placeholder="请输入手机号"
            ></el-input>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth">
            <el-input
              v-model="formLabelAlign.region"
              placeholder="输入验证码"
            ></el-input>
           
          </el-form-item>
          <el-form-item :label-width="formLabelWidth">
            <el-button type="primary" size="small">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formLabelWidth: "60px",
      formLabelAlign: {
        name: "",
        region: "",
        type: "",
      },
    };
  },
  methods: {},
};
</script>
<style scoped>
.loginWrapper {
  width: 100%;
  height: 100vh;
  background-color: gray;
  overflow: hidden;
}
.form {
  width: 30%;
  height: 300px;
  background-color: white;
  margin: 10% auto;
  border-radius: 10px;
}
.form_text {
  width: 100%;
  display: flex;
  margin: 20px auto;
  justify-content: center;
}
.form_text h3 {
  width: 25%;
  text-align: center;
}
.el-input {
  width: 320px;
}
.form_form{
    width: 100%;
    height: 220px;
}
.el-button{
    width:85%;
}
</style>