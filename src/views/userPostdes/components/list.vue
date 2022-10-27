<template>
  <div class="post-list">
    <div class="postList-one">
      <el-row>
        <el-col :span="24"
          ><div class="grid-content bg-purple">
            <div class="postList">
              <div v-for="item in inRecruitList" :key="item.id" class="job-job">
                <div class="grid-content bg-purple">
                  <div style="display: flex">
                    <div class="job-mechanical" style="width: 500px">
                      <div class="mechanical">
                        {{ item.fullname }} {{ item.city }}
                        <el-button type="primary" round class="el-bt"
                          >立即沟通</el-button
                        >
                      </div>
                      <div
                        class="machan"
                        style="border-bottom: 1px solid #e6e3e3"
                      >
                        <div class="machan-aa">
                          {{ item.salary_min }}-{{ item.salary_max }} .
                          {{ item.salary_unit }}薪
                        </div>
                        <div
                          class="machan-bb"
                          style="border-right: 1px solid #e6e3e3"
                        >
                          {{ item.job_experience }}
                        </div>
                        <div class="machan-bb">{{ item.education }}</div>
                      </div>
                      <div class="equipment">
                        <div
                          v-for="(itemss, index) in item.tag"
                          :key="index"
                          class="equiment-ff"
                        >
                          {{ itemss }}
                        </div>
                      </div>
                      <div></div>
                    </div>
                    <div style="width: 500px; display: flex">
                      <div
                        class="job-mechanical"
                        style="width: 350px; border: 0"
                      >
                        <div class="mechanical">{{ firm }}</div>
                        <div
                          class="machan"
                          style="border-bottom: 1px solid #e6e3e3"
                        >
                          <div class="machan-aa">
                            {{ item.field_name[0].name }}
                          </div>
                          <div
                            class="machan-bb"
                            style="border-right: 1px solid #e6e3e3"
                          >
                            为融资
                          </div>
                          <div class="machan-bb">99人</div>
                        </div>
                        <div class="equipment">
                          <div
                            style="
                              padding-top: 12px;
                              font-size: 12px;
                              color: #878484;
                            "
                          >
                            五险一金，年终奖，节日福利，带薪休假
                          </div>
                        </div>
                      </div>
                      <div
                        style="
                          width: 60px;
                          height: 60px;
                          background-color: #256efd;
                          margin: 10px 0 0 20px;
                        "
                      >
                        <img
                          alt=""
                          :src="image"
                          style="width: 60px; height: 60px"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div></div></el-col
      ></el-row>
    </div>

    <!-- <el-pagination
      style="margin: 20px 0 0 150px"
      :current-page="query.pagenum"
      :page-sizes="[2, 3, 5, 10]"
      :page-size="query.pagesize"
      layout="sizes, prev, pager, next, jumper, total"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination> -->
  </div>
</template>
<script>
import disposeImg from '@/utils/disposeImg'
export default {
  props: {
    inRecruitList: {
      type: Array
    },
    firm: {
      type: String
    },
    image: {
      type: String
    }
  },
  data () {
    return {
      list: ['', '', ''],

      query: {
        pagenum: 1, // 页码
        pagesize: 2, // 每页数据条数回所有数据
        // 分类和状态默认为空，反
        cate_id: '', // 文章分类ID
        state: '' // 文章发布状态
      },
      total: 10,
      record: [{
        id: '1',
        position: '机械视觉工程师',
        money: '8000-15000',
        salary: '13薪',
        company: '北京智能智造科技有限公司'
      },
      {
        id: '2',
        position: '机械视觉工程师',
        money: '8000-15000',
        salary: '13薪',
        company: '北京智能智造科技有限公司'
      }
      ]
    }
  },
  computed: {
    // searchList () {
    //   //  (this.$store.state.user.searchList);
    //   // console.log(this.$store.state.user.searchList);
    //   return this.$store.state.user.searchList
    // }
  },
  watch: {},
  created () { },
  methods: {
    jobDetails (item) {
      this.$router.push({
        path: '/postdes',
        name: 'postdes',
        query: { id: item.id }
      })
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
    }
  }
};
</script>
<style lang="scss" scoped>
.postList-one {
  // display: flex;
  width: 100%;
  position: relation;
  margin: 0 auto;
  .postList {
    margin-top: 10px;
    height: 100%;
    // background-color: #fff;
    .job-job {
      height: 140px;
      border: 1px solid #e6e3e3;
      background-color: #fff;
      // display: flex;
      // justify-content: space-evenly;
      border-radius: 20px;
      padding-top: 20px;
      margin-bottom: 30px;
      .machan-sss {
        width: 60px;
        height: 60px;
        background-color: #256efd;
      }
      .el-bt {
        width: 100px;
        height: 28px;
        line-height: 4px;
        margin-left: 50px;
      }
      .job-mechanical {
        width: 100%;
        height: 80px;
        // background-color: aqua;
        // border-bottom: 1px solid #999;
        .equipment {
          height: 38px;
          // background-color: #256efd;
          display: flex;
          // padding-left: 20px;
          .equiment-ff {
            // width: 70px;
            height: 20px;
            line-height: 20px;
            text-align: center;
            border: 1px solid #bfbbbb;
            background-color: rgba(230, 227, 238, 0.836) 4;
            margin-top: 9px;
            color: #878484;
            margin-left: 40px;
          }
        }
        .mechanical {
          height: 40px;
          // background-color: #256efd;
          font-size: 16px;
          line-height: 40px;
          padding-left: 30px;
          color: #256efd;
          font-weight: 700;
        }
        .image {
          width: 400px;
          // background-color: red;
        }
        .machan {
          height: 40px;
          // background-color: pink;
          // border-bottom: 1px solid #e6e3ee;
          display: flex;
          font-size: 15px;
          .machan-aa {
            width: 170px;
            height: 20px;
            // background-color: #256efd;
            border-right: 1px solid #e6e3e3;
            line-height: 20px;
            padding-left: 30px;
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
            padding-left: 30px;
          }
        }
      }
    }
  }
  .record {
    // width: 300px;
    // height: 1000px;
    background-color: #fff;
    margin: 10px 0 0 20px;
    border-radius: 20px;
    .record-aa {
      height: 45px;
      // background-color: #256efd;
      // border-bottom: 1px solid #e6e3e3;
      font-size: 18px;
      padding: 12px;
      color: #256efd;
    }
    .record-box {
      // height: 80px;
      // background-color: pink;
      padding: 12px;
      font-size: 16px;
      // border-bottom: 1px solid #e6e3e3;
      .record-row {
        height: 40px;
        // background-color: #256efd;
        line-height: 30px;
        font-size: 15px;
      }
    }
  }
}
</style>
