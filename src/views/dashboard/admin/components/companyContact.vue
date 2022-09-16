<template>
  <div>
    <div class="title">企业联系方式</div>
    <div class="company-form">
      <el-form label-position="top">
        <div v-if="form.info" style="display: flex; width: 100%">
          <el-form-item label="企业联系邮箱">
            <label slot="label" style="color: #808080; font-weight: 500"
              >企业联系邮箱</label
            >
            <el-input
              v-model="form.info.id.email"
              placeholder="请输入企业联系邮箱"
              style="width: 45%; min-width: 330px; margin-right: 20px"
            />
          </el-form-item>
          <el-form-item
            v-if="form.info"
            label="企业官网"
            style="padding-left: 20px"
          >
            <label slot="label" style="color: #808080; font-weight: 500"
              >企业官网</label
            >
            <el-input
              v-model="form.info.site_url"
              placeholder="请输入企业官网"
              style="width: 45%; min-width: 330px"
            >
              <template slot="prepend">Http://</template>
            </el-input>
            <!-- <el-input
              v-model="form.info.site_url"
              placeholder="请输入企业官网"
              style="width: 45%; min-width: 330px"
            /> -->
          </el-form-item>
        </div>
        <el-form-item
          v-if="form.info"
          label="企业地址"
          style="padding-top: 10px"
        >
          <label slot="label" style="color: #808080; font-weight: 500"
            >企业地址</label
          >
          <el-input
            v-model="form.info.address"
            placeholder="请输入企业地址"
            style="width: 86%"
          />
        </el-form-item>
        <el-form-item
          v-if="form.info"
          label="公司简介"
          style="padding-top: 10px"
        >
          <label slot="label" style="color: #808080; font-weight: 500"
            >公司简介</label
          >
          <el-input
            v-model="form.info.introduction"
            :autosize="{ minRows: 5, maxRows: 10 }"
            placeholder="请输入公司简介"
            style="width: 86%"
            type="textarea"
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
  data () {
    return {
      form: {
        info: {
          site_url: '',
          address: '',
          introduction: '',
          id: {
            email: ''

          }
        }
      }
    };
  },
  created () {
    this.getlist();
  },
  methods: {
    getlist () {
      enterpriseInfo().then(
        rs => {
          //  (rs);
          this.form = rs.data;
          if (this.form.info.site_url) {
            this.form.info.site_url = this.form.info.site_url.replace('http://', '');
          }

        }
      );
    },
    onSubmit () {
      updateInfo({
        type: '2',
        email: this.form.info.id.email,
        address: this.form.info.address,
        site: 'http://' + this.form.info.site_url,
        introduction: this.form.info.introduction
      }).then(rs => {
        // console.log(rs);
        if (rs !== undefined) {
          this.$message({
            message: rs.msg,
            type: 'success'
          });
          this.getlist();
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

  .form-submit {
    width: 86%;
    min-height: 75px;
    display: flex;
    justify-content: flex-end;
    padding-top: 20px;
  }
}
</style>
