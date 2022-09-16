<template>
  <div class="content-box">
    <!-- <div class="main"> -->
    <div class="picture">
      <div class="picImg">图片</div>
      <div class="picImg">图片</div>
      <div class="picImg">图片</div>
      <div class="picImg">图片</div>
    </div>
    <div class="line">
      <div class="line-box">
        <div v-for="(item, index) in list" :key="index" class="content">
          <div class="left">2008年</div>
          <div class="right">
            基于先进的信息技术，以客户需求为导向，开发出优质的软件产品。
          </div>
        </div>
      </div>
      <div class="line-box">
        <div class="content">
          <div class="left">2008年</div>
          <div class="right">
            基于先进的信息技术，以客户需求为导向，开发出优质的软件产品。
          </div>
        </div>
        <div class="content">
          <div class="left">2008年</div>
          <div class="right">
            基于先进的信息技术，以客户需求为导向，开发出优质的软件产品。
          </div>
        </div>
        <div class="content">
          <div class="left">2008年</div>
          <div class="right">
            基于先进的信息技术，以客户需求为导向，开发出优质的软件产品。
          </div>
        </div>
        <div class="content">
          <div class="left">2008年</div>
          <div class="right">
            基于先进的信息技术，以客户需求为导向，开发出优质的软件产品。
          </div>
        </div>
      </div>
    </div>
    <div class="down-picture">
      <div class="picImg" />
      <div class="picImg" />
      <div class="picImg" />
      <div class="picImg" />
    </div>
    <!-- </div> -->
  </div>
</template>
<script>
export default {
  data () {
    return {
      list: ['', '', '', '']
    };
  },
  mounted () {
  }
};
</script>
<style lang="scss" scoped>
.content-box {
  width: 100%;
  min-width: 1500px;
  margin: 20px auto;
  height: 100%;
  background: #f6f6f8;
  // .main {
  //   width: 62%;
  //   min-width: 1000px;
  //   height: auto;
  //   margin: 0 auto;
  //   padding-top: 30px;

  .picture {
    width: 62%;
    min-width: 1000px;
    height: auto;
    margin: 0 auto;
    display: flex;
    padding-left: 50px;

    .picImg {
      width: 200px;
      height: 130px;
      background-color: #a2cdf5;
      margin-right: 40px;
      border: 6px solid #ffffff;
      border-radius: 12px;
    }
  }

  .down-picture {
    width: 62%;
    min-width: 1000px;
    position: relative;
    top: -30px;
    left: -40px;
    width: 80%;
    height: auto;
    margin: 0 auto;
    padding-left: 100px;
    display: flex;

    .picImg {
      width: 200px;
      height: 130px;
      background-color: #a2cdf5;
      margin-right: 40px;
      border: 6px solid #ffffff;
      border-radius: 12px;
    }
  }

  .line {
    width: 70%;
    height: 420px;
    margin: 0 auto;
    background-image: url("../../../../assets/images/jiantou.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;

    .line-box:nth-child(1) {
      width: 100%;
      height: 50%;
      margin: 0 auto;
      display: flex;
      position: relative;

      .content:nth-child(1) {
        width: 25%;
        height: 90%;
        display: flex;
        padding-top: 50px;
        position: absolute;
        left: 140px;

        .left {
          width: 20%;
          font-size: 24px;
          color: #3c69be;
          text-align: right;
        }

        .right {
          width: 70%;
          padding-left: 30px;
          padding-right: 40px;
          text-align: left;
        }
      }

      .content:nth-child(2) {
        width: 25%;
        height: 90%;
        display: flex;
        padding-top: 50px;
        position: absolute;
        left: 370px;

        .left {
          width: 20%;
          font-size: 24px;
          color: #3c69be;
          text-align: right;
        }

        .right {
          width: 70%;
          padding-left: 30px;
          padding-right: 40px;
          text-align: left;
        }
      }

      .content:nth-child(3) {
        width: 25%;
        height: 90%;
        display: flex;
        padding-top: 50px;
        position: absolute;
        left: 600px;

        .left {
          width: 20%;
          font-size: 24px;
          color: #3c69be;
          text-align: right;
        }

        .right {
          width: 70%;
          padding-left: 30px;
          padding-right: 40px;
          text-align: left;
        }
      }

      .content:nth-child(4) {
        width: 25%;
        height: 90%;
        display: flex;
        padding-top: 50px;
        position: absolute;
        left: 830px;

        .left {
          width: 20%;
          font-size: 24px;
          color: #3c69be;
          text-align: right;
        }

        .right {
          width: 70%;
          padding-left: 30px;
          padding-right: 40px;
          text-align: left;
        }
      }
    }

    .line-box:nth-child(2) {
      width: 100%;
      height: 50%;
      margin: 0 auto;
      display: flex;
      position: relative;

      .content:nth-child(1) {
        width: 25%;
        height: 90%;
        display: flex;
        padding-top: 50px;
        position: absolute;
        left: 40px;

        .left {
          width: 20%;
          font-size: 24px;
          color: #3c69be;
          text-align: right;
        }

        .right {
          width: 70%;
          padding-left: 30px;
          padding-right: 40px;
          text-align: left;
        }
      }

      .content:nth-child(2) {
        width: 25%;
        height: 90%;
        display: flex;
        padding-top: 50px;
        position: absolute;
        left: 270px;

        .left {
          width: 20%;
          font-size: 24px;
          color: #3c69be;
          text-align: right;
        }

        .right {
          width: 70%;
          padding-left: 30px;
          padding-right: 40px;
          text-align: left;
        }
      }

      .content:nth-child(3) {
        width: 25%;
        height: 90%;
        display: flex;
        padding-top: 50px;
        position: absolute;
        left: 500px;

        .left {
          width: 20%;
          font-size: 24px;
          color: #3c69be;
          text-align: right;
        }

        .right {
          width: 70%;
          padding-left: 30px;
          padding-right: 40px;
          text-align: left;
        }
      }

      .content:nth-child(4) {
        width: 25%;
        height: 90%;
        display: flex;
        padding-top: 50px;
        position: absolute;
        left: 730px;

        .left {
          width: 20%;
          font-size: 24px;
          color: #3c69be;
          text-align: right;
        }

        .right {
          width: 70%;
          padding-left: 30px;
          padding-right: 40px;
          text-align: left;
        }
      }
    }
  }

  // }
}
</style>
