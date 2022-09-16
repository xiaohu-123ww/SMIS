<template>
  <div class="firstCom">
    <div class="title">编辑教育经历</div>
    <div class="company-form">
      <el-form
        v-for="(school, index) in form"
        :key="index"
        :inline="true"
        :model="school"
        label-position="top"
      >
        <el-form-item label="学校名称">
          <el-input v-model="school.school" style="width: 86%" />
        </el-form-item>
        <el-form-item label="学院/系部">
          <el-input v-model="school.department" style="width: 86%" />
        </el-form-item>
        <el-form-item label="专业" style="padding-top: 10px">
          <el-input v-model="school.major" style="width: 86%" />
        </el-form-item>
        <el-form-item label="所获学历" style="padding-top: 10px">
          <!--          <el-input v-model="school.edu" style="width: 86%" />-->
          <el-select v-model="school.education" filterable placeholder="请选择">
            <el-option
              v-for="item in Options.education_choices"
              :key="item.idx"
              :label="item.label"
              :value="item.idx"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="时间">
          <!--          <el-date-picker-->
          <!--            v-model="school.start_date"-->
          <!--            end-placeholder="结束日期"-->
          <!--            range-separator="至"-->
          <!--            start-placeholder="开始日期"-->
          <!--            type="daterange"-->
          <!--          />-->
          <el-date-picker
            v-model="school.start_date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            type="date"
          />
          至
          <el-date-picker
            v-model="school.end_date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            type="date"
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
            @click="onSubmit(school)"
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
  props: ['vitaed', 'schoolId'],
  data() {
    return {
      form: [],
      showDegree: true,
      Options: []
    };
  },
  created() {
    //  (this.vitaed);
    this.Options = this.vitaed;
    //  (this.schoolId);
    if (this.schoolId) {
      this.vitaed.edu_info_set.forEach(rs => {
        if (rs.id == this.schoolId) {
          this.form.push(rs);
        }
      });
    } else {
      this.form = [
        {
          department: '',
          school: '',
          major: '',
          education: '',
          start_date: '',
          end_date: ''
        }
      ];
    }
    // this.form = this.vitaed;
  },
  methods: {
    changeRadio(e) {
    },
    onSubmit(item) {
      if (this.schoolId) {
        editExperiences({
          type: '1071',
          department: item.department,
          school: item.school,
          id: String(item.id),
          major: item.major,
          edu: String(item.education),
          start: item.start_date,
          end: item.end_date
        }).then(rs => {
          if (rs !== undefined) {
            this.$message({
              message: rs.msg,
              type: 'success'
            });
            this.$emit('educationInfo', this.showDegree);
          } else {

          }
        });
      } else {
        editExperiences({
          type: '1073',
          department: item.department,
          school: item.school,
          major: item.major,
          edu: String(item.education),
          start: item.start_date,
          end: item.end_date
        }).then(rs => {
          if (rs !== undefined) {
            this.$message({
              message: rs.msg,
              type: 'success'
            });
            this.$emit('educationInfo', this.showDegree);
          } else {

          }
        });
      }
    },
    cancel() {
      this.$emit('educationInfo', this.showDegree);
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
