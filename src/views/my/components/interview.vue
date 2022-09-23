<template>
  <div class="box">
    <div class="interview">面试邀约</div>
    <div class="interview-in">
      <el-row v-for="(item, index) in list" :key="item">
        <el-col :span="3"
          ><div
            class="grid-content bg-purple"
            :class="{ bt: changeColor === index }"
            @click="change(index)"
          >
            {{ item }}
          </div></el-col
        >
      </el-row>
    </div>
    <div v-for="item in job" :key="item.id" class="job">
      <div class="job-nn">
        <div class="job-one">
          <div class="bg">
            <img
              src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
              alt=""
              style="width: 90px; height: 90px"
            />
          </div>
          <div class="blur">
            <h3>{{ item.name }}</h3>
            <div style="color: #403f3f">{{ item.job }} . {{ item.state }}</div>
          </div>
        </div>
        <div v-if="item.status === 1" class="job-nnkj">
          <el-button type="primary">接受</el-button>
          <el-button type="primary">拒绝</el-button>
        </div>
        <div v-if="item.status === 2" class="job-nnkj">
          <el-button type="primary" @click="resultClick">面试详情</el-button>
        </div>
      </div>
      <div class="job-job">
        <div class="machan-sss">1223</div>
        <div class="job-mechanical">
          <div class="mechanical">{{ item.company }}</div>
          <div class="machan">
            <div class="machan-cc">{{ item.specialty }}</div>
            <div class="machan-cc" style="border-right: 1px solid #e6e3e3">
              {{ item.financing }}
            </div>
            <div class="machan-cc">{{ item.people }}</div>
          </div>
          <div class="machss">面试时间：{{ item.time }}</div>
        </div>
        <div class="job-mechanical">
          <div class="mechanical">{{ item.position }} {{ item.address }}</div>
          <div class="machan">
            <div class="machan-aa">{{ item.money }} . {{ item.salary }}</div>
            <div class="machan-bb">
              {{ item.education }}
            </div>
            <div class="machan-bb">{{ item.school }}</div>
          </div>
          <div class="machann">
            <a v-if="item.status === 1" href="javascript:;">
              <div class="machann-sa" style="color: red" @click="dispose">
                待处理
              </div>
            </a>
            <a v-if="item.status === 2" href="javascript:;">
              <div class="machann-sa" style="color: red" @click="accept">
                已接受
              </div>
            </a>
            <a v-if="item.status === 3" href="javascript:;">
              <div class="machann-sa" style="color: red" @click="repulse">
                已拒绝
              </div>
            </a>
            <div>2022-05-05 10:00</div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
    <el-pagination
      style="margin: 20px 0 0 300px"
      :current-page="query.pagenum"
      :page-sizes="[2, 3, 5, 10]"
      :page-size="query.pagesize"
      layout="sizes, prev, pager, next, jumper, total"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
    <Interview
      :show="show"
      :state="state"
      :flag="flag"
      :result="result"
      @reset="reset"
    />
  </div>
</template>
<script>
import Interview from './interview/index.vue'
export default {
  components: { Interview },
  data () {
    return {
      changeColor: 0,
      list: ['全部', '待处理', '已接受', '已拒绝', '已通过'],
      job: [
        {
          id: 1,
          name: '罗先生',
          job: '人事',
          state: '今日活跃',
          position: '机械工程师',
          address: '北京.海淀.西小口',
          money: '8000-15000',
          salary: '13薪',
          school: '本科',
          company: '北京智能智造科技有限公司',
          specialty: '互联网',
          financing: '未融资',
          people: '20-99人',
          education: '1-3年',
          time: '2022-09-23 10：00-11：00',
          status: 1
        },
        {
          id: 2,
          name: '罗先生',
          job: '人事',
          state: '今日活跃',
          position: '机械工程师',
          address: '北京.海淀.西小口',
          money: '8000-15000',
          salary: '13薪',
          school: '本科',
          company: '北京智能智造科技有限公司',
          specialty: '互联网',
          financing: '未融资',
          people: '20-99人',
          education: '1-3年',
          status: 2
        },
        {
          id: 3,
          name: '罗先生',
          job: '人事',
          state: '今日活跃',
          position: '机械工程师',
          address: '北京.海淀.西小口',
          money: '8000-15000',
          salary: '13薪',
          school: '本科',
          company: '北京智能智造科技有限公司',
          specialty: '互联网',
          financing: '未融资',
          people: '20-99人',
          education: '1-3年',
          time: '2022-09-23 10：00-11：00',
          status: 3
        }
      ],
      query: {
        pagenum: 1, // 页码
        pagesize: 2, // 每页数据条数回所有数据
        // 分类和状态默认为空，反
        cate_id: '', // 文章分类ID
        state: '' // 文章发布状态
      },
      state: false,
      total: 10,
      show: false,
      flag: false,
      result: false
    }
  },
  computed: {

  },
  created () {
  },
  methods: {
    change (index) {
      this.changeColor = index
    },
    handleSizeChange (newSize) {
      console.log('每页条数', newSize)
      // // 修改后台接口查询参数pagesize每页条数
      // this.query.pagesize = newSize
      // // 重置页码为第一页
      // this.pagenum = 1
      // // 根据最新页码重新查询列表收据
      // this.getArticleList()
    },
    handleCurrentChange (currPage) {
      // el-pagination组件内部通过：this.$emit('current-change', 最新页码)
      console.log('当前页码', currPage)
      // // 修改后台接口查询参数pagenum页码
      // this.query.pagenum = currPage
      // // 2.根据最新页码重新查询列表收据
      // this.getArticleList()
    },
    dispose () {
      this.show = true
      this.state = true
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
    }
  }
}
</script>
<style scoped lang="scss">
.bt {
  border-bottom: 2px solid #256efd;
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
    display: flex;
    margin-left: 20px;
    .grid-content {
      height: 40px;
      width: 60px;
      line-height: 40px;
      text-align: center;
      font-size: 15px;
      margin-right: 10px;
      margin-bottom: 20px;
      // background-color: pink;
    }
  }
  .job {
    height: 230px;
    // background-color: #256efd;
    margin-bottom: 50px;
    .job-nn {
      height: 100px;
      // background-color: pink;
      display: flex;
    }
    .job-one {
      height: 100px;
      width: 400px;
      // background-color: #256efd;
      display: flex;
      .bg {
        width: 100px;
        height: 100px;
        // background-color: aqua;
        margin: 0 20px;
      }
      .blur {
        width: 300px;
        // background-color: red;
        font-size: 15px;
      }
    }
    .job-nnkj {
      margin: 30px 0 0 600px;
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
          height: 30px;
          // background-color: red;
          font-size: 15px;
          padding-left: 20px;
          display: flex;
          line-height: 30px;
          .machann-sa {
            width: 90px;
            margin-right: 15px;
            border-right: 1px solid #e6e3e3;
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
            width: 100px;
            height: 20px;
            // background-color: #256efd;
            border-right: 1px solid #e6e3e3;
            line-height: 20px;
            padding-left: 20px;
          }
        }
      }
      .machan-sss {
        width: 80px;
        height: 80px;
        background-color: #256efd;
        margin-top: 10px;
      }
    }
  }
}
</style>
