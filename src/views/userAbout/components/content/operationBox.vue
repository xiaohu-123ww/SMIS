<template>
  <div class="content-box">
    <div class="main">
      <div class="picture">
        <img alt="" src="@/assets/images/about4.png" />
      </div>
      <div class="text">
        <div class="title">经营理念</div>
        <div class="sub">
          <p>愿景：{{ vision }}</p>
          <p>初心：{{ aspiration }}</p>
          <p>使命：{{ mission }}</p>
        </div>
        <!-- <div>
          <div class="circle">顶尖技术</div>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import { aboutUser } from '@/api/user'

export default {
  data () {
    return {
      vision: '',
      aspiration: '',
      mission: ''
    }
  },
  created () {
    aboutUser().then(rs => {

      this.vision = rs.data.愿景
      this.aspiration = rs.data.初心
      this.mission = rs.data.使命
    })
  },
  mounted () {
  }
}
</script>
<style lang="scss" scoped>
.content-box {
  width: 100%;
  min-width: 1500px;
  margin: 20px auto;
  height: 100%;
  background: #fff;

  .main {
    width: 62%;
    min-width: 1000px;
    height: auto;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 30px;
    padding-bottom: 30px;

    .picture {
      width: 40%;
      min-width: 400px;

      img {
        width: 100%;
      }
    }

    .text {
      width: 50%;
      margin-top: 40px;
      padding-right: 30px;

      .title {
        width: 160px;
        height: 56px;
        font-size: 30px;
        font-weight: 600;
        line-height: 34px;
        color: #191919;
      }

      .sub {
        width: 100%;
        height: auto;
        padding-bottom: 30px;
        p {
          margin: 0;
          color: #808080;
          font-size: 15px;
          line-height: 30px;
        }
      }

      .circle {
        width: 130px;
        height: 40px;
        background: #ffe9dd;
        color: #808080;
        text-align: center;
        line-height: 40px;
        border-radius: 29px;
      }
    }
  }
}
</style>
