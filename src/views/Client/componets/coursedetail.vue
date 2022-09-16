<template>
  <div class="course-wrapper">
    <div class="header_course">
      <div class="header">
        <img
          src="https://znzz.tech/static/img/sys-img/crs-cert/crs-cert-01.jpg"
          alt=""
        >
      </div>
      <div class="header_text">
        <h1>
          {{ courseDetail.course_name }}
          <div class="decorate" />
        </h1>
        <p>
          {{ courseDetail.course_true_price }}元<span
            style="margin-left: 10px"
          >{{ courseDetail.course_price }}元</span>
        </p>
      </div>
      <div class="btn">
        <el-button round>{{ courseDetail.course_typeC }}</el-button>
        <el-button round>{{ courseDetail.course_directionC }}</el-button>
      </div>
    </div>
    <div class="main">
      <div class="course">
        <div class="course_title">
          立即报名
          <div class="decorate2" />
        </div>
        <div class="course_cent">
          <div
            style="width: 100%; display: flex; justify-content: space-between;margin-top:20px"
          >
            <p style="font-size: 22px; margin-left: 20px">这是一个课程名称</p>
            <p style="font-size: 22px; margin-right: 20px">
              开班日期：2020-04-24
            </p>
          </div>
          <div style="margin-left: 20px;margin-top:20px;">
            <el-button size="mini">班级类型</el-button>
            <el-button size="mini">周期类型</el-button>
            <el-button size="mini">课程方向</el-button>
            <el-button size="mini">课程类别</el-button>
          </div>
          <div
            style="width: 100%; display: flex; justify-content: space-between;margin-top:20px"
          >
            <p style="font-size: 22px; margin-left: 20px">这是一个课程名称</p>
            <p style="font-size: 22px; margin-right: 20px">
              开班日期：2020-04-24
            </p>
          </div>
          <div style="margin-left: 20px">
            <el-button size="mini">班级类型</el-button>
            <el-button size="mini">周期类型</el-button>
            <el-button size="mini">课程方向</el-button>
            <el-button size="mini">课程类别</el-button>
          </div>
        </div>
        <!-- <el-collapse
          style="width: 80%; margin: 0 auto"
        >
          <el-collapse-item title="立即报名" name="1" style="font-size: 20px;" />
        </el-collapse> -->
      </div>
    </div>
  </div>
</template>
<script>
import { Curosedetail } from '@/api/Traincertification/course.js';
export default {
  data() {
    return {
      courseDetail: {},
      course_type: [
        {
          value: 0,
          label: '技能提升班'
        },
        {
          value: 1,
          label: '证书取证班'
        },
        {
          value: 2,
          label: '就业班'
        }
      ],
      course_direction: [
        {
          value: 0,
          label: 'PLC'
        },
        {
          value: 1,
          label: '工业机器人'
        },
        {
          value: 2,
          label: '机器视觉'
        }
      ]
    };
  },
  created() {
    this.getCoursedetail(this.$route.query.id);
  },
  mounted() {
    document.title = '课程详情';
  },
  methods: {
    getCoursedetail(id) {
      Curosedetail(id).then((res) => {
        // console.log(res);
        for (var leverl of this.course_type) {
          if (Number(res.data.course_type) == leverl.value) {
            res.data.course_typeC = leverl.label;
          }
        }
        for (var testing of this.course_direction) {
          if (Number(res.data.course_direction) == testing.value) {
            res.data.course_directionC = testing.label;
          }
        }

        this.courseDetail = res.data;
      });
    }
  }
};
</script>
<style scoped>
/deep/.el-collapse-item__header {
  font-size: 20px !important;
  padding-left: 10px;
}
.course-wrapper {
  width: 100%;
}
.header_course {
  width: 100%;
}
.header {
  width: 100%;
}
.header img {
  width: 100%;
}
.header_text {
  width: 80%;
  margin: 20px auto;
  height: 80px;

  display: flex;
  justify-content: space-between;
}
.header_text p {
  font-size: 25px;
  color: cornflowerblue;
}
.header_text p span {
  text-decoration: line-through;
  color: gray;
  font-size: 15px;
}
.btn {
  width: 80%;
  margin: 0 auto;
}
.main {
  width: 100%;
  margin-top: 10px;
  overflow: hidden;
}
.course {
  width: 100%;
  overflow: hidden;
}
.decorate {
  width: 50px;
  height: 4px;
  margin-top: 15px;
  background: #256efd;
  /* margin: 10px auto; */
  /* overflow: hidden; */
}
.decorate2 {
  width: 50px;
  height: 4px;
  margin-top: 15px;
  background: #256efd;
  margin: 10px auto;
  /* overflow: hidden; */
}
.course_title {
  width: 112px;
  height: 32px;
  font-size: 28px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #141518;
  line-height: 32px;
  margin: 0 auto;
  /* overflow: hidden; */
}
.course_cent {
  overflow: hidden;
  width: 80%;
  margin: 50px auto;
  background-color: #fff;
  height: 500px;
}
</style>
