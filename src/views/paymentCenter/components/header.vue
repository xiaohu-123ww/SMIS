<template>
  <div class="content-box">
    <div class="title">
      <img alt="" src="@/assets/images/logo.png" />
      <div
        style="
          width: 1px;
          height: 20px;
          background: #cecece;
          margin: 15px 20px 0 20px;
        "
      />
      <span style="color: #a3a3a3; padding-left: 20px; padding-top: 15px"
        >支付中心</span
      >
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
.content-box {
  width: 62%;
  min-width: 1000px;
  margin: 0 auto;
  height: 100%;

  .title {
    width: 100%;
    padding-bottom: 30px;
    padding-top: 40px;
    display: flex;

    img {
      width: 13%;
      min-width: 150px;
    }
  }
}
</style>
