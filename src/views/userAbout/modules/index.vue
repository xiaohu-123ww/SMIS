<template>
  <div>
    <header-box style="position: absolute;top:0" />
    <div class="content">
      <intelligent-box />
      <!-- <user-box/> -->
      <!-- 讲师介绍 -->
      <!-- <instructor-box/> -->
      <!-- 经营理念 -->
      <!-- <operation-box/> -->
      <!-- 曲线图 -->
      <!--      <line-box />-->
    </div>
  </div>
</template>
<script>
import headerBox from '../components/header.vue';
import IntelligentBox from '../components/content/IntelligentBox.vue';
import userBox from '../components/content/userBox.vue';
import instructorBox from '../components/content/instructorBox.vue';
import operationBox from '../components/content/operationBox.vue';
// import lineBox from '../components/content/lineBox.vue'

export default {
  components: {
    headerBox,
    IntelligentBox,
    userBox,
    instructorBox,
    operationBox
    // lineBox
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.content {
  width: 100%;
  height: auto;
  background-color: #fff;
  overflow: hidden;
  margin-top: 400px;
}

</style>
