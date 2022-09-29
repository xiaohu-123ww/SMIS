<template>
  <div>
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
        <div class="job-nnkj">
          <el-button v-if="!show" type="primary">感兴趣</el-button>
          <el-button v-if="show" type="primary">取消收藏</el-button>
        </div>
      </div>
      <div class="job-job">
        <div class="job-mechanical">
          <div class="mechanical">{{ item.position }} {{ item.address }}</div>
          <div class="machan">
            <div class="machan-aa">{{ item.money }} . {{ item.salary }}</div>
            <div class="machan-bb" style="border-right: 1px solid #e6e3e3">
              {{ item.education }}
            </div>
            <div class="machan-bb">{{ item.school }}</div>
          </div>
        </div>
        <div>
          <div class="job-mechanical">
            <div class="mechanical">{{ item.company }}</div>
            <div class="machan">
              <div class="machan-cc">{{ item.specialty }}</div>
              <div class="machan-cc" style="border-right: 1px solid #e6e3e3">
                {{ item.financing }}
              </div>
              <div class="machan-cc">{{ item.people }}</div>
            </div>
          </div>
        </div>
        <div class="machan-sss">1223</div>
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
  </div>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean
    }
  },
  data () {
    return {
      list: [{
        value: 1,
        name: '新招呼'
      },
      {
        value: 2,
        name: '有意向'
      },
      {
        value: 3,
        name: '沟通中'
      },
      {
        value: 4,
        name: '已投递'
      },
      {
        value: 5,
        name: '邀面试'
      }, {
        value: 6,
        name: '不合适'
      }],
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
          education: '1-3年'
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
          education: '1-3年'
        }
      ],
      query: {
        pagenum: 1, // 页码
        pagesize: 2, // 每页数据条数回所有数据
        // 分类和状态默认为空，反
        cate_id: '', // 文章分类ID
        state: '' // 文章发布状态
      },
      total: 10
    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
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
    }
  }
}
</script>
<style scoped lang="scss">
.job {
  height: 230px;
  // background-color: #256efd;
  margin: 30px;
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
    margin: 30px 0 0 615px;
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
      .mechanical {
        height: 40px;
        // background-color: #256efd;
        font-size: 15px;
        line-height: 40px;
        padding-left: 20px;
      }
      .machan {
        height: 40px;
        // background-color: pink;
        display: flex;
        font-size: 15px;
        .machan-aa {
          width: 150px;
          height: 20px;
          // background-color: #256efd;
          border-right: 1px solid #e6e3e3;
          line-height: 20px;
          padding-left: 20px;
          color: red;
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
    }
  }
}
</style>
