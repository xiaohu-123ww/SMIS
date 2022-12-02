<template>
  <div class="page">
    <div class="banner">
      <div class="banner_title">
        为“中国制造2025” 提供技术人才保障
        <br />
        让<span>中国职教生</span>享受国际化职教培训
      </div>
      <img
        class="left"
        src="../../../assets/imgs/left.png"
        alt=""
        @mouseover="mouseOver"
        @mouseleave="mouseLeave"
        @click="left"
      />
      <img
        class="right"
        src="../../../assets/imgs/right.png"
        alt=""
        @mouseover="mouseOver"
        @mouseleave="mouseLeave"
        @click="right"
      />
    </div>
    <!-- 轮播图 -->
    <div class="slideshow">
      <el-carousel
        ref="slideshow"
        :interval="4000"
        type="card"
        arrow="always"
        height="230px"
        :autoplay="autoplay"
        indicator-position="none"
      >
        <el-carousel-item v-for="(item, index) in slideshowList" :key="index">
          <!-- <p>{{ item }}</p> -->
          <!-- <img src="../../../assets/slideshow/crs-cert-02.jpg" alt=""> -->
          <img :src="item.pic_path" alt="" @click="send(item)" />
          <!-- <h3 class="medium">{{ item }}</h3> -->
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 热门证书 -->
    <div class="hotCert">
      <div class="hotCert_title">
        热门证书
        <div class="decorate" />
      </div>
      <div class="approve_cont">
        <!-- 机器人认证 -->
        <div
          v-for="(item, index) in cert_list"
          :key="index"
          class="robot_approve"
          @click="certdetail(item.cert_id)"
        >
          <img :src="'https://znzz.tech/' + item.cert_sample" alt="" />
          <p>{{ item.cert_name }}</p>
          <div class="strip" />
          <span @click="certdetail(item.cert_id)">查看详情</span>
        </div>
      </div>
    </div>
    <!-- 推荐课程 -->
    <div class="recomCourse">
      <div class="recomCourse_title">
        推荐课程
        <div class="decorate" />
      </div>
      <div class="recomCourse_cont">
        <div
          v-for="(item, index) in course_list"
          :key="index"
          class="robot_approve"
          @click="coursedetail(item.course_id)"
        >
          <img :src="'https://znzz.tech/' + item.ads_picture" alt="" />
          <p>{{ item.course_name }}</p>
          <div class="strip" />
          <span @click="coursedetail(item.course_id)">查看详情</span>
        </div>
      </div>
    </div>
    <!-- 即将开班 -->
    <div class="startClass">
      <div class="recomCourse_title">
        即将开班
        <div class="decorate" />
      </div>
      <div class="start_img">
        <div
          v-for="(item, index) in class_list"
          :key="index"
          class="start_middle"
          @click="classdetail(item.class_id)"
        >
          <div class="start_middle_text">
            <p>{{ item.class_name }}</p>
          </div>
          <div class="start_middle_middle">
            <p>开班日期</p>
            <p>{{ item.class_start_date }}</p>
            <i class="el-icon-arrow-right" />
          </div>
        </div>
      </div>
      <!-- <el-collapse v-model="activeclass">
        <el-collapse-item title="即将开班" name="1">

        </el-collapse-item>
      </el-collapse> -->
    </div>
  </div>
</template>
<script>
import {
  Clientindex,
  ClientMydetail,
  userRestudent,
  onclick
} from '@/api/Traincertification/Clinetindex'
// import certdiag from '../diag/certdiag.vue'
export default {
  data () {
    return {
      autoplay: true,
      slideshowList: [
      ],
      class_id: null,
      activeclass: ['1'],
      activecourse: ['1'],
      activecert: ['1'],
      yuan: 'https://znzz.tech/cert/',
      EscClose: false,
      title: '',
      blist: [],
      cert_list: [],
      class_list: [],
      course_list: [],
      dialogCertVisible: false,
      certform: {
        cert_name: '',
        certlevel: '',
        certunit: '',
        certremak: '',
        forPeoper: '',
        dept: '',
        certdate: '',
        examtype: ''
      },

      formLabelWidth: '120px',

      dialogCourseVisible: false,
      dialogClassVisible: false,
      Classinfo: {},
      classType: [
        { value: 0, lable: '线上课' },
        { value: 1, lable: '线下课' },
        { value: 2, lable: '线上下结合' }
      ],
      classPeriod: [
        { value: 0, lable: '周末班' },
        { value: 1, lable: '平时班' }
      ],
      classstuts: [
        { value: 0, lable: '未开始' },
        { value: 1, lable: '进行中' },
        { value: 2, lable: '已结束' },
        { value: 3, lable: '已关闭' }
      ],
      has_cert_and_course: false, // 关联证书课程
      related_course: {},
      related_cert: {}
    }
  },
  created () {
    this.getClinetindex()
  },
  methods: {
    // 移入
    mouseOver () {
      this.autoplay = false
    },
    // 移除
    mouseLeave () {
      this.autoplay = true
    },
    // 轮播图左边
    left () {
      this.$refs.slideshow.prev()
    },
    right () {
      this.$refs.slideshow.next()
    },
    // 课程详情页面
    coursedetail (id) {
      // console.log(id);
      const detail = this.$router.resolve({
        name: 'coursedetail', // 这里是跳转页面的name
        query: {
          // 要传的参数
          id: id
        }
      })
      window.open(detail.href, '_blank')
    },

    // 点击轮播图跳转
    send (e) {
      window.open(e.url, '_blank')
    },
    getClinetindex () {
      Clientindex().then((res) => {
        console.log(res)
        this.cert_list = res.data.cert_list // 热门证书
        this.class_list = res.data.class_list
        this.course_list = res.data.course_list
        this.slideshowList = res.data.crs_list
      })
    },
    // 证书详情
    certdetail (id) {
      const detail = this.$router.resolve({
        name: 'certdetail', // 这里是跳转页面的name
        query: {
          // 要传的参数
          id: id
        }
      })
      window.open(detail.href, '_blank')
    },
    // 班级详情
    classdetail (id) {
      this.class_id = id
      const detail = this.$router.resolve({
        name: 'ClassStudetail', // 这里是跳转页面的name
        query: {
          // 要传的参数
          id: id
        }
      })
      window.open(detail.href, '_blank') // 打开新的窗口
    }
  }
};
</script>
<style scoped>
div/deep/.el-collapse-item__header {
  font-size: 20px !important;
}
.wrapper {
  width: 100%;
  height: 100vh;
}
.client_header {
  width: 100%;
  height: 60px;
  background-color: white;
  display: flex;
  overflow: hidden;
}
.client_header ul {
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 68%;
  height: 60px;
  overflow: hidden;
}
.client_header ul li {
  width: 10%;
  text-align: center;
  font-weight: 800;
  font-size: 15px;
}
.client_header ul li:hover {
  color: rgba(0, 0, 255, 0.616);
  text-decoration: rgb(138, 136, 136) underline;
}
.client_header ul li a:hover {
  text-decoration: gray underline solid;
}
.client_right {
  width: 24%;
  height: 60px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.client_right p {
  text-decoration: none;
  width: 15%;
  text-align: center;
  font-size: 15px;
  cursor: pointer;
}
.banner {
  width: 100%;
  height: 305px;
  background: linear-gradient(180deg, #fcfdff 0%, #dce4ff 100%);
  position: relative;
  overflow: hidden;
}
.hotCert {
  margin-top: 137px;
  /* width: 80%; */
  height: auto;
  background-color: #fff;
  /* margin: 130px auto; */
}
.hotCert_text {
  text-align: center;
  color: #3c69be;
  font-size: 28px;
  height: 145px;
  line-height: 100px;
}
.hotCert_img {
  width: 100%;
  height: auto;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.hotCert_middle {
  width: 20%;
  height: 320px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  /* border: 1px solid #3c69be; */
  color: #3c69be;
  margin-left: 20px;
  margin: 0px 0px 50px 50px;
}
.hotCert_middle img {
  width: 100%;
  height: 240px;
}
.recomCourse {
  /* width: 70%; */
  margin: 0 auto;
  height: auto;
}
.recomCourse_text {
  text-align: center;
  color: #3c69be;
  font-size: 28px;
  height: 145px;
  line-height: 100px;
}
.recomCourse_img {
  width: 100%;
  height: auto;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.recomCourse_middle {
  width: 22%;
  height: 270px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  /* border: 1px solid #3c69be; */
  color: #3c69be;
  margin: 0px 0px 50px 0px;
}
.recomCourse_middle img {
  width: 100%;
  height: 154px;
}
.startClass {
  width: 80%;
  height: auto;
  margin: 0 auto;
}
.start_text {
  text-align: center;
  color: #3c69be;
  font-size: 28px;
  height: 145px;
  line-height: 100px;
}

.start_img {
  /* width: 80%; */
  /* height: 923px; */
  margin: 0px auto 50px;
  display: flex;
  flex-wrap: wrap;
  height: auto;
}
.start_img p {
  font-size: 18px;
}
.start_class_text {
  display: flex;
  width: 100%;
  height: 50px;
}
.start_class_text p {
  width: 26.5%;
  height: 50px;
  text-align: center;
  line-height: 21px;
  font-size: 16px;
}
.start_middle {
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  border: 1px solid #fff;
  /* justify-content: space-evenly; */
  justify-content: space-between;
  cursor: pointer;
  margin-top: 10px;
}
.start_middle_img {
  width: 20%;
  height: 120px;
  background-color: brown;
}
.start_middle_text {
  text-align: center;
  margin-left: 10px;
  /* width: 29%; */
}
.start_middle_middle {
  /* width: 30%; */
  text-align: center;
  display: flex;
  margin-right: 10px;
  justify-content: center;
  align-items: center;
}
.start_middle_middle p {
  margin-left: 20px;
}
.start_middle_right {
  /* width: 23%; */
  display: flex;
  justify-content: flex-end;
}
i {
  font-size: 25px;
  color: blue;
}
.online {
  width: 100%;
  /* background-color: brown; */
}
.online_text {
  width: 100%;
  height: 80px;
}
.online_text h3 {
  text-align: center;
  line-height: 80px;
}
.online_img {
  width: 260px;
  height: 260px;
  margin: 0 auto;
}
.online_t {
  width: 100%;
  height: 30px;
  /* background-color: antiquewhite; */
  text-align: center;
  cursor: pointer;
}
.online_bottom {
  width: 100%;
  height: 80px;
}
.online_bottom_text {
  height: 80px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.banner_title {
  height: 84px;
  font-size: 30px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #252525;
  text-align: center;
  margin-top: 76px;
}
.banner_title span {
  color: #256efd;
}
.slideshow {
  width: 100%;
  /* height: 100%; */
  position: absolute;
  top: 320px;
  /* left: 400px; */
  /* margin: 0 auto;
  width: 800px;
  height: 159px; */
}
.slideshow img {
  width: 100%;
  height: 100%;
}
div/deep/ .el-carousel__arrow {
  display: none;
}
.left {
  width: 92px;
  height: 92px;
  position: absolute;
  left: 110px;
  top: 90px;
}
.left:hover {
  background: url('../../../assets/imgs/left_xz.png');
}
.right:hover {
  background: url('../../../assets/imgs/right_xz.png');
}
.right {
  width: 92px;
  height: 92px;
  position: absolute;
  right: 110px;
  top: 90px;
  /* background-color: red; */
}
.hotCert_title {
  font-size: 28px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #141518;
  width: 112px;
  /* height: 32px; */
  margin: 0 auto;
}
.decorate {
  margin: 15px auto;
  width: 50px;
  height: 4px;
  background: #256efd;
}
.approve_cont {
  /* width: 70%; */
  /* background-color: yellow; */
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  justify-content: space-around;
  align-items: center;
}
.robot_approve {
  width: 540px;
  height: 360px;
  margin-bottom: 40px;
  position: relative;
  cursor: pointer;
}
.robot_approve img {
  width: 100%;
  height: 100%;
}
.robot_approve p {
  width: 100%;
  position: absolute;
  font-size: 64px;
  bottom: 143px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  text-align: center;
  /* margin-top: 143px; */
}
.robot_approve span {
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  position: absolute;
  bottom: 30px;
  width: 100%;
  /* left: 223px; */
}
.strip {
  width: 480px;
  height: 2px;
  background: #ffffff;
  opacity: 0.2;
  position: absolute;
  margin: 0 auto;
  bottom: 60px;
  left: 30px;
}
.hotCert_title {
  margin-bottom: 40px;
}
.recomCourse_title {
  height: 84px;
  font-size: 30px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #252525;
  text-align: center;
  margin-top: 76px;
}
.recomCourse_cont {
  /* width: 70%; */
  /* background-color: yellow; */
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  justify-content: space-around;
  align-items: center;
}
.robot_approve:hover {
  z-index: 2;
  /* -webkit-box-shadow: 0 15px 30px rgb(0 0 0 / 10%); */
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.3);
  /* -webkit-transform: translate3d(0, -2px, 0); */
  transform: translate3d(0, -5px, 0);
}
.page {
  background-color: #fff;
  overflow: hidden;
  /* min-width: 1555px; */
  /* max-width: 2000px; */
}
.robot_approve:hover {
  color: #256efd;
}
</style>
