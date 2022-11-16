<template>
  <div>
    <div class="search-box">
      <div class="left">
        <div class="serleft" style="display: flex">
          <div class="grid-content bg-purple">
            <div>
              <el-input
                v-model="serchPost.qw"
                style="width: 650px"
                placeholder="请输入岗位/公司"
              ></el-input>
            </div>
          </div>
          <div>
            <el-select
              v-model="job_class"
              placeholder="请选择职位类型"
              style="margin-top: 0px"
            >
              <div style="display: flex">
                <div>
                  <el-option
                    v-for="(item, index) in options"
                    :key="index"
                    :label="index"
                    :value="index"
                    disabled
                    @mousemove.native="tradeChange(item)"
                  >
                  </el-option>
                </div>
                <div>
                  <el-option
                    v-for="(item, index) in tradelist"
                    :key="index"
                    :label="index"
                    :value="index"
                    disabled
                    @mousemove.native="serchPostChange(item)"
                  >
                  </el-option>
                </div>
                <div>
                  <el-option
                    v-for="(item, index) in positionJobList"
                    :key="index"
                    :label="index"
                    :value="index"
                    @click.native="jobChange(item)"
                  >
                  </el-option>
                </div>
              </div>
            </el-select>
          </div>
          <div>
            <el-select
              v-model="profession"
              placeholder="请选择行业类型"
              style="margin-top: 0px"
            >
              <div style="display: flex">
                <div style="width: 150px">
                  <el-option
                    v-for="(item, index) in IndustryList"
                    :key="index"
                    :label="index"
                    :value="index"
                    disabled
                    @mousemove.native="industryChange(item)"
                  >
                  </el-option>
                </div>
                <div>
                  <el-option
                    v-for="(item, index) in field"
                    :key="index"
                    :label="index"
                    :value="index"
                    @mousemove.native="fieldChange(item)"
                  >
                  </el-option>
                </div>
              </div>
            </el-select>
          </div>

          <div
            class="grid-content bg-purple-light"
            style="color: #fff; width: 100px; height: 40px; margin-left: 30px"
          >
            <el-button
              style="
                background-color: #256efd;
                color: #fff;
                width: 100px;
                height: 40px;
                border-top-left-radius: 0;
                border-bottom-left-radius: 0;
              "
              icon="el-icon-search"
              @click="serchJob()"
              >搜索
            </el-button>
          </div>
          <!-- <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <div>
                  <el-input
                    v-model="serchPost.qw"
                    placeholder="请输入岗位/公司"
                  ></el-input>
                </div>
              </div>
            </el-col>
            <el-col :span="4">
              <div>
                <el-select v-model="job_class" placeholder="请选择职位类型">
                  <div style="display: flex">
                    <div>
                      <el-option
                        v-for="(item, index) in options"
                        :key="index"
                        :label="index"
                        :value="index"
                        disabled
                        @mousemove.native="tradeChange(item)"
                      >
                      </el-option>
                    </div>
                    <div>
                      <el-option
                        v-for="(item, index) in tradelist"
                        :key="index"
                        :label="index"
                        :value="index"
                        disabled
                        @mousemove.native="serchPostChange(item)"
                      >
                      </el-option>
                    </div>
                    <div>
                      <el-option
                        v-for="(item, index) in positionJobList"
                        :key="index"
                        :label="index"
                        :value="index"
                        @click.native="jobChange(item)"
                      >
                      </el-option>
                    </div>
                  </div>
                </el-select>
              </div>
            </el-col>
            <el-col :span="5"
              ><div>
                <el-select v-model="profession" placeholder="请选择行业类型">
                  <div style="display: flex">
                    <div style="width: 150px">
                      <el-option
                        v-for="(item, index) in IndustryList"
                        :key="index"
                        :label="index"
                        :value="index"
                        disabled
                        @mousemove.native="industryChange(item)"
                      >
                      </el-option>
                    </div>
                    <div>
                      <el-option
                        v-for="(item, index) in field"
                        :key="index"
                        :label="item"
                        :value="index"
                        @mousemove.native="fieldChange(index)"
                      >
                      </el-option>
                    </div>
                  </div>
                </el-select>
              </div>
            </el-col>
            <el-col :span="1"
              ><div
                class="grid-content bg-purple-light"
                style="color: #fff; width: 100px; height: 40px"
              >
                <el-button
                  style="
                    background-color: #256efd;
                    color: #fff;
                    width: 100px;
                    height: 40px;
                    border-top-left-radius: 0;
                    border-bottom-left-radius: 0;
                  "
                  icon="el-icon-search"
                  @click="serchJob()"
                  >搜索
                </el-button>
              </div></el-col
            >
          </el-row> -->
        </div>
      </div>
      <div class="city">
        <div
          id="example"
          class="city-1"
          :class="{ change: changeColor === '11' }"
          style="font-weight: 700"
          @click="color"
        >
          {{ name }} ∨
        </div>
        <div
          class="city-1"
          :class="{ change: changeColor === '22' }"
          style="font-weight: 700"
          @click="tradeColor"
        >
          行政区 ∨
        </div>
        <div
          class="city-1"
          :class="{ change: changeColor === '33' }"
          style="font-weight: 700"
          @click="sunbwayColor"
        >
          地铁沿线 ∨
        </div>
      </div>
      <div v-if="administrativeShow" class="district">
        <a href="javascript:;">
          <span
            v-for="item in cityName"
            :key="item.id"
            class="city-2"
            :class="tinct === item.adcode ? 'changes' : ''"
            @click="
              cityColor(item.adcode, item.first ? item.first : item.second)
            "
          >
            {{ item.first ? item.first : item.second }}
          </span></a
        >
      </div>
      <div v-if="show" class="district">
        <a href="javascript:;">
          <span
            v-for="item in clerk"
            :key="item.id"
            class="city-2"
            :class="tinct === item.adcode ? 'changes' : ''"
            @click="clerkChange(item.adcode, item.third)"
          >
            {{ item.third }}
          </span></a
        >
      </div>
      <div v-if="flagShow" class="district">
        <div style="display: flex">
          <div>
            <a href="javascript:;">
              <span
                v-for="(item, index) in administrative"
                :key="index"
                style="width: 170px; text-aligin: center"
                class="city-2"
                :class="tinct === item ? 'changes' : ''"
                @click="administrativeChange(item)"
              >
                {{ index }}
              </span></a
            >
          </div>
        </div>
      </div>
      <div v-show="showPanel" class="classify">
        <el-tabs
          v-model="selected"
          :tab-position="tabPosition"
          style="height: auto; background-color: #fff"
        >
          <el-tab-pane
            v-for="(itemss, index) in options"
            :key="index"
            :label="itemss.name"
            :name="itemss.name"
          >
            <p
              v-for="(items, i) in itemss.children"
              :key="i"
              class="classify_content"
              @click="content_click(items.name)"
            >
              {{ items.name }}
            </p>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div>
        <CityTip
          @reset="color"
          @experienceChange="experienceChange"
          @educationalChange="educationalChange"
          @moneyChange="moneyChange"
          @professionChange="professionChange"
          @companyNatureChange="companyNatureChange"
          @peopleChange="peopleChange"
        />
      </div>
    </div>
    <PostList ref="rf" />
  </div>
</template>
<script>
import { serchs } from '../../../api/search'
import { jobSearch } from '@/api/jobs'
import { getUservitae } from '@/api/user'
import { Divider } from 'element-ui'
import CityTip from './cityTip.vue'
import PostList from './postList.vue'

import { getPostcity, getPostMetro, getPostadministrative, getQuarters, getIndustryField } from '@/api/postlist'
export default {
  components: { CityTip, PostList },
  data () {
    return {
      // 选中时的值
      selected: '互联网IT',
      // 岗位分类
      tabPosition: 'left',
      // 搜索筛选
      selectOptions: [],
      showPanel: false,
      iconPanel: 'el-icon-caret-bottom',
      flag: 1,
      tip: '',
      radioList: ['Python', '全栈工程师', 'Java', 'web前端'],
      options: JSON.parse(localStorage.getItem('op')) || {},
      list: [],
      dict: '',
      statu: false,
      // 搜索
      serchPost: {
        // 输入框关键词
        qw: '',
        // 职业领域
        position_class: null,
        // 行业领域
        field: 0,
        // 城市
        adcode: '',
        // 工作经验
        job_experience: 0,
        // 学历要求
        education: 0,
        // 企业性质
        enterprise_nature: '',
        salary: 0,
        // 工作性质
        job_nature: 0,
        staff_size: 0,
        job: '',
        position: ''

      },
      job_class: null,
      // 职业分类
      tradelist: {},
      // 职位
      positionJobList: {},
      // 城市 颜色
      changeColor: '11',
      // 热门城市
      cityName: JSON.parse(localStorage.getItem('cityName')) || [],
      // 行政区域
      adcode: 0,
      // 行政 颜色
      tinct: 0,
      clerk: {},
      // 地铁
      administrativeShow: true,
      administrative: [],
      show: false,
      flagShow: false,
      hideen: true,
      trade: false,
      IndustryList: {},
      field: {},
      business: {},
      profession: null,
      // 行政
      admin: '',
      // 地铁
      subway: '',
      name: '城市',
      list: {}

    }
  },
  computed: {
    userId () {
      return this.$route.query.inputValue// $route获取到正在活跃的路由
    }
  },
  created () {
    this.serch()
    this.hotCity()
    this.getIndustry()
  },
  methods: {
    content_click (e) {
      this.showPanel = false
      // console.log(e);
      // this.searchInput = e;
      this.searchInput = e
      // this.searchInput = `${this.selected}/${this.searchInput}`;
    },
    //  排序加个时间戳
    dateToTimestamp (dateStr) {
      if (!dateStr) {
        return -5364691200000
      }
      const newDataStr = dateStr.replace(/\.|\-/g, '/')
      const date = new Date(newDataStr)
      const timestamp = date.getTime()
      return timestamp
    },
    // 搜索

    optionChange (e) {
      this.searchInput = e.join('/')
      if (e.length == 2 && this.flag == 0) {
        this.showPanel = false
        this.flag = 1
        this.iconPanel = 'el-icon-caret-bottom'
      }
    },
    // 职位分类
    async serch () {
      const { data } = await getQuarters()
      console.log('岗位', data)
      this.options = data
      localStorage.setItem('op', JSON.stringify(data))
    },
    // 职位下拉框
    tradeChange (index) {
      console.log('index', index)
      this.tradelist = index

      this.hideen = false
      this.trade = true
    },

    serchPostChange (index) {
      console.log('index1', index)
      this.positionJobList = index
    },
    jobChange (item) {
      console.log('123', item, this.job_class)
      this.serchPost.position_class = item
    },

    // 行业领域分类
    async getIndustry () {
      const { data } = await getIndustryField()
      console.log('行业领域', data)
      this.IndustryList = data
    },
    industryChange (item) {
      console.log('1121', item)
      this.field = item
    },
    fieldChange (item) {
      console.log('hangye', item)
      this.serchPost.field = item
    },

    // 城市 行政  地铁
    color () {
      this.changeColor = '11'
      this.hotCity()
      this.administrativeShow = true
      this.show = false
      this.flagShow = false
      this.reset()
    },
    async tradeColor (i) {
      this.changeColor = '22'
      this.show = true
      this.flagShow = false
      this.administrativeShow = false
      const { data } = await getPostadministrative(this.adcode)
      console.log('行政区域', data)
      this.clerk = data
    },
    async sunbwayColor () {
      this.changeColor = '33'
      this.flagShow = true
      this.show = false
      this.administrativeShow = false
      const { data } = await getPostMetro(this.adcode)
      console.log('地铁', data)
      this.administrativeShow = false
      this.administrative = data
    },
    cityColor (index, name) {
      console.log('城市', index)
      this.tinct = index
      this.adcode = index
      this.serchPost.adcode = index
      this.name = name
    },
    clerkChange (index, name) {
      this.tinct = index
      this.admin = name
      // this.name = name
    },
    administrativeChange (name) {
      this.tinct = name
      this.subway = name
    },
    // 其他条件
    // 热门城市
    async hotCity () {
      const { data } = await getPostcity()
      console.log('热门城市', data)
      this.cityName = data
      localStorage.setItem('cityName', JSON.stringify(data))
    },
    // 清除
    reset () {
      this.cityName = []
      this.name = '城市'
      this.serchPost.job = ''
      this.serchPost.position = ''
      this.serchPost.qw = ''
      this.serchPost.city = ''
      this.admin = ''
      this.subway = ''
      this.job_class = ''
      this.profession = ''
      this.serchPost.adcode = ''
      this.serchPost.education = ''
      this.serchPost.enterprise_nature = ''
      // this.selected.field = ''
      this.serchPost.job_experience = ''
      this.serchPost.position_class = ''
      this.serchPost.salary = ''
      this.serchPost.staff_size = ''
      // this.list = {}
    },
    // 其他条件
    // 工作经验
    experienceChange (i) {
      console.log('aa', i)
      this.serchPost.job_experience = i
    },
    // 学历要求
    educationalChange (i) {
      console.log('bb', i)
      this.serchPost.education = i
    },
    // 薪资要求
    moneyChange (i) {
      console.log('cc', i)
      this.serchPost.salary = i
    },
    // 职位类型
    professionChange (i) {
      console.log('dd', i)
      this.serchPost.position_class = i
    },
    // 公司性质
    companyNatureChange (i) {
      console.log('ee', i)
      this.serchPost.enterprise_nature = i
    },
    // 公司规模
    peopleChange (i) {
      console.log('ff', i)
      this.serchPost.staff_size = i
    },
    serchJob () {
      console.log('搜索条件', this.serchPost)
      this.list = this.serchPost
      if (this.list.adcode === '') {
        delete this.list.adcode
      }
      if (this.list.city === '') {
        delete this.list.city
      }
      if (this.list.education === 0) {
        delete this.list.education
      }
      if (this.list.enterprise_nature === 0) {
        delete this.list.enterprise_nature
      }
      if (this.list.enterprise_nature === '') {
        delete this.list.enterprise_nature
      }
      if (this.list.field === '') {
        delete this.list.field
      }
      if (this.list.job === '') {
        delete this.list.job
      }
      if (this.list.job_experience === 0) {
        delete this.list.job_experience
      }
      if (this.list.job_nature === 0) {
        delete this.list.job_nature
      }
      if (this.list.position === '') {
        delete this.list.position
      }
      if (this.list.position_class === 0) {
        delete this.list.position_class
      }
      if (this.list.qw === '') {
        delete this.list.qw
      }
      if (this.list.salary === 0) {
        delete this.list.salary
      }
      if (this.list.staff_size === 0) {
        delete this.list.staff_siz
      }
      console.log('1223', this.list)
      this.$refs.rf.sendItem(this.list)

      delete this.list.education
      delete this.list.job_experience
      delete this.list.field
      delete this.list.position_class
      delete this.list.salary
      delete this.list.staff_size

      // const ss = {}
    }

  }
}
</script>
<style lang="scss" scoped>
.el-input__inner {
  &::placeholder {
    color: green;
  }
}

.district {
  width: 100%;
  // height: 100px;
  // background-color: #0094ff;
  margin: 20px 0 20px 10px;
  padding-left: 40px;
  // display: flex;
  font-size: 15px;

  span {
    // background: red;
    margin-left: 5px;
    display: inline-block;
    // width: 70px;
    height: 15px;
    margin-top: 8px;
  }
  .city-2 {
    // width: 100px;
    // height: 30px;
    padding: 3px 10px 5px;
    height: 20px;
    // line-height: 20px;
    // background-color: red;
  }
}
.change {
  color: #448ef7;
}
.city {
  width: 100%;
  // background-color: red;
  margin-top: 20px;
  font-size: 15px;
  display: flex;
  padding-left: 30px;
  .city-1 {
    padding-right: 50px;
  }
}
.el-select {
  margin-top: 15px;
  // position: absolute;
  clip: rect(2px 200px 30px 2px);
  line-height: 28px;
  font-size: 15px;
  font-weight: bold;
  width: 200px;
}

.hang {
  // left: 600px;
}
.zhi {
  // left: 850px;
}
.search-box {
  width: 100%;
  // height: 100px;
  margin-bottom: 30px;
  background-color: #fff;
  box-shadow: 0px 2px 30px 0px rgba(0, 0, 0, 0.08);
  .el-input-group {
    height: 80px;
  }
  .left {
    // display: flex;
    // position: relative;
    width: 100%;
    height: 70px;
    // background-color: pink;
    padding: 15px 33px;
    .serleft {
      width: 100%;
      height: 42px;
      // background-color: #0094ff;
      // border: 1px solid #0094ff;
    }
  }
  .input-with-select {
    height: 65px;
    width: 600px;
    padding: 14px 0 0 20px;
    font-size: 15px;
    border: none;
    outline: none;
  }
  .input-with-select .el-input-group__prepend {
    width: 120px;
    height: 100px;
    color: #808080;
    background-color: #fff !important;
  }
  .input-with-select >>> .el-input__inner {
    border: 0;
  }

  .el-input__inner {
    height: 100px;
  }

  .search-btn {
    width: 120px;
    height: 40px;
    background: linear-gradient(307deg, #0094ff 0%, #34dff5 100%);
    color: #fff;
    border-radius: 40px;
  }
}

.tip-box {
  width: 100%;
  height: auto;
  padding: 20px 0;
  .el-radio-button {
    border: #707070 1px solid;
    color: #2f2f2f;
    margin-right: 5px;
  }
}
.classify {
  width: 100%;
  height: auto;
}
.el-tab-pane {
  display: flex;
  flex-wrap: wrap;
}
.classify_content {
  width: 33.33%;
  font-size: 15px;
  margin-top: 11px;
}
.classify_content:hover {
  color: #448ef7;
  cursor: pointer;
}
::v-deep .el-input__inner:hover {
  // border: 1px solid #448EF7;
  border-color: #448ef7 !important;
}
::v-deep .el-input-group__prepend {
  background-color: #fff;
  border: none;
}
::v-deep .el-input-group--prepend .el-input__inner {
  height: 100%;
  border: none;
}
::v-deep .el-input-group__append {
  border: none;
  background-color: #fff;
  button {
    margin-right: 44px;
  }
}
::v-deep .el-select[data-v-2e155517] {
  margin-top: 0px;
}

::v-deep input.el-input__inner {
  border: 1px solid #448ef7;
  border-radius: 0px;
}
::v-deep .el-select[data-v-1d1946ae] {
  margin-top: 0px;
}
::v-deep .el-select[data-v-7e107d3e] {
  margin-top: 0px;
}
::v-deep .el-select-dropdown__item.is-disabled {
  color: rgb(37, 110, 253);
}
::v-deep [data-v-2e155517] .el-select[data-v-2e155517] {
  margin-top: 0px;
}
::v-deep [data-v-2e155517] [data-v-2e155517] .el-select[data-v-2e155517] {
  margin-top: 0px !important;
}
.changes {
  font-weight: 700;
  // color: rgb(6, 104, 196);
}
</style>
