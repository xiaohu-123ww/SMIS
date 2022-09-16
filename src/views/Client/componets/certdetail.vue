<template>
  <div class="cert-wrapper">
    <!-- <h1 style="width: 80%; margin: 0 auto; font-size: 40px; margin-top: 14px">
      证书详情
    </h1> -->
    <!-- 证书详情页面标题 -->
    <div class="certdetail">
      <div class="certdetail_top">
        <div class="cert_name">
          <h1 class="cert_name_title">{{ certform.cert_name }}</h1>
          <div class="adorn" />
          <!-- <div class="btn"> -->
          <el-button round>{{ certform.cert_levelC }}</el-button>
          <el-button round>{{ certform.testing_wayC }}</el-button>
        <!-- </div> -->
        </div>
      </div>
    </div>
    <!-- 内容 -->
    <div class="content">
      <div class="main">
        <!-- 标题 -->
        <div class="main_title">
          证书预览
          <div class="decorate" />
        </div>
        <!-- 头像，证书 -->
        <div class="main_cent">
          <div class="cent_top">
            <img class="profile" :src="yuan + certform.cert_sample" alt="">
            <img class="credential" :src="yuan + certform.cert_sample" alt="">
            <div class="seal">
              <!-- <img src="" alt=""> -->
              <p>{{ certform.cert_name }}</p>
            </div>
          </div>
          <div class="cent_centent">
            <!-- 证书介绍 -->
            <div class="referral">
              <p class="referral_title">证书介绍</p>
              <p style="color: #666666">{{ certform.cert_introduction }}</p>
            </div>
            <!-- 证书信息 -->
            <div class="message">
              <p class="message_title">证书信息</p>
              <p>
                证书名称:<span style="margin-left: 10px">{{
                  certform.cert_name
                }}</span>
              </p>
              <p>
                证书等级:<span style="margin-left: 10px">{{
                  certform.cert_levelC
                }}</span>
              </p>
              <p style="width: 60%">
                发证单位:<span style="margin-left: 10px">{{
                  certform.issuing_unit
                }}</span>
              </p>
              <p style="width: 30%">
                针对人群:<span style="margin-left: 10px">{{
                  certform.aim_people
                }}</span>
              </p>
              <p style="width: 60%">
                对应岗位:<span style="margin-left: 10px">{{
                  certform.cor_positions
                }}</span>
              </p>
              <p style="width: 30%">
                有效期:<span style="margin-left: 10px">{{
                  certform.expiry_date
                }}</span>
              </p>
              <p style="width: 60%">
                考核方式:<span style="margin-left: 10px">{{
                  certform.testing_wayC
                }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="main">
      <div class="main_title">
        证书预览
        <div class="decorate" />
      </div>
      <el-collapse
        v-model="activeNames"
        style="width: 80%; margin: 0 auto"
        @change="handleChange"
      >
        <el-collapse-item title="证书预览" name="1" style="font-size: 20px">
          <div class="cert_lan">
            <div class="cert_img">
              <img :src="yuan + certform.cert_sample" alt="">
            </div>
            <div class="line" />
          </div>
        </el-collapse-item>
      </el-collapse>
    </div> -->
    <!-- <div class="classExam">
      <el-collapse v-model="jieshao" style="width: 80%; margin: 0 auto">
        <el-collapse-item title="证书介绍" name="1" style="font-size: 20px">
          <div>
            {{ certform.cert_introduction }}
          </div>
          <div />
        </el-collapse-item>
        <el-collapse-item title="证书信息" name="2" style="font-size: 20px">
          <div>
            <p style="font-size: 22px">{{ certform.cert_name }}</p>
            <div class="conetent" />
            <div class="conetent" />
            <div class="conetent" />
          </div>
        </el-collapse-item>
      </el-collapse>
    </div> -->
  </div>
</template>
<script>
import { Certdetail } from '@/api/Traincertification/certMan';
export default {
  data() {
    return {
      jieshao: ['1', '2'],
      yuan: 'https://znzz.tech/cert/',
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
      activeNames: ['1'],
      cert_level: [
        {
          value: 0,
          label: '不分级'
        },
        {
          value: 1,
          label: '初级'
        },
        {
          value: 2,
          label: '中级'
        },
        {
          value: 3,
          label: '高级'
        }
      ],
      testing_way: [
        {
          value: 0,
          label: '无考核'
        },
        {
          value: 1,
          label: '笔试+实操'
        },
        {
          value: 2,
          label: '笔试'
        },
        {
          value: 3,
          label: '实操'
        }
      ]
    };
  },
  created() {
    // console.log();
    this.getCertdetail(this.$route.query.id);
  },
  mounted() {
    document.title = '证书详情';
  },
  methods: {
    handleChange(val) {
      // console.log(val);
    },
    getCertdetail(id) {
      Certdetail(id).then((res) => {
        for (var leverl of this.cert_level) {
          if (Number(res.data.cert_level) == leverl.value) {
            res.data.cert_levelC = leverl.label;
          }
        }
        for (var testing of this.testing_way) {
          if (Number(res.data.testing_way) == testing.value) {
            res.data.testing_wayC = testing.label;
          }
        }

        this.certform = res.data;
        // console.log(this.certform);
      });
    }
  }
};
</script>
<style scoped>
div/deep/.el-collapse-item__header {
  font-size: 20px !important;
}
div/deep/ .el-button.is-round {
  /* border-color: #333333; */
  border: 2px solid #333333;
  color: #333333;
  background-color: #f2f2f2;
}
/deep/ .el-button:hover {
}
.cert-wrapper {
  margin: 0 auto;
  min-width: 1555px;
  /* overflow: hidden; */
}
.certdetail_top {
  width: 51%;
   margin: 0 auto;
   /* background-color: #f2f2f2; */
}
.certdetail {
  width: 100%;
  height: 140px;
  /* margin: 0 auto; */
  overflow: hidden;
  background-color: #f2f2f2;
  /* margin: 10px auto; */
}
.cert_name {
  width: 100%;
  height: 100%;
  overflow: hidden;
  /* margin-left: 465px; */
  margin-top: 21px;
  /* margin: 0 auto; */
  /* line-height: 98px; */
  background-color: #f2f2f2;
  /* display: flex;
  flex-direction: column; */
}
.cert_name_title {
  /* font-size: 18px; */
  font-size: 2em;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
/* .cert_name p {
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
} */
.content {
  width: 100%;
  /* height: 832px; */
  background-color: #fefefe;
}
.main {
  width: 80%;
  margin: 0 auto;
  /* height:596px ; */
  background-color: #fff;
  overflow: hidden;
}
.main_title {
  margin-left: 270px;
  font-size: 28px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #141518;
  margin-bottom: 46px;
}
/* 装饰条 */
.decorate {
  width: 50px;
  height: 4px;
  margin-top: 15px;
  background: #256efd;
}
.main_cent {
  width: 970px;
  /* height: 596px; */
  background: #ffffff;
  margin: 0 auto;
  box-shadow: 0px 2px 30px 0px rgba(0, 0, 0, 0.08);
}
.profile {
  width: 244px;
  height: 313px;
  margin: 32px 65px 32px 36px;
}
.credential {
  width: 422px;
  height: 313px;
  margin-top: 31px;
}
.cent_top {
  display: flex;
  position: relative;
}
.seal {
  position: absolute;
  right: -20px;
  top: 130px;
  width: 324px;
  height: 324px;
  background-image: url("../../../assets/images/yinzhang.png");
  /* display: flex; */
  /* justify-content: center; */
  /* align-items: center; */
}
.seal p {
  height: 45px;
  font-size: 30px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 900;
  color: #c02a1b;
  line-height: 265px;
  text-align: center;
}
.referral {
  margin-left: 36px;
}
.referral_title {
  font-size: 18px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #141518;
}
.message {
  margin-left: 36px;
  padding-bottom: 20px;
  margin-bottom: 20px;
  color: #666666;
  overflow: hidden;
  font-size: 14px;
}
.message p {
  height: 30px;
  color: #141518;
  /* margin-top: 20px; */
}
.message span {
  color: #666;
}
.message_title {
  font-size: 20px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #141518;
}
/* .adorn { */
  /* width: 50px; */
  /* height: 4px; */
  /* margin-top: 2px; */
  /* background: #256efd; */
/* } */
/* .cert_lan {
  width: 100%;
  height: 500px;
  overflow: hidden;
}
.cert_text {
  width: 80%;
  height: 50px;
  margin: 0 auto;
}
.cert_text p {
  width: 50%;
  font-size: 25px;
  line-height: 50px;
  border-bottom: 1px solid gainsboro;
}
.cert_img {
  width: 80%;
  height: 400px;
  margin: 10px auto;
}
.cert_img img {
  width: 50%;
  height: 400px; */
/* background-color: chocolate; */
/* } */
</style>
