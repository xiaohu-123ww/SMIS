<template>
  <div class="firstCom">
    <div class="title">编辑培训经历</div>
    <div class="company-form">
      <el-form
        v-for="(train, index) in form"
        :key="index"
        :inline="true"
        :model="train"
        label-position="top"
      >
        <el-form-item label="培训单位">
          <el-input v-model="train.training_team" style="width: 86%" />
        </el-form-item>
        <el-form-item label="培训内容">
          <el-input v-model="train.training_name" style="width: 86%" />
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker
            v-model="train.start_date"
            format="yyyy-MM-dd"
            placeholder="选择日期"
            type="date"
            value-format="yyyy-MM-dd"
          />
          至
          <el-date-picker
            v-model="train.end_date"
            format="yyyy-MM-dd"
            placeholder="选择日期"
            type="date"
            value-format="yyyy-MM-dd"
          />
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
            @click="onSubmit(train)"
          >保存
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { editExperiences } from '@/api/user';

export default {
  props: ['vitaed', 'trainId'],
  data() {
    return {
      form: [],
      showTrain: true

    };
  },
  created() {
    //  (this.vitaed);
    //  (this.trainId);
    if (this.trainId) {
      this.vitaed.tra_info_set.forEach(rs => {
        //  (rs)
        if (rs.id == this.trainId) {
          this.form.push(rs);
        }
      });
    } else {
      this.form = [{
        training_name: '',
        start_date: '',
        end_date: '',
        training_team: ''
      }];
    }

    // this.form = this.vitaed;
  },
  methods: {
    changeRadio(e) {
    },
    onSubmit(item) {
      if (this.trainId) {
        editExperiences({
          type: '1061',
          content: item.training_name,
          id: item.id,
          start: item.start_date,
          end: item.end_date,
          team: item.training_team

        }).then(rs => {
          if (rs !== undefined) {
            this.$message({
              message: rs.msg,
              type: 'success'
            });
            this.$emit('editTrain', this.showTrain);
          } else {

          }
        });
      } else {
        editExperiences({
          type: '1063',
          content: item.training_name,
          start: item.start_date,
          end: item.end_date,
          team: item.training_team

        }).then(rs => {
          if (rs !== undefined) {
            this.$message({
              message: rs.msg,
              type: 'success'
            });
            this.$emit('editTrain', this.showTrain);
          } else {

          }
        });
      }
    },
    cancel() {
      this.$emit('editTrain', this.showTrain);
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

.el-form--inline .el-form-item {
  width: 45%;
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
