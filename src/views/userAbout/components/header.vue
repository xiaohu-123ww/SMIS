<template>
  <div class="header">
    <div class="title-box">
      <!-- <div class="main-title">
        <p>
          智能<br />
          智造
        </p>
      </div>
      <div class="sub-title" style="flex: 1">
        <p style="color: #fff; font-size: 35px">专注专业，精准选择</p>
        <p style="
            color: #fff;
            font-size: 16px;
            padding-top: 20px;
            padding-bottom: 5px;
          ">
          CONCENTRATION MAKES PROFESSION
        </p>
        <p style="color:#fff;font-size: 14px;">100% coverage of all knowledge test sites</p>
      </div> -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}

.header {
  // margin-top: 0px;
  width: 100%;
  height: 390px;
  background-image: linear-gradient(to bottom right, #48d6f0, #53b3ef);
  background-image: url(../../../assets/images/About-swiper.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;

  .title-box {
    width: 500px;
    min-width: 500px;
    height: 100%;
    margin: 0 auto;
    padding-top: 80px;
    padding-bottom: 80px;
    display: flex;

    // .main-title {
    //   width: 150px;
    //   font-size: 45px;
    //   color: #ffffff;
    //   display: flex;
    //   justify-content: center;
    //   align-items: center;
    // }

    // .sub-title {
    //   flex: 1 1 0%;
    //   display: flex;
    //   flex-direction: column;
    //   justify-content: center;
    // }
  }
}
</style>
