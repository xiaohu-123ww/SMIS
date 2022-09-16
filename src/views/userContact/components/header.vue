<template>
  <div class="header">
    <div class="title-box">
      <div class="main-title">
        <p>
          智能<br />
          智造
        </p>
      </div>
      <div class="sub-title">
        <p style="color: #fff; font-size: 35px">选择更好，选择智能智造</p>
        <p
          style="
            color: #fff;
            font-size: 25px;
            padding-top: 20px;
            padding-bottom: 5px;
          "
        >
          CHOOSE BETTER , CHOOSE US
        </p>
        <!-- <p style="color: #fff; font-size: 14px">
          100% coverage of all knowledge test sites
        </p> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  }
}
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}

.header {
  width: 100%;
  min-width: 1000px;
  height: 300px;
  background-image: linear-gradient(to bottom right, #48d6f0, #53b3ef);

  .title-box {
    width: 600px;
    min-width: 600px;
    height: 100%;
    margin: 0 auto;
    padding-top: 80px;
    padding-bottom: 80px;
    display: flex;

    .main-title {
      min-width: 170px;
      padding-right: 40px;
      padding-left: 40px;
      font-size: 45px;
      color: #ffffff;
      display: flex;
      align-items: center;
    }
    .sub-title {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: center;
    }
  }
}
</style>
