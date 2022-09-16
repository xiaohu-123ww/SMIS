<template>
  <div class="wrapper">
    <div class="classMan">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学员名称">
          <el-input
            size="mini"
            v-model="formInline.studentName"
            placeholder="学员名称或班级名称"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" size="mini"
            >搜索</el-button
          >
        </el-form-item>
        <el-form-item label="状态">
          <el-select
            v-model="formInline.status"
            placeholder="学员"
            size="mini"
            style="width: 100px"
            @change="selectchange"
          >
            <el-option label="学员" value="student"></el-option>
            <el-option label="考试" value="exam"></el-option>
            <el-option label="线上课" value="online"></el-option>
            <el-option label="证书" value="cert"></el-option>
            <el-option label="实训" value="traning"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="Classhourstoup"
            size="mini"
            v-if="zhuangtai == 'online' && JSON.stringify(failed_dates) != '[]'"
            >线上学时补更新</el-button
          >
          <el-button
            type="primary"
            @click="Examup"
            size="mini"
            v-if="zhuangtai == 'exam'"
            >考试进度更新</el-button
          >
          <el-button
            type="primary"
            @click="certSelect"
            size="mini"
            v-if="zhuangtai == 'cert'"
            >证书一键审查</el-button
          >
        </el-form-item>
      </el-form>
      <el-table :data="tableData" style="width: 96%; margin: -20px auto" stripe>
        <el-table-column prop="student_name" label="学员名称" align="center">
        </el-table-column>
        <el-table-column prop="wechat" label="学员微信" align="center">
        </el-table-column>
        <el-table-column prop="phone" label="学员手机号" align="center">
        </el-table-column>
        <el-table-column prop="sexChi" label="性别" align="center">
        </el-table-column>
        <!-- 、考试成绩、达标成绩、是否已达标 -->
        <el-table-column
          prop="cert_progressChi"
          label="考试成绩"
          align="center"
          v-if="zhuangtai == 'exam'"
        >
          <template slot-scope="scope">
            <p>
              {{
                scope.row.exam_tag.exam_score == null
                  ? "暂无"
                  : scope.row.exam_tag.exam_score
              }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop="cert_progressChi"
          label="达标成绩"
          align="center"
          v-if="zhuangtai == 'exam'"
        >
          <template slot-scope="scope">
            <p>{{ scope.row.exam_tag.pass_line }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="cert_progressChi"
          label="参加考试时间"
          align="center"
          v-if="zhuangtai == 'exam'"
        >
          <template slot-scope="scope">
            <p>
              {{
                scope.row.exam_tag.join_time == null
                  ? "暂无"
                  : scope.row.exam_tag.join_time
              }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop="exam_progressChi"
          label="考试是否达标"
          align="center"
          v-if="
            zhuangtai == 'student' || zhuangtai == 'cert' || zhuangtai == 'exam'
          "
        >
          <template slot-scope="scope">
            <p>{{ scope.row.exam_tag.is_passed ? "是" : "否" }}</p>
          </template>
        </el-table-column>
        <!-- 实训成绩、可参与次数、截止时间、达标成绩 -->
        <el-table-column
          prop="cert_progressChi"
          label="实训成绩"
          align="center"
          v-if="zhuangtai == 'traning'"
        >
          <template slot-scope="scope">
            <p>
              {{
                scope.row.practice_tag.practice_score == null
                  ? "暂无"
                  : scope.row.practice_tag.practice_score
              }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop="cert_progressChi"
          label="可参与次数"
          align="center"
          v-if="zhuangtai == 'traning'"
        >
          <template slot-scope="scope">
            <p>{{ scope.row.practice_tag.available_times }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="cert_progressChi"
          label="截止时间"
          align="center"
          v-if="zhuangtai == 'traning'"
        >
          <template slot-scope="scope">
            <p>
              {{
                scope.row.practice_tag.deadline == null
                  ? "暂无"
                  : scope.row.practice_tag.deadline
              }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop="cert_progressChi"
          label="达标成绩"
          align="center"
          v-if="zhuangtai == 'traning'"
        >
          <template slot-scope="scope">
            <p>{{ scope.row.practice_tag.pass_line }}</p>
          </template>
        </el-table-column>
        <!-- 累计学习时长、上次新增时长、达标时长、 -->
        <el-table-column
          prop="cert_progressChi"
          label="累计学习时长"
          align="center"
          v-if="zhuangtai == 'online'"
        >
          <template slot-scope="scope">
            <p>{{ scope.row.online_study_tag.accumulated_hour }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="cert_progressChi"
          label="上次新增时长"
          align="center"
          v-if="zhuangtai == 'online'"
        >
          <template slot-scope="scope">
            <p>{{ scope.row.online_study_tag.lastest_hour }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="cert_progressChi"
          label="达标时长"
          align="center"
          v-if="zhuangtai == 'online'"
        >
          <template slot-scope="scope">
            <p>{{ scope.row.online_study_tag.pass_line }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="cert_progressChi"
          label="实训是否达标"
          width="120px"
          align="center"
          v-if="
            zhuangtai == 'student' ||
            zhuangtai == 'cert' ||
            zhuangtai == 'traning'
          "
        >
          <template slot-scope="scope">
            <p>{{ scope.row.practice_tag.is_passed ? "是" : "否" }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="practice_progressChi"
          label="线上课是否达标"
          width="120px"
          align="center"
          v-if="
            zhuangtai == 'student' ||
            zhuangtai == 'cert' ||
            zhuangtai == 'online'
          "
        >
          <template slot-scope="scope">
            <p>{{ scope.row.online_study_tag.is_passed ? "是" : "否" }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="cert_progressChi"
          label="证书状态"
          align="center"
          v-if="zhuangtai == 'student'"
        >
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handel(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="classMan_right" v-show="isBlock">
      <div class="classMan_right_btn">
        <div class="btn">
          <el-button type="primary" size="mini">编辑</el-button>
          <el-button type="primary" size="mini">删除</el-button>
        </div>
      </div>
      <div class="classMan_line"></div>
      <div class="classMan_img" vis>
        <!-- <img :src="formLabelAlign.ads_picture" alt="" /> -->
        <el-upload
          :before-upload="beforeAvatarUpload"
          :on-success="handleAvatarSuccess"
          :show-file-list="false"
          action=""
          class="avatar-uploader"
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
          label-width="130px"
          :model="formLabelAlign"
          :label-position="labelPosition"
        >
          <el-form-item label="学员名称:">
            <el-input
              v-model="formLabelAlign.className"
              size="mini"
              style="width: 180px"
            ></el-input>
          </el-form-item>
          <el-form-item label="电话/微信号:">
            <el-input
              v-model="formLabelAlign.className"
              size="mini"
              style="width: 180px"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-dialog
      title="删除确认"
      :visible.sync="dialogdel"
      width="35%"
      :close-on-click-modal="escdialog"
    >
      <div>
        <p style="font-size: 20px; width: 80%; margin: 0 auto">
          是否确认删除该学员?确认请手动输入【确认删除+学员姓名】。
        </p>
        <p style="font-size: 15px"></p>
        <div style="width: 60%; margin: 40px auto">
          <el-input
            placeholder="确认删除+学员姓名"
            v-model="delstudent"
          ></el-input>
        </div>
        <div style="width: 80%; margin: 0 auto">
          <h4>注意:</h4>
          <p style="margin:5px">1.删除学员后其一切学习进度(线上课、考试、实训)同时删除;</p>
          <p  style="margin:5px">2.删除操作无法撤销;</p>
          <p  style="margin:5px">3.删除操作仅会将学员从改班级中踢出并不会同时删除该学员账号</p>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogdel = false">取 消</el-button>
        <el-button type="primary" @click="delStudent">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 线上课时补更新 -->
    <el-dialog
      title="补更新学时"
      :visible.sync="dialogtimeUpdate"
      @close="timeclose"
    >
      <div style="font-size: 16px; width: 50%; margin: 0 auto">
        <p>选择日期进行手动更新。</p>
        <el-select v-model="timeUP" placeholder="请选择">
          <el-option
            v-for="item in failed_dates"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogtimeUpdate = false">取 消</el-button>
        <el-button type="primary" @click="updateTime">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  StudentList,
  delClassStu,
  Examtoupdate,
  certSelected,
  Classhourstoupdate,
} from "@/api/Traincertification/classMan";
export default {
  data() {
    return {
      timeUP: null,
      dialogtimeUpdate: false,
      escdialog: false,
      delstudent: "",
      dialogdel: false,
      student: {},
      formLabelAlign: {
        className: "",
        phone: "",
        ads_picture: "",
      },
      labelPosition: "left",
      isBlock: false, // 详情编辑
      formInline: {
        studentName: "",
      },
      tableData: [],
      zhuangtai: "student", //下拉框的状态
      failed_dates: [],
      examList: [], //考试数组
      onlineList: [], //线上数组
      traningList: [], //实训数组
      certList: [], //证书
      failed_dates: [], // 补学时数组
    };
  },
  created() {
    this.getClassManList();
  },
  methods: {
    timeclose() {
      this.timeUP = null;
    },
    updateTime() {
      Classhourstoupdate(this.$route.query.cld, { date: this.timeUP }).then(
        (res) => {
          if(res.code==1000){
            this.$message({
              type:'success',
              message:res.msg
            })
            this.getClassManList()
          }
          this.dialogtimeUpdate = false;
        }
      );
    },
    // 删除确定按钮
    delStudent() {
      if (this.delstudent == `确认删除${this.student.student_name}`) {
        delClassStu(this.$route.query.cld, {
          type: "300",

          student_id: this.student.student_id,
        }).then((res) => {
          if (res.code == 1000) {
            this.$message({
              message: res.msg,
              type: "success",
              duration: 5 * 1000,
            });
            this.getClassManList();
            this.dialogdel = false;
            this.delstudent = "";
          }
        });
      } else {
        this.$message({
          type: "error",
          message: "您输入的学员姓名不符",
        });
      }
    },
    // selectchange
    selectchange(val) {
      this.zhuangtai = val;
    },
    // 线上课时更新
    Classhourstoup() {
      this.dialogtimeUpdate = true;
    },
    // 证书一键审查
    certSelect() {
      certSelected(this.$route.query.cld).then((res) => {
        if (res.code == 1000) {
          this.$message({
            type: "success",
            message: res.msg,
          });
          this.getClassManList();
        }
      });
    },
    // 考试进度更新
    Examup() {
      Examtoupdate({ class_id: this.$route.query.cld }).then((res) => {
        if (res.code == 1000) {
          this.$message({
            type: "success",
            message: res.msg,
          });
          this.getClassManList();
        }
      });
    },
    // 删除学员
    handel(row) {
      this.dialogdel = true;
      this.student = row;
    },
    // 学员列表
    getClassManList() {
      StudentList(this.$route.query.cld).then((res) => {
        // console.log(res);
        this.failed_dates = res.data.failed_dates;
        res.data.students_list.forEach((item, index) => {
          for (var sex of res.data.sex_map) {
            if (item.sex == sex.idx) {
              item.sexChi = sex.label;
            }
          }
          for (var examprogress of res.data.progress_map) {
            if (item.exam_progress == examprogress.idx) {
              item.exam_progressChi = examprogress.label;
            }
          }
          for (var certexamprogress of res.data.progress_map) {
            if (item.cert_progress == certexamprogress.idx) {
              item.cert_progressChi = certexamprogress.label;
            }
          }
          for (var practiceprogress of res.data.progress_map) {
            if (item.practice_progress == practiceprogress.idx) {
              item.practice_progressChi = practiceprogress.label;
            }
          }
          for (var onlineexamprogress of res.data.progress_map) {
            if (item.online_study_progress == onlineexamprogress.idx) {
              item.online_study_progressChi = onlineexamprogress.label;
            }
          }
        });
        this.tableData = res.data.students_list;
        this.failed_dates = res.data.failed_dates;
      });
    },
    beforeAvatarUpload() {},
    handleAvatarSuccess() {},
    onSubmit() {
      // console.log("submit!");
    },
    handleClick(row) {
      // console.log(row);
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
  width: 100%;
  /* height: 100vh; */
  display: flex;
  flex-direction: column;
}
.classMan {
  width: 90%;
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
.classMan_right {
  width: 24%;
  height: 710px;
  background-color: white;
  box-shadow: 3px 5px 6px 6px gainsboro;
  overflow: hidden;
  border-radius: 10px;
  margin-top: 20px;
  overflow-y: scroll;
}
.classMan_right_btn {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: flex-end;
}
.btn {
  margin: 20px;
}
.classMan_line {
  width: 90%;
  margin: 0 auto;
  border-bottom: 1px solid #d2d2d2;
}
.classMan_img {
  width: 58%;
  height: 224px;
  margin: 20px auto;
}
.classMan_img img {
  width: 100%;
  height: 100%;
}
</style>