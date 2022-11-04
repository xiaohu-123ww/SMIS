<template>
  <div v-if="show">
    <el-dialog
      title="面试详情"
      :visible.sync="show"
      width="30%"
      :before-close="handleClose"
    >
      <div>
        <div class="interview-fa">
          <div class="interview">
            <div class="interview-top">
              <div class="interview-one">
                {{ statusList.position.position_name }}
              </div>
              <div style="color: red">
                {{ statusList.position.salary_min }}-{{
                  statusList.position.salary_max
                }}
                . {{ statusList.position.salary_unit }}薪
              </div>
            </div>
            <div class="interview-top" style="color: ##256efd">
              {{ statusList.position.enterprise.enterprise_name }}
            </div>
          </div>
          <div class="inter">
            <p>
              面试时间：{{ statusList.start_time }}-{{ statusList.end_time }}
            </p>
            <p>面试地点：{{ address }}</p>
            <p style="padding-left: 14px">联系人：{{ people }}</p>
            <p>联系电话：{{ statusList.hr.name }}</p>
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
        <span class="accept"
          ><span v-if="condition"
            >已接受面试邀请，记得按时参加哦！！！</span
          ></span
        >

        <span
          v-if="pass"
          class="accept"
          style="font-weight: 700; font-size: 18px"
        >
          <span v-if="all" style="color: red">恭喜您面试通过！</span>
          <span v-if="denied" style="color: #999">
            面试结果还没出,请耐心等待</span
          >
          <span v-if="hold" style="color: #999"> 待定中，请耐心等待</span>
          <span v-if="reject" style="color: #999"> 未通过,希望下次合作</span>
        </span>
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
    statusList (newVal, oldVal) {
      if (newVal.interview_status === '已接受') {
        this.condition = true
      }
      if (newVal.interview_status === '已完成') {
        this.pass = true
        if (newVal.interview_result === null) {
          this.denied = true
          this.all = false
          this.reject = false
          this.hold = false
        } else if (newVal.interview_result === '已通过') {
          this.all = true
          this.denied = false
          this.reject = false
          this.hold = false
        } else if (newVal.interview_result === '待定') {
          this.hold = true
          this.denied = false
          this.all = false
          this.reject = false
        } else if (newVal.interview_result === '未通过') {
          this.reject = true
          this.hold = false
          this.denied = false
          this.all = false
        }
      }
    }
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
      if (this.statusList.interview_result === '已接受') {
        this.condition = 1
        console.log(1)
      }
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
  margin-left: 50px;
}
</style>

