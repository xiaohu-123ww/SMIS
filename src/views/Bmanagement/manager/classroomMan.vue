<template>
  <div class="wrapper">
    <div class="classRoom">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="班级名称">
          <el-input
            size="mini"
            v-model="formInline.className"
            placeholder="班级名称或老师名称"
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
            placeholder="正常"
            size="mini"
            style="width: 100px"
            @change="selectchange"
          >
            <el-option label="已关闭" value="close"></el-option>
            <el-option label="正常" value="normal"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="mini"
            @click="dialogFormVisible = true"
            >新建班级</el-button
          >
        </el-form-item>
      </el-form>
      <el-table :data="tableData" style="width: 96%; margin: -20px auto" stripe>
        <el-table-column
          prop="class_name"
          label="班级名称"
          width="140"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="class_type"
          label="班级类型"
          width="140"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="class_period"
          label="周期类型"
          width="140"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="start_date"
          label="开始日期"
          width="140"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="end_date"
          label="结束日期"
          width="140"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="class_status"
          label="班级状态"
          width="140"
          align="center"
        >
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="mini"
              v-show="scope.row.status == 1"
              @click="revoke(scope.row)"
              >撤销关闭</el-button
            >
            <el-button
              type="text"
              size="mini"
              v-show="scope.row.status == 0"
              @click="closeClass(scope.row)"
              >关闭班级</el-button
            >
            <el-button @click="handleClick(scope.row)" type="text" size="mini"
              >编辑</el-button
            >
            <el-button type="text" size="mini" @click="detail(scope.row)"
              >详情</el-button
            >
            <el-button type="text" size="mini" @click="handledel(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 新增班级 -->
      <el-dialog
        title="新增班级"
        :visible.sync="dialogFormVisible"
        @close="quxiao"
      >
        <el-form :model="form">
          <el-row>
            <el-col :span="12">
              <el-form-item label="班级名称" :label-width="formLabelWidth">
                <el-input
                  v-model="form.class_name"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="班级类型" :label-width="formLabelWidth">
                <el-select
                  v-model.number="form.class_type"
                  placeholder="请选择班级类型"
                >
                  <el-option
                    v-for="item in classType"
                    :label="item.lable"
                    :value="item.value"
                    :key="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="实训达标成绩" :label-width="formLabelWidth">
                 <el-input-number v-model="form.min_practice_score" controls-position="right"  ></el-input-number>
               
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="周期类型" :label-width="formLabelWidth">
                <el-select
                  v-model.number="form.class_period"
                  placeholder="请选择班级类型"
                >
                  <el-option
                    v-for="item in classPeriod"
                    :label="item.lable"
                    :value="item.value"
                    :key="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="开始日期" :label-width="formLabelWidth">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.start_date"
                  style="width: 100%"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="结束日期" :label-width="formLabelWidth">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.end_date"
                  style="width: 100%"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="是否有笔试" :label-width="formLabelWidth">
                <el-radio-group v-model="form.is_exam_exist">
                  <el-radio :label="true">有</el-radio>
                  <el-radio :label="false">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否包含证书" :label-width="formLabelWidth">
                <el-radio-group v-model="form.is_cert_exist">
                  <el-radio :label="true">有</el-radio>
                  <el-radio :label="false">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="是否有线上课" :label-width="formLabelWidth">
                <el-radio-group v-model="form.is_online_study_exist">
                  <el-radio :label="true">有</el-radio>
                  <el-radio :label="false">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否有实训" :label-width="formLabelWidth">
                <el-radio-group v-model="form.is_practice_exist">
                  <el-radio :label="true">有</el-radio>
                  <el-radio :label="false">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item
                label="线上学习达标时长"
                :label-width="formLabelWidth"
              >
              <el-input-number v-model="form.min_study_time" controls-position="right"  ></el-input-number>
                
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogque">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {
  classList,
  insertCla,
  delClass,
  closeClass,
  revokeClass,
} from "@/api/Traincertification/classMan.js";
export default {
  data() {
    return {
      zhuangtai: "normal", //状态栏数据
      classType: [
        { value: 0, lable: "线上课" },
        { value: 1, lable: "线下课" },
        { value: 2, lable: "线上下结合" },
      ],
      classPeriod: [
        { value: 0, lable: "周末班" },
        { value: 1, lable: "平时班" },
      ],
      classStatus: [
        { value: 0, lable: "未开始" },
        { value: 1, lable: "进行中" },
        { value: 2, lable: "已结束" },
        { value: 3, lable: "已关闭" },
      ],
      class_not_closed: [], // 没有关闭班级
      class_closed: [], //已关闭
      formInline: {},
      dialogFormVisible: false,
      formLabelWidth: "140px",
      form: {
        class_name: null, //班级名称
        class_type: null, //班级类型
        class_period: null, //周期类型
        start_date: null, //开始日期
        end_date: null, //结束日期
        is_exam_exist: null, //是否有笔试
        is_practice_exist: null, //是否有实训
        is_cert_exist: null, //是否包含证书
        is_online_study_exist: null, //是否有线上课
        min_practice_score: null, //实训达标成绩
        min_study_time: null, //线上学习达标时长
      },
      tableData: [],
    };
  },
  created() {
    this.getClassList();
  },
  methods: {
    // 关闭班级
    closeClass(row) {
      this.$confirm("此操作将关闭班级，后续可撤销改操作,关闭过程中学生无法进行报名，班级数据不会更新，如确定关闭请点击确定。", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          closeClass({ type: "201", class_id: row.class_id }).then((res) => {
            if (res.code == 1000) {
              this.$message({
                message: res.msg,
                type: "success",
                duration: 5 * 1000,
              });
              this.getClassList();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消关闭",
          });
        });
    },
    // 撤销班级
    revoke(row) {
      this.$confirm("此操作将撤销关闭该班级, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          revokeClass({ type: "202", class_id: row.class_id }).then((res) => {
            if (res.code == 1000) {
              this.$message({
                message: res.msg,
                type: "success",
                duration: 5 * 1000,
              });
              this.getClassList();
              this.$nextTick(() => {
                this.tableData = this.class_closed;
              });

              // console.log(this.tableData);
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
    // 删除按钮
    handledel(row) {
      this.$confirm("此操作将永久删除该班级, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delClass({ type: "0", class_id: row.class_id }).then((res) => {
            if (res.code == 1000) {
              this.$message({
                message: res.msg,
                type: "success",
                duration: 5 * 1000,
              });
              this.getClassList();
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
    // 弹出框关闭回调
    quxiao() {
      this.form = {
        class_name: null, //班级名称
        class_type: null, //班级类型
        class_period: null, //周期类型
        start_date: null, //开始日期
        end_date: null, //结束日期
        is_exam_exist: null, //是否有笔试
        is_practice_exist: null, //是否有实训
        is_cert_exist: null, //是否包含证书
        is_online_study_exist: null, //是否有线上课
        min_practice_score: null, //实训达标成绩
        min_study_time: null, //线上学习达标时长
      };
    },
    dialogque() {
      this.form.type = "1";
      insertCla(this.form).then((res) => {
        if ((res.code = 1000)) {
          this.$message({
            type: "success",
            message: res.msg,
          });
          this.getClassList();
          this.dialogFormVisible = false;
        }
      });
    },
    // 状态下拉框
    selectchange(val) {
      // console.log(val)
      if (val == "normal") {
        this.zhuangtai = "normal";
        this.tableData = this.class_not_closed;
      } else {
          this.zhuangtai = "close";
        this.tableData = this.class_closed;
      }
    },
    getClassList() {
      classList().then((res) => {
        // console.log(res)
        res.data.class_not_closed.forEach((item, index) => {
          for (var classt of this.classType) {
            if (item.class_type == classt.value) {
              item.class_type = classt.lable;
            }
          }
          for (var classp of this.classPeriod) {
            if (item.class_period == classp.value) {
              item.class_period = classp.lable;
            }
          }
          for (var classs of this.classStatus) {
            if (item.class_status == classs.value) {
              item.class_status = classs.lable;
            }
          }
          item.status = 0;
        });
        res.data.class_closed.forEach((item, index) => {
          item.status = 1;
          for (var classt of this.classType) {
            if (item.class_type == classt.value) {
              item.class_type = classt.lable;
            }
          }
          for (var classp of this.classPeriod) {
            if (item.class_period == classp.value) {
              item.class_period = classp.lable;
            }
          }
          for (var classs of this.classStatus) {
            if (item.class_status == classs.value) {
              item.class_status = classs.lable;
            }
          }
        });
        if (this.zhuangtai == "normal") {
          this.tableData = res.data.class_not_closed;
        } else {
          this.tableData = res.data.class_closed;
        }

        this.class_not_closed = res.data.class_not_closed;
        this.class_closed = res.data.class_closed;
      });
    },
    onSubmit() {
      // console.log("submit!");
    },
    handleClick(row) {
      // console.log(row);
      localStorage.setItem('classdetail',JSON.stringify({ cld: row.class_id,name:row.class_name,isdetail:true }))
       this.$router.push({ path: "classDetail", query: { cld: row.class_id,name:row.class_name,isdetail:true } });
    },
    //跳转到班级详情页
    detail(row) {
            localStorage.setItem('classdetail',JSON.stringify({ cld: row.class_id,name:row.class_name,isdetail:false }))
      this.$router.push({ path: "classDetail", query: { cld: row.class_id,name:row.class_name,isdetail:false } });
    },
  },
};
</script>
<style scoped>
.wrapper {
  width: 100%;
  
  /* height: 100vh; */
  display: flex;
}
.classRoom {
      width: 100%;
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
</style>