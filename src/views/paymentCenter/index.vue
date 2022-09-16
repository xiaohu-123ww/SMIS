<template>
  <div class="pay-box">
    <header-box />
    <div class="body-box">
      <div class="left-privilege">
        <div class="title">
          特权描述<span style="color: #d9a44f; margin-left: 10px">8项特权</span>
        </div>
        <div class="content">
          <div v-for="(item, index) in list" :key="index" class="content-list">
            <div class="circle" />
            <div>无线下载</div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="up">
          <div class="tip">
            <div class="title">连续包年</div>
            <div class="main">￥<span style="font-size: 23px">299</span></div>
          </div>
        </div>
        <div class="down" />
      </div>
    </div>
  </div>
</template>
<script>
import headerBox from './components/header.vue'

export default {
  components: { headerBox },
  data () {
    return {
      list: ['', '', '', '', '', '', '', '']
    }
  }
}
</script>
<style lang="scss" scoped>
.pay-box {
  width: 100%;
  height: auto;
  background-color: #fff;

  .body-box {
    width: 62%;
    // min-width: 1000px;
    margin: 0 auto;
    height: auto;
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;

    .left-privilege {
      width: 28%;
      height: auto;
      border: 1px solid #cecece;
      border-radius: 10px;

      .title {
        width: 100%;
        text-align: center;
        padding-top: 30px;
        padding-bottom: 50px;
      }

      .content {
        width: 70%;
        margin: 0 auto;
        height: auto;
        display: flex;
        flex-wrap: wrap;
        padding-bottom: 40px;

        .content-list {
          width: 50%;
          text-align: center;
          padding: 10px 0;

          .circle {
            width: 40px;
            height: 40px;
            border: 1px solid #707070;
            border-radius: 50%;
            margin: 10px auto;
          }
        }
      }
    }

    .right {
      width: 70%;
      display: flex;
      flex-direction: column;

      .up {
        width: 100%;
        display: flex;
        overflow: hidden;
        margin-bottom: 20px;

        .tip {
          width: 180px;
          height: 100px;
          border: 1px solid #e8b665;
          border-radius: 10px;
          overflow: hidden;

          .title {
            height: 30%;
            padding-top: 10px;
            background-color: #e8b665;
            width: 100%;
            color: #fff;
            text-align: center;
          }

          .main {
            width: 100%;
            height: 70%;
            text-align: center;
            padding-top: 20px;
          }
        }
      }

      .down {
        width: 100%;
        height: 200px;
        background: #f4f8ff;
        border-radius: 10px;
      }
    }
  }
}
</style>
