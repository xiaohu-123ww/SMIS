<template>
  <div class="wrapper">
    <div class="classDetail">
      <div class="text">
        <div class="text_p">
          <p>{{ this.$route.query.name }}班级</p>
        </div>
        <div class="text_btn">
          <el-button
            type="primary"
            size="mini"
            v-show="isdetail!=false"
            @click="upclass"
            >保存修改</el-button
          >
        </div>
      </div>
      <div class="line"></div>
      <div class="form">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-row>
            <el-col :span="8">
              <el-form-item label="班级名称:">
                <el-input
                  v-model="formInline.class_name"
                  placeholder="请输入班级名称"
                  size="mini"
                :disabled="isdetail==false"
                ></el-input> </el-form-item
            ></el-col>
            <el-col :span="8">
              <el-form-item label="班级类型:">
                <el-select
                  v-model.number="formInline.class_type"
                  placeholder="请选择班级类型"
                :disabled="isdetail==false"
                >
                  <el-option
                    v-for="item in classType"
                    :label="item.lable"
                    :value="item.value"
                    :key="item.value"
                  ></el-option>
                </el-select> </el-form-item
            ></el-col>
            <el-col :span="8">
              <el-form-item label="周期类型:">
                <el-select
                  v-model.number="formInline.class_period"
                  placeholder="请选择班级类型"
               :disabled="isdetail==false"
                >
                  <el-option
                    v-for="item in classPeriod"
                    :label="item.lable"
                    :value="item.value"
                    :key="item.value"
                  ></el-option> </el-select></el-form-item
            ></el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="开始日期:">
                <el-date-picker
                  type="date"
                  :disabled="isdetail==false"
                  placeholder="选择日期"
                  v-model="formInline.start_date"
                  style="width: 100%"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                ></el-date-picker> </el-form-item
            ></el-col>
            <el-col :span="8">
              <el-form-item label="结束日期:">
                <el-date-picker
                  type="date"
                 :disabled="isdetail==false"
                  placeholder="选择日期"
                  v-model="formInline.end_date"
                  style="width: 100%"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                ></el-date-picker> </el-form-item
            ></el-col>
            
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="是否有笔试">
                <el-radio-group
                  v-model="formInline.is_exam_exist"
               :disabled="isdetail==false"
                >
                  <el-radio :label="true">有</el-radio>
                  <el-radio :label="false">否</el-radio>
                </el-radio-group>
              </el-form-item></el-col
            >
            <el-col :span="6">
              <el-form-item label="是否包含证书">
                <el-radio-group
                  v-model="formInline.is_cert_exist"
                :disabled="isdetail==false"
                >
                  <el-radio :label="true">有</el-radio>
                  <el-radio :label="false">否</el-radio>
                </el-radio-group>
              </el-form-item></el-col
            >
            <el-col :span="6">
              <el-form-item label="是否有线上课">
                <el-radio-group
                  v-model="formInline.is_online_study_exist"
                :disabled="isdetail==false"
                >
                  <el-radio :label="true">有</el-radio>
                  <el-radio :label="false">否</el-radio>
                </el-radio-group>
              </el-form-item></el-col
            >
            <el-col :span="6"
              ><el-form-item label="是否有实训">
                <el-radio-group
                  v-model="formInline.is_practice_exist"
                :disabled="isdetail==false"
                >
                  <el-radio :label="true">有</el-radio>
                  <el-radio :label="false">否</el-radio>
                </el-radio-group>
              </el-form-item></el-col
            >
          </el-row>
        </el-form>
      </div>
      <div class="class_btn">
        <el-collapse @change="handleChange">
          <el-collapse-item title="关联教师" name="1" >
            <div v-if="JSON.stringify(teacher_list) != '[]'">
              <el-table :data="teacher_list" style="width: 100%">
                <el-table-column prop="picture" label="教师照片">
                  <template slot-scope="scope">
                    <img
                      :src="yuan + scope.row.picture"
                      alt=""
                      width="80px"
                      height="80px"
                    />
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="姓名"> </el-table-column>
                <el-table-column prop="responsibility" label="职责">
                </el-table-column>
                <el-table-column fixed="right" label="操作">
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      size="small"
                      @click="handledelT(scope.row)"
                     :disabled="isdetail==false"
                      >解除关联</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div v-else>暂无数据</div>
            <el-button
              type="primary"
              size="mini"
              @click="insertTeacher"
              style="float: right; margin: 15px 15px"
            v-if="isdetail"
              >添加关联教师</el-button
            >
          </el-collapse-item>
          <el-collapse-item title="关联课程与证书" name="2"  >
            <div v-if="has_cert_and_course">
              <h4>关联课程</h4>
              <div class="relationCourse">
                <p>课程宣传图</p>
                <p>课程名称</p>
                <p>课程售价</p>
                <p>课程真实售价</p>
                <p>课程类型</p>
                <p>课程方向</p>
              </div>
              <div class="relationCoursecontent">
                <div class="img">
                  <img
                    :src="yuan + related_course.ads_picture"
                    alt=""
                    width="width: 100%;"
                    height="100%"
                  />
                </div>
                <p>{{ related_course.course_name }}</p>
                <p>{{ related_course.course_price }}</p>
                <p>{{ related_course.course_true_price }}</p>
                <p>{{ course_type[related_course.course_type].label }}</p>
                <p>
                  {{ course_direction[related_course.course_direction].label }}
                </p>
              </div>
              <h4>关联证书</h4>
              <div class="relationCourse">
                <p>证书宣传图</p>
                <p>证书名称</p>
                <p>证书等级</p>
                <p>考核方式</p>
                <p>相关岗位</p>
                <p>证书有效期</p>
              </div>
              <div class="relationCoursecontent">
                <div class="img">
                  <img
                    :src="yuan + related_cert.cert_sample"
                    alt=""
                    width="width: 100%;"
                    height="100%"
                  />
                </div>
                <p>{{ related_cert.cert_name }}</p>
                <p>{{ cert_level[related_cert.cert_level].label }}</p>
                <p>
                  {{ testing_way[related_cert.testing_way].label }}
                </p>
                <p>{{ related_cert.cor_positions }}</p>
                <p>{{ related_cert.expiry_date }}</p>
              </div>
            </div>
            <div v-else>暂无数据</div>
            <el-button
              type="primary"
              size="mini"
              @click="updateCC"
              style="float: right; margin: 15px 15px"
              v-if="has_cert_and_course"
               v-show="isdetail"
              >修改课程与证书</el-button
            >
            <el-button
              type="primary"
              size="mini"
              @click="insertCC"
              style="float: right; margin: 15px 15px"
              v-else
             v-show="isdetail"
              >关联课程与证书</el-button
            >
          </el-collapse-item>
          <el-collapse-item title="关联考试" name="3"  >
            <div v-if="has_exam_related">
              <!-- <h4>关联考试</h4> -->
              <div class="relationCourse">
                <p>考试名称</p>
                <p>考试截止时间</p>
                <p>考试时间限制</p>
                <p>考题总数</p>
                <p>考试总分</p>
              </div>
              <div class="relationCoursecontent">
                <p>{{ exam_info.name }}</p>
                <p>{{ exam_info.exam_end_time }}</p>
                 <p>{{ exam_info.exam_time==0?'不限制':'有限制' }}</p>
                  <p>{{ exam_info.total_question }}道</p>
                   <p>{{ exam_info.total_score }}分</p>
              </div>
            </div>
            <div v-else>暂无数据</div>
            <el-button
              type="primary"
              size="mini"
              @click="updateExam"
              style="float: right; margin: 15px 15px"
              v-if="has_exam_related"
              v-show="isdetail"
              >修改关联考试</el-button
            >
            <el-button
              type="primary"
              size="mini"
              @click="insertExam"
              style="float: right; margin: 15px 15px"
              v-else
              v-show="isdetail"
              >新增关联考试</el-button
            >
          </el-collapse-item>
        </el-collapse>
        <el-row>
          <el-button
            type="primary"
            size="mini"
            @click="student"
            style="margin-bottom: 20px"
            >学员管理</el-button
          >
        </el-row>
      </div>
    </div>
    <!-- 新增班级关联教师 -->
    <el-dialog
      title="添加关联教师"
      :visible.sync="dialogteacherVisible"
      @close="dialogclose"
    >
      <el-form :model="form" :rules="formRule" ref="form">
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="教师"
              :label-width="formLabelWidth"
              prop="teacher_id"
            >
              <el-select
                v-model.number="form.teacher_id"
                filterable
                placeholder="请选择"
                popper-class="select_List"
              >
                <el-option
                  :label="item.teacher_name"
                  :value="item.teacher_id"
                  v-for="item in teacher_selcet"
                  :key="item.teacher_id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="教师职责"
              :label-width="formLabelWidth"
              prop="responsibility"
            >
              <el-input
                v-model="form.responsibility"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-row>
            <el-col :span="10" :offset="14">
              <el-button @click="dialogteacherVisible = false">取 消</el-button>
              <el-button type="primary" @click="inserTque">确 定</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 新增班级关联证书与课程 -->
    <el-dialog
      :title="certtitle"
      :visible.sync="dialogcertVisible"
      @close="dialogcertclose"
    >
      <el-form :model="certform" :rules="certfromRule" ref="certForm">
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="课程"
              :label-width="formLabelWidth"
              prop="course_id"
            >
              <el-select
                v-model.number="certform.course_id"
                filterable
                placeholder="请选择"
                popper-class="select_List"
              >
                <el-option
                  :label="item.course_name"
                  :value="item.course_id"
                  v-for="item in courseList"
                  :key="item.course_id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="证书"
              :label-width="formLabelWidth"
              prop="cert_id"
            >
              <el-select
                v-model.number="certform.cert_id"
                filterable
                placeholder="请选择"
                popper-class="select_List"
              >
                <el-option
                  :label="item.cert_name"
                  :value="item.cert_id"
                  v-for="item in certList"
                  :key="item.cert_id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-row>
            <el-col :span="10" :offset="14">
              <el-button @click="dialogcertVisible = false">取 消</el-button>
              <el-button type="primary" @click="inserCque">确 定</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 新增修改考试 -->
    <el-dialog
      :title="examtitle"
      :visible.sync="dialogexamVisible"
      @close="dialogEclose"
    >
      <el-form :model="examform" :rules="examfromRule" ref="examform">
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="考试"
              :label-width="formLabelWidth"
              prop="exam_id"
            >
              <el-select
                v-model="examform.exam_id"
                filterable
                placeholder="请选择"
                popper-class="select_List"
              >
                <el-option
                  :label="item.name"
                  :value="item.id"
                  v-for="item in examList"
                  :key="item.id"
                  :disabled='item.operation==0'
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="合格标准分"
              :label-width="formLabelWidth"
              prop="min_score"
            >
              <el-input-number v-model="examform.min_score" controls-position="right"  ></el-input-number>
           
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-row>
            <el-col :span="10" :offset="14">
              <el-button @click="dialogexamVisible = false">取 消</el-button>
              <el-button type="primary" @click="inserEque">确 定</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { teachList } from "@/api/Traincertification/teacherMan";
import { certList } from "@/api/Traincertification/certMan";
import { courseList } from "@/api/Traincertification/course";
import {
  Classdetail,
  classUp,
  insertTea,
  delTea,
  InsertCertCourse,
  updateCertCourse,
  binding_exam,
  updateExam,
} from "@/api/Traincertification/classMan";
export default {
  data() {
    return {
      examtitle:'',
      exam_info:[],
      dialogexamVisible: false,
      examform: {
        exam_id: null, //考试id
        min_score: null, //合格标准分
      },
       examfromRule: {
        exam_id: [{ required: true, message: "请选择考试", trigger: "change" }],
        min_score: [
          { required: true, message: "请填写合格标准分", trigger: "blur" },
        ],
      },
      has_exam_related:null,//判断是否绑定考试
      has_cert_and_course: null, // 判断是否绑定证书
      related_course: [], // 关联课程数组
      related_cert: [], // 关联证书
      dialogcertVisible: false,
      certform: {
        cert_id: null, //证书id
        course_id: null, //课程ID
      },
      certfromRule: {
        cert_id: [{ required: true, message: "请选择证书", trigger: "change" }],
        course_id: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
      },
      yuan: "https://znzz.tech/",
      isdetail: false,
      teacher_list: [], //教师列表
      teacher_selcet: [],
      dialogteacherVisible: false,
      form: {
        teacher_id: null,
        responsibility: null,
      },
      formRule: {
        teacher_id: [
          { required: true, message: "请选择教师", trigger: "change" },
        ],
        responsibility: [
          { required: true, message: "请填写教师职责", trigger: "blur" },
        ],
      },
      formLabelWidth: "120px",
      classType: [
        { value: 0, lable: "线上课" },
        { value: 1, lable: "线下课" },
        { value: 2, lable: "线上下结合" },
      ],
      classPeriod: [
        { value: 0, lable: "周末班" },
        { value: 1, lable: "平时班" },
      ],
      formInline: {
        class_name: null, //班级名称
        class_type: null, //班级类型
        class_period: null, //周期类型
        start_date: null, //开始日期
        end_date: null, //结束日期
        is_exam_exist: null, //是否有笔试
        is_practice_exist: null, //是否有实训
        is_cert_exist: null, //是否包含证书
        is_online_study_exist: null, //是否有线上课
      },
      courseList: [],
      certList: [],
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
      certtitle: "",
      examList: [],
      isdetail:false,
      obj:{}
    };
  },
  created() {
    if(this.$route.query.cld ){
         this.getClassdetail(this.$route.query.cld )
         this.isdetail=JSON.parse(this.$route.query.isdetail)
        // console.log(1)
    }else{
      var obj=JSON.parse(localStorage.getItem('classdetail'))
         this.getClassdetail(obj.cld)
         this.obj=obj
         this.isdetail=obj.isdetail 
    }
    this.getTeachers();
    this.getCourseList();
    this.getCertlist();
    this.getexam();
    //  || 
    // console.log( )
    // console.log( this.isdetail===false )
  },
  methods: {
    dialogEclose(){
  this.examform= {
        exam_id: null, //考试id
        min_score: null, //合格标准分
      }
    },
    // 新增修改考试确定按钮
    inserEque(){
      this.examform.type='402'
      this.$refs["examform"].validate((valid) => {
        if (valid) {
            updateExam(this.$route.query.cld,this.examform).then(res=>{
            // console.log(res);
            if (res.code == 1000) {
              this.$message({
                type: "success",
                message: res.msg,
              });
            }
            this.dialogexamVisible = false;
            this.getClassdetail(this.$route.query.cld);
          });
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
    // 新增按钮
    insertExam(){
      this.examtitle='新增关联考试'
      this.dialogexamVisible=true
    },
    // 修改按钮
    updateExam(){
      this.examtitle='修改关联考试'
      this.dialogexamVisible=true
      this.examform={
        exam_id: this.exam_info.exam_id, //考试id
        min_score:  this.exam_info.min_exam_score, //合格标准分
      }
    },
    // 获取考试列表
    getexam() {
      binding_exam().then((res) => {
        this.examList = res.data.exam_info_list;
      });
    },
    // 修改证书课程
    updateCC() {
      this.dialogcertVisible = true;
      this.certtitle = "修改证书与课程";
      this.certform = {
        cert_id: this.related_cert.cert_id, //证书id
        course_id: this.related_course.course_id, //课程ID
      };
    },
    // 关联修改证书
    inserCque() {
      if (this.certtitle == "添加关联课程与证书") {
        this.certform.type = "201";
        this.$refs["certForm"].validate((valid) => {
          if (valid) {
            InsertCertCourse(this.$route.query.cld, this.certform).then(
              (res) => {
                // console.log(res);
                if (res.code == 1000) {
                  this.$message({
                    type: "success",
                    message: res.msg,
                  });
                }
                this.getClassdetail(this.$route.query.cld);
                this.dialogcertVisible = false;
              }
            );
          } else {
            // console.log('error submit!!');
            return false;
          }
        });
      } else {
        this.certform.type = "202";
        this.$refs["certForm"].validate((valid) => {
          if (valid) {
            updateCertCourse(this.$route.query.cld, this.certform).then(
              (res) => {
                // console.log(res);
                if (res.code == 1000) {
                  this.$message({
                    type: "success",
                    message: res.msg,
                  });
                }
                this.getClassdetail(this.$route.query.cld);
                this.dialogcertVisible = false;
              }
            );
          } else {
            // console.log('error submit!!');
            return false;
          }
        });
      }
    },
    // 关闭课程清空
    dialogcertclose() {
      this.certform = {
        cert_id: null, //证书id
        course_id: null, //课程ID
      };
    },
    // 添加课程
    insertCC() {
      this.certtitle = "添加关联课程与证书";
      this.dialogcertVisible = true;
    },
    dialogclose() {
      this.form = {
        teacher_id: null,
        responsibility: null,
      };
    },
    // 获取课程列表
    getCourseList() {
      courseList().then((res) => {
        // console.log(res);
        this.courseList = res.data.course_list;
      });
    },
    // 获取证书列表
    getCertlist() {
      certList().then((res) => {
        // console.log(res);
        this.certList = res.data.certification_info;
      });
    },
    // 删除关联教师
    handledelT(row) {
      this.$confirm("此操作将永久删除该老师, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delTea(this.$route.query.cld, {
            type: "100",
            teacher_id: row.teacher_id,
          }).then((res) => {
            if (res.code == 1000) {
              this.$message({
                message: res.msg,
                type: "success",
                duration: 5 * 1000,
              });
              this.getClassdetail(this.$route.query.cld);
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
    // 确定添加教师
    inserTque() {
      this.form.type = "101";
      this.$refs["form"].validate((valid) => {
        if (valid) {
          insertTea(this.$route.query.cld, this.form).then((res) => {
            // console.log(res);
            if (res.code == 1000) {
              this.$message({
                type: "success",
                message: res.msg,
              });
            }
            this.dialogteacherVisible = false;
            this.getClassdetail(this.$route.query.cld);
          });
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
    getTeachers() {
      teachList().then((res) => {
        // console.log(res);
        this.teacher_selcet = res.data.teacher_list;
      });
    },
    // 添加关联教师
    insertTeacher() {
      this.dialogteacherVisible = true;
    },
    handleChange(val) {
      // console.log(val);
    },
    // 编辑按钮
    upclass() {
      this.formInline.type = "2";
      this.formInline.class_id = Number(this.$route.query.cld);
      classUp(this.formInline).then((res) => {
        if ((res.code = 1000)) {
          this.$message({
            type: "success",
            message: res.msg,
          });
          this.getClassdetail(this.$route.query.cld);
        }
      });
    },
    // 班级详情
    getClassdetail(id) {
      Classdetail(id).then((res) => {
        // console.log(res);
        this.formInline = {
          class_name: res.data.class_info.class_name, //班级名称
          class_type: res.data.class_info.class_type, //班级类型
          class_period: res.data.class_info.class_period, //周期类型
          start_date: res.data.class_info.start_date, //开始日期
          end_date: res.data.class_info.end_date, //结束日期
          is_exam_exist: res.data.class_info.has_exam, //是否有笔试
          is_practice_exist: res.data.class_info.has_practice, //是否有实训
          is_cert_exist: res.data.class_info.has_cert, //是否包含证书
          is_online_study_exist: res.data.class_info.has_online_study, //是否有线上课
        };
        this.has_cert_and_course = res.data.has_cert_and_course;
        this.teacher_list = res.data.teacher_list;
        this.related_course = res.data.related_course;
        this.related_cert = res.data.related_cert;
        // has_exam_related
        if(res.data.has_exam_related){
          if(JSON.stringify(res.data.exam_info)=='[]'){
            this.has_exam_related=false
          }else{
            this.has_exam_related=true
            this.exam_info=res.data.exam_info
            this.exam_info.min_exam_score=res.data.class_info.min_exam_score
          }
        }else{
          this.has_exam_related=res.data.has_exam_related
        }
      });
    },
    student() {
      this.$router.push({
        path: "/classMan",
        query: { cld: this.$route.query.cld?this.$route.query.cld:this.obj.cld},
      });
    },
  },
};
</script>
<style scoped>
.wrapper {
  /* width: 100%; */
  /* height: 100vh; */
  display: flex;
  max-width: 1059px;
}
.classDetail {
  width: 100%;
  height: 710px;
  margin: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 3px 5px 6px 6px gainsboro;
  overflow-y: scroll;
}
.text {
  width: 96%;
  height: 50px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.text_p {
  line-height: 20px;
  font-size: 16px;
}
.text_btn {
  line-height: 50px;
}
.line {
  width: 96%;
  margin: 0 auto;
  border-bottom: 1px solid #d2d2d2;
}
.form {
  width: 90%;
  height: 240px;
  margin: 15px auto;
}
.class_btn {
  width: 90%;
  height: 150px;
  margin: 0 auto;
}
.el-button {
  width: 120px;
  margin-top: 10px;
}
i {
  margin-left: 2px;
}
/* /deep/ .el-scrollbar__view,
.el-select-dropdown__list {
  overflow-y: scroll !important;
  height: 114px !important;
} */
/deep/.el-table .cell {
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  word-break: break-all;
  line-height: 23px;
  padding-left: 10px;
  padding-right: 10px;
  text-align: center;
}
/deep/ .el-table th > .cell {
  display: inline-block;
  box-sizing: border-box;
  position: relative;
  vertical-align: middle;
  padding-left: 10px;
  padding-right: 10px;
  width: 100%;
  text-align: center;
}
.relationCourse {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.relationCourse p {
  width: 19%;
  text-align: center;
}
.relationCoursecontent {
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 90px;
}
.relationCoursecontent .img {
  width: 19%;
  height: 90px;
  text-align: center;
}
.relationCoursecontent p {
  width: 19%;
  text-align: center;
}
</style>