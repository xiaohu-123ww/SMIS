<template>
  <div class="firstCom">
    <div class="title">编辑自我评价</div>
    <div class="company-form">
      <el-form :inline="true" :model="form" label-position="top">
        <el-form-item style="width: 100%">
          <el-input
            v-model="zishu"
            placeholder="请输入个人自我介绍"
            :rows="5"
            style="width: 96%; display: block"
            type="text"
          />
          <p style="font-size: 12px; color: darkgrey; width: 96%">
            当前字数: {{ count }}
          </p>
          <!-- <el-input
            type="text"
            placeholder="请输入个人自我介绍"
            v-model="form.eva.self_evaluation"
            maxlength="30"
            style="width: 90%"
            show-word-limit
          /> -->
        </el-form-item>
        <el-form-item class="form-submit">
          <el-button
            round
            style="
              width: 100px;
              margin-left: 40px;
              margin-bottom: 30px;
              background-color: #cecece;
              color: #fff;
            "
            @click="cancel"
          >取消
          </el-button>
          <el-button
            round
            style="
              width: 100px;
              margin-left: 40px;
              margin-bottom: 30px;
              background-color: #3c69be;
              color: #fff;
            "
            @click="onSubmit"
          >保存
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { editUserdetails } from '@/api/user';

export default {
  props: ['vitaed'],
  data() {
    return {
      form: {
        name: '',
        property: '',
        domain: '',
        radio: '100-299'
      },
      showAssess: true,
      zishu: '',
      count: ''
    };
  },
  watch: {
    zishu(xin, jiu) {
      // console.log();
      this.count = xin.length;
    }
  },
  created() {
    this.form = this.vitaed;
    this.zishu = this.form.eva.self_evaluation;
  },
  methods: {
    changeRadio(e) {
    },
    onSubmit() {
      // console.log();
      editUserdetails({
        type: '108',
        content: this.zishu
      }).then(rs => {
        if (rs !== undefined) {
          this.$message({
            message: rs.msg,
            type: 'success'
          });
          this.$emit('editAssess', this.showAssess);
        } else {

        }
      });
    },
    cancel() {
      this.$emit('editAssess', this.showAssess);
    }
  }
};
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}

.firstCom {
  .title {
    width: 100%;
    height: 100px;
    padding-top: 30px;
    padding-left: 30px;
    font-size: 20px;
    color: #2f2f2f;
  }

  .company-form {
    width: 100%;
    height: auto;
    padding-left: 30px;

    .el-radio-button {
      border: #d9d9d9 1px solid;
      width: 100px;
      margin-right: 20px;
    }

    .elBtn span {
      width: 100px;
      border-radius: 0;
    }

    .is-active span {
      border: 1px solid #1996fc;
      background-color: #d8f3ff;
      box-sizing: border-box;
    }

    .form-submit {
      width: 86%;
      min-height: 75px;
      display: flex;
      justify-content: flex-end;
      padding-top: 20px;
    }
  }
}
</style>
