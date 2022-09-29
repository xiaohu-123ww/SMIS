<template>
  <div class="post-list">
    <!-- <div
      v-for="(item, index) in searchList"
      :key="index"
      class="post-info"
      @click="jobDetails(item)"
    >
      <!标题 -->
    <!-- <div v-if="item.options" class="title">
        <span style="cursor: pointer">{{ item.position.pst_class.name }}</span>
      </div> -->
    <!-- 薪资待遇 -->
    <!-- <div class="suffer" style="padding: 0 0 5px 20px; color: #666666">
        <span
          style="
            color: #fe6b49;
            margin: 0;
            font-size: 20px;
            padding-right: 10px;
          "
          >{{ item.salary_min }}-{{ item.salary_max }}</span
        >
        {{ item.job_experience }} | {{ item.education }}
      </div> -->
    <!-- 右边头像 -->
    <!-- <div class="logo">
        <div v-if="item.position" class="picture">
          <img
            :src="item.enterprise.logo"
            alt
            height="100%"
            srcset
            width="100%"
          />
        </div>
        <div v-if="item.enterprise" class="company">
          <div class="name">{{ item.enterprise.name }}</div>
        </div>
      </div> -->
    <!-- 沟通 -->
    <!-- -->
    <div class="postList-one">
      <el-row>
        <el-col :span="18"
          ><div class="grid-content bg-purple">
            <div class="postList">
              <div v-for="item in job" :key="item.id" class="job-job">
                <div class="job-mechanical">
                  <div class="mechanical">
                    {{ item.position }} {{ item.address }}
                    <el-button type="primary" round class="el-bt"
                      >立即沟通</el-button
                    >
                  </div>
                  <div class="machan">
                    <div class="machan-aa">
                      {{ item.money }} . {{ item.salary }}
                    </div>
                    <div
                      class="machan-bb"
                      style="border-right: 1px solid #e6e3e3"
                    >
                      {{ item.education }}
                    </div>
                    <div class="machan-bb">{{ item.school }}</div>
                  </div>
                  <div class="equipment">
                    <div
                      v-for="(itemss, index) in item.equipment"
                      :key="index"
                      class="equiment-ff"
                    >
                      {{ itemss }}
                    </div>
                  </div>
                  <div></div>
                </div>
                <div>
                  <div class="job-mechanical">
                    <div class="mechanical">{{ item.company }}</div>
                    <div class="machan">
                      <div class="machan-cc">{{ item.specialty }}</div>
                      <div
                        class="machan-cc"
                        style="border-right: 1px solid #e6e3e3"
                      >
                        {{ item.financing }}
                      </div>

                      <div class="machan-cc">{{ item.people }}</div>
                    </div>
                    <div
                      style="
                        padding-top: 12px;
                        font-size: 12px;
                        color: #878484;
                        margin-left: 70px;
                      "
                    >
                      {{ item.weal }}
                    </div>
                  </div>
                </div>
                <div class="machan-sss">1</div>
              </div>
              <el-pagination
                style="margin: 20px 0 0 150px"
                :current-page="query.pagenum"
                :page-sizes="[2, 3, 5, 10]"
                :page-size="query.pagesize"
                layout="sizes, prev, pager, next, jumper, total"
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              >
              </el-pagination>
            </div></div
        ></el-col>
        <el-col :span="6"
          ><div class="grid-content bg-purple-light">
            <div class="record">
              <div class="record-aa">浏览记录</div>
              <div v-for="item in record" :key="item.id" class="record-box">
                <div class="record-row">
                  <el-row>
                    <el-col :span="12"
                      ><div class="grid-content bg-purple">
                        {{ item.position }}
                      </div></el-col
                    >
                    <el-col :span="12"
                      ><div
                        class="grid-content bg-purple-light"
                        style="color: red"
                      >
                        {{ item.money }} .{{ item.salary }}
                      </div></el-col
                    >
                  </el-row>
                </div>
                <div style="color: #878484">{{ item.company }}</div>
              </div>
            </div>
          </div></el-col
        >
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      list: ['', '', ''],
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
          equipment: ['机械设备', '机械组装', '电器设置', '机械一体化'],
          weal: '五险一金，年终奖，节日福利，带薪休假'
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
          equipment: ['机械设备', '机械组装', '电器设置', '机械一体化'],
          weal: '五险一金，年终奖，节日福利，带薪休假'
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
          equipment: ['机械设备', '机械组装', '电器设置', '机械一体化'],
          weal: '五险一金，年终奖，节日福利，带薪休假'
        },
        {
          id: 4,
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
          equipment: ['机械设备', '机械组装', '电器设置', '机械一体化'],
          weal: '五险一金，年终奖，节日福利，带薪休假'
        }, {
          id: 5,
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
          equipment: ['机械设备', '机械组装', '电器设置', '机械一体化'],
          weal: '五险一金，年终奖，节日福利，带薪休假'
        }
      ],
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
// .post-list {
//   width: 100%;
//   height: auto;
//   padding-top: 30px;
//   overflow: hidden;
//   display: flex;
//   justify-content: space-between;
//   flex-wrap: wrap;
//   .post-info:hover {
//     z-index: 2;
//     -webkit-box-shadow: 0 15px 30px rgb(0 0 0 / 10%);
//     box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
//     -webkit-transform: translate3d(0, -2px, 0);
//     transform: translate3d(0, -2px, 0);
//   }
//   .post-info .suffer:hover {
//     color: #4e93f7 !important;
//   }
//   .post-info .title span:hover {
//     color: #4e93f7;
//   }
//   .company div:hover {
//     color: #4e93f7 !important;
//   }
//   .post-info {
//     width: 49%;
//     min-width: 450px;
//     height: 248px;
//     position: relative;
//     border: 1px solid #cecece;
//     border-radius: 10px;
//     margin-bottom: 20px;
//     background-color: #fff;
//     .title {
//       width: 100%;
//       padding: 40px 20px 12px 20px;
//       font-size: 28px;
//       font-family: PingFang HK;
//       font-weight: 600;
//       color: #2f2f2f;
//       display: flex;
//       justify-content: space-between;
//     }

//     .logo {
//       position: absolute;
//       right: 40px;
//       top: 50px;
//       width: 40%;

//       .picture {
//         width: 68px;
//         height: 68px;
//         overflow: hidden;
//         margin: 0 auto;
//       }

//       .company > .name {
//         font-size: 12px;
//         font-family: PingFang HK;
//         font-weight: 400;
//         color: #666666;
//         padding: 10px 0;
//         text-align: center;
//       }
//     }
//     .communication {
//       width: 137px;
//       text-align: center;
//       background-color: #256efd;
//       position: absolute;
//       padding: 8px 0;
//       border-radius: 4px;
//       left: 20px;
//       margin-top: 24px;
//       // top: 120px;
//       font-size: 16px;
//       font-weight: 600;
//       color: #ffffff;
//     }
//   }
//   .adorn {
//     width: 100%;
//     height: 1px;
//     background: #f8f8f8;
//     margin-top: 80px;
//   }
// }
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
      display: flex;
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
        margin-left: 70px;
      }
      .job-mechanical {
        width: 430px;
        height: 80px;
        // background-color: aqua;
        .equipment {
          height: 38px;
          // background-color: #256efd;
          display: flex;
          justify-content: space-evenly;

          .equiment-ff {
            width: 70px;
            height: 20px;
            line-height: 20px;
            text-align: center;
            border: 1px solid #bfbbbb;
            background-color: rgba(230, 227, 238, 0.836) 4;
            margin-top: 9px;
            color: #878484;
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
          border-bottom: 1px solid #e6e3ee;
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
      border-bottom: 1px solid #e6e3e3;
      font-size: 18px;
      padding: 12px;
      color: #256efd;
    }
    .record-box {
      // height: 80px;
      // background-color: pink;
      padding: 12px;
      font-size: 16px;
      border-bottom: 1px solid #e6e3e3;
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
