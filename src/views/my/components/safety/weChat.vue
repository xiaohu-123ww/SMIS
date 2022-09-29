<template>
  <div>
    <el-dialog
      title="绑定微信"
      :visible.sync="weChatShow"
      width="30%"
      :before-close="handleClose"
    >
      <div class="box">
        <div>
          <img src="../../../../assets/imgs/二维码.png" alt="" class="chat" />
        </div>
        <p class="text">请使用微信【扫一扫】完成绑定</p>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    weChatShow: {
      type: Boolean
    }
  },
  data () {
    return {

    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    handleClose () {
      this.$emit('reset', false)
    }
  }
}
</script>
<style scoped lang="scss">
.box {
  height: 400px;
  // background-color: aqua;
  // padding-left: 70px;
  .chat {
    width: 300px;
    height: 300px;
    margin-left: 70px;
  }
  .text {
    font-size: 18px;
    margin: 30px 0 0 100px;
    color: black;
  }
}
</style>
