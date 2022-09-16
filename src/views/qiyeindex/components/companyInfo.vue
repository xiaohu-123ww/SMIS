<template>
  <div class="firstCom">
    <div class="title" style="font-size: 25px">企业基本信息</div>
    <div class="company-form">
      <el-form label-position="top">
        <el-form-item v-if="form.info" label="企业名称">
          <label
            slot="label"
            style="color: #808080; font-weight: 500"
          >企业名称</label>
          <el-input
            v-model="form.info.name"
            placeholder="请输入企业名称"
            style="width: 86%"
          />
        </el-form-item>
        <el-form-item
          v-if="form.info"
          label="企业性质"
          style="padding-top: 10px"
        >
          <label
            slot="label"
            style="color: #808080; font-weight: 500"
          >企业性质</label>
          <el-select
            v-model="form.info.nature"
            placeholder="请选择企业性质"
            style="width: 86%"
          >
            <el-option
              v-for="item in form.nature_options"
              :key="item.idx"
              :label="item.label"
              :value="item.idx"
            />
            <!--            <el-option label="区域一" value="shanghai" />-->
            <!--            <el-option label="区域二" value="beijing" />-->
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="form.info"
          label="行业领域"
          style="padding-top: 10px"
        >
          <label
            slot="label"
            style="color: #808080; font-weight: 500"
          >行业领域</label>
          <!--          <el-input-->
          <!--            v-model="form.info.field.name"-->
          <!--            placeholder="请输入行业领域"-->
          <!--            -->
          <!--          />-->
          <el-select
            v-model="form.info.field.id"
            filterable
            placeholder="请输入行业领域"
            style="width: 86%"
            @change="searchSelect(form.info.field.id)"
          >
            <el-option
              v-for="item in form.field_options"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="form.info"
          label="企业规模"
          style="padding-top: 10px"
        >
          <label
            slot="label"
            style="color: #808080; font-weight: 500"
          >企业规模</label>
          <el-radio-group
            v-model="form.info.staff_size.id"
            style="width: 80%"
            text-color="#191919"
            @change="changeRadio"
          >
            <el-radio-button
              v-for="item in radioList"
              :key="item.id"
              :label="item.id"
              class="elBtn"
            >
              {{ item.min_number }} - {{ item.max_number }}
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-if="form.info"
          label="融资状态"
          style="padding-top: 10px"
        >
          <label
            slot="label"
            style="color: #808080; font-weight: 500"
          >融资状态</label>
          <!-- fill="#D8F3FF" -->
          <el-radio-group
            v-model="form.info.financing_status"
            style="width: 80%"
            text-color="#191919"
          >
            <el-radio-button
              v-for="(item, index) in mixList"
              :key="item.idx"
              :label="item.idx"
              class="elBtn"
            >
              {{ item.label }}
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-if="form.info"
          label="成立时间"
          style="padding-top: 10px"
        >
          <label
            slot="label"
            style="color: #808080; font-weight: 500"
          >成立时间</label>
          <el-input
            v-model="form.info.create_time"
            placeholder="请输入成立时间"
            style="width: 86%"
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
import { enterpriseInfo, updateInfo } from '@/api/enterprise';

export default {
  data() {
    return {
      nature_options: [],
      field_options: [],
      form: {
        nature_options: [
          {
            idx: '',
            label: ''
          }
        ],
        field_options: [
          {
            id: '',
            name: ''
          }
        ],
        info: {
          staff_size: {
            id: ''
          },
          financing_status: '',
          create_time: '',
          name: '',
          nature: '',
          field: {
            id: ''
          },
          site_url: '',
          address: '',
          introduction: '',
          id: {
            email: ''
          }
        }
      },
      radioList: [{
        min_number: '',
        max_number: ''
      }],
      mixList: []
    };
  },
  created() {
    enterpriseInfo().then(
      rs => {
        //  (rs.data);

        // this.form.nature_options = rs.data.nature_options;
        // this.form.field_options = rs.data.field_options;
        if (rs.data.info.field == null) {
          // console.log(1);

          rs.data.info.field = {
            id: ''
          };
        }

        if (rs.data.info.staff_size == null) {
          // console.log(1);
          rs.data.info.staff_size = {
            id: ''
          };
        }
        // console.log(rs.data);
        this.form = rs.data;
        // console.log(this.form);
        // 创建时间
        //  (this.form.info.create_time);
        // this.form.info.create_time.splice()
        this.form.info.create_time = this.form.info.create_time.split('-')[0];
        // 融资 financial_options
        this.mixList = rs.data.financial_options;
        // console.log(this.mixList);
        // rs.data.financial_options.forEach(res => {
        //   if (res.idx == this.form.info.financing_status) {
        //     this.form.info.financing_status = res.label;
        //   }
        // });
        // 公司福利 enterprise_tags

        // 企业性质 国企等 nature_options
        // 企业规模 staff_size_options
        this.radioList = rs.data.staff_size_options;
        // console.log(1)
        // rs.data.staff_size_options.forEach(item => {
        //   if (item.idx == this.form.info.staff_size.id) {
        //     this.form.info.staff_size.max_number = item.max_number;
        //     this.form.info.staff_size.min_number = item.min_number;
        //   }
        // });
      }
    );
  },
  methods: {
    searchSelect(e) {
      //  (e);
    },
    changeRadio(e) {
    },
    onSubmit() {
      updateInfo({
        type: '1',
        name: this.form.info.name,
        field: String(this.form.info.field.id),
        nature: String(this.form.info.nature),
        size: String(this.form.info.staff_size.id),
        financial: String(this.form.info.financing_status),
        establish_year: this.form.info.create_time
      }).then(rs => {
        if (rs !== undefined) {
          this.$message({
            message: rs.msg,
            type: 'success'
          });
        } else {

        }
      });
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
::v-deep .item .el-form-item__label {
  color: #cecece !important;
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
    border-bottom: 1px solid #cecece;

    .el-radio-button {
      border: #d9d9d9 1px solid;
      margin-right: 5px;
    }

    .el-radio-button__inner {
      border: none;
    }

    .elBtn span {
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
