<template>
  <div class="onlinewrapper">
    <el-collapse v-model="activeonline">
      <el-collapse-item title="我的线上学习" name="2">
        <div style="text-align: center">
          <img
            src="https://znzz.tech/static/img/sys-img/xet_store_icon.jpg"
            alt=""
            width="300px"
            height="300px"
            style="margin: 70px auto"
          />
          <p style="cursor: pointer; font-size: 15px" @click="tiaozhaunxet">
            <i>点击跳转到小鹅通进行学习吧~~~</i>
          </p>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeonline: ['2']
    }
  },
  methods: {
    // 跳转小鹅通
    tiaozhaunxet () {
      // this.$router.replace
      window.open(
        'https://admin.xiaoe-tech.com/login_page#/register',
        '_blank'
      )
    }
  }
};
</script>
<style scoped>
.onlinewrapper {
  width: 80%;
  /* height: 100vh; */
  margin: 0 auto;
  overflow: hidden;
}

/deep/.el-collapse-item__header {
  font-size: 20px !important;
  padding-left: 20px;
}
</style>
