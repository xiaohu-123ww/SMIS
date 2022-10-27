<template>
  <div>
    <div class="search-box">
      <div class="left">
        <div class="serleft">
          <el-row>
            <el-col :span="7">
              <div class="grid-content bg-purple">
                <div>
                  <el-select
                    v-model="serchPost.job"
                    placeholder="行业分类 "
                    class="hang"
                  >
                    <el-option
                      v-for="(item, index) in options"
                      :key="index"
                      :label="index"
                      :value="index"
                      @click.native="tradeChange(item)"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
            </el-col>
            <el-col :span="7"
              ><div class="grid-content bg-purple-light">
                <div>
                  <el-select
                    v-model="serchPost.position"
                    placeholder="职位分类 "
                    class="hang"
                  >
                    <el-option
                      v-for="(item, index) in trade"
                      :key="index"
                      :label="index"
                      :value="index"
                      @click.native="serchPostChange(item)"
                    >
                    </el-option>
                  </el-select>

                  <div></div>
                </div></div
            ></el-col>
            <el-col :span="8"
              ><div class="grid-content bg-purple">
                <div>
                  <el-select
                    v-model="serchPost.qw"
                    placeholder="职位 "
                    class="zhi"
                  >
                    <el-option
                      v-for="item in positionJob"
                      :key="item"
                      :label="item"
                      :value="item"
                    >
                    </el-option>
                  </el-select>

                  <div></div>
                </div>
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
          </el-row>
        </div>
      </div>
      <div class="city">
        <div
          class="city-1"
          :class="{ change: changeColor === '11' }"
          @click="color"
        >
          城市 ∨
        </div>
        <div
          class="city-1"
          :class="{ change: changeColor === '22' }"
          @click="tradeColor"
        >
          行政区 ∨
        </div>
        <div
          class="city-1"
          :class="{ change: changeColor === '33' }"
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
            :class="tinct === item.adcode ? 'change' : ''"
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
            :class="tinct === item.adcode ? 'change' : ''"
            @click="clerkChange(item.adcode, item.third)"
          >
            {{ item.third }}
          </span></a
        >
      </div>
      <div v-if="flagShow" class="district">
        <a href="javascript:;">
          <span
            v-for="(item, index) in administrative"
            :key="index"
            style="width: 150px"
            class="city-2"
            :class="tinct === item ? 'change' : ''"
            @click="administrativeChange(item)"
          >
            {{ item }}
          </span></a
        >
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
          @reset="reset"
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
import { getSerchlist } from '@/api/position'
import { getPostcity, getPostMetro, getPostadministrative } from '@/api/postlist'
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
      options: JSON.parse(localStorage.getItem('options')) || {},
      list: [],
      dict: '',
      statu: false,
      // 搜索
      serchPost: {
        job: '',
        position: '',
        qw: '',
        city: '',
        admin: '',
        subway: '',
        jobExperience: 0,
        education: 0,
        enterpriseNature: '',
        salary: 0,
        qq: '',
        staffSize: 0
      },
      // 职业分类
      trade: '',
      // 职位
      positionJob: '',
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
      flagShow: false

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
    // getUservitae().then((rs) => {
    //   this.dict = rs.data
    // })

    // if (this.$route.query.inputValue) {
    //   console.log('this.$route.query.inputValue', this.$route.query.inputValue)
    //   this.searchInput = this.$route.query.inputValue
    //   this.serchJob()
    // } else {
    //   this.searchInput = this.searchInput
    //   // jobSearch(this.searchInput)
    // }

    // this.serchJob()
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
    serchJob () {
      console.log('搜索条件', this.serchPost)
      this.$refs.rf.sendItem(this.serchPost)
    },
    // 岗位分类
    async serch () {
      const { data } = await getSerchlist()
      console.log('岗位', data)
      this.options = data
      localStorage.getItem('options', JSON.stringify(data))
    },
    changeRadio () { },

    optionChange (e) {
      this.searchInput = e.join('/')
      if (e.length == 2 && this.flag == 0) {
        this.showPanel = false
        this.flag = 1
        this.iconPanel = 'el-icon-caret-bottom'
      }
    },
    // 行业下拉框
    tradeChange (index) {
      console.log('index', index)
      this.trade = index
    },
    // 职业下拉
    serchPostChange (index) {
      console.log('index1', index)
      this.positionJob = index
    },

    // 城市 行政  地铁
    color () {
      this.changeColor = '11'
      this.hotCity()
      this.administrativeShow = true
      this.show = false
      this.flagShow = false
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
      this.serchPost.city = name
    },
    clerkChange (index, name) {
      this.tinct = index
      this.serchPost.admin = name
    },
    administrativeChange (name) {
      this.tinct = name
      this.serchPost.subway = name
    },
    // 其他条件
    // 热门城市
    async hotCity () {
      const { data } = await getPostcity()
      console.log('热门城市', data)
      this.cityName = data
      localStorage.getItem('cityName', JSON.stringify(data))
    },
    // 清除
    reset () {
      this.serchPost.job = ''
      this.serchPost.position = ''
      this.serchPost.qw = ''
      this.serchPost.city = ''
      this.admin = ''
      this.subway = ''
    },
    // 其他条件
    experienceChange (i) {
      console.log('aa', i)
      this.serchPost.jobExperience = i
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
      this.serchPost.qq = i
    },
    // 公司性质
    companyNatureChange (i) {
      console.log('ee', i)
      this.serchPost.enterpriseNature = i
    },
    // 公司规模
    peopleChange (i) {
      console.log('ff', i)
      this.serchPost.staffSize = i
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
  padding-left: 50px;
  // display: flex;
  font-size: 15px;

  span {
    // background: red;
    margin-left: 5px;
    display: inline-block;
    width: 70px;
    height: 15px;
    margin-top: 8px;
  }
  // .city-2 {
  //   width: 100px;
  //   height: 30px;
  //   margin-left: 10px;
  //   background-color: red;
  // }
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
</style>
