<template>
  <div class="resume">
    <div class="resume-left">
      <div class="resume-on-line">在线简历</div>
      <div class="personal-details">求职意向</div>
      <div class="personal-details">个人优势</div>
      <div class="personal-details">工作经历</div>
      <div class="personal-details">教育经历</div>
      <div class="personal-details">项目经历</div>
      <div class="personal-details">资格证书</div>
    </div>
    <div class="resume-right"></div>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  mounted () {

  }
}
</script>
<style scoped lang="scss">
.resume {
  display: flex;
  border: 1px solid #e6e3e3;
  margin: 0;
  padding: 0;
  .resume-left {
    width: 1000px;
    height: 1000px;
    // background-color: red;
  }
  .resume-right {
    background-color: pink;
    flex: 1;
  }
}
</style>
