<template>
  <div v-if="show">
    <el-dialog
      title="面试详情"
      :visible.sync="show"
      width="30%"
      :before-close="handleClose"
    >
      <div class="interview-fa">
        <div class="interview">
          <div class="interview-top">
            <div class="interview-one">机械工程师</div>
            <div style="color: red">8000-15000 . 12薪</div>
          </div>
          <div class="interview-top" style="color: ##256efd">
            北京智能智造科技有限公司
          </div>
        </div>
        <div class="inter">
          <p>面试时间：{{ time }}</p>
          <p>面试地点：{{ address }}</p>
          <p style="padding-left: 14px">联系人：{{ people }}</p>
          <p>联系电话：{{ photo }}</p>
        </div>
      </div>
      <span v-if="state" slot="footer" class="dialog-footer">
        <el-button @click="refuse">接受面试</el-button>
        <el-button type="primary" @click="accept">拒绝面试</el-button>
      </span>
      <span v-if="flag" class="accept"
        >已接受面试邀请，记得按时参加哦！！！</span
      >
      <span
        v-if="result"
        class="accept"
        style="color: red; font-weight: 700; font-size: 18px"
        >恭喜您面试通过！</span
      >
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean
    },
    state: {
      type: Boolean
    },
    flag: {
      type: Boolean
    },
    result: {
      type: Boolean
    }
  },
  data () {
    return {
      time: '2022-05-06 10：00-12：00',
      address: '北京海淀区西小口路66号中关村东升科技园北领地B-2楼',
      people: '洛先生',
      photo: '176000000000'

    }
  },
  computed: {

  },
  mounted () {
    console.log(this.state)
  },
  methods: {
    handleClose (done) {
      this.$emit('reset', false)
      console.log(this.state)
    },
    refuse () {

    },
    accept () {

    }

  }
}
</script>
<style scoped lang="scss">
.interview-fa {
  margin-left: 20px;
  .interview {
    // height: 70px;
    border-bottom: 1px solid #e6e3e3;

    .interview-top {
      height: 30px;
      // background-color: aqua;
      display: flex;
      line-height: 30px;
      margin-bottom: 10px;
      .interview-one {
        width: 260px;
        font-size: 16px;
        color: #256efd;
        font-weight: 700;
      }
    }
  }
  .inter {
    margin-top: 20px;
    font-size: 15px;
    color: rgb(166, 162, 162);
    margin-bottom: 30px;
  }
}
.accept {
  font-size: 16px;
  color: rgb(120, 116, 116);
  margin: 70px;
}
</style>

