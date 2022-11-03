<template>
  <div>
    <div v-for="item in list" :key="item.id" class="job">
      <div class="job-nn">
        <div class="job-one">
          <div class="bg">
            <img
              :src="disposeImg(item.hr_info.avatar)"
              alt=""
              style="width: 90px; height: 90px"
            />
          </div>
          <div class="blur">
            <h3>{{ item.hr_info.name }}</h3>
            <div style="color: #403f3f">
              {{ item.hr_info.identification }} . {{ item.hr_info.active }}
            </div>
          </div>
        </div>
        <div class="job-nnkj">
          <el-button v-if="!show" type="primary">感兴趣</el-button>
          <el-button v-if="show" type="primary">取消收藏</el-button>
        </div>
      </div>
      <div class="job-job">
        <div class="job-mechanical">
          <div class="mechanical">
            {{ item.position_info.position_name }} {{ item.position_info.city }}
          </div>
          <div class="machan">
            <div class="machan-aa">
              {{ item.position_info.salary_left }}-
              {{ item.position_info.salary_right }} . {{ item.salary }}
            </div>
            <div class="machan-bb" style="border-right: 1px solid #e6e3e3">
              {{ item.position_info.experience }}
            </div>
            <div class="machan-bb">{{ item.position_info.education }}</div>
          </div>
        </div>
        <div>
          <div class="job-mechanical">
            <div class="mechanical">{{ item.enterprise_info.name }}</div>
            <div class="machan">
              <div class="machan-cc">{{ item.enterprise_info.filed }}</div>
              <div class="machan-cc" style="border-right: 1px solid #e6e3e3">
                {{ item.enterprise_info.finance }}
              </div>
              <div class="machan-cc">{{ item.enterprise_info.size }}</div>
            </div>
          </div>
        </div>
        <div class="machan-sss">
          <img
            :src="disposeImg(item.enterprise_info.logo)"
            alt=""
            style="width: 90px; height: 90px"
          />
        </div>
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
import disposeImg from '@/utils/disposeImg'
export default {
  props: {
    show: {
      type: Boolean
    },
    list: {
      type: Array
    }
  },
  data () {
    return {
      // list: [{
      //   value: 1,
      //   name: '新招呼'
      // },
      // {
      //   value: 2,
      //   name: '有意向'
      // },
      // {
      //   value: 3,
      //   name: '沟通中'
      // },
      // {
      //   value: 4,
      //   name: '已投递'
      // },
      // {
      //   value: 5,
      //   name: '邀面试'
      // }, {
      //   value: 6,
      //   name: '不合适'
      // }],

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
