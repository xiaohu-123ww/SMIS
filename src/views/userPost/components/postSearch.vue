<template>
  <div class="search-box">
    <div class="left">
      <el-row>
        <el-col :span="10">
          <div class="grid-content bg-purple">
            <div style="width: 800px">
              <!-- <el-input
                v-model="searchInput"
                class="input-with-select"
                placeholder="请输入岗位/公司"
              ></el-input> -->
              <input
                v-model="searchInput"
                class="input-with-select"
                placeholder="请输入岗位/公司"
              />
            </div>
          </div>
        </el-col>
        <el-col :span="6"
          ><div class="grid-content bg-purple-light">
            <div>
              <el-select v-model="mass" placeholder="行业分类 " class="hang">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                  @click.native="tradeChange(item)"
                >
                </el-option>
              </el-select>

              <div></div>
            </div></div
        ></el-col>
        <el-col :span="5"
          ><div class="grid-content bg-purple">
            <div>
              <el-select v-model="job" placeholder="职业分类 " class="zhi">
                <el-option
                  v-for="item in trade"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                >
                </el-option>
              </el-select>

              <div></div>
            </div>
          </div>
        </el-col>
        <el-col :span="1"
          ><div class="grid-content bg-purple-light">
            <el-button
              style="
                background-color: #256efd;
                color: #fff;
                width: 137px;
                height: 54px;
                border-top-left-radius: 0;
                border-bottom-left-radius: 0;
                margin-top: 13px;
              "
              icon="el-icon-search"
              @click="serchJob()"
              >搜索
            </el-button>
          </div></el-col
        >
      </el-row>
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
    <div class="district">
      <a href="javascript:;">
        <span
          v-for="(item, index) in cityName"
          :key="item.idx"
          class="city-2"
          :class="changeColor === index ? 'change' : ''"
          @click="cityColor(index)"
        >
          {{ item.label }}
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
      <CityTip />
    </div>
  </div>
</template>
<script>
import { serchs } from '../../../api/search'
import { jobSearch } from '@/api/jobs'
import { getUservitae } from '@/api/user'
import { Divider } from 'element-ui'
import CityTip from './cityTip.vue'

export default {
  components: { CityTip },
  data () {
    return {
      // 选中时的值
      selected: '互联网IT',
      // 岗位分类
      tabPosition: 'left',
      // 搜索框内容s
      searchInput: '',
      // 搜索筛选
      selectOptions: [],
      showPanel: false,
      iconPanel: 'el-icon-caret-bottom',
      flag: 1,
      tip: '',
      radioList: ['Python', '全栈工程师', 'Java', 'web前端'],
      options: JSON.parse(localStorage.getItem('option')),
      list: [],
      dict: '',
      statu: false,
      // 行业
      mass: '',
      // 职业
      trade: {},
      // 职业下拉框
      job: '',
      // 城市 行政
      changeColor: 0,
      cityName: JSON.parse(localStorage.getItem('cityName'))
    }
  },
  created () {
    this.getCity()
    this.serch()
    getUservitae().then((rs) => {
      this.dict = rs.data
    })

    if (this.$route.query.inputValue) {
      console.log('this.$route.query.inputValue', this.$route.query.inputValue)
      this.searchInput = this.$route.query.inputValue
      this.serchJob()
    } else {
      this.searchInput = this.searchInput
      // jobSearch(this.searchInput)
    }

    this.serchJob()
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
    serchJob () {
      //  (this.searchInput);
      // console.log('获取页面路由', this.$route.query.name);
      // constb = this.$route.query.name;

      jobSearch(this.searchInput).then((res) => {
        //  (res.data);
        //  (this.dict);
        // console.log(res.data)
        // 单位salary_unit
        this.list = res.data.post_list
        console.log('这是this。list', this.list)
        //  (this.list)
        this.list.forEach((item) => {
          // console.log(item);
          item.salary_min = parseInt(item.salary_min)
          item.salary_max = parseInt(item.salary_max)
          item.enterprise.logo = this.disposeImg(item.enterprise.logo)
          item.datatime = this.dateToTimestamp(item.post_limit_time)
          // 工资单位
          res.data.salary_unit_options.forEach((unit) => {
            if (item.salary_unit == unit.idx && item.salary_unit) {
              item.salary_unit = unit.label
            }
          })
          // 融资

          res.data.financial_options.forEach((financial) => {
            if (financial.idx == item.enterprise.financing_status && item.enterprise.financing_status) {
              item.enterprise.financing_status = financial.label
              //  (this.userVitaed);
            }
          })
          // 工作性质
          res.data.job_nature_options.forEach((nature) => {
            if (nature.idx == item.job_nature && item.job_nature) {
              item.job_nature = nature.label
              //  (this.userVitaed);
            }
          })
          // 工作经验 job_experience
          res.data.exp_options.forEach((exp) => {
            if (exp.idx == item.job_experience && item.job_experience) {
              item.job_experience = exp.label
              item.jobid = exp.idx
              //  (this.userVitaed);
            }
          })

          if (this.dict) {
            // 地址
            this.dict.province_choices.forEach((choices) => {
              if (choices.idx == item.city && item.city) {
                item.city = choices.label
                //  (this.userVitaed);
              }
            })
            // 学历
            this.dict.education_choices.forEach((education) => {
              if (education.idx == item.education && item.education) {
                item.education = education.label
                item.educationid = education.idx
              }
            })
          }

          if (item.position.job_content.indexOf(';') > 0) {
            item.position.jobContent = item.position.job_content.split(';')
            item.position.jobContent = item.position.jobContent.filter((rs) => {
              return rs && rs.trim() // 注：IE9(不包含IE9)以下的版本没有trim()方法
            })
          } else {
            return (item.position.jobContent = [item.position.job_content])
          }
          if (item.position.job_content.indexOf('') > 0) {
            item.position.jobContent = item.position.job_content.split('')
            // item.position.jobContent=item.position.job_content
          } else {
            return (item.position.jobContent = [item.position.job_content])
            //  ();
          }
          if (item.position.requirement.indexOf(';') > 0) {
            item.position.jobrequirement =
              item.position.requirement.split(';')
            if (item.position.jobContent > 0) {
              item.position.jobrequirement = item.position.requirement.filter(
                (rs) => {
                  return rs && rs.trim() // 注：IE9(不包含IE9)以下的版本没有trim()方法
                }
              )
            }
          } else {
            return (item.position.jobrequirement = [item.position.requirement])
          }
          if (item.position.requirement.indexOf(' ') > 0) {
            item.position.jobrequirement = item.position.requirement.split(' ')
            // item.position.jobContent=item.position.job_content
          } else {
            return (item.position.jobrequirement = [item.position.requirement])
            //  ();
          }

          // let a = "1.努力 2.上进 3.有潜力"
          //  (item.position.job_content.indexOf(" "));
          // if(item.position.job_content.indexOf(" ")){
          //    item.position.jobContent = item.position.job_content.split(" ");
          //    item.position.jobContent = item.position.jobContent.filter(rs=> {
          //   return rs && rs.trim(); // 注：IE9(不包含IE9)以下的版本没有trim()方法
          // });
          // }

          //  (item.position.jobContent);
          if (item.salary_min > 1000) {
            item.salary_min = item.salary_min / 1000 + 'K'
          }
          if (item.salary_max > 1000) {
            item.salary_max = item.salary_max / 1000 + 'K'
          }
        })
        this.$store.commit('user/SET_SERCHLIST', this.list)
        this.$store.commit('user/SET_STATUS', this.statu)
        //  (this.$store.state.user.status);
      })
    },
    serch () {
      serchs().then((res) => {
        console.log('123123123123123213213----------', res)
        this.options = this.trees(res.data.all_pst_classes, 'id', 'parent_id')[0].children
        console.log('options', this.options)
        localStorage.setItem('option', JSON.stringify(this.options))
      })
    },
    changeRadio () { },
    // 级联面板是否显示
    currentPanel () {
      if (this.flag == 1) {
        this.showPanel = true
        this.flag = 0
        this.iconPanel = 'el-icon-caret-top'
      } else if (this.flag == 0) {
        this.showPanel = false
        this.flag = 1
        this.iconPanel = 'el-icon-caret-bottom'
      }
    },
    optionChange (e) {
      this.searchInput = e.join('/')
      if (e.length == 2 && this.flag == 0) {
        this.showPanel = false
        this.flag = 1
        this.iconPanel = 'el-icon-caret-bottom'
      }
    },
    // 职业下拉框
    tradeChange (item) {
      console.log(item)
      this.trade = item.children
      console.log(this.trade)
    },
    async getCity () {
      const res = await jobSearch(this.$route.query.name)
      console.log('res', res)
      this.cityName = res.data.cities_options
      console.log('cityName', this.cityName)
      localStorage.setItem('cityName', JSON.stringify(this.cityName))
    },
    // 城市 行政  地铁
    color () {
      this.changeColor = '11'
    },
    tradeColor (i) {
      this.changeColor = '22'
    },
    sunbwayColor () {
      this.changeColor = '33'
    },
    cityColor (index) {
      this.changeColor = index
    }
  }
};
</script>
<style lang="scss" scoped>
.el-input__inner {
  &::placeholder {
    color: green;
  }
}

.district {
  width: 100%;
  height: 100px;
  // background-color: #0094ff;
  margin: 20px 0 0 10px;
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
  }
  .input-with-select {
    height: 65px;
    width: 600px;
    padding-left: 30px;
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
</style>
