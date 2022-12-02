<template>
  <div class="footer">
    <div class="footer-box">
      <div class="footer-up">
        <div class="footer-up-left" style="flex: 1">
          <div class="footer-left-top">
            <img src="@/assets/images/logo.png" alt="" />
          </div>
          <div class="footer-left-bottom">
            <div class="code">
              <img src="@/assets/images/diouyin.png" class="picture" />
              <p class="code-p">抖音</p>
            </div>
            <div class="code">
              <img src="@/assets/images/xiaochengxu.png" class="picture" />
              <p class="code-p">小程序</p>
            </div>
            <div class="code">
              <img src="@/assets/images/dingyuehao.png" class="picture" />
              <p class="code-p">订阅号</p>
            </div>
          </div>
        </div>
        <div class="footer-up-right">
          <div class="footer-main">
            <div class="title">企业服务</div>
            <div style="color: #a6a8ae">智能制造技能培训</div>
            <div style="color: #a6a8ae">产业合作</div>
            <div style="color: #a6a8ae">人力资源服务</div>
          </div>
          <div class="footer-main">
            <div class="title">联系我们</div>
            <div style="color: #a6a8ae">企业服务热线 18610218901</div>
            <div style="color: #a6a8ae">企业邮箱 talent@shiyenet.com.cn</div>
            <div style="color: #a6a8ae">工作时间 10:00 - 18:00</div>
          </div>
        </div>
      </div>
      <div class="footer-down">
        <!-- 213 -->
        <a target="_blank" href="https://beian.miit.gov.cn/"
          >京ICP备20003345号-4</a
        >
        <!-- <pre> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </pre> -->
        <!-- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -->
        <img
          src="https://www.beian.gov.cn/img/new/gongan.png"
          alt=""
          srcset=""
        />
        &nbsp;
        <a
          target="_blank"
          href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802033541&token=825f5b11-4ca3-44ad-8722-389d2301f1e7"
          >京公网安备 11010802033541号</a
        >
        <p>Copyright © 2019 Kalli</p>
      </div>
    </div>
  </div>
</template>
<script>
import { getCarousel } from '@/api/user'
export default {
  data () {
    return {
      codeList: [],
      footer: '',
      logo: '',
      codeLists: [],
      code1: '',
      code2: ''
    }
  },
  created () {
    getCarousel().then(rs => {
      this.code1 = this.disposeImg(rs.data.QR_code[0])
      this.code2 = this.disposeImg(rs.data.QR_code[1])
      console.log(rs)
      // this.codeList = [{
      //   code: rs.data.QR_code[0],
      //   name: '订阅号'
      // }]
      // // console.log(rs.data.QR_code[1]);
      // this.codeLists = [{
      //   code: rs.data.QR_code[1],
      //   name: "小程序"
      // }]
      this.footer = rs.data.footer
      this.footer.logo = rs.data.footer.logo
    })
  }
};
</script>
<style lang="scss" scoped>
.footer {
  width: 100%;
  height: 200px;

  .footer-box {
    width: 70%;
    height: 100%;
    margin: 0 auto;

    .footer-up {
      padding-top: 30px;
      width: 100%;
      display: flex;

      .footer-up-left {
        display: inline-block;
        width: 60%;
        .footer-left-top {
          height: 40px;
          margin-bottom: 20px;
        }
        .footer-left-bottom {
          height: 160px;
          .code {
            display: inline-block;
            width: 100px;
            margin-right: 20px;
            text-align: center;

            .picture {
              width: 100%;
            }
            .code-p {
              padding: 10px 0;
              color: #666666 !important;
            }
          }
        }
      }

      .footer-up-right {
        .footer-main {
          display: inline-block;
          min-width: 120px;
          height: 100%;
          margin-left: 100px;

          .title {
            font-size: 10px;
            color: #666 !important;
            margin-bottom: 30px;
            font-weight: 600;
          }

          div {
            margin-bottom: 10px;
            color: #222222 !important;
          }
        }
      }
    }
    .footer-down {
      width: 100%;
      height: 20%;
      color: #666666;
      padding: 10px 0;
      font-size: 16px;
      text-align: left;
      box-sizing: border-box;
      display: flex;
      // display: flex;
      justify-content: center;
      align-items: center;
      a:hover {
        color: rgb(90, 147, 255);
      }
      img {
        vertical-align: middle;
        margin-bottom: 4px;
        margin-left: 30px;
        // margin: 0 10px;
      }
      p {
        margin-left: 20px;
      }
    }
  }
}
</style>
