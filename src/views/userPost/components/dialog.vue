<template>
  <div>
    <el-dialog
      title="立即沟通"
      :visible.sync="visible"
      width="25%"
      :before-close="dialogBeforeClose"
    >
      <div>确定要发起沟通吗</div>
      <div slot="footer">
        <el-button>取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    visible: {
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
    dialogBeforeClose () {

    }
  }
}
</script>
<style scoped lang="scss">
::v-deep .el-dialog {
  display: flex;
  flex-direction: column;
  margin: 0 !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
