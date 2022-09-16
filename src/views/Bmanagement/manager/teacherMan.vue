<template>
  <div class="wrapper">
    <div class="teacher">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="教师名称">
          <el-input
            size="mini"
            v-model="formInline.teacherName"
            placeholder="教师名称或手机号"
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
            >新建教师</el-button
          >
        </el-form-item>
      </el-form>
      <el-table :data="tableData" style="width: 96%; margin: -20px auto" stripe>
        <el-table-column prop="teacher_name" label="教师名称" align="center">
        </el-table-column>
        <el-table-column prop="phone_number" label="电话号" align="center">
        </el-table-column>
        <el-table-column prop="wechat" label="微信号" align="center">
        </el-table-column>
        <el-table-column prop="teaching_field" label="授课领域" align="center">
        </el-table-column>
        <el-table-column prop="teacher_level" label="教师职称" align="center">
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="mini"
              >编辑</el-button
            >
            <el-button type="text" size="mini" @click="handledea(scope.row)"
              >详情</el-button
            >
            <el-button type="text" size="mini" @click="handledel(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="teacher_right" v-show="isBlock">
      <div class="teacher_right_btn" v-show="isdetail == 2">
        <div class="btn">
          <el-button type="primary" size="mini" @click="upde"
            >保存修改</el-button
          >
        </div>
      </div>
      <div
        class="detail"
        v-show="isdetail == 1"
        style="text-align: center; font-size: 24px; margin-top: 20px"
      >
        教师详情
      </div>
      <div class="teacher_right_line" v-show="isdetail == 2"></div>
      <div class="teacher_img">
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
            v-if="formLabelAlign.photo"
            :src="formLabelAlign.photo"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </div>
      <div class="form">
        <el-form
          label-width="74px"
          :model="formLabelAlign"
          :label-position="labelPosition"
        >
          <el-form-item label="教师名称:">
            <el-input
              v-model="formLabelAlign.teacher_name"
              size="mini"
              style="width: 170px"
              :disabled="isdetail == 1"
            ></el-input>
          </el-form-item>
          <el-form-item label="教师职称:">
            <el-select
              size="mini"
              v-model.number="formLabelAlign.level"
              placeholder="请选择教师职称"
              :disabled="isdetail == 1"
            >
              <el-option
                v-for="item in teacherlevel"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="电话:">
            <el-input
              v-model.number="formLabelAlign.phone_number"
              size="mini"
              :disabled="isdetail == 1"
              style="width: 170px"
            ></el-input>
          </el-form-item>
          <el-form-item label="微信号:">
            <el-input
              v-model="formLabelAlign.wechat_openid"
              size="mini"
              style="width: 170px"
              :disabled="isdetail == 1"
            ></el-input>
          </el-form-item>
          <el-form-item label="授课领域:">
            <el-select
              size="mini"
              v-model.number="formLabelAlign.teaching_field"
              placeholder="请选择授课领域"
              :disabled="isdetail == 1"
            >
              <el-option
                v-for="item in teaching_field"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="教师简介:">
            <el-input
              v-model="formLabelAlign.self_introduction"
              size="mini"
              style="width: 170px"
              type="textarea"
              :disabled="isdetail == 1"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 新增教师对话框 -->
    <el-dialog
      title="新增教师"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="closeDialog"
    >
      <el-form :model="form">
        <el-form-item label="教师名称" :label-width="formLabelWidth">
          <el-input v-model="form.teacher_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="11">
            <el-form-item label="教师电话" :label-width="formLabelWidth">
              <el-input
                v-model.number="form.phone_number"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="教师微信号" :label-width="formLabelWidth">
              <el-input
                v-model="form.wechat_openid"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="教师简介" :label-width="formLabelWidth">
          <el-input
            v-model="form.self_introduction"
            autocomplete="off"
            type="textarea"
          ></el-input>
        </el-form-item>

        <el-row>
          <el-col :span="11"
            ><el-form-item label="授课领域" :label-width="formLabelWidth">
              <el-select
                v-model.number="form.teaching_field"
                placeholder="请选择授课领域"
              >
                <el-option
                  v-for="item in teaching_field"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select> </el-form-item
          ></el-col>
          <el-col :span="11"
            ><el-form-item label="教师职称" :label-width="formLabelWidth">
              <el-select
                v-model.number="form.level"
                placeholder="请选择教师职称"
              >
                <el-option
                  v-for="item in teacherlevel"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select> </el-form-item
          ></el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="insertque">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  teachList,
  insertTeacher,
  delTeacher,
  Teacherdetail,
  upteaImg,
  upteacher,
} from "@/api/Traincertification/teacherMan";
export default {
  data() {
    return {
      closeDialog: false,
      labelPosition: "left",
      isBlock: false, // 详情编辑
      dialogFormVisible: false,
      isdetail: 1,
      teacherId: "",
      form: {
        teacher_name: "",
        phone_number: null,
        wechat_openid: "",
        teaching_field: null,
        self_introduction: "",
        level: "",
      },
      teaching_field: [
        {
          value: 0,
          label: "综合领域",
        },
        {
          value: 1,
          label: "PLC",
        },
        {
          value: 2,
          label: "工业机器人",
        },
        {
          value: 3,
          label: "机器视觉",
        },
      ],
      teacherlevel: [
        {
          value: 0,
          label: "暂未获取",
        },
        {
          value: 1,
          label: "助教",
        },
        {
          value: 2,
          label: "初级讲师",
        },
        {
          value: 3,
          label: "中级讲师",
        },
        {
          value: 4,
          label: "高级讲师",
        },
      ],
      formLabelWidth: "120px",
      formInline: {
        teacherName: "",
      },
      formLabelAlign: {
        teacher_name: "",
        phone_number: null,
        wechat_openid: "",
        teaching_field: null,
        self_introduction: "",
        level: "",
        photo: "",
      },
      tableData: [],
    };
  },
  created() {
    this.getTeachers();
  },
  methods: {
    // 编辑确定按钮
    upde() {
      delete this.formLabelAlign.photo;
      // console.log(this.formLabelAlign);
      this.formLabelAlign.type = "2";
      upteacher(this.formLabelAlign).then((res) => {
        // console.log(res);
        if (res) {
          if (res.code == 1000) {
            this.$message({
              message: res.msg,
              type: "success",
              duration: 5 * 1000,
            });
            this.getTeachers();
            this.getTeacher(this.teacherId);
          }
        } else {
          this.getTeacher(this.teacherId);
        }
      });
    },
    // 详情按钮
    handledea(row) {
      this.getTeacher(row.teacher_id);
      this.isBlock = true;
      this.teacherId = row.teacher_id;
      this.isdetail = 1;
    },
    // 教师详情
    getTeacher(id) {
      Teacherdetail(id).then((res) => {
        // console.log(res);
        this.formLabelAlign = {
          teacher_id: res.data.teacher_id,
          teacher_name: res.data.name,
          phone_number: Number(res.data.phone),
          wechat_openid: res.data.wechat,
          teaching_field: res.data.teaching_field,
          self_introduction: res.data.introduction,
          level: res.data.level,
          photo: `https://znzz.tech/${res.data.photo}`,
        };
      });
    },
    // 删除教师
    handledel(row) {
      this.$confirm("此操作将永久删除该老师, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delTeacher({ type: "0", teacher_id: row.teacher_id }).then((res) => {
            // console.log(res)
            if (res.code == 1000) {
              this.$message({
                message: res.msg,
                type: "success",
                duration: 5 * 1000,
              });
              this.getTeachers();
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
    // 新增教师
    insertque() {
      // console.log(this.form);
      this.form.type = "1";
      insertTeacher(this.form).then((res) => {
        // console.log(res);
        if (res.code == 1000) {
          this.dialogFormVisible = false;
          this.$message({
            message: res.msg,
            type: "success",
            duration: 5 * 1000,
          });
          this.getTeachers();
          this.closeDia();
        }
      });
    },
    //弹出窗关闭回调
    closeDia() {
      this.form = {
        teacher_name: "",
        phone_number: null,
        wechat_openid: "",
        teaching_field: null,
        self_introduction: "",
        level: "",
      };
    },
    // 获取老师列表
    getTeachers() {
      teachList().then((res) => {
        // console.log(res);
        this.tableData = res.data.teacher_list;
      });
    },
    onSubmit() {
      // console.log("submit!");
    },
    handleClick(row) {
      this.isBlock = true;
      this.isdetail = 2;
      this.getTeacher(row.teacher_id);
      this.teacherId = row.teacher_id;
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
        fd.append("teacher_photo", file);
        upteaImg(this.teacherId, fd).then((res) => {
          // console.log(rs);
          if (res.code == 1000) {
            this.$message({
              message: res.msg,
              type: "success",
              duration: 5 * 1000,
            });
            this.getTeacher(this.teacherId);
            this.getTeachers();
          }
        });
      }

      return isJPG && isLt2M;
    },
    handleAvatarSuccess() {},
  },
};
</script>
<style scoped>
.wrapper {
  /* min-width: 1600px; */
  /* height: 100vh; */
  display: flex;
}
.form {
  width: 90%;
  margin: 0 auto;
}
.teacher {
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
.teacher_right {
  width: 24%;
  height: 710px;
  background-color: white;
  box-shadow: 3px 5px 6px 6px gainsboro;
  overflow: hidden;
  border-radius: 10px;
  margin-top: 20px;
  overflow-y: scroll;
}
.teacher_right_btn {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: flex-end;
}
.btn {
  margin: 20px;
}
.teacher_right_line {
  width: 90%;
  margin: 0 auto;
  border-bottom: 1px solid #d2d2d2;
}
.teacher_img {
  width: 58%;
  height: 224px;
  margin: 20px auto;
}
.teacher_img img {
  width: 100%;
  height: 224px;
}
</style>