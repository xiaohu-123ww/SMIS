<template>
  <div class="firstCom">
    <div class="title">编辑学历</div>
    <div class="company-form">
      <el-form :inline="true" :model="form" label-position="top">
        <el-form-item style="width: 100%">
          <el-select v-model="form.personal.education" placeholder="请选择">
            <el-option
              v-for="item in form.education_choices"
              :key="item.idx"
              :label="item.label"
              :value="item.idx"
            />
          </el-select>
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
      showEducation: true
    };
  },
  created() {
    this.form = this.vitaed;
  },
  methods: {
    changeRadio(e) {
    },
    onSubmit() {
      editUserdetails({ type: '104', edu: this.form.personal.education }).then(rs => {
        //  (rs)
        if (rs !== undefined) {
          this.$message({
            message: rs.msg,
            type: 'success'
          });
          this.$emit('editEducation', this.showEducation);
        } else {

        }
      });
    },
    cancel() {
      this.$emit('editEducation', this.showEducation);
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
