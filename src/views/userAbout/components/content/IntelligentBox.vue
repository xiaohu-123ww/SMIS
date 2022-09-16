<template>
  <div class="content-box">
    <div class="title">
      <h3 style="margin: 0">智能智造</h3>
      <div class="subhead">
        Beijing Intelligent Manufacturing Science and Technology Co. Ltd
      </div>
      <div class="main">
        <p v-show="mores == true ? true : false" style="font-size: 15px">
          {{ info }}
        </p>
        <!-- <span
            style="color: #0a76a4; cursor: pointer"
            @click="more()"
          >...更多</span> -->
        <!-- <p v-show="mores == false ? true : false" style="font-size: 15px">
          {{ longinfo
          }}<span
            style="color: #0a76a4; cursor: pointer"
            @click="pack()"
          >...收起</span>
        </p> -->
        <!-- <div class="details">
          <p>查看详情</p>
          <img
            class="boult"
            src="../../../../assets/images/jt-right.png"
            alt=""
          >
        </div> -->
      </div>
      <img
        class="About-zhizhao"
        src="../../../../assets/images/About-zhizhao.png"
        alt=""
      >
      <!-- <div
        v-for="(item, index) in infoimg.bg_image"
        v-show="index < 1"
        :key="index"
        :style="{ backgroundImage: 'url(' + disposeImg(item) + ')' }"
        class="intro"
      >
        <div class="up" style="width: 100%; height: 65%" />
        <div class="down">
          <div v-for="(item, index) in infoimg.text" :key="index" class="intro-list">
            <div style="font-size: 22px; margin-bottom: 20px">
              {{ item.name }}
            </div>
            <div style="font-size: 15px">{{ item.intro }}</div>
          </div>
        </div>
      </div> -->
    </div>
    <div class="content_box2">
      <div class="box2_title">北京</div>
      <div class="box2_cent">
        <p>办公地址: <span>北京市海淀区东升科技园B2-103</span></p>
        <p>客服中心: <span>18610218901</span></p>
        <p>官网: <span class="link" @click="link">www.zhinengzhizaoedu.com</span></p>
      </div>
    </div>
  </div>
</template>
<script>
import { aboutUser } from '@/api/user';

export default {
  data() {
    return {
      info: '',
      longinfo: '',
      mores: true,
      infoimg: {},
      arr: [],
      note: {
        // 这里要这样写
        backgroundImage: '',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        marginTop: '5px'
      }
    };
  },
  created() {
    aboutUser().then((rs) => {
      //  (rs.data);
      this.info = rs.data.长简介;
      this.longinfo = rs.data.长简介;
      this.infoimg = rs.data.业务介绍图;
    });
  },
  methods: {
    more() {
      this.mores = false;
      //  (a);
    },
    pack() {
      this.mores = true;
    },
    link() {
      // window.location.href = 'www.zhinengzhizaoedu.com';
      window.open('http://www.zhinengzhizaoedu.com/');
    }
  }
};
</script>
<style lang="scss" scoped>
.content-box {
  width: 80%;
  // margin-top: 58px;
  min-width: 1000px;
  height: 700px;
  background: #ffffff;

  margin: 58px auto;
  // height: 100%;
  // background-repeat: no-repeat;
  // background-position: 100% 100%;
  // background-size: 100% 100%;
  // background-image: url(../../../../assets/images/About-zhizhao.png);

  .title {
    // width: 80%;
    font-size: 30px;
    color: #191919;
    padding-top: 30px;
    h3 {
      font-size: 55px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #222222;
    }
  }

  .subhead {
    // width: 216px;
    // height: 32px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 32px;
  }

  .main {
    // padding-top: 5px;
    display: inline-block;
    width: 40%;
    height: auto;
    font-size: 14px;
    line-height: 30px;
    color: #808080;
  }

  .intro {
    // background-image: url("../../../../assets/images/about1.png");
    background-size: 100% 100%;
    width: 100%;
    height: 500px;
    margin-top: 40px;

    .down {
      width: 100%;
      height: 35%;
      display: flex;
      justify-content: space-around;
      padding-bottom: 10px;
      padding-left: 20px;
      padding-right: 20px;

      .intro-list {
        width: 30%;
        height: 100%;
        //background-color: #1996fc;
        background: rgba(77, 199, 240, 0.9);
        text-align: center;
        border-radius: 20px;
        color: #fff;
        padding: 40px 40px 0px 40px;
      }
    }
  }
  .About-zhizhao {
    position: absolute;
  }
  .details {
    height: 30px;
    // line-height: 20px;
    display: flex;
    // justify-content: center;
    align-items: center;
  }
  .boult {
    width: 15px;
    height: 15px;
    margin-left: 35px;
  }
}
.content_box2 {
  margin-top: 20px;
}
.box2_title {
  border-left: 5px solid #d92314;
    height: 30px;
    font-size: 28px;
    padding-left: 5px;
    line-height: 30px;
    color: #191919;
    margin-bottom: 30px;
}
.box2_cent p {
font-size: 18px;
font-family: PingFangSC-Regular, PingFang SC;
font-weight: 400;
color: #141518;
 span{
   font-size: 16px;
font-family: PingFangSC-Regular, PingFang SC;
font-weight: 400;
color: #666666;
 }
}
.link {
  cursor: pointer;
}
</style>
