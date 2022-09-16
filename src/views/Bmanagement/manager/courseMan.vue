<template>
  <div class="wrapper">
    <div class="course">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="课程名称">
          <el-input
            size="mini"
            v-model="formInline.courseName"
            placeholder="课程名称"
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
            >新建课程</el-button
          >
        </el-form-item>
      </el-form>
      <el-table :data="tableData" style="width: 96%; margin: -20px auto" stripe>
        <el-table-column prop="course_name" label="课程名称" align="center">
        </el-table-column>
        <el-table-column
          prop="course_direction"
          label="课程方向"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="course_type"
          label="课程类别"
          width="120"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="course_price"
          label="课程售价（展示）"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="course_true_price"
          label="课程真实售价"
          align="center"
        >
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="mini"
              >详情</el-button
            >
            <el-button type="text" size="mini" @click="handleupdata(scope.row)"
              >编辑</el-button
            >
            <el-button type="text" size="mini" @click="handleDel(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
    </div>
    <div class="course_right" v-show="isBlock">
      <div class="course_right_btn" v-show="isdetail == 2">
        <div class="btn">
          <el-button type="primary" size="mini" @click="handleup"
            >保存修改</el-button
          >
        </div>
      </div>
      <div class="course_right_line" v-show="isdetail == 2"></div>
      <div
        class="detail"
        v-show="isdetail == 1"
        style="text-align: center; font-size: 24px; margin-top: 20px"
      >
        课程详情
      </div>
      <div class="course_img">
        <!-- <img :src="formLabelAlign.ads_picture" alt="" /> -->
        <el-upload
          :before-upload="beforeAvatarUpload"
          :on-success="handleAvatarSuccess"
          :show-file-list="false"
          action=""
          class="avatar-uploader"
          :disabled="isdetail == 1"
          style="width:100%"
        >
          <img
            v-if="formLabelAlign.ads_picture"
            :src="formLabelAlign.ads_picture"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </div>
      <div class="form">
        <el-form
          label-width="80px"
          :model="formLabelAlign"
          :label-position="labelPosition"
        >
          <el-form-item label="课程名称:">
            <el-input
              v-model="formLabelAlign.course_name"
              size="mini"
              style="width: 150px"
              :disabled="isdetail == 1"
            ></el-input>
          </el-form-item>
          <el-form-item label="课程方向:">
            <el-select
              size="mini"
              v-model.number="formLabelAlign.course_direction"
              placeholder="请选择课程方向"
              :disabled="isdetail == 1"
            >
              <el-option
                v-for="item in course_direction"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="课程类型:">
            <el-select
              v-model.number="formLabelAlign.course_type"
              placeholder="请选择课程类型"
              :disabled="isdetail == 1"
              size="mini"
            >
              <el-option
                v-for="item in course_type"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="课程售价:">
            <el-input
              v-model.number="formLabelAlign.course_price"
              size="mini"
              style="width: 150px"
              :disabled="isdetail == 1"
            ></el-input
            >￥
          </el-form-item>
          <el-form-item label="真实售价:">
            <el-input
              v-model.number="formLabelAlign.course_true_price"
              size="mini"
              type="text"
              style="width: 150px"
              :disabled="isdetail == 1"
            ></el-input
            >￥
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!--  新增课程 -->
    <el-dialog
      title="新增课程"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="closeDialog"
    >
      <el-form :model="form">
        <el-form-item label="课程名称" label-width="120px">
          <el-input v-model="form.course_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="课程售价" label-width="120px">
              <el-input
                v-model.number="form.course_price"
                autocomplete="off"
                style="width: 80%"
              ></el-input
              ><span style="font-size: 19px">￥</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="课程真实售价" label-width="120px">
              <el-input
                v-model.number="form.course_true_price"
                autocomplete="off"
                style="width: 80%"
              ></el-input
              ><span style="font-size: 19px">￥</span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="课程方向" label-width="120px">
              <el-select
                v-model.number="form.course_direction"
                placeholder="请选择课程方向"
              >
                <el-option
                  v-for="item in course_direction"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select> </el-form-item
          ></el-col>
          <el-col :span="12">
            <el-form-item label="课程类型" label-width="120px">
              <el-select
                v-model.number="form.course_type"
                placeholder="请选择课程类型"
              >
                <el-option
                  v-for="item in course_type"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select> </el-form-item
          ></el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="insertQue">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  courseList,
  insertCourse,
  delCourse,
  upCourse,
  upCourseImg,
  Curosedetail,
} from "@/api/Traincertification/course.js";
export default {
  data() {
    return {
      closeDialog: false,
      course_id: "",
      labelPosition: "left",
      isBlock: false, // 弹窗显示
      isdetail: 1,
      formLabelAlign: {
        course_name: "",
        course_price: null,
        course_true_price: null,
        course_type: null,
        course_direction: null,
        ads_picture: "",
      },
      formInline: {
        courseName: "",
      },
      tableData: [],
      dialogFormVisible: false,
      form: {
        course_name: "",
        course_price: null,
        course_true_price: null,
        course_type: null,
        course_direction: null,
      },
      formLabelWidth: "80px",
      course_type: [
        {
          value: 0,
          label: "技能提升班",
        },
        {
          value: 1,
          label: "证书取证班",
        },
        {
          value: 2,
          label: "就业班",
        },
      ],
      course_direction: [
        {
          value: 0,
          label: "PLC",
        },
        {
          value: 1,
          label: "工业机器人",
        },
        {
          value: 2,
          label: "机器视觉",
        },
      ],
    };
  },
  created() {
    this.getCourseList();
  },
  methods: {
    // 获取课程详情
    getCourse(id) {
      Curosedetail(id).then((res) => {
        // console.log(res)
        this.formLabelAlign = {
          course_name: res.data.course_name,
          course_price: res.data.course_price,
          course_true_price: res.data.course_true_price,
          course_type: res.data.course_type,
          course_direction: res.data.course_direction,
          course_id: res.data.course_id,
          ads_picture: `https://znzz.tech/${res.data.ads_picture}`,
        };
      });
    },
    handleAvatarSuccess(res, file) {
      // console.log(file);
      // this.imageUrl = URL.createObjectURL(file.raw);
      // console.log(this.imageUrl);
    },
    beforeAvatarUpload(file) {
      //  console.log( document.getElementsByClassName('el-upload__input'))
      // this.upimages = window.URL.createObjectURL(file);
      // console.log( this.upimages)
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
        fd.append("course_ads_picture", file);
        upCourseImg(this.course_id, fd).then((res) => {
          // console.log(rs);
          if (res.code == 1000) {
            this.$message({
              message: res.msg,
              type: "success",
              duration: 5 * 1000,
            });
            this.getCourseList();
            this.getCourse(this.course_id);
          }
        });
      }

      return isJPG && isLt2M;
    },
    // 编辑确定按钮

    handleup() {
      this.formLabelAlign.type = "2";
      delete this.formLabelAlign.ads_picture;
      upCourse(this.formLabelAlign).then((res) => {
        // console.log(res);
        if (res) {
          if (res.code == 1000) {
            this.$message({
              message: res.msg,
              type: "success",
              duration: 5 * 1000,
            });
            this.getCourseList();
            this.getCourse(this.course_id);
          }
        } else {
          this.getCourse(this.course_id);
        }
      });
    },
    // 编辑展示
    handleupdata(row) {
      this.course_id = row.course_id;
      this.isdetail = 2;
      this.isBlock = true;
      this.getCourse(row.course_id);
    },
    // 详情展示
    handleClick(row) {
      this.isBlock = true;
      this.isdetail = 1;
      this.getCourse(row.course_id);
    },
    // 删除课程列表
    handleDel(row) {
      var obj = {
        type: "0",
        course_id: row.course_id,
      };
      this.$confirm("此操作将永久删除该课程, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delCourse(obj).then((res) => {
            if (res.code == 1000) {
              this.$message({
                message: res.msg,
                type: "success",
                duration: 5 * 1000,
              });
              this.getCourseList();
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
    insertQue() {
      this.form.type = "1";
      // console.log(this.form);
      insertCourse(this.form).then((res) => {
        // console.log(res);
        if (res.code == 1000) {
          this.$message({
            message: res.msg,
            type: "success",
            duration: 5 * 1000,
          });
          this.dialogFormVisible = false;
          this.getCourseList();
          this.closeDia();
        }
      });
    },
    closeDia() {
      this.reset();
    },
    // 重置dialog
    reset() {
      this.form = {
        course_name: "",
        course_price: "",
        course_true_price: "",
        course_type: "",
        course_direction: "",
      };
    },
    // 获取课程列表
    getCourseList() {
      courseList().then((res) => {
        // console.log(res);
        this.tableData = res.data.course_list;
      });
    },
    onSubmit() {
      // console.log("submit!");
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
  /* width: 100%;
   */
  /* min-width: 1600px; */
  /* height: 100vh; */
  display: flex;
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
.course_right {
  width: 24%;
  height: 710px;
  background-color: white;
  box-shadow: 3px 5px 6px 6px gainsboro;
  overflow: hidden;
  border-radius: 10px;
  margin-top: 20px;
  overflow-y: scroll;
}
.course_right_btn {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: flex-end;
}
.btn {
  margin: 20px;
}
.course_right_line {
  width: 90%;
  margin: 0 auto;
  border-bottom: 1px solid #d2d2d2;
}
.course_img {
  width: 80%;;
  height: 224px;
  margin: 20px auto;
}
.course_img img {
  width: 100%;
  height: 224px;
}
/deep/.el-upload{
  width: 100%;
}
</style>