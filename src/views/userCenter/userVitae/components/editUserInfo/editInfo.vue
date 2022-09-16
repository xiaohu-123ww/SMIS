<template>
  <div class="firstCom">
    <div class="title">编辑个人信息</div>
    <div class="company-form">
      <el-form :inline="true" :model="form" label-position="top">
        <el-form-item label="姓名">
          <el-row :gutter="2" style="width: 80%">
            <el-col :span="4"> 姓： </el-col>
            <el-col :span="6">
              <el-input v-model="form.user.last_name" />
            </el-col>
            <el-col :span="4"> 名： </el-col>
            <el-col :span="10">
              <el-input v-model="form.user.first_name" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.personal.phone_number" style="width: 86%" />
        </el-form-item>

        <el-form-item label="QQ" style="padding-top: 10px">
          <el-input v-model="form.personal.qq_number" style="width: 86%" />
        </el-form-item>
        <!-- <el-form-item label="生日">
          <el-date-picker
            v-model="form.personal.date_of_birth"
            placeholder="选择日期"
            type="date"
          />
        </el-form-item>

        <el-form-item label="邮箱" style="padding-top: 10px">
          <el-input v-model="form.user.email" style="width: 86%" />
        </el-form-item>
        <el-form-item label="民族" style="padding-top: 10px">
          <el-select
            v-model="form.personal.nation"
            placeholder="请选择"
            style="width: 86%"
          >
            <el-option
              v-for="item in form.nations_choices"
              :key="item.idx"
              :label="item.label"
              :value="item.idx"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="现住址" style="padding-top: 10px">
          <el-input v-model="form.homeAddress" style="width: 86%" />
        </el-form-item>
        <el-form-item label="参加工作时间" style="padding-top: 10px">
          <el-date-picker
            v-model="form.time"
            placeholder="选择日期"
            style="width: 86%"
            type="date"
          />
        </el-form-item>
        <el-form-item label="籍贯" style="padding-top: 10px">
          <el-select
            v-model="form.personal.birth_address"
            placeholder="请选择"
            style="width: 86%"
          >
            <el-option
              v-for="item in form.province_choices"
              :key="item.idx"
              :label="item.label"
              :value="item.idx"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="求职意向" style="padding-top: 10px">
          <el-input v-model="form.work" style="width: 86%" />
        </el-form-item>
        <el-form-item label="婚姻状况" style="padding-top: 10px">
          <el-radio-group
            v-model="form.personal.martial_status"
            style="width: 100%"
            text-color="#191919"
            @change="changeRadio"
          >
            <el-radio-button
              v-for="(item, index) in form.martial_choices"
              :key="index"
              :label="item.idx"
              class="elBtn"
            >
              {{ item.label }}
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="意向城市" style="padding-top: 10px">
          <el-select v-model="form.city" placeholder="请选择">
            <el-option
              v-for="item in form.province_choices"
              :key="item.idx"
              :label="item.label"
              :value="item.idx"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="期望薪资" style="padding-top: 10px">
          <el-input v-model="form.xinzi" style="width: 86%" />
        </el-form-item> -->
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
        salary: ''
      },

      showName: true,
      radioList: ['男', '女'],
      mixList: ['已婚', '未婚', '保密'],
      options: [
        {
          value: '1',
          label: '北京'
        },
        {
          value: '2',
          label: '上海'
        },
        {
          value: '3',
          label: '深圳'
        }
      ]
    };
  },
  created() {
    this.form = this.vitaed;
    this.form.user.name = this.form.user.last_name + this.form.user.first_name;

    // this.$set( this.vitaed.user, this.vitaed.user.name, this.form.user.name )
  },
  methods: {
    changeRadio(e) {
    },
    onSubmit() {
      //  (this.form);
      editUserdetails({
        type: '101',
        last_name: this.form.user.last_name,
        first_name: this.form.user.first_name,
        phone: this.form.personal.phone_number,
        qq: this.form.personal.qq_number
        // sex: this.form.personal.sex,
        // nation: this.form.personal.nation,
        // date_of_birth: this.form.personal.date_of_birth,
        // height: this.form.personal.height,
        // weight: this.form.personal.weight,
        // postcode: this.form.personal.postcode,
        // home_address: this.form.personal.home_address,
        // birth_address: this.form.personal.home_address,
        // martial: this.form.personal.martial_status
      }).then(rs => {
        //  (rs);
        // console.log(rs);
        if (rs !== undefined) {
          this.$message({
            message: rs.msg,
            type: 'success'
          });
          this.$emit('editInfo', this.showName);
        } else {

        }
      });
    },
    cancel() {
      this.$emit('editInfo', this.showName);
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
