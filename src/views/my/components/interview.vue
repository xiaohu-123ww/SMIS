<!-- eslint-disable vue/valid-v-bind -->
<template>
  <div class="box" :class="{ max: ematy === false }" style="height: 100%">
    <div class="interview">面试邀约</div>
    <div class="interview-in" style="background-color: rgb(244, 246, 249)">
      <el-row>
        <el-col :span="2"
          ><div
            class="grid-content bg-purple"
            :class="{ bt: changeColor === 1 }"
            @click="changeAll"
          >
            全部
          </div></el-col
        >
        <el-col :span="2"
          ><div
            class="grid-content bg-purple"
            :class="{ bt: changeColor === 2 }"
            @click="changeIndisposed"
          >
            待处理
          </div></el-col
        >
        <el-col :span="2"
          ><div
            class="grid-content bg-purple"
            :class="{ bt: changeColor === 3 }"
            @click="changeReceived"
          >
            已接受
          </div></el-col
        >
        <el-col :span="2"
          ><div
            class="grid-content bg-purple"
            :class="{ bt: changeColor === 4 }"
            @click="changeReject"
          >
            已拒绝
          </div></el-col
        >
        <el-col :span="2"
          ><div
            class="grid-content bg-purple"
            :class="{ bt: changeColor === 5 }"
            @click="changeCompleted"
          >
            已通过
          </div></el-col
        >
        <el-col :span="2"
          ><div
            class="grid-content bg-purple"
            :class="{ bt: changeColor === 6 }"
            @click="canceled"
          >
            已取消
          </div></el-col
        >
      </el-row>
    </div>
    <div>
      <div>
        <div>
          <div :class="{ left: list.length === 1 }">
            <div v-for="item in list" :key="item.id" class="job">
              <div class="job-nn">
                <div class="job-one">
                  <div class="bg">
                    <img
                      :src="disposeImg(item.hr.avatar)"
                      alt=""
                      style="width: 80px; height: 80px; border-radius: 100px"
                    />
                  </div>
                  <div class="blur">
                    <h3>{{ item.hr.name }}</h3>
                    <div style="color: #403f3f">
                      {{ item.hr.identification }}。{{ item.hr.active }}
                    </div>
                  </div>
                </div>
                <div
                  v-if="item.interview_status === '待处理'"
                  class="job-nnkj"
                  style="display: flex"
                >
                  <el-button
                    type="primary"
                    style="height: 40px"
                    @click="receiveChange(item.id)"
                    >接受</el-button
                  >
                  <el-button
                    type="primary"
                    style="height: 40px"
                    @click="rejectChange(item.id)"
                    >拒绝</el-button
                  >
                </div>

                <div v-if="item.interview_status !== '待处理'" class="job-nnkj">
                  <el-button type="primary" @click="dispose(item, item.id)"
                    >面试详情</el-button
                  >
                </div>
              </div>
              <div class="job-job" @click="dispose(item, item.id)">
                <div class="machan-sss">
                  <img
                    :src="disposeImg(item.position.enterprise.logo)"
                    alt=""
                    style="width: 80px; height: 80px"
                  />
                </div>
                <div
                  class="job-mechanical"
                  style="margin: 0 0px 0 20px; width: 1200px"
                >
                  <div
                    style="font-size: 16px; margin: 5px 0 0 20px"
                    @click="open(item.position.enterprise.enterprise_id)"
                  >
                    <a href="javascript:;">
                      {{ item.position.enterprise.enterprise_name }}</a
                    >
                  </div>

                  <div class="machan" style="height: 45px; padding-top: 12px">
                    <div class="machan-cc">
                      {{ item.position.enterprise.enterprise_field }}
                    </div>
                    <div
                      class="machan-cc"
                      style="border-right: 1px solid #e6e3e3"
                    >
                      {{ item.position.enterprise.financing_status }}
                    </div>
                    <div class="machan-cc">
                      {{ item.position.enterprise.size }}
                    </div>
                  </div>
                  <div class="machss" style="font-size: 14px">
                    面试时间：{{ item.start_time }}-{{ item.end_time }}
                  </div>
                </div>
                <div class="job-mechanical">
                  <div
                    class="mechanical"
                    @click="particulars(item.position.position_id)"
                  >
                    <a href="javascript:;">{{ item.position.position_name }}</a>
                  </div>
                  <div class="machan">
                    <div class="machan-aa" style="color: red">
                      {{ item.position.salary_min }}k -{{
                        item.position.salary_max
                      }}k·{{ item.position.salary_unit }}薪
                    </div>
                    <div class="machan-bb">
                      {{ item.job_experience }}
                    </div>
                    <div class="machan-bb">{{ item.education }}</div>
                  </div>
                  <div class="machann">
                    <a href="javascript:;">
                      <div
                        class="machann-sa"
                        style="color: red; margin-left: 7px"
                      >
                        {{ item.interview_status }}
                      </div>
                    </a>
                    <div style="font-size: 14px; margin-left: 1px">
                      {{ item.create_time }}
                    </div>
                  </div>
                </div>
                <div></div>
              </div>
            </div>
          </div>
          <el-pagination
            v-if="totalList"
            style="margin: 20px 0 0 150px"
            :current-page="offset"
            :page-sizes="[5, 10, 20]"
            :page-size="limit"
            layout="sizes, prev, pager, next, jumper, total"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>
        <Interview
          :show="show"
          :state="state"
          :flag="flag"
          :result="result"
          :status-list="statusList"
          @reset="reset"
          @reset1="reset1"
        />
      </div>
    </div>
    <div
      v-if="loading"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgb(244, 246, 249)"
      style="height: 700px; font-size: 100px"
    ></div>
    <el-empty
      v-if="ematy"
      description="再无信息"
      style="height: 600px"
    ></el-empty>
  </div>
</template>
<script>
import Interview from './interview/index.vue'
import { getList, getIndisposed, getReceived, getReject, getCompleted, getResults, getLists, getCanceled } from '@/api/my/interview'
import { formatTime } from '@/api/formatTime'
import disposeImg from '@/utils/disposeImg'
import { constantRoutes } from '@/router'
export default {
  components: { Interview },
  data () {
    return {
      formatTime,

      changeColor: 1,
      list: {},
      ematy: false,
      state: false,
      total: 10,
      show: false,
      flag: false,
      result: false,
      limit: 5,
      offset: 1,
      time: '',
      receive: {
        result: 'receive', // //接受“receive”；拒绝“reject”
        interview_id: 0
      },
      reject: {
        result: 'reject', // //接受“receive”；拒绝“reject”
        interview_id: 0
      },
      statusList: {},
      loading: false,
      totalList: false
    }
  },
  computed: {

  },
  created () {
    this.getNum()
    this.changeAll()
  },
  methods: {
    // 全部
    async changeAll () {
      this.time = new Date()
      this.list = {}
      this.totalList = false
      this.changeColor = 1
      this.loading = true
      this.ematy = false
      const res = await getList(this.limit)
      console.log('全部', res)

      if (res.data.results.length === 0) {
        this.ematy = true
        this.totalList = false
      } else {
        this.list = res.data.results
        this.totalList = true
        this.total = res.data.count
        this.loading = false
      }
      this.loading = false
    },
    // 待处理
    async changeIndisposed () {
      this.list = {}
      this.ematy = false
      this.changeColor = 2
      this.totalList = false
      this.loading = true
      const res = await getIndisposed(this.limit)
      console.log('待处理', res)
      if (res.data.results.length === 0) {
        this.ematy = true
        this.totalList = false
      } else {
        this.ematy = false
        this.list = res.data.results
        this.totalList = true
        this.total = res.data.count
      }
      this.loading = false
      // if (res.data.results.length === 0) {
      //   // this.totalList = false
      //   this.ematy = true
      //   console.log(123)
      // } else {
      //   // this.list = res.data.results
      //   // this.totalList = true
      //   // this.total = res.data.count
      //   // this.loading = false
      // }
    },
    // 已接受
    async changeReceived () {
      this.list = {}
      this.changeColor = 3
      this.loading = true
      this.ematy = false

      this.totalList = false
      const res = await getReceived(this.limit)
      console.log('已接受', res)
      if (res.data.results.length === 0) {
        this.ematy = true
        this.totalList = false
      } else {
        this.list = res.data.results
        this.totalList = true
        this.total = res.data.count
        this.loading = false
      }
      this.loading = false
    },
    // 已拒绝
    async changeReject () {
      this.list = {}
      this.changeColor = 4
      this.loading = true
      this.ematy = false
      this.totalList = false
      const res = await getReject(this.limit)
      if (res.data.results.length === 0) {
        this.ematy = true
        this.totalList = false
      } else {
        this.list = res.data.results
        this.totalList = true
        this.total = res.data.count
        this.loading = false
      }
      this.loading = false
    },
    // 已通过
    async changeCompleted () {
      this.list = {}
      this.changeColor = 5
      this.loading = true
      this.ematy = false
      this.totalList = false
      const res = await getCompleted(this.limit)
      console.log('已通过', res)
      if (res.data.results.length === 0) {
        this.ematy = true
        this.totalList = false
      } else {
        this.list = res.data.results
        this.totalList = true
        this.total = res.data.count
        this.loading = false
      }
      this.loading = false
    },
    async handleSizeChange (newSize, item) {
      console.log('每页条数', newSize)
      this.limit = newSize
      if (this.changeColor === 1) {
        this.changeAll()
      } else if (this.changeColor === 2) {
        this.changeIndisposed()
      } else if (this.changeColor === 3) {
        this.changeReject()
      } else if (this.changeColor === 4) {
        this.changeReject()
      } else if (this.changeColor === 5) {
        this.changeCompleted()
      } else {
        this.canceled()
      }
    },
    async handleCurrentChange (currPage) {
      // el-pagination组件内部通过：this.$emit('current-change', 最新页码)
      console.log('当前页码', currPage)
      this.offset = currPage
      this.off = this.limit * (currPage - 1)
      if (this.changeColor === 1) {
        this.time = new Date()
        this.changeColor = 1
        const res = await getList(this.limit, this.off)
        this.list = res.data.results
      } else if (this.changeColor === 2) {
        this.changeColor = 2

        const res = await getIndisposed(this.limit, this.off)

        this.list = res.data.results
      } else if (this.changeColor === 3) {
        this.changeColor = 3

        const res = await getReceived(this.limit, this.off)

        this.list = res.data.results
      } else if (this.changeColor === 4) {
        this.changeColor = 4

        const res = await getReject(this.limit, this.off)

        this.list = res.data.results
      } else if (this.changeColor === 5) {
        this.changeColor = 5

        const res = await getCompleted(this.limit, this.off)
        console.log('已通过', res)

        this.list = res.data.results
      } else {
        this.changeColor = 5

        const res = await getCanceled(this.limit, this.off)
        console.log('已通过', res)

        this.list = res.data.results
      }
    },
    async dispose (name, id) {
      const { data } = await getLists(id)
      console.log('简历详情', data)
      this.statusList = data
      this.show = true
      this.state = true
      console.log(name)
      // if (name.interview_status === '已拒绝') {
      //   this.show = false
      // }
    },
    accept () {
      this.show = true
      this.state = false
      this.flag = true
    },
    repulse () {
      this.show = true
    },
    resultClick () {
      this.show = true
      this.result = true
    },
    reset (i) {
      this.show = i
      this.flag = false
      this.result = false
      // this.changeAll()
      this.changeIndisposed()
    },
    reset1 (i) {
      this.show = i
      this.flag = false
      this.result = false
    },
    async getInterview () {
      const res = await getList()
      console.log('res', res)
    },
    getHidden () {
      if (this.list.length === 0) {
        this.ematy = false
      }
    },
    // 接受
    async receiveChange (id) {
      this.receive.interview_id = id
      const res = await getResults(this.receive)
      console.log('res', res)
      this.changeAll()
      this.changeIndisposed()
    },
    // 拒绝
    async rejectChange (id) {
      this.reject.interview_id = id
      const res = await getResults(this.reject)
      console.log('res', res)
      this.changeAll()
      this.changeIndisposed()
    },
    async getNum () {
      this.totalList = false
      this.loading = true
      this.ematy = false
      const res = await getList(this.limit)
      console.log('全部', res)

      if (res.data.results.length === 0) {
        this.ematy = true
        this.totalList = false
      } else {
        this.list = res.data.results
        this.totalList = true
        this.total = res.data.count
        this.loading = false
      }
      this.loading = false
    },
    open (i) {
      console.log('1233333', i)
      this.$router.push({
        path: '/postdes',
        name: 'postdes',
        query: { id: i }
      })
    },
    particulars (id) {
      console.log('简历详情', id)
      this.$router.push({
        path: '/state',
        name: 'state',
        query: { id: id }
      })
    },
    async canceled () {
      this.list = {}
      this.changeColor = 6
      this.loading = true
      this.ematy = false

      this.totalList = false
      const res = await getCanceled(this.limit)
      console.log('已接受', res)
      if (res.data.results.length === 0) {
        this.ematy = true
        this.totalList = false
      } else {
        this.list = res.data.results
        this.totalList = true
        this.total = res.data.count
        this.loading = false
      }
      this.loading = false
    }

  }
}
</script>
<style scoped lang="scss">
.bt {
  color: #256efd;
  background-color: #fff;
}
.box {
  .interview {
    height: 50px;
    border-bottom: 1px solid #e6e3e3;
    line-height: 50px;
    padding-left: 30px;
    color: #256efd;
    font-weight: 600;
    font-size: 20px;
  }
  .interview-in {
    // display: flex;
    // margin-left: 20px;
    background-color: pink;
    .grid-content {
      // height: 40px;
      // width: 60px;
      line-height: 40px;
      text-align: center;
      font-size: 15px;
      // margin-right: 10px;
      // margin-bottom: 20px;
      // background-color: pink;
    }
  }
  .job {
    height: 230px;
    // background-color: #256efd;
    margin: 30px 60px 60px 60px;
    .job-nn {
      height: 100px;
      // background-color: pink;
      display: flex;
    }
    .job-one {
      height: 100px;
      width: 98%;
      // background-color: #256efd;
      display: flex;
      .bg {
        width: 80px;
        height: 80px;
        // background-color: aqua;
        overflow: hidden;
        border-radius: 100px;
        margin: 0 20px;
      }
      .blur {
        width: 300px;
        // background-color: red;
        font-size: 15px;
      }
    }
    .job-nnkj {
      margin: 30px 0 0 0px;
    }
    .job-job {
      height: 130px;
      border: 1px solid #e6e3e3;
      // background-color: red;
      display: flex;
      justify-content: space-evenly;
      border-radius: 20px;
      padding: 20px;
      .job-mechanical {
        width: 400px;
        height: 80px;
        // background-color: aqua;
        .machann {
          // height: 30px;
          // background-color: red;
          font-size: 14px;
          // padding-left: 20px;
          display: flex;
          // line-height: 30px;
          .machann-sa {
            width: 90px;
            margin-right: 12px;
            border-right: 1px solid #e6e3e3;
            padding-left: 15px;
          }
        }
        .machss {
          height: 30px;
          // background-color: #256efd;
          font-size: 15px;
          padding-left: 20px;
          color: #3c3b3b;
        }
        .mechanical {
          height: 40px;
          // background-color: #256efd;
          font-size: 15px;
          line-height: 40px;
          padding-left: 20px;
        }
        .machan {
          height: 30px;
          // background-color: pink;
          display: flex;
          font-size: 15px;
          .machan-aa {
            width: 150px;
            height: 20px;
            // background-color: #256efd;
            // border-right: 1px solid #e6e3e3;
            line-height: 20px;
            padding-left: 20px;
            // color: red;
          }
          .machan-bb {
            width: 70px;
            height: 20px;
            // background-color: greenyellow;
            line-height: 20px;
            padding-left: 20px;
          }
          .machan-cc {
            // width: 100px;
            height: 20px;
            // background-color: #256efd;
            border-right: 1px solid #e6e3e3;
            line-height: 20px;
            padding: 0 20px;
          }
        }
      }
      .machan-sss {
        width: 80px;
        height: 80px;
        // background-color: #256efd;
        margin-top: 5px;
      }
    }
  }
}
.max {
  height: 800px;
}
.left {
  height: 500px;
}
</style>
