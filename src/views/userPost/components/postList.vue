<template>
  <div class="post-list">
    <div class="postList-one">
      <el-row>
        <el-col :span="18"
          ><div class="grid-content bg-purple">
            <div class="postList">
              <div
                v-for="item in jobListings"
                :key="item.id"
                class="job-job"
                @click="particulars(item)"
              >
                <el-row>
                  <el-col :span="22">
                    <div class="grid-content bg-purple">
                      <div style="display: flex">
                        <div class="job-mechanical" style="width: 500px">
                          <div
                            class="mechanical"
                            style="width: 450px; display: flex"
                          >
                            <div style="width: 320px; padding-left: 30px">
                              {{ item.fullname }} {{ item.city.second }}.{{
                                item.city.third
                              }}
                            </div>

                            <el-button type="primary" round class="el-bt"
                              >立即沟通</el-button
                            >
                          </div>
                          <div class="machan">
                            <div class="machan-aa">
                              {{ item.salary_min }}-{{ item.salary_max }} .
                              {{ item.salary_unit }}薪
                            </div>
                            <div
                              class="machan-bb"
                              style="border-right: 1px solid #e6e3e3"
                            >
                              {{ item.job_experience.name }}
                            </div>
                            <div class="machan-bb">
                              {{ item.education.name }}
                            </div>
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
                        <div>
                          <div class="job-mechanical">
                            <div class="mechanical" style="width: 500px">
                              {{ item.enterprise_info.name }}
                            </div>
                            <div class="machan" style="width: 500px">
                              <div
                                class="machan-cc"
                                style="padding: 0 10px 0 0"
                              >
                                {{ item.enterprise_info.field.field_name }}
                              </div>
                              <div
                                class="machan-cc"
                                style="border-right: 1px solid #e6e3e3"
                              >
                                {{ item.enterprise_info.finance }}
                              </div>

                              <div style="padding: 0 20px 0 5px">
                                {{ item.enterprise_info.size }}
                              </div>
                            </div>
                            <div
                              style="
                                padding-top: 10px;
                                font-size: 11px;
                                color: #878484;
                                display: flex;
                                flex-wrap: wrap;
                              "
                            >
                              <!-- 福利 -->
                              <div
                                v-for="(items, index) in item.enterprise_info
                                  .tags"
                                :key="index"
                                style="
                                  height: 15px;
                                  background-color: rgb(245, 245, 245);
                                  border: 1px solid rgb(220, 220, 220);
                                  margin: 2px;
                                "
                              >
                                {{ items.name }}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="1"
                    ><div class="grid-content bg-purple-light">
                      <div class="machan-sss">
                        <img
                          :src="disposeImg(item.enterprise_info.logo)"
                          alt=""
                          style="width: 60px; height: 60px"
                        />
                      </div></div
                  ></el-col>
                </el-row>
              </div>
              <el-pagination
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
            </div></div
        ></el-col>
        <el-col :span="6"
          ><div class="grid-content bg-purple-light">
            <div class="record">
              <div class="record-aa">浏览记录</div>
              <el-empty v-if="flagShow === 0" :image-size="100"></el-empty>
              <div v-else>
                <div v-for="item in history" :key="item.id" class="record-box">
                  <div class="record-row">
                    <el-row>
                      <el-col :span="14"
                        ><div class="grid-content bg-purple">
                          {{ item.position_info.name }}
                        </div></el-col
                      >
                      <el-col :span="9"
                        ><div
                          class="grid-content bg-purple-light"
                          style="color: red; font-size: 14px"
                        >
                          {{ item.position_info.salary }}.{{
                            item.position_info.salary_unit
                          }}薪
                        </div></el-col
                      >
                    </el-row>
                  </div>
                  <div style="color: #878484">
                    {{ item.position_info.enterprise_name }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { getPostList, getbrowsingHistory, getPostListOne } from '@/api/postlist'
import disposeImg from '@/utils/disposeImg'
import { constantRoutes } from '@/router'
export default {

  data () {
    return {

      list: ['', '', ''],
      serchList: {
        qw: ''
      },
      empty: {},
      // 页数
      limit: 10,
      offset: 10,
      jobListings: {},

      total: 10,
      history: [],
      flagShow: 0,
      logo: [],
      offset: 10,
      list: {},
      searchingList: {}
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
  created () {
    this.getPostList()
    this.browsingHistory()
  },

  methods: {

    handleSizeChange (newSize) {
      console.log('每页条数', newSize)
      this.limit = newSize
      this.getPostList()
    },
    async handleCurrentChange (i) {
      console.log('当前页码', i)
      this.offset = this.limit * (i - 1)
      if (this.$route.query.inputValue) {
        const { data } = await getPostListOne(this.serchList, this.limit, this.offset)
        console.log('翻页', data)
        this.jobListings = data.results
      } else {
        const { data } = await getPostListOne(this.list, this.limit, this.offset)
        console.log('翻页', data)
        this.jobListings = data.results
      }
    },
    async sendItem (i) {
      console.log('父传过来的数据', i)
      this.searchingList = i
      const { data } = await getPostList(i, this.limit)
      console.log('本页查询列表数据', data)
      this.jobListings = data.results
      this.total = data.count
    },
    // 列表数据
    async getPostList () {
      // 首页检索跳转
      if (this.$route.query.inputValue) {
        this.serchList.qw = this.$route.query.inputValue
        console.log('this.serchList.input', this.serchList.input)
        const { data } = await getPostList(this.serchList, this.limit)
        console.log('列表数据', data)
        this.jobListings = data.results
        this.total = data.count
      } else if (this.$route.query.inputValue === undefined) {
        // 没有查询条件的列表
        console.log('this.$route.query.inputValue', this.$route.query.inputValue)
        const { data } = await getPostList(this.empty, this.limit)
        console.log('未查询列表数据', data)
        this.jobListings = data.results
        this.total = data.count
      } else {

      }
    },
    // 浏览记录
    async browsingHistory () {
      const { data } = await getbrowsingHistory()
      console.log('浏览记录', data)
      this.history = data
      this.flagShow = data.length
    },
    particulars (item) {
      console.log('简历详情', item)
      this.$router.push({
        path: '/state',
        name: 'state',
        query: { id: item.id }
      })
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
        margin-top: 5px;
        // margin-left: 50px;
      }
      .job-mechanical {
        width: 100%;
        height: 80px;
        // background-color: aqua;
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
          // padding-left: 30px;
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
          // padding-top: 10px;
          .machan-aa {
            width: 170px;
            height: 20px;
            // background-color: #256efd;
            border-right: 1px solid #e6e3e3;
            line-height: 20px;
            padding-left: 30px;
            // color: red;
            line-height: 20px;
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
            font-size: 14px;
            padding: 0 20px 0 5px;
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
.boxJob {
  background-color: #fff;
  margin: 10px 0 0 20px;
  border-radius: 20px;
  width: 300px;
  height: 300px;
  .record-aa {
    height: 45px;
    // background-color: #256efd;
    border-bottom: 1px solid #e6e3e3;
    font-size: 18px;
    padding: 12px;
    color: #256efd;
  }
}
::v-deep span.el-pagination__total {
  margin: 2px 15px;
}
</style>
