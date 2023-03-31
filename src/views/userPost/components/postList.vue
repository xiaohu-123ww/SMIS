<template>
  <div>
    <div
      v-if="loading"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgb(244, 246, 249)"
      style="height: 700px; font-size: 100px"
    ></div>
    <div v-if="showTime" class="post-list">
      <div class="postList-one">
        <el-row>
          <el-col :span="18">
            <div class="grid-content bg-purple">
              <div class="postList">
                <div v-for="item in jobListings" :key="item.id" class="job-job">
                  <div class="grid-content bg-purple">
                    <div
                      style="
                        display: flex;

                        height: 90px;
                        border-bottom: 1px solid #e6e3ee;
                      "
                    >
                      <div class="job-mechanical" style="width: 54%">
                        <div class="mechanical" style="display: flex">
                          <a href="javascript:;">
                            <div
                              style="
                                width: 300px;
                                padding-left: 30px;
                                font-size: 14px;
                              "
                              @click="particulars(item)"
                            >
                              {{ item.fullname }} {{ item.city.second }}·{{
                                item.city.third
                              }}
                            </div>
                          </a>

                          <el-button
                            type="primary"
                            round
                            class="el-bt"
                            @click="communication(item.hr, item.id)"
                            >立即沟通</el-button
                          >
                        </div>
                        <div class="machan">
                          <div class="machan-aa">
                            {{ item.salary_min }}k-{{ item.salary_max }}k ·
                            {{ item.salary_unit }}薪
                          </div>
                          <div
                            class="machan-bb"
                            style="border-right: 1px solid #e6e3e3"
                          >
                            {{ item.job_experience }}
                          </div>
                          <div class="machan-bb">
                            {{ item.education }}
                          </div>
                        </div>
                        <!-- <div class="equipment">
                          <div
                            v-for="(itemss, index) in item.jobkeywords_name"
                            :key="index"
                            class="equiment-ff"
                          >
                            {{ itemss }}
                          </div>
                        </div> -->
                        <div></div>
                      </div>
                      <div
                        style="
                          width: 32%;

                          text-align: right;
                        "
                      >
                        <a href="javascript:;">
                          <div
                            class="mechanical"
                            @click="open(item.enterprise_info.enterprise_id)"
                          >
                            {{ item.enterprise_info.name }}
                          </div>
                        </a>
                        <div
                          class="machan"
                          style="dispaly: flex; justify-content: end"
                        >
                          <div class="machan-cc">
                            {{ item.enterprise_info.field }}
                          </div>
                          <div
                            class="machan-cc"
                            style="border-right: 1px solid #e6e3e3"
                          >
                            {{ item.enterprise_info.finance }}
                          </div>

                          <div style="padding: 0 3px">
                            {{ item.enterprise_info.size }}人
                          </div>
                        </div>
                      </div>
                      <div style="width: 5%"></div>
                      <div class="grid-content bg-purple-light">
                        <div class="machan-sss">
                          <img
                            :src="disposeImg(item.enterprise_info.logo)"
                            alt=""
                            style="width: 60px; height: 60px"
                          />
                        </div>
                        <!-- <div class="job-mechanical" style="width: 500px">
                            <div
                              class="mechanical"
                              style="width: 450px; display: flex"
                            >
                              <a href="javascript:;">
                                <div
                                  style="width: 320px; padding-left: 30px"
                                  @click="particulars(item)"
                                >
                                  {{ item.fullname }} {{ item.city.second }}.{{
                                    item.city.third
                                  }}
                                </div>
                              </a>

                              <el-button
                                type="primary"
                                round
                                class="el-bt"
                                @click="particulars(item)"
                                >立即沟通</el-button
                              >
                            </div>
                            <div class="machan">
                              <div class="machan-aa">
                                {{ item.salary_min }}k-{{ item.salary_max }}k .
                                {{ item.salary_unit }}薪
                              </div>
                              <div
                                class="machan-bb"
                                style="border-right: 1px solid #e6e3e3"
                              >
                                {{ item.job_experience }}
                              </div>
                              <div class="machan-bb">
                                {{ item.education }}
                              </div>
                            </div>
                            <div class="equipment">
                              <div
                                v-for="(itemss, index) in item.jobkeywords_name"
                                :key="index"
                                class="equiment-ff"
                              >
                                {{ itemss }}
                              </div>
                            </div>
                            <div></div>
                          </div> -->
                        <!-- <div>
                            <div class="job-mechanical">
                              <a href="javascript:;">
                                <div
                                  class="mechanical"
                                  style="width: 480px"
                                  @click="
                                    open(item.enterprise_info.enterprise_id)
                                  "
                                >
                                  {{ item.enterprise_info.name }}
                                </div>
                              </a>
                              <div class="machan" style="width: 482px">
                                <div
                                  class="machan-cc"
                                  style="padding: 0 10px 0 0"
                                >
                                  {{ item.enterprise_info.field }}
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
                                  padding-top: 7px;
                                  font-size: 11px;
                                  color: #878484;
                                  display: flex;
                                  flex-wrap: wrap;
                                "
                              >

                                {{ item.enterprise_info.tags.toString() }}
                              </div>
                            </div>
                          </div> -->
                      </div>
                    </div>
                    <div>
                      <div
                        style="
                          height: 40px;
                          line-height: 40px;
                          display: flex;
                          margin-left: 15px;
                        "
                      >
                        <div style="width: 55.4%">
                          <div class="equipment">
                            <div
                              v-for="(itemss, index) in item.jobkeywords_name"
                              :key="index"
                              class="equiment-ff"
                            >
                              {{ itemss }}
                            </div>
                          </div>
                        </div>
                        <div style="width: 30.4%; text-align: right">
                          <div style="font-size: 11px; color: #878484">
                            {{ item.enterprise_info.tags.toString() }}
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- <el-col :span="1"
                      ><div class="grid-content bg-purple-light">
                        <div class="machan-sss">
                          <img
                            :src="disposeImg(item.enterprise_info.logo)"
                            alt=""
                            style="width: 60px; height: 60px"
                          />
                        </div></div
                    > -->
                  </div>
                </div>
                <el-pagination
                  v-if="jobListings.length !== 0"
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
                <el-empty
                  v-if="jobListings.length === 0"
                  description="再无数据"
                  style="height: 600px"
                ></el-empty>
              </div></div
          ></el-col>
          <el-col :span="6"
            ><div class="grid-content bg-purple-light">
              <div class="record">
                <div class="record-aa">浏览记录</div>
                <el-empty v-if="flagShow === 0" :image-size="100"></el-empty>
                <div v-else>
                  <div
                    v-for="item in history"
                    :key="item.position_info.position_id"
                    class="record-box"
                    @click="part(item.position_info.position_id)"
                  >
                    <div class="record-row">
                      <div style="font-size: 13px; width: 75%">
                        {{ item.position_info.name }}
                      </div>
                      <div style="color: red; font-size: 12px">
                        {{ item.position_info.salary }}k.{{
                          item.position_info.salary_unit
                        }}薪
                      </div>
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
    <Num :state="state" @res="res" />
    <Dialog :visible="visible" />
  </div>
</template>
<script>
import { getPostList, getbrowsingHistory, getPostListOne } from '@/api/postlist'
import { getInterests } from '@/api/particulars'
import disposeImg from '@/utils/disposeImg'
import { constantRoutes } from '@/router'
import Num from './state.vue'
import Dialog from './dialog.vue'
import { getRongyun } from '@/api/Rongyun.js'
import { getList } from '@/api/my/my'
export default {
  components: { Num, Dialog },
  data () {
    return {
      state: false,
      list: ['', '', ''],
      serchList: {
        qw: ''
      },
      empty: {},
      // 页数
      limit: 10,
      jobListings: JSON.parse(localStorage.getItem('jobListings')) || {},

      total: 10,
      history: [],
      flagShow: 0,
      logo: [],
      offset: 1,
      list: {},
      searchingList: {},
      loading: false,
      showTime: false,
      qw: '',
      number: true,
      text: [],
      visible: false,
      rongYun: {
        sender_class: 0, // 0-求职者；1-hr
        sender_uid: 0,
        receiver_class: 1, // 同上
        receiver_uid: 0
      }
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

    // 立即沟通
    async communication (item, id) {
      // this.state = true
      // this.visible = true

      console.log('hr', item)
      const { data } = await getList()
      console.log('用户id', data)
      this.rongYun.sender_uid = data.user_id
      this.rongYun.receiver_uid = item
      console.log(' this.rongYun', this.rongYun)
      const res = await getRongyun(this.rongYun)
      console.log(res.code)
      if (res.code === 200) {
        console.log(res.data.receiver, res.data.sender)
        this.$store.commit('SET_MEMBER', res.data.sender)
        this.$store.commit('SET_TARGETID', res.data.receiver.uid)
        const { data } = await getInterests(id)
        console.log('意向', data)
      } else {
        this.$message.success(res.data.msg)
      }
    },
    res () {
      this.state = false
    },
    handleSizeChange (newSize) {
      console.log('每页条数', newSize)
      this.limit = newSize
      this.getPostList()
    },
    async handleCurrentChange (i) {
      console.log('当前页码', i)
      this.off = this.limit * (i - 1)
      console.log(this.offset)
      if (this.$route.query.inputValue) {
        const { data } = await getPostListOne(this.serchList, this.limit, this.off)
        console.log('翻页', data)
        this.jobListings = data.results
      } else {
        const { data } = await getPostListOne(this.list, this.limit, this.off)
        console.log('翻页', data)
        this.jobListings = data.results
      }
    },
    async sendItem (i) {
      console.log('父传过来的数据', i)
      this.searchingList = i

      this.loading = true
      const { data } = await getPostList(i, this.limit)
      console.log('本页查询列表数据', data)
      this.jobListings = data.results
      this.total = data.count
      this.loading = false
    },
    // 列表数据
    async getPostList () {
      // 首页检索跳转
      if (this.$route.query.inputValue) {
        console.log(this.$route.query.inputValue)
        this.serchList.qw = this.$route.query.inputValue
        if (this.showTime === false) {
          this.loading = true
        }
        // this.serchList.qw = this.$route.query.inputValue
        console.log('this.serchList.input', this.serchList)
        const { data } = await getPostList(this.serchList, this.limit)
        console.log('列表数据', data)
        this.jobListings = data.results
        this.total = data.count
        this.showTime = true
        this.loading = false
      } else if (this.$route.query.inputValue === undefined) {
        // 没有查询条件的列表
        console.log('this.$route.query.inputValue', this.$route.query.inputValue)
        if (this.jobListings.length !== 0) {
          this.loading = false
        }
        if (this.showTime === false) {
          this.loading = true
        }
        const { data } = await getPostList(this.empty, this.limit)
        console.log('未查询列表数据', data)
        // localStorage.setItem()
        this.jobListings = data.results
        localStorage.getItem('jobListings', JSON.stringify(data.results))
        this.total = data.count
        this.showTime = true
        this.loading = false
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
    },
    part (item) {
      this.$router.push({
        path: '/state',
        name: 'state',
        query: { id: item }
      })
    },
    open (i) {
      console.log('1233333', i)
      this.$router.push({
        path: '/postdes',
        name: 'postdes',
        query: { id: i }
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
      padding-top: 12px;
      margin-bottom: 30px;
      .machan-sss {
        width: 60px;
        height: 60px;
        // background-color: #256efd;
      }
      .el-bt {
        width: 100px;
        height: 28px;
        line-height: 4px;
        margin-top: 5px;
        // margin-left: 50px;
      }
      .job-mechanical {
        // width: 100%;
        // height: 80px;
        // background-color: aqua;
        .equipment {
          height: 38px;
          // background-color: #256efd;
          display: flex;
          // padding-left: 20px;
          .equiment-ff {
            // width: 70px;
            padding: 0px 3px;
            height: 20px;
            line-height: 20px;
            text-align: center;
            background-color: rgb(245, 245, 245);
            border: 1px solid rgb(220, 220, 220);
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
          // font-weight: 700;
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
          font-size: 13px;

          // padding-top: 10px;
          .machan-aa {
            padding: 0px 10px;
            height: 20px;
            // background-color: #256efd;
            border-right: 1px solid #e6e3e3;
            line-height: 20px;
            padding-left: 30px;
            // color: red;
            line-height: 20px;
          }
          .machan-bb {
            padding: 0px 10px;
            height: 20px;
            // background-color: greenyellow;
            line-height: 20px;
            padding-left: 20px;
          }
          .machan-cc {
            // width: 100px;
            padding: 0px 10px;
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
    margin: 10px 0 0 15px;
    border-radius: 20px;
    overflow: hidden;
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
      font-size: 13px;
      border-bottom: 1px solid #e6e3e3;
      .record-row {
        height: 40px;
        // background-color: #256efd;
        line-height: 30px;
        font-size: 12px;
        display: flex;
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
.mechanical {
  height: 40px;
  // background-color: #256efd;
  font-size: 14px;
  line-height: 40px;
  // padding-left: 30px;
  color: #256efd;
  // font-weight: 700;
}
.machan {
  height: 40px;
  // background-color: pink;
  // border-bottom: 1px solid #e6e3ee;
  display: flex;
  font-size: 15px;
  // justify-content: end;
  // padding-top: 10px;
  .machan-aa {
    // padding: 0px 10px;
    height: 20px;
    // background-color: #256efd;
    border-right: 1px solid #e6e3e3;
    line-height: 20px;
    // padding-left: 30px;
    // color: red;
    line-height: 20px;
  }
  .machan-bb {
    // padding: 0px 10px;
    height: 20px;
    // background-color: greenyellow;
    line-height: 20px;
    // padding-left: 20px;
  }
  .machan-cc {
    // width: 100px;
    // padding: 0px 10px;
    height: 20px;
    // background-color: #256efd;
    border-right: 1px solid #e6e3e3;
    line-height: 20px;
    font-size: 14px;
    padding: 0 3px;
  }
}
.equipment {
  height: 38px;
  // background-color: #256efd;
  display: flex;
  // padding-left: 20px;
  .equiment-ff {
    // width: 70px;
    padding: 0px 3px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    background-color: rgb(245, 245, 245);
    border: 1px solid rgb(220, 220, 220);
    margin-top: 9px;
    color: #878484;
    margin-left: 15px;
  }
}
</style>
