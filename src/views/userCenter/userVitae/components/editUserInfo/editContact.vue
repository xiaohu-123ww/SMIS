<template>
  <div class="firstCom">
    <div class="title">编辑个人信息</div>
    <div class="company-form">
      <el-form :inline="true" :model="form" label-position="top">
        <el-form-item label="生日">
          <el-date-picker
            v-model="form.personal.date_of_birth"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
            type="date"
          />
        </el-form-item>
        <el-form-item label="性别" style="padding-top: 10px">
          <el-radio-group
            v-model="form.personal.sex"
            style="width: 90%"
            text-color="#191919"
            @change="changeRadio"
          >
            <el-radio-button
              v-for="(item, index) in form.sex_choices"
              :key="index"
              :label="item.idx"
              class="elBtn"
            >{{ item.label }}
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="身高"
          style="padding-top: 10px"
          aria-placeholder="请输入你的身高（cm）"
        >
          <el-input v-model="form.personal.height" style="width: 86%" />
        </el-form-item>
        <el-form-item
          label="体重"
          style="padding-top: 10px"
          aria-placeholder="请输入你的体重 （公斤）"
        >
          <el-input v-model="form.personal.weight" style="width: 86%" />
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
          <el-input v-model="form.personal.home_address" style="width: 86%" />
        </el-form-item>
        <el-form-item label="邮编" style="padding-top: 10px">
          <el-input v-model="form.personal.postcode" style="width: 86%" />
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

      showContact: true,
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
        type: '103',
        sex: String(this.form.personal.sex),
        nation: String(this.form.personal.nation),
        date_of_birth: this.form.personal.date_of_birth,
        height: String(this.form.personal.height),
        weight: String(this.form.personal.weight),
        postcode: this.form.personal.postcode,
        home_address: this.form.personal.home_address,
        birth_address: this.form.personal.birth_address,
        martial: String(this.form.personal.martial_status)
      }).then(rs => {
        //  (rs);
        if (rs !== undefined) {
          this.$message({
            message: rs.msg,
            type: 'success'
          });
          this.$emit('editContact', this.showContact);
        } else {

        }
        // console.log(rs);
      });
    },
    cancel() {
      this.$emit('editContact', this.showContact);
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
