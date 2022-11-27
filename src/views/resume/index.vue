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
    <div v-if="bold" class="postdes-box">
      <div class="top">
        <div class="post-name">
          <div class="name">
            <el-row>
              <el-col :span="20">
                <div class="postdes">
                  <div class="fullname">{{ resume.fullname }}</div>
                  <div class="money">
                    {{ resume.salary_min }} - {{ resume.salary_max }}.{{
                      resume.salary_unit
                    }}薪
                  </div>
                  <div class="city">
                    <div class="text" style="padding-left: 0">
                      {{ city }} - {{ third }}
                    </div>
                    <div class="text">{{ resume.job_experience.name }}</div>
                    <div class="text" style="border: 0">
                      {{ resume.education.name }}
                    </div>
                  </div>
                  <div class="tags">
                    <div
                      v-for="(item, index) in resume.tag"
                      :key="index"
                      class="tag"
                    >
                      {{ item }}
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="4" class="btn">
                <el-button
                  v-if="resume.is_collected === true"
                  class="postdes-btn"
                  icon="el-icon-star-off"
                  @click="cancel"
                  >取消收藏</el-button
                >
                <el-button
                  v-else
                  class="postdes-btn"
                  icon="el-icon-star-off"
                  @click="collect"
                  >收藏</el-button
                >
                <el-button type="primary" @click="likeChange"
                  >我有意向</el-button
                >
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="footer-conter">
          <el-row>
            <el-col :span="18">
              <div class="imag">
                <el-row>
                  <el-col :span="3">
                    <div class="image">
                      <img
                        :src="img"
                        alt=""
                        style="width: 80px; height: 80px"
                      />
                    </div>
                  </el-col>
                  <el-col :span="21" class="hr">
                    <div style="margin-bottom: 10px; color: black">
                      {{ hr.name }}
                    </div>
                    <div>{{ hr.identification }}.{{ hr.active }}活跃</div>
                  </el-col>
                </el-row>
              </div>
              <div class="job">
                <div class="textone">职位描述</div>
                <div class="commendContent" v-html="commendContent"></div>
              </div>
              <div class="job">
                <div class="textone">证书要求</div>
                <div style="display: flex; flex-wrap: wrap; padding-left: 50px">
                  <div
                    v-for="(item, index) in resume.cert"
                    :key="index"
                    class="cert"
                  >
                    <img
                      :src="disposeImg(item.cert_sample)"
                      alt=""
                      style="width: 240px; height: 150px"
                    />
                    <div style="margin-top: 5px">{{ item.cert_name }}</div>
                  </div>
                </div>
              </div>
              <div class="job">
                <div class="textone">公司介绍</div>
                <div class="name">{{ name.name }}</div>
                <div
                  class="commendContent"
                  style="line-height: 25px; font-size: 16px"
                  v-html="name.introduction"
                ></div>
              </div>
              <div class="job">
                <div class="textone">工作地点</div>
                <div class="name">
                  {{ addressVal }}
                  <el-button type="text" @click="btn"></el-button>
                </div>
                <baidu-map
                  class="box_map"
                  :center="locations"
                  :zoom="zoom"
                  :scroll-wheel-zoom="true"
                  @ready="handler"
                >
                </baidu-map>
              </div>
              <div class="job">
                <div class="textone">精选职位</div>
                <div class="SelectPosition">
                  <div
                    v-for="(item, index) in handpickJob"
                    :key="index"
                    class="select"
                  >
                    <div style="background-color: green">
                      <!-- <el-row>
                        <el-col :span="12">
                          {{
                            item.fullname ? item.fullname : '再无职业名称'
                          }}</el-col
                        >
                        <el-col :span="7"
                          >{{ item.salary_min }} - {{ item.salary_max }}.{{
                            item.salary_unit
                          }}薪</el-col
                        >
                      </el-row> -->
                    </div>
                    <div style="display: flex">
                      <div style="padding-bottom: 20px; width: 220px">
                        {{ item.fullname ? item.fullname : '再无职业名称' }}
                      </div>
                      <span style="color: red"
                        >{{ item.salary_min }} - {{ item.salary_max }}.{{
                          item.salary_unit
                        }}薪</span
                      >
                    </div>
                    <div style="color: #999">{{ item.enterprise_name }}</div>
                  </div>
                </div>
              </div>
              <div class="job">
                <div class="textone">推荐证书</div>
                <div class="carousel">
                  <el-carousel
                    :interval="3000"
                    type="card"
                    height="200px"
                    width:200px
                  >
                    <el-carousel-item
                      v-for="(item, index) in slideshow"
                      :key="index"
                    >
                      <img
                        :src="disposeImg(item.sample)"
                        alt=""
                        style="width: 470px; height: 200px"
                      />
                    </el-carousel-item>
                  </el-carousel>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="firm">
                <div class="firm-job" @click="open(name.enterprise_id)">
                  <div class="textone">公司详情</div>
                  <div class="firm-image">
                    <div class="img">
                      <img
                        :src="imgJob"
                        alt=""
                        style="width: 50px; height: 50px"
                      />
                    </div>
                    <div style="margin: 15px 7px">{{ name.name }}</div>
                  </div>
                  <div class="Icon">
                    <i class="el-icon-guide Icon" style="margin-right: 10px"></i
                    >{{ field }}
                  </div>
                  <div class="Icon">
                    <i class="el-icon-data-line" style="margin-right: 10px"></i
                    >{{ name.finance }}
                  </div>
                  <div class="Icon">
                    <i class="el-icon-user" style="margin-right: 10px"></i
                    >{{ name.size }}
                  </div>
                </div>
                <div class="list" style="padding-left: 20px">
                  <div class="textone" style="margin-bottom: 18px">
                    相似职位
                  </div>
                  <div v-if="flagShow">
                    <div
                      v-for="(item, index) in resemblance"
                      :key="index"
                      class="ankjij"
                    >
                      <div class="text">
                        {{ item.fullname }}
                        <div style="margin-left: 50px; color: red">
                          {{ item.salary }}.{{ item.salary_unit }}薪
                        </div>
                      </div>
                      <div style="color: #999">{{ item.enterprise_name }}</div>
                    </div>
                  </div>
                  <el-empty v-else :image-size="100"></el-empty>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getParticulars, getList, getInterests, getCollections, getCollectionsDelete } from '@/api/particulars'
import disposeImg from '@/utils/disposeImg'
import { getHandpickJob } from '@/api/cat'
import { getCertificate } from '@/api/position'
export default {
  data () {
    return {
      ceshi: '',
      id: 0,
      resume: JSON.parse(localStorage.getItem('resume')) || {},
      city: '',
      third: '',
      img: '',
      hr: {},
      content: '',
      name: {},
      locations: {
        // 红色标点的经纬度需要设一个初始值，不然地图无法渲染处理
        lng: 0,
        lat: 0
      },
      zoom: 0,
      addressVal: '',
      limit: 4,
      handpickJob: [],
      slideshow: [],
      imgJob: '',
      field: '',
      resemblance: [],
      flagShow: false,
      bold: false,
      collectList: {
        collects: ''
      },
      loading: false

    }
  },
  computed: {
    commendContent () {
      // this.commend.content是后端传回来的文本数据，就是要对这个数据进行处理
      const arr = this.content.split('')
      return arr.map((item) => {
        return item === '\n' ? '<br>' : item
      }).join('')
    }
  },

  created () {
    this.getlist()
    this.geoTest()
    // this.btn()
    this.getJobList()
    this.getSlideshow()
    this.getJob()
  },
  mounted () {

  },

  methods: {
    // 简历详情
    async getlist () {
      if (this.bold === false) {
        this.loading = true
      }
      console.log('id', this.$route.query.id)
      this.id = this.$route.query.id
      const res = await getParticulars(this.id)
      console.log('简历', res)
      if (res.code === 1001) {
        this.$confirm(res.data.msg, '提示', {
          confirmButtonText: '确定', // 确认按钮的文字显示
          type: 'warning',
          center: true, // 文字居中显示
          showCancelButton: false, // 不显示取消按钮
          showClose: false, // 是否显示右上角的x
          closeOnClickModal: false
        }).then(() => {
          this.$router.push('/interview')
        })
      } else {
        localStorage.setItem('resume', JSON.stringify(res.data))
        this.bold = true
        this.loading = false
        this.resume = res.data
        console.log('34343', this.resume)
        this.city = res.data.work_city.second
        this.third = res.data.work_city.third
        this.img = this.disposeImg(res.data.hr_info.avatar)
        this.hr = res.data.hr_info
        this.content = res.data.job_content
        this.name = res.data.enterprise_info
        this.addressVal = res.data.work_city.second + res.data.work_city.third

        this.imgJob = this.disposeImg(this.name.logo)
        console.log('imgJob', this.imgJob)
        this.field = this.name.field.field_name
      }
    },
    open (i) {
      console.log('1233333', i)
      this.$router.push({
        path: '/postdes',
        name: 'postdes',
        query: { id: i }
      })
    },
    async geoTest () {
      // console.log('地址', this.addressVal)
      // 调用百度地图API,根据地址获取经纬度

      await this.$jsonp('http://api.map.baidu.com/geocoding/v3/', {
        address: this.addressVal,
        output: 'json',
        ak: '0dZK03G6kSF0M16RXLWrrLkWWORcLsyV' // 你的AK秘钥
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
    // 地图
    handler ({ BMap, map }) {
      // this.btn()
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
    // 精选职位
    async getJobList () {
      const { data } = await getHandpickJob(this.limit)
      console.log('精选职位', data)
      this.handpickJob = data.results
      console.log('this.handpickJob', this.handpickJob)
    },
    // 证书
    async getSlideshow () {
      const { data } = await getCertificate()
      console.log('证书', data)
      this.slideshow = data
    },
    // 相似职位
    async getJob () {
      const res = await getList(this.id)
      console.log('相似职位', res)
      this.resemblance = res.data
      if (this.resemblance.length === 0) {
        this.flagShow = false
      } else {
        this.flagShow = true
      }
    },
    // 有意向
    async likeChange () {
      console.log('111222', this.resume)
      const id = this.resume.id
      const res = await getInterests(id)
      console.log('意向', res)
      this.$message.success('已向hr发送消息')
    },
    // 收藏
    async collect () {
      const id = this.resume.enterprise_info.enterprise_id
      this.collectList.collects = id.toString()
      console.log(this.collectList)
      const res = await getCollections(this.collectList)
      console.log('收藏', res)
      this.$message.success('收藏成功')
    },
    // 取消
    async cancel () {
      const id = this.resume.enterprise_info.enterprise_id
      this.collectList.collects = id.toString()
      console.log(this.collectList)
      const res = await getCollectionsDelete(this.collectList)
      console.log('取消收藏', res)
      this.$message.success('取消收藏成功')
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
  overflow: hidden;
  .top {
    .post-name {
      width: 100%;
      padding: 30px 80px;
      height: 240px;
      display: flex;

      background-color: rgb(21, 37, 50);
      .name {
        width: 100%;
        height: 100%;
        // background-color: pink;
        .postdes {
          // width: 300px;
          height: 180px;
          // background-color: aqua;
          .fullname {
            height: 40px;
            // background-color: blue;
            font-size: 22px;
            line-height: 40px;
            color: #256efd;
            font-weight: 700;
          }
          .money {
            height: 40px;
            // background-color: rgb(95, 95, 233);
            color: red;
            font-size: 20px;
            line-height: 40px;
            margin-bottom: 10px;
          }
          .city {
            height: 30px;
            // background-color: rgb(95, 95, 233);
            display: flex;
            .text {
              // width: 100px;
              height: 25px;
              // background-color: pink;
              padding: 0 15px;
              border-right: 1px solid #999;
              font-size: 14px;
              color: #fff;
              line-height: 25px;
            }
          }
          .tags {
            height: 30px;
            margin-top: 15px;
            // background-color: pink;
            display: flex;
            .tag {
              padding: 7px 10px;
              // line-height: 30px;
              background-color: #fff;
              // border: 1px solid rgb(14, 112, 224);
              color: rbg(56, 148, 255);
              margin-right: 20px;
              text-align: center;
            }
          }
        }
        .btn {
          padding-top: 140px;
          .postdes-btn {
            background-color: rgb(233, 243, 255);
            border: 1px solid rgb(71, 156, 255);
            color: rbg(56, 148, 255);
          }
        }
      }
    }
  }
  .footer {
    // height: 800px;
    // background-color: pink;
    padding: 0 80px;
    .footer-conter {
      // background-color: green;
      height: 800px;
      .imag {
        height: 100px;
        background-color: #fff;
        border-bottom: 1px solid #d7d5d5;
        padding-left: 20px;
        .image {
          width: 80px;
          height: 80px;
          // background-color: #256efd;
          margin-top: 8px;
          border-radius: 100px;
          overflow: hidden;
        }
        .hr {
          padding-top: 30px;
          font-size: 15px;
          color: #999;
        }
      }
      .job {
        // height: 400px;
        background-color: #fff;
        padding: 15px 0 30px 15px;
        border-bottom: 1px solid #d7d5d5;
        .textone {
          font-size: 18px;
          padding-bottom: 10px;
          border-bottom: 3px solid #256efd;
          width: 75px;
        }
        .commendContent {
          font-size: 16px;
          margin: 20px 50px;
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
        .name {
          font-size: 16px;
          color: #999;
          margin: 10px 20px;
        }
        .SelectPosition {
          // height: 200px;
          // background-color: pink;
          margin-top: 20px;
          padding: 30px 60px;
          display: flex;
          flex-wrap: wrap;
          .select {
            width: 400px;
            height: 100px;
            border: 1px solid #d7d5d5;
            margin: 0 50px 20px 0;
            padding: 20px 20px;
            font-size: 16px;
          }
        }
        .carousel {
          padding: 20px 30px;
        }
      }
      .firm {
        // width: 100%;
        // height: 500px;
        background-color: #fff;
        border: 1px solid #d7d5d5;
        margin-left: 20px;
        .firm-job {
          // height: 200px;
          // background-color: pink;
          padding: 20px;
          .firm-image {
            height: 70px;
            // background-color: #256efd;
            margin-top: 10px;
            display: flex;
            padding: 10px;
            font-size: 14px;
            color: #999;
            .img {
              width: 50px;
              // height: 50px;
              // background-color: pink;
              border-radius: 100px;
              overflow: hidden;
            }
          }
        }
      }
    }
  }
}
.box_map {
  // margin: 30px auto;
  margin: 20px;
  width: 800px;
  height: 200px;
  background-color: #f0f;
  position: relative;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.textone {
  font-size: 18px;
  padding-bottom: 10px;
  // border-bottom: 3px solid #256efd;
  width: 75px;
}
.Icon {
  height: 30px;
  // background-color: #256efd;
  font-size: 14px;
  // margin: 10px;
}
.ankjij {
  height: 70px;
  width: 300px;
  // background-color: #f0f;
  padding: 10px 10px;
  font-size: 14px;
  border: 1px solid #d3dce6;
  margin-bottom: 20px;
  .text {
    margin-bottom: 10px;
    display: flex;
  }
}
</style>
