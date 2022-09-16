<template>
  <div>
    <div class="page">
      <div class="banner">
        <div class="banner_cont">
          <!-- 轮播图上面标题 -->
          <div class="bannner_title">
            <p>为“中国制造2025” 提供技术人才保障</p>
            <p>让<span>中国职教生</span>享受国际化职教培训</p>
          </div>
          <!-- 轮播图 -->
          <div class="slideshow">
            <el-carousel :interval="4000" type="card" height="159px">
              <el-carousel-item v-for="item in 6" :key="item">
                <h3 class="medium">{{ item }}</h3>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </div>

      <!-- <h2>欢迎关注智能智造学院!</h2> -->
      <!-- <img :src="code" alt=""> -->
    </div>
  </div>
</template>
<script>
// import { getTrain } from '@/api/user';
export default {
  data() {
    return {
      code: ''
    };
  },
  created() {
    // getTrain().then(rs => {
    //   this.code = 'https://znzz.tech/.com' + rs.data.QRcode;
    // });
  }
};
</script>
<style lang="scss" scoped>
// .cont {
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   color: rgb(73, 73, 73);
//   padding: 50px 0;
// }
// .cont h2 {
//   letter-spacing: 3px;
// }
// .cont img {
//   margin: 20px 0;
// }
.page {
  width: 100%;
  height: auto;
  margin-top: 2px;
}
.banner {
  width: 100%;
  height: 305px;
  background: linear-gradient(180deg, #fcfdff 0%, #dce4ff 100%);
  position: relative;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}
.bannner_title {
  z-index: 1000;
  left: 33%;
  position: absolute;
  text-align: center;
  font-size: 30px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #252525;
  span {
    color: #256efd;
  }
}
.slideshow {
  width: 100%;
  position: absolute;
  top: 130px;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
