<template>
  <div v-if="show">
    <el-dialog
      title="面试详情"
      :visible.sync="show"
      width="30%"
      :before-close="handleClose"
    >
      <div v-if="show">
        <div class="interview-fa">
          <div class="interview">
            <div class="interview-top">
              <div class="interview-one">
                {{ statusList.hr.name ? statusList.hr.name : 'hr' }}
              </div>
              <div style="color: red">
                {{ statusList.position.salary_min }}-{{
                  statusList.position.salary_max
                }}
                . {{ statusList.position.salary_unit }}薪
              </div>
            </div>
            <div class="interview-top" style="color: ##256efd">
              {{ statusList.position.enterprise_name }}
            </div>
          </div>
          <div class="inter">
            <p>
              面试时间：{{ statusList.start_time }}-{{ statusList.end_time }}
            </p>
            <p>面试地点：{{ statusList.address }}</p>
            <p style="padding-left: 14px">联系人：{{ statusList.contactor }}</p>
            <p>联系电话：{{ statusList.contact }}</p>
          </div>
        </div>
        <!-- <span
        v-if="statusList.interview_result === ''"
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="refuse">接受面试</el-button>
        <el-button type="primary" @click="accept">拒绝面试</el-button>
      </span> -->
        <div class="accept">
          <span v-if="statusList.result === '已接受'"
            >已接受面试邀请，记得按时参加哦！！！</span
          >

          <span
            v-if="statusList.result === '已通过'"
            style="color: red; font-size: 20px"
            >恭喜您面试通过！</span
          >
          <span
            v-if="statusList.result === '已完成'"
            style="color: #999; font-size: 20px"
          >
            面试结果还没出,请耐心等待</span
          >
          <span
            v-if="statusList.result === '待定'"
            style="color: #999; font-size: 20px"
          >
            待定中，请耐心等待</span
          >
          <span
            v-if="statusList.result === '未通过'"
            style="color: #999; font-size: 20px"
          >
            未通过,希望下次合作</span
          >
          <span
            v-if="statusList.result === '已取消'"
            style="color: #999; font-size: 20px"
          >
            已取消面试</span
          >
          <span v-if="statusList.result === '待评价'" style="color: #999">
            面试结果还没出,请耐心等待</span
          >
        </div>
      </div>
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
    },
    statusList: {
      type: Object
    }
  },
  data () {
    return {
      time: '2022-05-06 10：00-12：00',
      address: '北京海淀区西小口路66号中关村东升科技园北领地B-2楼',
      people: '洛先生',
      photo: '176000000000',
      condition: false,
      denied: false,
      pass: false,
      reject: false,
      all: false,
      hold: false

    }
  },
  computed: {

  },
  watch: {

  },
  created () {
    this.getState()
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

    },
    getState () {

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
  // margin: 70px;
  // margin-left: 50px;
  text-align: center;
}
</style>

