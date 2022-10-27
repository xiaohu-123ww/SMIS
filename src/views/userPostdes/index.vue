<template>
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
                  {{ resume.enterprise_info.name }}
                </div>
                <div class="postJob">
                  <div class="text">
                    {{ resume.enterprise_info.field.field_name }}
                  </div>
                  <div class="text" style="padding-left: 15px">
                    {{ resume.enterprise_info.finance }}
                  </div>
                  <div class="text" style="padding-left: 15px; border: 0">
                    {{ resume.enterprise_info.size }}
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="3">
              <div style="width: 120px; height: 120px; margin: 30px 0 20px 0px">
                <div
                  style="
                    width: 120px;
                    height: 90px;
                    font-size: 60px;
                    padding-left: 40px;
                    color: #256efd;
                  "
                >
                  7
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
            <p style="line-height: 30px; font-size: 14px">
              北京智能智造科技有限公司
              成立于2018年12月28日，注册在北京市海淀区西小口路10号。
              中关村东园66号北领地2号楼B - 1层C102B(东胜区)，法定代表人孙守海。
              业务范围包括技术开发、技术推广、技术转让、技术咨询、技术服务;
              软件开发; 软件咨询; 产品设计; 模型设计; 教育咨询(不含中介服务);
              组织文化艺术交流活动(不含营业性演出); 文艺创作; 企业策划、设计;
              设计、制作、代理、广告; 市场调查; 企业管理; 会议服务;
              承办展览陈列; 企业管理咨询; 租办公空间;
              销售自主开发的产品、电子产品、通讯设备、计算机、软件及辅助设备、机械设备;
              物业管理; 机械设备租赁(不含汽车租赁); 版权代理、版权转让;
              房地产开发; 从事互联网文化活动; 出版物零售; 广播电视节目制作;
              电信业务; 人力资源服务。
              (市场主体选择自己的经营项目，依法开展经营活动;
              人力资源和人力资源服务。
              并且必须按照项目批准，经有关部门批准后，按照批准的内容开展经营活动;
              不得从事国家和本市产业政策禁止和限制的项目经营活动
            </p>
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
            <div
              style="width: 100%; height: 100px; padding: 30px; display: flex"
            >
              <div
                v-for="item in resume.tag"
                :key="item"
                style="
                  width: 120px;
                  height: 40px;
                  background-color: rgb(233, 243, 255);
                  border: 1px solid rgb(71, 156, 255);
                  color: rbg(56, 148, 255);
                  margin-right: 30px;
                "
              >
                {{ item }}
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
                    resume.enterprise_info.name
                  }}</span></el-col
                >
                <el-col :span="12"
                  >成立事时间：<span style="color: #999"></span
                ></el-col>
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
                <el-select v-model="city" placeholder="工作城市">
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
                <el-select v-model="experience" placeholder="工作经验">
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
                <el-select v-model="requirements" placeholder="学历要求">
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
                <el-select v-model="money" placeholder="薪资要求">
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
            <List
              :in-recruit-list="inRecruitList"
              :firm="firm"
              :image="image"
            />
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
              <el-button type="text" @click="btn">搜索</el-button>
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
</template>
<script>

import disposeImg from '@/utils/disposeImg'
import { getParticulars } from '@/api/particulars'
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import { getRequirement } from '@/api/postlist'
import { getInRecruit } from '@/api/particulars'
import List from './components/list.vue'
export default {
  components: { List },
  data () {
    return {
      id: 0,
      resume: {},
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
      serchPost: {},
      // 城市
      cityList: {},
      inRecruitList: [],
      firm: ''
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

    // 简历详情
    async getparticulars () {
      console.log(this.$route.query.id)
      this.id = this.$route.query.id
      const { data } = await getParticulars(this.id)
      console.log('简历详情', data)
      this.resume = data
      console.log('简历详情', this.resume)
      this.image = this.disposeImg(data.enterprise_info.logo)
      console.log('logo', this.image)
      this.show = true
      this.addressVal = data.work_city.second + data.work_city.third + data.work_city.first
      this.firm = data.enterprise_info.name
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
      })
      this.geoTest()
      this.btn()
    },

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
        })
        .catch((err) => {
          console.log(`json err:`, err)
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
      const { data } = await getInRecruit(32, this.serchPost)
      console.log('在招列表', data)
      this.cityList = data.city_list
      this.inRecruitList = data.result
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
  border-bottom: 3px solid #256efd;
}
.postdes-card {
  padding: 20px 80px;
  width: 100%;
  // background-color: pink;
  // height: 800px;
}
.box_map {
  margin: 30px auto;
  width: 300px;
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
</style>
