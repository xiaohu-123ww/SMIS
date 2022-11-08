<template>
  <div>
    <div
      v-if="loading"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="#fff"
      style="height: 700px; font-size: 100px"
    ></div>
    <div v-if="show" class="postdes-box">
      <div class="top">
        <div class="post-name">
          <div class="name">
            <el-row>
              <el-col :span="4">
                <div class="post-name-logo">
                  <img :src="image" alt="" />
                </div>
              </el-col>
              <el-col :span="16">
                <div class="post-job">
                  <div
                    style="
                      font-size: 22px;
                      margin-top: 20px;
                      color: #256efd;
                      font-weight: 700;
                    "
                  >
                    {{ resume.name }}
                  </div>
                  <div class="postJob">
                    <div class="text">{{ resume.financing_status }}</div>
                    <div class="text" style="padding-left: 15px">
                      {{ resume.staff_size }}
                    </div>
                    <div class="text" style="padding-left: 15px; border: 0">
                      {{ resume.field.field_name }}
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="3">
                <div
                  style="width: 120px; height: 120px; margin: 30px 0 20px 0px"
                >
                  <div
                    style="
                      width: 120px;
                      height: 90px;
                      font-size: 60px;
                      padding-left: 40px;
                      color: #256efd;
                    "
                  >
                    {{ resume.count_of_opening_position }}
                  </div>
                  <div style="font-size: 18px; padding-left: 22px; color: #fff">
                    在招职位
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <div class="header"></div>
      <div class="header-one">
        <div class="box" :class="{ 'boderImage ': state === 1 }">
          <a href="javascript:;" @click="companyIntroduction">公司介绍</a>
        </div>
        <div class="box" :class="{ 'boderImage ': state === 2 }">
          <a href="javscript:;" @click="recruitment">在招职位</a>
        </div>
      </div>
      <div class="postdes-card">
        <el-row>
          <el-col v-if="flagShow" :span="18">
            <el-card style="margin: 20px 50px 20px 0">
              <div
                style="
                  font-size: 18px;
                  padding-bottom: 5px;
                  border-bottom: 3px solid #256efd;
                  width: 78px;
                "
              >
                公司介绍
              </div>
              <div
                style="line-height: 30px; font-size: 14px"
                v-html="resume.introduction"
              ></div>
            </el-card>

            <el-card style="margin: 20px 50px 20px 0">
              <div
                style="
                  font-size: 18px;
                  padding-bottom: 5px;
                  border-bottom: 3px solid #256efd;
                  width: 78px;
                "
              >
                公司环境
              </div>
              <div style="display: flex">
                <div
                  v-for="(item, index) in resume.enterprise_images"
                  :key="index"
                  class="cert"
                >
                  <img
                    :src="disposeImg(item)"
                    alt=""
                    style="width: 240px; height: 150px"
                  />
                </div>
              </div>
            </el-card>
            <el-card style="margin: 20px 50px 20px 0">
              <div
                style="
                  font-size: 18px;
                  padding-bottom: 5px;
                  border-bottom: 3px solid #256efd;
                  width: 78px;
                "
              >
                公司优势
              </div>
              <div class="tags">
                <div
                  v-for="item in resume.tags"
                  :key="item.name"
                  style="
                    width: 90px;
                    height: 30px;
                    background-color: rgb(233, 243, 255);
                    border: 1px solid rgb(71, 156, 255);
                    color: rbg(56, 148, 255);
                    margin-right: 30px;
                    text-aligin: center;
                    line-height: 30px;
                    margin-bottom: 10px;
                  "
                >
                  {{ item.name }}
                </div>
              </div>
            </el-card>
            <el-card style="margin: 20px 50px 20px 0">
              <div
                style="
                  font-size: 18px;
                  padding-bottom: 5px;
                  border-bottom: 3px solid #256efd;
                  width: 78px;
                "
              >
                工商信息
              </div>
              <div class="firm">
                <el-row>
                  <el-col :span="12"
                    >公司名称：<span style="color: #999">{{
                      resume.name
                    }}</span></el-col
                  >
                  <el-col :span="12"
                    >成立时间：<span style="color: #999">{{
                      resume.establish_year
                    }}</span></el-col
                  >
                </el-row>
              </div>
              <div class="firm">
                <el-row>
                  <el-col :span="12"
                    >注册资本: <span style="color: #999"></span
                  ></el-col>
                  <el-col :span="12"
                    >法人代表: <span style="color: #999"></span
                  ></el-col>
                </el-row>
              </div>
            </el-card>
          </el-col>
          <el-col v-else :span="18">
            <el-card style="margin: 20px 50px 20px 0">
              <div
                style="
                  font-size: 18px;
                  padding-bottom: 5px;
                  border-bottom: 3px solid #256efd;
                  width: 78px;
                  margin-bottom: 10px;
                "
              >
                在招职位
              </div>
              <div class="table" style="display: flex">
                <div class="change-select">
                  <el-select
                    v-model="city"
                    placeholder="工作城市"
                    @change="cityChange"
                  >
                    <el-option
                      v-for="(item, index) in cityList"
                      :key="index"
                      :label="index"
                      :value="item"
                      >{{ index }}</el-option
                    >
                  </el-select>
                </div>
                <div class="change-select">
                  <el-select
                    v-model="experience"
                    placeholder="工作经验"
                    @change="experienceChange"
                  >
                    <el-option
                      v-for="(item, index) in experienceList"
                      :key="index"
                      :label="index"
                      :value="item"
                      >{{ index }}</el-option
                    >
                  </el-select>
                </div>
                <div class="change-select">
                  <el-select
                    v-model="requirements"
                    placeholder="学历要求"
                    @change="requirementsChange"
                  >
                    <el-option
                      v-for="(item, index) in educationalRequirements"
                      :key="index"
                      :label="index"
                      :value="item"
                      >{{ index }}</el-option
                    >
                  </el-select>
                </div>
                <div class="change-select">
                  <el-select
                    v-model="money"
                    placeholder="薪资要求"
                    @change="moneyChange"
                  >
                    <el-option
                      v-for="(item, index) in moneyList"
                      :key="index"
                      :label="item"
                      :value="item"
                      >{{ item }}</el-option
                    >
                  </el-select>
                </div>
              </div>

              <div>
                <el-empty v-if="showOne" :image-size="100"></el-empty>
                <div v-else>
                  <List
                    :in-recruit-list="inRecruitList"
                    :firm="firm"
                    :image="image"
                    :nature="nature"
                    :size="size"
                    :text="text"
                  />

                  <el-pagination
                    style="margin: 20px 0 0 150px"
                    :current-page="offset"
                    :page-sizes="[5, 10, 20]"
                    :page-size="limit"
                    layout="sizes, prev, pager, next, total"
                    :total="total"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                  >
                  </el-pagination>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card>
              <div
                style="
                  font-size: 18px;
                  padding-bottom: 10px;
                  border-bottom: 3px solid #256efd;
                  width: 80px;
                "
                @click="btn"
              >
                工作地点
              </div>
              <!-- data.work_city.second + data.work_city.third + data.work_city.first -->
              <div style="font-size: 16px; margin-top: 10px">
                {{ addressVal }}
                <!-- <el-button type="text" @click="btn">搜索</el-button> -->
              </div>
              <baidu-map
                class="box_map"
                :center="locations"
                :zoom="zoom"
                :scroll-wheel-zoom="true"
                @ready="handler"
              >
                <!-- :scroll-wheel-zoom="true" 该属性为鼠标滚轮缩放 -->
              </baidu-map>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>

import disposeImg from '@/utils/disposeImg'
import { getParticulars } from '@/api/particulars'
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import { getRequirement } from '@/api/postlist'
import { getInRecruit, getPositionDetails, getRecruit } from '@/api/particulars'
import List from './components/list.vue'
export default {
  components: { List },
  data () {
    return {

      query: {
        pagenum: 1, // 页码
        pagesize: 2 // 每页数据条数回所有数据

      },
      id: 0,
      resume: JSON.parse(localStorage.getItem('resumes')) || {},
      image: '',
      show: false,
      state: 1,
      locations: {
        // 红色标点的经纬度需要设一个初始值，不然地图无法渲染处理
        lng: 0,
        lat: 0
      },
      zoom: 0,
      addressVal: '',
      flagShow: true,
      city: '',
      experience: '',
      requirements: '',
      money: '',
      moneyList: ['5000', '6000', '7000', '8000', '9000', '10000', '10000以上'],
      // 工作经验
      experienceList: {},
      // 学历要求
      educationalRequirements: {},
      post: {},
      serchPost: {
        adcode: '0000',
        job_experience: 0,
        education: 0,
        salary: 0
      },
      // 城市
      cityList: {},
      inRecruitList: [],
      firm: '',
      nature: '',
      size: '',
      limit: 5,
      offset: 0,
      total: 0,
      text: '',
      showOne: false,
      loading: false
    }
  },
  beforeRouteEnter (to, from, next) {
    // ...
    next((vm) => {
      // console.log(to.query.item);
      vm.ids = to.query.id
      // console.log(vm);
      // console.log(this);
      // this.item = vm.item
    })
  },

  created () {
    this.getparticulars()
    this.geoTest()
    this.jobRequirement()
    this.inRecruit()
  },

  mounted () {
    // console.log(this);
  },
  methods: {
    async handleSizeChange (newSize) {
      console.log('每页条数', newSize)
      this.limit = newSize
      this.query.pagesize = newSize
      this.inRecruit()
    },
    handleCurrentChange (currPage) {
      console.log('当前页码', currPage)
      this.offset = this.limit(currPage - 1)
      this.query.pagenum = currPage
      this.inRecruit()
    },

    // 公司详情
    async getparticulars () {
      if (this.show === false) {
        this.loading = true
      }
      console.log(this.$route.query.id)
      this.id = this.$route.query.id
      console.log('this.id', this.id)
      const res = await getPositionDetails(this.id)
      console.log('公司详情', res)
      localStorage.setItem('resumes', JSON.stringify(data))
      this.resume = res.data
      this.image = this.disposeImg(res.data.logo)
      // console.log('logo', this.image)
      this.show = true
      this.loading = false
      this.addressVal = res.data.address
      this.firm = res.data.name
      this.nature = res.data.nature
      this.size = res.data.staff_size
      const aa = res.data.tags.map(item => item.name)
      this.text = aa.toLocaleString()
      console.log('内容', aa.toLocaleString())
    },
    // 公司介绍
    companyIntroduction () {
      this.state = 1
      this.flagShow = true
    },
    // 在招职位
    recruitment () {
      this.state = 2
      this.flagShow = false
    },
    // 地图
    async geoTest () {
      console.log('地址', this.addressVal)
      // 调用百度地图API,根据地址获取经纬度
      await this.$jsonp('http://api.map.baidu.com/geocoding/v3/', {
        address: this.addressVal,
        output: 'json',
        ak: 'ZrI2HTuyRbAXHDuci4xowYtUOepEzMmK' // 你的AK秘钥
      })
        .then((json) => {
          console.log(`json success:`, json)
          this.locations = json.result.location
          this.geoTest()
          // this.handler()
        })
        .catch((err) => {
          console.log(`json err:`, err)
        })
    },
    handler ({ BMap, map }) {
      console.log(55, BMap, map)
      // this.center = ''
      this.zoom = 15
      const geolocation = new BMap.Geolocation()
      geolocation.getCurrentPosition((res) => {
        // IP地址赋值给locations对象
        console.log('112', res)

        this.locations.lng = res.point.lng
        this.locations.lat = res.point.lat
        this.btn()
      })
    },

    btn () {
      this.geoTest()
    },
    async jobRequirement () {
      const { data } = await getRequirement()
      console.log('其他要求', data)
      this.experienceList = data.job_experience
      this.educationalRequirements = data.education
    },
    async inRecruit () {
      const { data } = await getInRecruit(this.id, this.post, this.limit, this.offset)
      console.log('在招列表', data)
      this.cityList = data.city_list
      this.total = data.result.count
      this.inRecruitList = data.result.results
      if (data.result.results.length === 0) {
        console.log('1121345556')
        this.showOne = true
      } else {
        console.log(33)
        this.showOne = false
      }
    },
    async root () {
      const { data } = await getInRecruit(33, this.serchPost, this.limit, this.offset)
      console.log('在招列表122', data)

      if (data.length === 0) {
        console.log('1121345556')
        this.$message.error('再无此信息')
      } else {
        console.log(33)
      }
    },
    // 检索条件
    cityChange (i) {
      // console.log('1', i)
      this.adcode = i.toString
      this.root()
      //   this.inRecruit()
    },
    experienceChange (i) {
      this.serchPost.job_experience = i
      this.root()
    },
    requirementsChange (i) {
      this.serchPost.education = i
      this.root()
    },
    moneyChange (i) {
      this.serchPost.salary = i
      this.root()
    }

  }
};
</script>
<style lang="scss" scoped>
.postdes-box {
  min-width: 1555px;
  // max-width: 2000px;
  width: 100%;
  height: auto;
  background-color: rgb(244, 246, 249);

  // overflow: hidden;
  .top {
    .post-name {
      width: 100%;
      height: 180px;
      // display: flex;
      padding-bottom: 30px;
      background-color: rgb(21, 37, 50);
      .name {
        width: 100%;
        height: 180px;
        // background-color: #256efd;
        .post-job {
          width: 100%;
          height: 180px;
          // background-color: pink;
          padding: 20px;
          .postJob {
            width: 100%;
            height: 50px;
            // background-color: #256efd;
            margin-top: 30px;
            display: flex;
            .text {
              font-size: 16px;
              height: 20px;
              padding-right: 20px;
              border-right: 1px solid #999;
              color: #fff;
            }
          }
        }
      }
      .post-name-logo {
        padding: 20px 0 20px 80px;
        img {
          width: 140px;
          height: 140px;
          border-radius: 5px;
        }
      }
    }
    .name-left {
      position: absolute;
      left: 300px;
      width: 40%;
      padding: 40px 0 10px 30px;

      .title {
        padding-bottom: 20px;
        font-size: 28px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
      }
      .fuli {
        margin-right: 10px;
        padding: 5px;
        color: #ffffff;
        border-radius: 10px;
        border: 1px solid #999999;
      }
    }

    .name-right {
      position: absolute;
      right: 15%;
      width: 35%;
      text-align: right;
      padding-top: 80px;
    }
  }
  .header {
    width: 100%;
    height: 3px;
    background-color: rgb(21, 37, 50);
  }
  .header-one {
    width: 100%;
    height: 40px;
    background-color: rgb(21, 37, 50);
    display: flex;
    padding-left: 80px;
    .box {
      width: 100px;
      // background-color: green;
      font-size: 15px;
      text-align: center;
      line-height: 40px;
      color: #fff;
      margin-right: 20px;
    }
  }
}
.boderImage {
  // border-bottom: 3px solid #256efd;
}
.postdes-card {
  padding: 20px 80px;
  width: 100%;
  // background-color: pink;
  // height: 800px;
}
.box_map {
  margin: 30px auto;
  // width: 300px;
  height: 400px;
  background-color: #f0f;
  position: relative;
}
.inputVal {
  position: absolute;
  left: 0;
  top: 0;
  width: 50%;
}

input {
  width: 60%;
}
button {
  margin-top: 10px;
  margin-left: 20px;
  width: 40px;
  height: 30px;
}
.firm {
  width: 100%;
  height: 30px;
  margin: 20px 0;
  font-size: 16px;
}
.sel {
  position: absolute;
  clip: rect(2px 90px 30px 2px);
  width: 100%;
  height: 28px;
  line-height: 28px;
  font-size: 15px;
  font-weight: bold;
}
.el-select {
  width: 95px;
  display: inline-block;
  input {
    font-size: 12px;
    border: none;
    background: none;
    text-align: center;
    color: #fff;
    font-weight: bold;
  }
  .el-input__suffix {
    i {
      color: #fff;
      margin-left: 0.06rem;
      font-weight: bold;
    }
  }
  /* WebKit browsers */
  ::-webkit-input-placeholder {
    color: #fff;
    font-weight: bold;
  }
}

.change-select {
  margin: 0;
  padding: 0;
  width: auto;
  // background-color: #ff8383;
  // position: absolute ;
}

::v-deep {
  .el-input__inner {
    border: none;
    background-color: #fff;
    text-align: left;
    width: 130px;

    &::placeholder {
      color: #808080;
    }
  }

  .clear {
    color: #808080;
    padding-top: 8px;
  }

  .clear:hover {
    color: #ff8383;
  }
}
.tip-box {
  width: 100%;
  // height: 50px;
  // display: flex;
  // justify-content: space-between;
  // background-color: pink;

  .change-select {
    margin: 0;
    padding: 0;
    width: auto;
    // position: absolute ;
  }

  ::v-deep {
    .el-input__inner {
      border: none;
      background-color: #fff;
      text-align: left;
      width: 130px;

      &::placeholder {
        color: #808080;
      }
    }

    .clear:hover {
      color: #ff8383;
    }
  }
}
::v-deep i.el-icon.el-icon-arrow-left {
  margin-left: 10px;
}
.tags {
  width: 100%;
  height: 100px;
  padding: 30px;
  display: flex;
  text-align: center;
  flex-wrap: wrap;
}
.cert {
  margin: 20px;
  width: 240px;
  height: 180px;
  // background-color: #256efd;
  font-size: 15px;
  text-align: center;
  color: #999;
  margin-right: 70px;
}
</style>
