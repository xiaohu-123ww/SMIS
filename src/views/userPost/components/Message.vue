<template>
  <div style="font-size: 15px; margin-top: 10px">
    <div>
      <div v-if="data.css === 'left' && data.messageName === 'TextMessage'">
        <div v-if="phoneSums">
          <div class="time">{{ month }} {{ data.time }}</div>
          <div v-if="information" class="message">
            <el-avatar size="small" :src="data.headImg"></el-avatar>
            <div
              style="
                height: 90px;
                background-color: #fff;
                width: 250px;
                border: 1px solid #e6e3e3;
                border-radius: 10px;
                font-size: 13px;
              "
            >
              <div
                style="
                  height: 60px;
                  border-bottom: 1px solid #e6e3e3;

                  color: black;
                  display: flex;
                "
              >
                <div style="width: 23%">
                  <img
                    src="../../../assets/images/phone.png"
                    alt=""
                    style="
                      width: 30px;
                      height: 30px;
                      margin: 13px 0px 13px 13px;
                    "
                  />
                </div>
                <div style="padding-top: 13px">
                  对方想和您交换联系方式，是否同意
                </div>
              </div>
              <div style="display: flex">
                <el-button
                  type="text"
                  style="
                    width: 50%;
                    height: 28px;
                    line-height: 8px;
                    border-radius: 0;
                    border-right: 1px solid #e6e3e3;
                  "
                  :disabled="is_commite"
                  @click="ascertain"
                  >确定</el-button
                >
                <el-button
                  type="text"
                  style="
                    width: 50%;
                    height: 28px;
                    line-height: 8px;
                    border-radius: 0;
                  "
                  class="bg"
                  :class="{ active: isActive }"
                  :disabled="is_commite"
                  @click="cancel"
                  >取消</el-button
                >
                <!-- <div
                  style="
                    width: 50%;
                    border-right: 1px solid #e6e3e3;
                    height: 30px;
                    text-align: center;
                  "
                > -->

                <!-- </div> -->
                <!-- <el-button type="text">取消</el-button> -->
                <!-- <a href="javascript:;"
                  ><span
                    style="
                      width: 50%;
                      display: inline-block;
                      text-align: center;
                      border-right: 1px solid #e6e3e3;
                      height: 30px;
                      line-height: 30px;
                    "
                    disabled
                    @click="ascertain(data.headImg)"
                    >确定</span
                  ></a
                >
                <a href="javascript:;"
                  ><span
                    style="
                      display: inline-block;
                      text-align: center;
                      height: 30px;
                      line-height: 30px;
                      width: 38%;
                    "
                    >取消</span
                  ></a
                > -->
              </div>
            </div>
          </div>
          <div v-else class="message">
            <el-avatar size="small" :src="data.headImg"></el-avatar>
            <div
              style="
                height: 90px;
                background-color: #fff;
                width: 250px;
                border: 1px solid #e6e3e3;
                border-radius: 10px;
                font-size: 13px;
              "
            >
              <div
                style="
                  height: 60px;
                  border-bottom: 1px solid #e6e3e3;

                  color: black;
                  display: flex;
                "
              >
                <div style="width: 23%; line-height: 60px; padding-left: 20px">
                  <i
                    class="el-icon-tickets"
                    style="font-size: 25px; color: #898181"
                  ></i>
                </div>
                <div style="line-height: 50px">
                  对方想发送简历给您，是否同意
                </div>
              </div>
              <div style="display: flex">
                <el-button
                  type="text"
                  style="
                    width: 50%;
                    height: 28px;
                    line-height: 8px;
                    border-radius: 0;
                    border-right: 1px solid #e6e3e3;
                  "
                  :disabled="commite"
                  @click="fileUploading"
                  >确定</el-button
                >
                <el-button
                  type="text"
                  style="
                    width: 50%;
                    height: 28px;
                    line-height: 8px;
                    border-radius: 0;
                  "
                  class="bg"
                  :class="{ active: isActive }"
                  :disabled="commite"
                  @click="uploading"
                  >取消</el-button
                >
                <!-- <div
                  style="
                    width: 50%;
                    border-right: 1px solid #e6e3e3;
                    height: 30px;
                    text-align: center;
                  "
                > -->

                <!-- </div> -->
                <!-- <el-button type="text">取消</el-button> -->
                <!-- <a href="javascript:;"
                  ><span
                    style="
                      width: 50%;
                      display: inline-block;
                      text-align: center;
                      border-right: 1px solid #e6e3e3;
                      height: 30px;
                      line-height: 30px;
                    "
                    disabled
                    @click="ascertain(data.headImg)"
                    >确定</span
                  ></a
                >
                <a href="javascript:;"
                  ><span
                    style="
                      display: inline-block;
                      text-align: center;
                      height: 30px;
                      line-height: 30px;
                      width: 38%;
                    "
                    >取消</span
                  ></a
                > -->
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="time">{{ month }} {{ data.time }}</div>
          <div class="message">
            <el-avatar size="small" :src="data.headImg"></el-avatar>
            <!-- <image
          round
          fit="cover"
          width="2rem"
          height="2rem"
          :src="data.headImg"
        /> -->
            <!-- <span class="text" v-html="data.txt"></span> -->
            <span v-if="images"
              ><img
                :src="picture"
                alt=""
                style="width: 80px; height: 80px"
                @click="imageSmall(picture)"
            /></span>
            <span v-if="texts" class="textarea" v-html="text"></span>
          </div>
          <!-- <span v-if="!images"><img :src="data.txt" alt="" /></span> -->
        </div>
      </div>
      <div v-if="data.css === 'left' && data.messageName === 'ImageMessage'">
        <div v-if="phoneSum">
          <div v-if="monthDay" class="time">{{ month }} {{ data.time }}</div>
          <div class="message left">
            <div>
              <el-avatar
                size="small"
                :src="
                  data.headImg
                    ? data.headImg
                    : this.$store.state.num.list.avatar
                "
              ></el-avatar>
              <span
                ><img
                  :src="data.imageUri"
                  alt=""
                  style="width: 80px; height: 80px"
                  @click="imageSmall(data.imageUri)"
              /></span>
            </div>
          </div>
        </div>

        <!-- <div v-if="fileChange">
        <div class="time">请求发送简历已发送</div>
      </div> -->
      </div>
      <div v-if="data.css === 'left' && data.messageName === 'LocationMessage'">
        <div v-if="monthDay" class="time">{{ month }} {{ data.time }}</div>
        <a
          :href="`http://api.map.baidu.com/marker?location=${this.data.latitude},${this.data.longitude}&title=${this.data.poi}&content=${this.data.poi}&output=html`"
        >
          <div class="message left" style="margin-bottom: 80px">
            <el-avatar
              size="small"
              :src="
                data.headImg ? data.headImg : this.$store.state.num.list.avatar
              "
            ></el-avatar>
            <baidu-map
              class="map"
              :center="center"
              :zoom="zoom"
              @ready="handler"
            >
              <bm-view class="map"></bm-view>

              <bm-marker
                :position="{
                  lng: center.lng,
                  lat: center.lat
                }"
                :dragging="true"
              >
              </bm-marker>
              <div
                style="
                  width: 300px;
                  hieght: 50px;
                  border: 1px solid #e6e3e3;
                  padding-left: 20px;
                  font-size: 13px;
                "
              >
                <div style="margin: 5px 0px; color: rgb(125 127 131)">
                  {{ data.poi }}
                </div>
                <div style="margin: 5px 0px 10px">您是否接受此工作地点?</div>
              </div>
            </baidu-map>
          </div>
        </a>
      </div>
      <div
        v-if="data.css === 'left' && data.messageName === 'RichContentMessage'"
      >
        <div v-if="phoneSum">
          <div v-if="monthDay" class="time">{{ month }} {{ data.time }}</div>
          <div class="message left">
            <el-avatar
              size="small"
              :src="
                data.headImg ? data.headImg : this.$store.state.num.list.avatar
              "
            ></el-avatar>
            <div
              style="
                height: 115px;
                background-color: #fff;
                width: 250px;
                border: 1px solid #e6e3e3;
                border-radius: 10px;
                font-size: 13px;
              "
            >
              <div
                style="
                  height: 25px;
                  width: 250px;
                  text-align: center;
                  border-bottom: 1px solid rgb(230, 227, 227);
                  font-weight: 800;
                  color: rgb(24, 144, 255);
                  line-height: 25px;
                "
              >
                {{ data.title }}
              </div>
              <div
                style="
                  height: 60px;
                  border-bottom: 1px solid #e6e3e3;

                  color: black;
                  display: flex;
                "
              >
                <div style="width: 23%; line-height: 65px; padding-left: 20px">
                  <i
                    :class="
                      data.imageUri
                        ? 'el-icon-phone-outline'
                        : 'el-icon-tickets'
                    "
                    style="font-size: 25px; color: #898181"
                  ></i>
                </div>
                <div v-if="resumeVisible" style="margin-top: 15px">
                  {{ data.content }}
                </div>
                <div v-if="phoneVisible" style="margin-top: 20px">
                  {{ name }}:{{ data.imageUri }}
                </div>
              </div>
              <div style="display: flex">
                <el-button
                  type="text"
                  style="
                    width: 50%;
                    height: 28px;
                    line-height: 5px;
                    border-radius: 0;
                    border-right: 1px solid #e6e3e3;
                  "
                  :disabled="commite"
                  @click="fileUploading"
                  >确定</el-button
                >
                <el-button
                  type="text"
                  style="
                    width: 50%;
                    height: 28px;
                    line-height: 5px;
                    border-radius: 0;
                  "
                  class="bg"
                  :class="{ active: isActive }"
                  :disabled="commite"
                  @click="uploading"
                  >取消</el-button
                >
              </div>
            </div>

            <!-- <div v-if="fileChange">
        <div class="time">请求发送简历已发送</div>
      </div> -->
          </div>
          <div
            v-if="filetrue"
            style="
              width: 108%;
              height: 50px;
              text-align: center;
              line-height: 70px;
              color: #7e7a7a;
              font-size: 13px;
            "
          >
            {{ titleText }}
          </div>
        </div>
      </div>
      <div v-if="data.css === 'right' && data.messageName === 'TextMessage'">
        <div v-if="phoneSum">
          <div v-if="monthDay" class="time">{{ month }} {{ data.time }}</div>
          <div class="message right">
            <div>
              <!-- <span v-if="images"
              ><img
                :src="picture"
                alt=""
                style="width: 80px; height: 80px"
                @click="imageSmall(picture)"
            /></span> -->
              <span class="textarea" v-html="text"></span>
            </div>
            <!-- <div v-if="phoneState" class="message">
            <div
              style="
                height: 50px;
                background-color: #fff;
                width: 250px;
                border: 1px solid #e6e3e3;
                border-radius: 10px;
                font-size: 14px;
                line-height: 50px;
                padding-left: 20px;
              "
            >
              <div style="display: flex">
                <div style="margin-right: 20px">
                  <div>王老三</div>
                </div>
                <div style="color: rgb(56, 182, 255)">
                  {{ data.txt }}
                </div>
              </div>
            </div>
          </div> -->

            <el-avatar size="small" :src="data.headImg"></el-avatar>
          </div>
        </div>

        <!-- <div v-if="fileChange">
        <div class="time">请求发送简历已发送</div>
      </div> -->
      </div>
      <div v-if="data.css === 'right' && data.messageName === 'ImageMessage'">
        <div v-if="phoneSum">
          <div v-if="monthDay" class="time">{{ month }} {{ data.time }}</div>
          <div class="message right">
            <div>
              <span
                ><img
                  :src="data.imageUri"
                  alt=""
                  style="width: 80px; height: 80px"
                  @click="imageSmall(data.imageUri)"
              /></span>
            </div>

            <el-avatar size="small" :src="data.headImg"></el-avatar>
          </div>
        </div>

        <!-- <div v-if="fileChange">
        <div class="time">请求发送简历已发送</div>
      </div> -->
      </div>

      <el-dialog
        title=""
        :visible.sync="dialogVisible"
        width="50%"
        height="30%"
        :before-close="dialogBeforeClose"
      >
        <div>
          <img :src="img" alt="" style="width: 100%" />
        </div>
        <div slot="footer"></div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { filterAsyncRoutes } from '@/store/modules/permission'
import { number } from 'echarts/lib/export'
import { getList } from '@/api/my/safety'
import { getChatingId } from '@/api/my/job'
export default {
  emojiToHtml: function (message) {
    return RongIMLib.RongIMEmoji.emojiToHTML(message)
  },
  props: {
    data: {
      type: Object
    },
    index: {
      type: Number
    },
    phones: {
      type: String
    },
    phoneState: {
      type: Boolean
    },
    status: {
      type: Boolean
    },
    filetrue: {
      type: Boolean
    },
    name: {
      type: String
    }

  },
  data () {
    return {
      resumeVisible: true,
      phoneVisible: false,
      // fileTrue: false,
      ak: 'ZrI2HTuyRbAXHDuci4xowYtUOepEzMmK',
      center: { lng: 0, lat: 0 },
      zoom: 0,
      baiMap: false,
      dialogVisible: false,
      img: '',
      images: false,
      picture: '',
      text: '',
      time: '',
      all: 0,
      month: '',
      newDay: '',
      lastDay: '',
      monthDay: true,
      phone: true,
      phoneSum: true,
      texts: false,
      phoneSums: false,
      information: true,
      portrait: '',
      is_commite: false,
      isActive: false,
      fileChange: false,
      discourse: '',
      commite: false,
      fileTest: '',
      map: null,
      link: '',
      titleText: ''

    }
  },

  watch: {
    data: {
      handler (newVal, oldVal) {
        // this.list()
        // for (var i = 1; i <= newVal.length; i++) {
        //   var msg = 'https://znzz.tech/loc/'
        //   console.log('data13`3', newVal[i].txt.slice(0, 22))
        //   // this.data[i].txt = RongIMLib.RongIMEmoji.symbolToHTML(this.data[i].txt)
        // }
        // console.log('new', newVal)
      },
      immediate: true,
      deep: true
    }

  },
  created () {
    this.list()
  },
  mounted () {
    // this.list()
    // console.log('this.data', this.data)
  },
  methods: {
    mapBaiTest () {
      console.log('点击了')
    },
    // 地图
    handler () {
      // console.log(BMap, map)
      this.center.lng = this.data.longitude
      this.center.lat = this.data.latitude
      this.zoom = 15
    },
    list () {
      // 判断地图
      this.map = typeof (this.data.txt)
      // console.log(map)
      if (this.data.TextMessage === 'LocationMessage') {
        this.handler()
        this.link = `http://api.map.baidu.com/marker?location=${this.data.latitude},${this.data.longitude}&title=${this.data.poi}&content=${this.data.poi}&output=html`
        // this.texts = false
        // this.baiMap = true
        console.log('地图你看你看', this.link)

        // this.texts = false
        // this.baiMap = true
        this.center.lng = this.data.longitude
        this.center.lat = this.data.latitude
      }

      // if (this.data.headImg === undefined || this.data.headImg === null) {
      //   this.data.headImg = this.$store.state.num.list.avatar
      // }
      // 判断是否是图片
      var msg = 'https://znzz.tech/loc/static/img/'

      if (this.map !== 'object' && this.data.txt !== undefined) {
        var num = this.data.txt.slice(0, 33)
      }
      console.log('num', num)

      if (this.map !== 'object' && msg === num) {
        console.log(123124)
        this.texts = false
        this.images = true
        this.baiMap = false

        this.picture = this.data.txt

        console.log(this.picture)
        // this.images = true
      } else {
        this.images = false
        this.texts = true
        this.text = this.data.txt
        this.baiMap = false
        console.log(777, this.text)
        // this.images = false
      }
      // var file = 'https://znzz.tech/loc/static/files/'
      // if (this.map !== 'object' && this.data.txt !== undefined) {
      //   var files = this.data.txt.slice(0, 35)
      // }
      // console.log('file', file)

      // if (files === file) {
      //   console.log(123124)
      //   this.fileTest = this.data.txt
      //   this.phoneSum = false
      //   this.fileChange = true
      //   this.discourse = '发送简历请求已发送'
      //   this.phoneSums = true
      //   this.information = false
      //   // this.texts = false
      //   // this.images = true

      //   // this.picture = this.data.txt

      //   // console.log(this.picture)
      //   // this.images = true
      // } else {
      //   this.phoneSum = true
      //   this.fileChange = false
      //   this.information = true
      //   // this.images = false
      //   // this.texts = true
      //   // this.text = this.data.txt
      //   // console.log(777)
      //   // this.images = false
      // }

      // console.log('123', num, this.data.txt)
      const time = this.data.time + ''
      // const all = 0
      // const reg = /^1[3456789]\d{9}$/
      // var reset = false
      // if (!reg.test(this.data.txt)) {
      //   reset = false
      // } else {
      //   reset = true
      // }
      // 判断是否是第一次发送
      // if (!reset) {
      //   console.log('2134')
      //   this.phoneSum = true
      //   this.phone = true
      // }

      // if (reset === true) {
      //   if (this.data.css === 'right' && this.phoneState === false && this.status === true) {
      //     this.phoneSum = false
      //     this.discourse = '请求交换电话已发送'
      //     // this.phone = true
      //   } else {
      //     this.phoneSum = true
      //     // this.phone = false
      //   }
      //   if (this.data.css === 'left' && this.phoneState === false && this.status === false) {
      //     this.phoneSums = true
      //   } else {
      //     this.phoneSums = false
      //   }
      // }
      // if (this.data.css === 'right' && this.data.txt !== '') {
      //   console.log('hahhah')
      //   this.phoneSum = false
      // } else {
      //   console.log('sssss')
      //   this.phoneSum = true
      //   // this.phoneSums = true
      //   // this.information = true
      // }

      // const reg = /^1[3456789]\d{9}$/
      // var reset = false
      // if (!reg.test(this.data.phone)) {
      //   reset = false
      // } else {
      //   reset = true
      // }

      // if (this.data.css === 'left' && reset === true && this.data.txt === '') {
      //   console.log('hahhah')
      //   this.phoneSums = true
      //   this.information = true
      // } else {
      //   console.log('sssss')

      //   this.phoneSums = true
      //   this.information = false
      // }
      // var str = this.firsttime.split(':').join('')
      // const str2 = this.data.time.split(':').join('')
      // console.log('str', str)
      // const lastTime = str - 30
      // const newTime = str + 1
      // var newTime2 = Number(str) + 30
      // this.times = setInterval(() => {
      //   setTimeout(() => {
      //     newTime2 = newTime2 + 30
      //     console.log('str12', newTime2, str2)
      //   }, 0)
      // }, 1800000)
      // console.log('str12', newTime2, str2)
      // if (this.index !== 0) {
      //   if (str2 < newTime2) {
      //     this.monthDay = false
      //     console.log('在时间范围内')
      //   } else if (str2 === newTime2) {
      //     this.monthDay = true
      //     console.log('不在时间范围')
      //   } else if (str2 > newTime2) {
      //     this.monthDay = true
      //     console.log('不在时间范围')
      //   }
      // }
      for (var i = 1; i <= time.length; i++) {
        // eslint-disable-next-line no-const-assign
        console.log(typeof (time))
        this.all += 1
      }
      console.log('all', this.all)
      if (this.all > 5) {
        const addZero = function (num) {
          if (parseInt(num) < 10) {
            num = '0' + num
          }
          return num
        }

        var oDate = new Date(this.data.time)
        var oYear = oDate.getFullYear()
        var oMonth = oDate.getMonth() + 1
        var oDay = oDate.getDate()
        var oHour = oDate.getHours()
        var oMin = oDate.getMinutes()
        var oSen = oDate.getSeconds()
        var oTime = oYear + '-' + addZero(oMonth) + '-' + addZero(oDay) + ' ' + addZero(oHour) + ':' +
          addZero(oMin) + ':' + addZero(oSen)
        console.log('oTime', oTime)
        this.data.time = addZero(oHour) + ':' +
          addZero(oMin)

        // var nums = this.data.txt.slice(0, 22)

        // console.log('123', nums, this.data.txt)
        // const time = this.data.time + ''
        // const all = 0
        const str = this.data.time.split(':').join('')
        console.log('str', str)
        // const lastTime = str - 30
        // const newTime = str + 30
        const newTime2 = Number(str) + 1
        if (this.index !== 0) {
          if (str < newTime2) {
            console.log('this.index', this.index)
            this.monthDay = false
            // this.data.time = ''
          } else {
            this.monthDay = true
          }
        }
        const sum = oYear + '-' + addZero(oMonth) + '-' + addZero(oDay)
        const wk = new Date(sum)
        const weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
        const week = wk.getDay()
        const num = weeks[week]
        // 现在日期
        const myDate = new Date()
        const wks = myDate.getDay()
        const wek = weeks[wks]
        // 系统获取周几
        this.newDay = week
        // 现在周几
        this.lastDay = wks
        console.log('week', num)
        // 判断星期几
        if (this.lastDay === this.newDay) {
          console.log('2143142')
          // this.month = num
        }
        // 等于0
        if (this.lastDay === 0 && this.newDay === 6) {
          this.month = '昨天'
        }
        if (this.lastDay === 0 && this.newDay === 5) {
          this.month = num
        }
        if (this.lastDay === 0 && this.newDay === 4) {
          this.month = num
        }
        if (this.lastDay === 0 && this.newDay === 3) {
          this.month = sum
        }
        // 等于1
        if (this.lastDay === 1 && this.newDay === 0) {
          this.month = '昨天'
        }
        if (this.lastDay === 1 && this.newDay === 6) {
          this.month = num
        }
        if (this.lastDay === 1 && this.newDay === 5) {
          this.month = num
        }
        if (this.lastDay === 1 && this.newDay === 4) {
          this.month = sum
        }
        // 等于2
        if (this.lastDay === 2 && this.newDay === 1) {
          this.month = '昨天'
        }
        if (this.lastDay === 2 && this.newDay === 0) {
          this.month = num
        }
        if (this.lastDay === 2 && this.newDay === 6) {
          this.month = num
        }
        if (this.lastDay === 2 && this.newDay === 5) {
          this.month = sum
        }
        // 等于3
        if (this.lastDay === 3 && this.newDay === 2) {
          this.month = '昨天'
        }
        if (this.lastDay === 3 && this.newDay === 1) {
          this.month = num
        }
        if (this.lastDay === 3 && this.newDay === 0) {
          this.month = num
        }
        if (this.lastDay === 3 && this.newDay === 6) {
          this.month = sum
        }
        // 等于4
        if (this.lastDay === 4 && this.newDay === 3) {
          this.month = '昨天'
        }
        if (this.lastDay === 4 && this.newDay === 2) {
          this.month = num
        }
        if (this.lastDay === 4 && this.newDay === 1) {
          this.month = num
        }
        if (this.lastDay === 4 && this.newDay === 0) {
          this.month = sum
        }
        // 等于5
        if (this.lastDay === 5 && this.newDay === 4) {
          this.month = '昨天'
        }
        if (this.lastDay === 5 && this.newDay === 3) {
          this.month = num
        }
        if (this.lastDay === 5 && this.newDay === 2) {
          this.month = num
        }
        if (this.lastDay === 5 && this.newDay === 1) {
          this.month = sum
        }
        // 等于6
        if (this.lastDay === 6 && this.newDay === 5) {
          this.month = '昨天'
        }
        if (this.lastDay === 6 && this.newDay === 4) {
          this.month = num
        }
        if (this.lastDay === 6 && this.newDay === 3) {
          this.month = num
        }
        if (this.lastDay === 6 && this.newDay === 2) {
          this.month = sum
        }
      }
      // this.data.time = this.millisecond(this.data.time)

      // if(data.time)
      // if (this.data) {
      // for (let i = 0; i <= this.data.length; i++) {
      //   console.log('12131')
      // }
      // } else {
      //   console.log('213')
      // }
    },
    dialogBeforeClose () {
      this.dialogVisible = false
    },
    imageSmall (img) {
      console.log('1331', img)
      this.img = img
      this.dialogVisible = true
    },
    resume () {
      const myDate = new Date()
      const wk = myDate.getDay()
      const yy = String(myDate.getFullYear())
      const mm = myDate.getMonth() + 1
      const dd = String(myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate())
      const hou = String(myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours())
      const min = String(myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes())
      const sec = String(myDate.getSeconds() < 10 ? '0' + myDate.getSeconds() : myDate.getSeconds())
      const weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
      const week = weeks[wk]
      this.nowDate = yy + '-' + mm + '-' + dd
      // this.nowTime = hou + ':' + min + ':' + sec
      this.nowTime = hou + ':' + min
      this.nowWeek = week
      console.log('日期', this.nowDate, this.nowTime, this.nowWeek)
    },
    // 交换电话确定
    async ascertain () {
      this.cancel()
      this.phoneSums = false

      this.$emit('again')
      // localStorage.setItem('conditions', true)
      console.log('jahhah')
      const { data } = await getAuthentication()

      console.log('安全中心', data)
      if (data.data.phone_number === '' || data.data.phone_number === null) {
        this.$message.success('未绑定手机号，去绑定吧')
      } else {
        localStorage.setItem('phone2', data.data.phone_number)
        this.resume()
        const _this = this
        // _this.answer = JSON.parse(localStorage.getItem('answer')) // 消息列表
        _this.answer = this.$store.state.num.answer // 消息列表
        _this.memberInfo = this.$store.state.num.memberInfo // 用户信息
        _this.targetId = this.$store.state.num.targetId// 目标ID
        var msg = new RongIMLib.TextMessage({ content: data.data.phone_number, extra: _this.memberInfo.img })
        console.log('msg', msg)
        var conversationType = RongIMLib.ConversationType.PRIVATE // 单聊, 其他会话选择相应的消息类型即可
        var targetId = _this.targetId // 目标 Id
        RongIMClient.getInstance().sendMessage(conversationType, targetId, msg, {
          onSuccess: function (message) {
            console.log('message', message)
            // message 为发送的消息对象并且包含服务器返回的消息唯一 Id 和发送消息时间戳
            const say = {
              css: 'right',
              txt: message.content.content,
              headImg: _this.memberInfo.img,
              time: _this.nowTime

              // condition: 'false'

            }
            console.log('_this.memberInfo', say, message.content.content)
            _this.answer.push(say)
            // _this.$store.commit('SET_ANSWER', _this.answer)
            // localStorage.setItem('answer', JSON.stringify(_this.answer))
            // _this.$store.commit('SET_ANSWER', _this.answer)
            console.log('  _this.answer', _this.answer, _this.$store.state.num.answer)
            _this.image = ''
            _this.say = ''
          },
          onError: function (errorCode, message) {
            var info = ''
            switch (errorCode) {
              case RongIMLib.ErrorCode.TIMEOUT:
                info = '超时'
                break
              case RongIMLib.ErrorCode.UNKNOWN:
                info = '未知错误'
                break
              case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
                info = '在黑名单中，无法向对方发送消息'
                break
              case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
                info = '不在讨论组中'
                break
              case RongIMLib.ErrorCode.NOT_IN_GROUP:
                info = '不在群组中'
                break
              case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
                info = '不在聊天室中'
                break
            }
            console.log('发送失败: ' + info + errorCode)
            this.$message.warning('发送失败，刷新下页面吧')
          }
        })

        // this.padlock()
      }
    },
    // 取消
    cancel () {
      this.$emit('resetChange')
      this.is_commite = true
      this.isActive = true
      this.$emit('again')
      // 刷新页面
      // this.$router.go(0)
      // localStorage.setItem('conditions', true)
    },
    // 确定接受简历
    fileUploading () {
      this.uploading()
      // this.fileTrue = true
      // this.$emit('file')
      if (this.data.imageUri) {
        this.phoneVisible = true
        this.resumeVisible = false
        this.$emit('file', true)
        this.titleText = '提示：手机号已发送至hr'
      } else {
        this.$emit('file', false)
         this.phoneVisible = false
        this.resumeVisible = false
        this.titleText = '提示：简历已发送至hr的邮箱'
      }
      // document.body.removeChild(downloadLink)
    },
    uploading () {
      this.commite = true
      this.isActive = true
    }

  }
}
</script>

<style lang="scss" scoped>
// @import '~@/scss/utils';
.message {
  display: flex;
  align-items: center;
  padding: 20px 10px 0px;
}

.left {
  justify-content: flex-start;
  span {
    margin-left: 7px;
  }
}

.right {
  justify-content: flex-end;
  span {
    margin-right: 7px;
  }
}
::v-deep .el-avatar--small {
  width: 40px;
  height: 40px;
}
.textarea {
  display: block;
  background-color: #1890ff;
  padding: 13px;
  border-radius: 10px;
  max-width: 400px;
  color: #fff;
}
.text {
  display: block;
  background-color: #549de1;
  padding: 12px;
  border-radius: 10px;
  max-width: 400px;
  color: #fff;
}
.time {
  width: 107%;
  height: 20px;
  text-align: center;
  margin-top: 25px;
  color: #8a8a8a;
  font-size: 12px;
}
.bg {
  color: black;
}
.active {
  color: rgb(194, 198, 206);
}
.map {
  width: 300px;
  height: 200px;
  // margin-bottom: 30px;
}
</style>

