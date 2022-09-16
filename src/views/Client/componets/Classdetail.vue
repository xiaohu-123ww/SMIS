<template>
  <div class="detail-wrapper">
    <!-- <h1 style="width: 80%; margin: 0 auto; font-size: 40px; margin-top: 14px">
      班级详情
    </h1> -->
    <div class="detailheader">
      <div class="header">
        <div class="headertop">
          <p>
            <span>{{ classInfo.class_name }}</span>{{ classInfo.start_date }}-{{ classInfo.end_date }}
          </p>
          <div>
            <span
              style="cursor: pointer; margin-right: 20px"
              @click="customerservice"
            >报名咨询</span>
            <el-button
              v-if="ClassDeinfo.student_has_joint_this_class"
              type="info"
              disabled
            >已报名</el-button>
            <el-button
              v-else
              type="primary"
              @click="Singup"
            >报名班级</el-button>
          </div>
        </div>
        <div class="headerbottom">
          <el-button size="small" round>{{
            classInfo.class_periodc
          }}</el-button>
          <el-button size="small" round>{{ classInfo.class_typec }}</el-button>
          <el-button
            v-if="ClassDeinfo.has_cert_and_course"
            size="small"
            round
          >{{ ClassDeinfo.related_course.course_typec }}</el-button>
          <el-button
            v-if="ClassDeinfo.has_cert_and_course"
            size="small"
            round
          >{{ ClassDeinfo.related_course.course_directionc }}</el-button>
        </div>
      </div>
    </div>
    <div class="detailnav">
      <div v-show="classInfo.has_online_study" class="navcl">
        <div class="round">
          <i class="el-icon-check" />
        </div>
        <span style="font-size: 18px; margin-left: 10px">线上课</span>
      </div>
      <div v-show="classInfo.has_exam" class="navcl">
        <div class="round">
          <i class="el-icon-check" />
        </div>
        <span style="font-size: 18px; margin-left: 10px">实验教学</span>
      </div>
      <div v-show="classInfo.has_exam" class="navcl">
        <div class="round">
          <i class="el-icon-check" />
        </div>
        <span style="font-size: 18px; margin-left: 10px">线上笔试</span>
      </div>
      <div v-show="classInfo.has_cert" class="navcl">
        <div class="round">
          <i class="el-icon-check" />
        </div>
        <span style="font-size: 18px; margin-left: 10px">证书发放</span>
      </div>
    </div>
    <div v-if="ClassDeinfo.has_cert_and_course" class="detailCC">
      <div class="CCDetail">
        <div class="CCtitle">
          <p>课程介绍</p>
          <i class="el-icon-arrow-right" />
        </div>
        <div
          class="CCcontent"
          @click="coursedetail(ClassDeinfo.related_course.course_id)"
        >
          <img
            :src="yuan + ClassDeinfo.related_course.ads_picture"
            alt=""
          >
          <p>{{ ClassDeinfo.related_course.course_name }}</p>
        </div>
      </div>
      <div class="CCDetail">
        <div class="CCtitle">
          <p>证书介绍</p>
          <i class="el-icon-arrow-right" />
        </div>
        <div
          class="CCcontent"
          @click="certdetail(ClassDeinfo.related_cert.cert_id)"
        >
          <img :src="yuan + ClassDeinfo.related_cert.cert_sample" alt="">
          <p>{{ ClassDeinfo.related_cert.cert_name }}</p>
        </div>
      </div>
    </div>
    <!-- 师资 -->
    <div class="classTeacher">
      <dir class="classTeacher_title">
        师资配置
        <dir class="decorate" />
      </dir>
      <div
        v-if="JSON.stringify(ClassDeinfo.teacher_list) != '[]'"
        class="classTeacher_cent"
      >
        <div
          v-for="(item, index) in ClassDeinfo.teacher_list"
          :key="index"
          class="Teacher"
        >
          <div class="teacherimg">
            <img :src="yuan + item.picture" alt="">
          </div>
          <div class="teacherDetail">
            <p>
              {{ item.name }}
              <span
                v-if="item.level != 0"
                style="font-size: 15px; margin-left: 5px"
              >({{ level[item.level].lable }})</span>
            </p>
            <el-button round size="small">{{
              field[item.field].lable
            }}</el-button>
            <div class="teacherzize">
              <p>教师职责:</p>
              <p>
                {{ item.responsibility }}
              </p>
            </div>
            <div class="teacherzize">
              <p>教师简介:</p>
              <p style="margin: 0">
                <!-- {{  }} -->
                <Spread :mes2="item.intro" />
              </p>
            </div>
            <div class="teacherzize">
              <p>联系方式:</p>
              <p>{{ item.phone }} / {{ item.wechat }}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-else style="font-size: 26px; margin-top: 40px">该班级暂无师资</div>
      <!-- <el-collapse v-model="activeNames">
        <el-collapse-item title="师资配置" name="1" style="font-size: 20px" />
      </el-collapse> -->
    </div>
    <!-- 考试 -->
    <div class="classExam">
      <div class="classExam_title">
        考试信息
        <dir class="decorate" />
      </div>
      <div
        v-if="
          JSON.stringify(ClassDeinfo.exam_info) != '[]' &&
            ClassDeinfo.has_exam_related == true
        "
        class="classExam_cent"
      >
        <div>
          <p style="font-size: 22px; margin-left: 20px">
            {{ ClassDeinfo.exam_info.name }}
          </p>
          <div class="conetent">
            <p style="width: 30%">
              考试时间限制:<span>{{
                ClassDeinfo.exam_info.exam_time == 0 ? "无" : "有"
              }}</span>
            </p>
            <p style="width: 60%">
              考试截止时间:<span>{{
                ClassDeinfo.exam_info.exam_end_time
              }}</span>
            </p>
          </div>
          <div class="conetent">
            <p style="width: 30%">
              考试题目总数:<span>{{
                ClassDeinfo.exam_info.total_question
              }}</span>
            </p>
            <p style="width: 60%">
              考试总分统计:<span>{{
                ClassDeinfo.exam_info.total_score
              }}</span>
            </p>
          </div>
        </div>
      </div>
      <div v-else style="font-size: 26px; margin-top: 40px">该班级暂无考试</div>
    </div>
    <register ref="children" />
    <el-dialog title="报名咨询" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="联系方式" label-width="150px">
          <el-input v-model="phonenum" autocomplete="off" style="width: 80%" />
        </el-form-item>
        <el-form-item label="咨询内容" label-width="150px">
          <el-input
            v-model="Zixuncontent"
            autocomplete="off"
            style="width: 80%"
            type="textarea"
          />
        </el-form-item>
        <el-form-item label-width="80px">
          <p>注:相关工作人员会在1个工作日内联系您</p>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="custque">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { Classdetail } from '@/api/Traincertification/classMan';
import { signupClass, custservice } from '@/api/Traincertification/Clinetindex';
import {
  Clientindex,
  ClientMydetail,
  userRestudent,
  onclick
} from '@/api/Traincertification/Clinetindex';
import register from '../componets/register.vue';
import Spread from './Ziti.vue';
export default {
  components: { register, Spread },
  data() {
    return {
      Zixuncontent: null,
      phonenum: null,
      course_id: null,
      dialogFormVisible: false,
      yuan: 'https://znzz.tech/',
      activeNames: ['1'],
      activeExams: ['1'],
      ClassDeinfo: {
        has_cert_and_course: null,
        related_course: {},
        related_cert: {},
        teacher_list: [],
        exam_info: [],
        has_exam_related: null,
        student_has_joint_this_class: null
      },
      classInfo: {},
      class_type: [
        { value: 0, lable: '线上课' },
        { value: 1, lable: '线下课' },
        { value: 2, lable: '线上下结合' }
      ],
      class_period: [
        { value: 0, lable: '周末班' },
        { value: 1, lable: '平时班' }
      ],
      course_type: [
        {
          value: 0,
          lable: '技能提升班'
        },
        {
          value: 1,
          lable: '证书取证班'
        },
        {
          value: 2,
          lable: '就业班'
        }
      ],
      course_direction: [
        {
          value: 0,
          lable: 'PLC'
        },
        {
          value: 1,
          lable: '工业机器人'
        },
        {
          value: 2,
          lable: '机器视觉'
        }
      ],
      student_has_joint_this_class: null,
      level: [
        { value: 0, lable: '暂未获取' },
        { value: 1, lable: '助教' },
        { value: 2, lable: '初级讲师' },
        { value: 3, lable: '中级讲师' },
        { value: 4, lable: '高级讲师' }
      ],
      field: [
        { value: 0, lable: '综合领域' },
        { value: 1, lable: 'PLC' },
        { value: 2, lable: '工业机器人' },
        { value: 3, lable: '机器视觉' }
      ]
    };
  },
  created() {
    // console.log();
    this.getDetail(this.$route.query.id);
  },
  mounted() {
    document.title = '班级详情';
  },
  methods: {
    custque() {
      custservice({
        number: this.phonenum,
        text: '服务器咨询正式测试1'
      }).then((res) => {
        if (res.code == 1000) {
          this.$message({
            type: 'success',
            message: res.msg
          });
          this.dialogFormVisible = false;
          this.phonenum = null;
          this.Zixuncontent = null;
        }
      });
    },
    customerservice() {
      this.dialogFormVisible = true;
    },
    // 证书详情
    certdetail(id) {
      const detail = this.$router.resolve({
        name: 'certdetail', // 这里是跳转页面的name
        query: {
          // 要传的参数
          id: id
        }
      });
      window.open(detail.href, '_blank');
    },
    // 课程详情页面
    coursedetail(id) {
      // console.log(id);
      const detail = this.$router.resolve({
        name: 'coursedetail', // 这里是跳转页面的name
        query: {
          // 要传的参数
          id: id
        }
      });
      window.open(detail.href, '_blank');
    },
    // 报名班级
    Singup() {
      ClientMydetail().then((res) => {
        // console.log(res);
        // this.has_signed = res.data.has_signed;
        // this.has_certificated = res.data.has_certificated;
        if (res.data.has_signed == false) {
          this.$refs.children.dialogRegVisible = true;
        } else {
          if (res.data.has_certificated == false) {
            this.$refs.children.dialogErweiVisible = true;
          } else {
            this.$refs.children.dialogErweiVisible = false;
            signupClass(this.$route.query.id, { type: '301' }).then((res) => {
              // console.log(res);
              if (res.code == 1000) {
                this.$message({
                  type: 'success',
                  message: res.msg
                });
              }
              this.getDetail(this.$route.query.id);
            });
          }
          this.$refs.children.dialogRegVisible = false;
        }
      });
    },
    getDetail(id) {
      Classdetail(id).then((res) => {
        // console.log(res);
        res.data.class_info.end_date = res.data.class_info.end_date.replace(
          /-/g,
          '/'
        );
        res.data.class_info.start_date = res.data.class_info.start_date.replace(
          /-/g,
          '/'
        );
        for (var a of this.class_type) {
          if (res.data.class_info.class_type == a.value) {
            res.data.class_info.class_typec = a.lable;
          }
        }
        for (var b of this.class_period) {
          if (res.data.class_info.class_period == b.value) {
            res.data.class_info.class_periodc = b.lable;
          }
        }
        if (res.data.has_cert_and_course) {
          for (var c of this.course_type) {
            if (res.data.related_course.course_type == c.value) {
              res.data.related_course.course_typec = c.lable;
            }
          }
          for (var d of this.course_direction) {
            if (res.data.related_course.course_direction == d.value) {
              res.data.related_course.course_directionc = d.lable;
            }
          }
        }
        res.data.teacher_list.forEach((item, index) => {
          if (res.data.student_has_joint_this_class == false) {
            item.phone = '******';
            item.wechat = '******';
          }
        });
        this.classInfo = res.data.class_info;
        this.ClassDeinfo = {
          has_cert_and_course: res.data.has_cert_and_course,
          related_course: res.data.related_course,
          related_cert: res.data.related_cert,
          teacher_list: res.data.teacher_list,
          exam_info: res.data.exam_info,
          has_exam_related: res.data.has_exam_related,
          student_has_joint_this_class: res.data.student_has_joint_this_class
        };
        this.course_id = res.data.related_course.course_id;
      });
    }
  }
};
</script>
<style scoped>
/deep/.el-collapse-item__header {
  font-size: 20px !important;
}
.detail-wrapper {
  margin: 0 auto;
  padding-bottom: 50px;
}
.detailheader {
  width: 80%;
  margin: 0 auto;
}
.headertop {
  display: flex;
  justify-content: space-between;
  height: 120px;
  align-items: center;
}
.headertop p {
  font-size: 24px;
}
.headertop p span {
  font-size: 1.5em;
  margin-right: 10px;
  font-weight: bold;
}
.detailnav {
  height: 80px;
  display: flex;
  align-items: center;
  width: 80%;
  margin: 0 auto;
}
.navcl {
  width: 10%;
  display: flex;
  align-items: center;
}
.round {
  height: 25px;
  border-radius: 50%;
  width: 25px;
  background-color: #1890ff;
  color: white;
  text-align: center;
  line-height: 27px;
  font-size: 18px;
}
.detailCC {
  height: 580px;
  display: flex;
  /* margin: 30px 0px; */
  width: 80%;
  margin: 0 auto;
}
.CCDetail {
  width: 48%;
  /* margin: 10px; */
}
.CCtitle {
  display: flex;
  align-items: center;

  justify-content: space-between;
  font-size: 20px;
  width: 70%;
  border-bottom: 1px solid #e6ebf5;
}
.CCcontent {
  text-align: center;
  width: 70%;
  margin-top: 10px;
}
.CCcontent img {
  width: 100%;
  height: 420px;
}
.CCcontent p {
  font-size: 25px;
}
.Teacher {
  display: flex;
  justify-content: space-between;
  margin-top: 14px;
}
.teacherimg {
  width: 25%;
  margin-top: 50px;
  margin-left: 90px;
}
.teacherimg img {
  width: 57%;
  height: 200px;
}
.teacherDetail {
  width: 70%;
}
.teacherDetail p:nth-child(1) {
  font-size: 25px;
}
.teacherzize {
  display: flex;
  height: auo;
  height: auto;
}
.teacherzize p:nth-child(1) {
  font-size: 15px;
  width: 15%;
}
.teacherzize p:nth-child(2) {
  font-size: 13px;
  width: 80%;
  padding-top: 3px;
}
.conetent {
  width: 50%;
  font-size: 15px;
}
.conetent span {
  margin-left: 3px;
}
.conetent p {
  text-align: left;
  float: left;
  margin-left: 20px;
}
.classTeacher {
  width: 80%;
  margin: 0 auto;
  overflow: hidden;
  background-color: #fff;
}
.classExam {
  width: 80%;
  margin: 0 auto;
}
.decorate {
  width: 50px;
  height: 4px;
  margin-top: 15px;
  background: #256efd;
  margin: 0 auto;
  margin-top: 15px;
}
.classTeacher_title {
  font-size: 30px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #252525;
  text-align: center;
}
.classExam_title {
  margin-top: 20px;
  font-size: 30px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #252525;
  text-align: center;
}
.classExam {
  /* margin-bottom: 50px; */
  height: 280px;
  overflow: hidden;
  background-color: #fff;
}
</style>
