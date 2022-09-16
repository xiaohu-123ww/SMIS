<template>
  <div class="wrapper">
    <div class="course">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="证书名称">
          <el-input
            size="mini"
            v-model="formInline.course"
            placeholder="请输入证书名称"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" size="mini"
            >搜索</el-button
          >
          <el-button
            type="primary"
            size="mini"
            @click="dialogFormVisible = true"
            >新建证书</el-button
          >
        </el-form-item>
      </el-form>
      <el-table :data="tableData" style="width: 96%; margin: -20px auto" stripe>
        <el-table-column prop="cert_name" label="证书名称" align="center">
        </el-table-column>
        <el-table-column prop="cert_level" label="证书等级" align="center">
        </el-table-column>
        <el-table-column prop="issuing_unit" label="发证单位" align="center">
        </el-table-column>
        <el-table-column prop="expiry_date" label="证书有效期" align="center">
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="mini"
              >编辑</el-button
            >
            <el-button type="text" size="mini" @click="handleDea(scope.row)"
              >详情</el-button
            >
            <el-button type="text" size="mini" @click="handledel(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="cert_right" v-show="isBlock">
      <div class="cert_right_btn" v-show="isdetail == 2">
        <div class="btn">
          <el-button type="primary" size="mini" @click="handleBian"
            >保存修改</el-button
          >
        </div>
      </div>
      <div
        class="detail"
        v-show="isdetail == 1"
        style="text-align: center; font-size: 24px; margin-top: 20px"
      >
        证书详情
      </div>
      <div class="cert_right_line" v-show="isdetail == 2"></div>
      <div class="cert_img">
        <!-- <img :src="formLabelAlign.ads_picture" alt="" /> -->
        <el-upload
          :before-upload="beforeAvatarUpload"
          :on-success="handleAvatarSuccess"
          :show-file-list="false"
          action=""
          class="avatar-uploader"
          :disabled="isdetail == 1"
        >
          <img
            v-if="formLabelAlign.cert_sample"
            :src="formLabelAlign.cert_sample"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </div>
      <div class="form">
        <el-form
          label-width="90px"
          :model="formLabelAlign"
          :label-position="labelPosition"
        >
          <el-form-item label="证书名称:">
            <el-input
              v-model="formLabelAlign.cert_name"
              size="mini"
              style="width: 130px"
              :disabled="isdetail == 1"
            ></el-input>
          </el-form-item>
          <el-form-item label="证书等级:">
            <el-select
              size="mini"
              v-model.number="formLabelAlign.cert_level"
              placeholder="请选择"
              :disabled="isdetail == 1"
            >
              <el-option
                v-for="item in cert_level"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="针对人群:">
            <el-input
              v-model="formLabelAlign.aim_people"
              size="mini"
              style="width: 130px"
              :disabled="isdetail == 1"
            ></el-input>
          </el-form-item>
          <el-form-item label="相关岗位:">
            <el-input
              v-model="formLabelAlign.cor_positions"
              size="mini"
              :disabled="isdetail == 1"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="签发单位:">
            <el-input
              v-model="formLabelAlign.issuing_unit"
              size="mini"
              :disabled="isdetail == 1"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="证书有效期:">
            <el-input
              v-model="formLabelAlign.expiry_date"
              size="mini"
              style="width: 130px"
              :disabled="isdetail == 1"
            ></el-input>
          </el-form-item>
          <el-form-item label="考核方式:">
            <el-select
              v-model.number="formLabelAlign.testing_way"
              placeholder="请选择"
              size="mini"
              :disabled="isdetail == 1"
            >
              <el-option
                v-for="item in testing_way"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证书简介:">
            <el-input
              v-model="formLabelAlign.cert_introduction"
              size="mini"
              style="width: 150px"
              type="textarea"
              :disabled="isdetail == 1"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 新增教师对话框 -->
    <el-dialog
      title="新增证书"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="closeDialog"
    >
      <el-form :model="form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="证书名称" :label-width="formLabelWidth">
              <el-input
                v-model="form.cert_name"
                autocomplete="off"
              ></el-input> </el-form-item
          ></el-col>
          <el-col :span="12">
            <el-form-item label="证书等级" :label-width="formLabelWidth">
              <el-select v-model.number="form.cert_level" placeholder="请选择">
                <el-option
                  v-for="item in cert_level"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="发证单位" :label-width="formLabelWidth">
              <el-input v-model="form.issuing_unit"> </el-input> </el-form-item
          ></el-col>
          <el-col :span="12"
            ><el-form-item label="证书有效期" :label-width="formLabelWidth">
              <el-input
                v-model="form.expiry_date"
                autocomplete="off"
              ></el-input> </el-form-item
          ></el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="针对人群" :label-width="formLabelWidth">
              <el-input
                v-model="form.aim_people"
                autocomplete="off"
              ></el-input> </el-form-item
          ></el-col>
          <el-col :span="12">
            <el-form-item label="相关岗位" :label-width="formLabelWidth">
              <el-input
                v-model="form.cor_positions"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="证书简介" :label-width="formLabelWidth">
              <el-input
                v-model="form.cert_introduction"
                type="textarea"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="考核方式" :label-width="formLabelWidth">
              <el-select v-model.number="form.testing_way" placeholder="请选择">
                <el-option
                  v-for="item in testing_way"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="certQue">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  certList,
  insertCert,
  delCert,
  Certdetail,
  upCertImg,
  upCert,
} from "@/api/Traincertification/certMan";
export default {
  data() {
    return {
      closeDialog: false,
      cert_id: "",
      isdetail: 1,
      formLabelAlign: {
        cert_name: "",
        cert_level: null,
        issuing_unit: "",
        testing_way: null,
        cert_introduction: "",
        aim_people: "",
        cor_positions: "",
        expiry_date: "",
        cert_sample: "",
      },
      labelPosition: "left",

      isBlock: false, // 详情编辑
      dialogFormVisible: false,
      form: {
        cert_name: "",
        cert_level: null,
        issuing_unit: "",
        testing_way: null,
        cert_introduction: "",
        aim_people: "",
        cor_positions: "",
        expiry_date: "",
      },
      cert_level: [
        {
          value: 0,
          label: "不分级",
        },
        {
          value: 1,
          label: "初级",
        },
        {
          value: 2,
          label: "中级",
        },
        {
          value: 3,
          label: "高级",
        },
      ],
      testing_way: [
        {
          value: 0,
          label: "无考核",
        },
        {
          value: 1,
          label: "笔试+实操",
        },
        {
          value: 2,
          label: "笔试",
        },
        {
          value: 3,
          label: "实操",
        },
      ],
      assessMethod: [
        {
          value: 0,
          label: "区域一",
        },
        {
          value: 1,
          label: "区域二",
        },
      ],
      corrPosition: [
        {
          value: 0,
          label: "区域一",
        },
        {
          value: 1,
          label: "区域二",
        },
      ],
      formLabelWidth: "90px",
      formInline: {
        certName: "",
        cert_level: null,
        certVali: "",
        certUnit: null,
        ads_picture: "",
      },
      tableData: [],
    };
  },
  created() {
    this.getCertlist();
  },
  methods: {
    // 编辑确定按钮
    handleBian() {
      this.formLabelAlign.type = "2";
      this.formLabelAlign.cert_id = this.cert_id;
      delete this.formLabelAlign.cert_sample;
      upCert(this.formLabelAlign).then((res) => {
        // console.log(res)
        if (res) {
          if (res.code == 1000) {
            this.$message({
              message: res.msg,
              type: "success",
              duration: 5 * 1000,
            });
            this.getCertlist();
            this.getcertDeatil(this.cert_id);
          }
        }else{
          this.getcertDeatil(this.cert_id);
        }
      });
    },
    // 调取详情接口
    getcertDeatil(id) {
      Certdetail(id).then((res) => {
        // console.log(res);
        this.formLabelAlign = {
          cert_name: res.data.cert_name,
          cert_level: Number(res.data.cert_level),
          issuing_unit: res.data.issuing_unit,
          testing_way: Number(res.data.testing_way),
          cert_introduction: res.data.cert_introduction,
          aim_people: res.data.aim_people,
          cor_positions: res.data.cor_positions,
          expiry_date: res.data.expiry_date,
          cert_sample: `https://znzz.tech/${res.data.cert_sample}`,
        };
      });
    },
    //详情
    handleDea(row) {
      this.cert_id = row.cert_id;
      this.getcertDeatil(this.cert_id);
      this.isBlock = true;
      this.isdetail = 1;
    },
    //删除
    handledel(e) {
      this.$confirm("此操作将永久删除该证书, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delCert({ type: "0", cert_id: e.cert_id }).then((res) => {
            if (res.code == 1000) {
              this.$message({
                message: res.msg,
                type: "success",
                duration: 5 * 1000,
              });
              this.getCertlist();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 新增确定按钮
    certQue() {
      // console.log(this.form);
      this.form.type = "1";
      this.dialogFormVisible = false;
      insertCert(this.form).then((res) => {
        // console.log(res);
        if (res.code == 1000) {
          this.getCertlist();
          this.$message({
            type: "success",
            message: res.msg,
          });
          this.dialog();
        }
      });
    },
    dialog() {
      this.form = {
        cert_name: "",
        cert_level: null,
        issuing_unit: "",
        testing_way: null,
        cert_introduction: "",
        aim_people: "",
        cor_positions: "",
        expiry_date: "",
      };
    },
    getCertlist() {
      certList().then((res) => {
        // console.log(res);
        this.tableData = res.data.certification_info;
      });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      if (isJPG && isLt2M == true) {
        // console.log(file);
        // 将文件转化为formdata数据上传
        const fd = new FormData();
        // // fd.append('course_id',this.course_id );
        fd.append("cert_sample", file);
        upCertImg(this.cert_id, fd).then((res) => {
          // console.log(rs);
          if (res.code == 1000) {
            this.$message({
              message: res.msg,
              type: "success",
              duration: 5 * 1000,
            });
            this.getcertDeatil(this.cert_id);
            this.getCertlist();
          }
        });
      }

      return isJPG && isLt2M;
    },
    handleAvatarSuccess() {},
    onSubmit() {
      // console.log("submit!");
    },
    handleClick(row) {
      this.isdetail = 2;
      this.isBlock = true;
      this.cert_id = row.cert_id;
      this.getcertDeatil(row.cert_id);
    },
  },
};
</script>
<style scoped>
.form {
  width: 90%;
  margin: 0 auto;
}
.wrapper {
  /* min-width: 1470px; */
  display: flex;
  /* flex-direction: column; */
}
.course {
  width: 70%;
  height: 710px;
  margin: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 3px 5px 6px 6px gainsboro;
  overflow-y: scroll;
}
.demo-form-inline {
  margin: 15px;
}
.cert_right {
  width: 24%;
  height: 710px;
  background-color: white;
  box-shadow: 3px 5px 6px 6px gainsboro;
  overflow: hidden;
  border-radius: 10px;
  margin-top: 20px;
  overflow-y: scroll;
}
.cert_right_btn {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: flex-end;
}
.btn {
  margin: 20px;
}
.cert_right_line {
  width: 90%;
  margin: 0 auto;
  border-bottom: 1px solid #d2d2d2;
}
.cert_img {
  width: 80%;
  height: 224px;
  margin: 20px auto;
}
.cert_img img {
  width: 100%;
  height: 224px;
}
/deep/.el-upload{
  width: 100%;
}
</style>