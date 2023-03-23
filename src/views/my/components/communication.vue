<template>
  <div class="max" style="height: 100%">
    <div class="interview">互动消息</div>
    <div style="background-color: rgb(244, 246, 249)">
      <el-row>
        <el-col :span="2"
          ><div
            class="grid-content bg-purple"
            :class="{ bt: changeColor === 1 }"
            @click="helloChange"
          >
            新招呼
          </div></el-col
        >
        <el-col :span="2"
          ><div
            class="grid-content bg-purple"
            :class="{ bt: changeColor === 2 }"
            @click="haveIntentionTo"
          >
            未回复
          </div></el-col
        >
        <el-col :span="2"
          ><div
            class="grid-content bg-purple"
            :class="{ bt: changeColor === 3 }"
            @click="inCommunicationC"
          >
            沟通中
          </div></el-col
        >
        <el-col :span="2"
          ><div
            class="grid-content bg-purple"
            :class="{ bt: changeColor === 4 }"
            @click="posted"
          >
            已约面
          </div></el-col
        >

        <el-col :span="2"
          ><div
            class="grid-content bg-purple"
            :class="{ bt: changeColor === 5 }"
            @click="inappropriate"
          >
            不合适
          </div></el-col
        >
      </el-row>
    </div>
    <div class="num">
      <div class="left">
        <div style="display: flex">
          <div style="width: 85%">
            <el-select v-model="text" placeholder="全部职位" style="width: 98%">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div>
            <el-button
              icon="el-icon-search"
              style="height: 33px; width: 35px; padding: 3px 0px 0px 3px"
            ></el-button>
          </div>
        </div>
        <div class="state">
          <div style="width: 85%; margin-top: 12px">
            <el-radio
              v-model="radio"
              label="1"
              @click.native.prevent="radioClick(radio)"
              >未读</el-radio
            >
          </div>
          <el-button type="text" @click="batch">批量</el-button>
        </div>
        <div class="innerbox" style="" :class="{ tall: !show }">
          <div v-if="show">
            <ul>
              <li v-for="item in list" :key="item.id">
                <el-checkbox
                  v-model="item.checked"
                  style="display: flex; align-items: center"
                >
                  <div
                    class="box"
                    :class="{ bg: count === item.id }"
                    @click="tinct(item.id)"
                  >
                    <div class="img">
                      <img
                        :src="item.img"
                        alt=""
                        style="width: 40px; height: 40px; border-radius: 100px"
                      />
                      <div class="texte">{{ item.text }}</div>
                    </div>

                    <div style="padding-left: 10px; font-size: 13px">
                      <div>
                        <span style="padding-right: 10px">{{ item.name }}</span
                        ><span>{{ item.job }}</span>
                      </div>
                      <div style="margin-top: 3px">{{ item.content }}</div>
                    </div>
                  </div>
                </el-checkbox>
              </li>
            </ul>
          </div>
          <div v-if="!show" style="margin-bottom: 30px">
            <div
              v-for="item in list"
              :key="item.id"
              class="box"
              style="width: 280px"
              :class="{ bg: count === item.id }"
              @click="tinct(item.id)"
            >
              <div class="img">
                <img
                  :src="item.img"
                  alt=""
                  style="width: 40px; height: 40px; border-radius: 100px"
                />
                <div class="texte">{{ item.text }}</div>
              </div>

              <div style="padding-left: 10px; font-size: 13px">
                <div>
                  <span style="padding-right: 10px">{{ item.name }}</span
                  ><span>{{ item.job }}</span>
                </div>
                <div style="margin-top: 3px">{{ item.content }}</div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="show" class="footer" style="display: flex">
          <div style="margin-top: 10px; width: 200px">
            <el-checkbox v-model="checkAll" @change="handleCheckedCitiesChange"
              >全选</el-checkbox
            >
          </div>
          <div>
            <!-- color: rgb(96, 98, 102) -->
            <el-button type="text" style="">删除</el-button>
            <el-button
              type="text"
              style="color: rgb(96, 98, 102)"
              @click="abrogate"
              >取消</el-button
            >
          </div>
        </div>
      </div>
      <div class="right">
        <div class="header" style="position: relative; width: 100%">
          <div style="width: 80%">
            <div>
              <span style="margin-right: 10px; font-size: 17px">韩磊</span>
              <Item icon="nan" style="width: 0.8em" />
              <span style="margin-left: 10px; color: rgb(254, 135, 110)"
                >刚刚活跃</span
              >
            </div>
            <div style="margin-top: 12px">
              <span class="age" style="padding-left: 0px">22岁</span>
              <span class="age">23年应届生</span>
              <span class="age">本科</span>
              <span class="age" style="border: 0; color: rgb(15, 171, 172)"
                >背景调查</span
              >
            </div>
          </div>
          <div style="margin-top: 17px; width: 30%">
            <el-button class="Btn" icon="el-icon-document">在线简历</el-button>
            <el-button
              class="Btn"
              style="background-color: rgb(115, 131, 255)"
              icon="el-icon-paperclip"
              >附件简历</el-button
            >
          </div>
        </div>
        <!-- <div v-if="openDown" style="background-color: pink;position:relative">123</div> -->
        <!-- <div v-if="openDown" style="margin: 15px 17px; font-size: 13px">
          <div style="margin-bottom: 5px">
            <Item icon="点" style="font-size: 15px" />
            <span style="color: rgb(163 149 149); margin-right: 20px">
              2022.11-2022.12</span
            >
            <span style="margin-right: 30px">唯捷创芯精测科技·财务实习生</span>
            <span
              >沟通职位:
              <span style="color: rgb(15, 171, 172); margin-right: 10px"
                >出纳</span
              ></span
            >
            <i class="el-icon-refresh" style="color: rgb(15, 171, 172)"></i>
          </div>
          <div style="margin-bottom: 5px">
            <Item icon="点" style="font-size: 15px" />
            <span style="color: rgb(163 149 149); margin-right: 20px">
              2022.11-2022.12</span
            >
            <span style="margin-right: 30px">唯捷创芯精测科技·财务实习生</span>
            <span
              >期望:
              <span style="color: rgb(15, 171, 172); margin-right: 10px"
                >北京 · 会计</span
              ></span
            >
            <span style="color: red">3-12k</span>
          </div>
          <div>
            <Item icon="点" style="font-size: 15px" />
            <span style="color: rgb(163 149 149); margin-right: 20px">
              2022.11-2022.12</span
            >
            <span style="margin-right: 20px">唯捷创芯精测科技·财务实习生</span>
          </div>
        </div> -->
        <div
          style="
            position: absolute;
            top: 100px;
            width: 80%;
            background-color: #fff;
          "
        >
          <div v-if="!openDown" class="icons">
            <i
              class="el-icon-caret-bottom"
              style="font-size: 16px; line-height: 12px; transition: 0.3s"
              @click="open"
            ></i>
          </div>
          <div
            v-if="openDown"
            style="
              padding: 15px 17px 0px;
              font-size: 13px;
              width: 100%;
              border-bottom: 1px solid #e6e3e3;
            "
          >
            <div style="margin-bottom: 5px">
              <Item icon="点" style="font-size: 15px" />
              <span style="color: rgb(163 149 149); margin-right: 20px">
                2022.11-2022.12</span
              >
              <span style="margin-right: 30px"
                >唯捷创芯精测科技·财务实习生</span
              >
              <span
                >沟通职位:
                <span style="color: rgb(15, 171, 172); margin-right: 10px"
                  >出纳</span
                ></span
              >
              <i class="el-icon-refresh" style="color: rgb(15, 171, 172)"></i>
            </div>
            <div style="margin-bottom: 5px">
              <Item icon="点" style="font-size: 15px" />
              <span style="color: rgb(163 149 149); margin-right: 20px">
                2022.11-2022.12</span
              >
              <span style="margin-right: 30px"
                >唯捷创芯精测科技·财务实习生</span
              >
              <span
                >期望:
                <span style="color: rgb(15, 171, 172); margin-right: 10px"
                  >北京 · 会计</span
                ></span
              >
              <span style="color: red">3-12k</span>
            </div>
            <div>
              <Item icon="点" style="font-size: 15px" />
              <span style="color: rgb(163 149 149); margin-right: 20px">
                2022.11-2022.12</span
              >
              <span style="margin-right: 20px"
                >唯捷创芯精测科技·财务实习生</span
              >
            </div>
            <div class="icons" style="border: 0">
              <i
                class="el-icon-caret-top"
                style="font-size: 16px"
                @click="opens"
              ></i>
            </div>
          </div>
        </div>
        <div>
          <!-- <RongCloud ref="send" /> -->
        </div>
        <div
          style="
            height: 390px;
            border-bottom: 1px solid #e6e3e3;
            overflow-y: auto;
          "
          class="innerboxs"
        >
          <Message
            v-for="(item, index) in answer"
            :key="index"
            :data="item"
            :index="index"
            :firsttime="answer[0].time"
            :phones="phones"
            :phone-state="phoneState"
            @again="again"
          />
        </div>

        <div class="chatIcon">
          <div>
            <div style="display: flex">
              <el-popover
                ref="popoverRef"
                placement="top-start"
                width="400"
                trigger="click"
                class="emoBox"
                style="width: 20px; margin-right: 10px"
              >
                <div class="emotionList">
                  <a
                    v-for="(item, index) in emojList"
                    :key="index"
                    href="javascript:void(0);"
                    rel="external nofollow"
                    class="emotionItem"
                    @click="checkedEmoji(item.symbol, item.emoji)"
                    v-html="item.node.outerHTML"
                  ></a>
                </div>
                <div slot="reference">
                  <Item icon="微笑" style="width: 1.2em" @click="num" />
                </div>
              </el-popover>
              <el-popover
                ref="popovers"
                placement="top-start"
                width="420"
                trigger="click"
                class="emoBoxs"
                style="margin-right: 10px"
              >
                <div class="frequent-expressions">
                  <div class="frequent">常用语</div>
                  <a href="javascript:;">
                    <div
                      v-for="item in expressions"
                      :key="item.id"
                      class="frequent"
                      style="font-size: 15px"
                      @click="expressionsClick(item.text)"
                    >
                      {{ item.text | ellipsis }}
                    </div>
                  </a>
                  <!-- <a
                    v-for="(item, index) in emojList"
                    :key="index"
                    href="javascript:void(0);"
                    rel="external nofollow"
                    class="emotionItem"
                    @click="checkedEmoji(item.symbol, item.emoji)"
                    v-html="item.node.outerHTML"
                  ></a> -->
                </div>
                <div slot="reference">
                  <Item icon="常" style="width: 1.2em" @click="num" />
                </div>
              </el-popover>
              <span style="margin-right: 10px">
                <!-- <Item icon="添加" /> -->
                <el-upload
                  class="upload-demo"
                  action="#"
                  :show-file-list="false"
                  :before-upload="handleInfoPic"
                  :http-request="testUpload"
                  :on-success="uploadSuccess"
                  accept=".png,.jpeg,.jpg"
                >
                  <Item icon="添加" />
                  <!-- <div slot="tip" class="el-upload__tip">
                    只能上传jpg/png文件，且不超过500kb
                  </div> -->
                </el-upload>
              </span>
              <Item icon="地图" style="width: 1.2em" />
              <span style="font-size: 19px; color: #8a8a8a; margin: 3px 8px"
                >|</span
              >
              <a href="javascript:;">
                <span class="block" @click="resumes">
                  <!-- <el-upload
                    class="upload-demo"
                    action="#"
                    :on-preview="handlePreview"
                    multiple
                    :limit="1"
                    :on-exceed="handleExceed"
                    :file-list="numList"
                    accept=".pdf,.doc,.docx"
                    :auto-upload="false"
                  > -->
                  发简历
                  <!-- </el-upload> -->
                </span>
              </a>
              <a href="javascript:;">
                <span
                  class="block"
                  :class="{ small: isBackground }"
                  @click="phoneChange"
                  >换电话</span
                >
              </a>
              <a href="javascript:;">
                <span class="block">换微信</span>
              </a>
              <a href="javascript:;">
                <span class="block"><i class="el-icon-time"></i>约面试</span></a
              >
            </div>
          </div>
          <el-input
            id="textarea"
            v-model="say"
            class="chatText"
            resize="none"
            type="textarea"
            rows="5"
            @keyup.enter.native="sendMessage"
            @input="usernameInput"
          >
          </el-input>
        </div>
        <div style="display: flex">
          <div style="width: 90%"></div>
          <div>
            <el-button
              type="primary"
              style="
                width: 50px;
                height: 23px;
                font-size: 12px;
                padding: 2px 0px 0px 2px;
              "
              :disabled="say === ''"
              @click="sendMessage"
              >发送</el-button
            >
          </div>
        </div>
      </div>
    </div>
    <Safety :visible="visible" @padlock="padlock" @phoneNumber="phoneNumber" />
  </div>
</template>
<script>
import Item from '@/layout/components/Sidebar/Item.vue'
import Message from '@/views/userPost/components/Message.vue'
import { init } from '@/utils/Rongyun.js'
import { getFirm } from '@/api/my/job.js'
import { Sticky } from 'vant'
import { string } from 'clipboard'
import Safety from './communication/dialog.vue'
import { getCv } from '@/api/my/resume'

import { getList } from '@/api/my/safety'
var appData = RongIMLib.RongIMEmoji.list
export default {
  components: { Item, Message, Safety },
  filters: {
    // 超过20位显示 ...
    ellipsis: function (value) {
      if (!value) return ''
      if (value.length > 23) {
        return value.slice(0, 23) + '...'
      }
      return value
    }
  },
  data () {
    return {
      isBackground: false,
      numList: '',
      visible: false,
      // 上传
      images: true,
      fileList: [],
      // 常用语
      expressions: [
        {
          id: 1,
          text: '我可以去贵公司面试吗?'
        },
        {
          id: 2,
          text: '对不起，我觉得该职位不太适合我，祝您早日找到满意的工作?'
        },
        {
          id: 3,
          text: '大佬你好，我想应聘这个岗位，可以看下我的在线简历吗'
        },
        {
          id: 4,
          text: '我可以把我的简历发给您看看吗?'
        }
      ],
      emojList: [],
      appkey: 'x18ywvqfxzbbc', // 这是我们之前保存的 appkey *重要
      // token: 'LfWddfqXjPDAC0wBYe7EXs46VaBqkAqrId2b4bcqU5I=@dl0v.cn.rongnav.com;dl0v.cn.rongcfg.com', // token 可以多次生成 之前也有介绍过
      token: 'kMZsHnaWejrAC0wBYe7EXlRo5VWDg4aBId2b4bcqU5I=@dl0v.cn.rongnav.com;dl0v.cn.rongcfg.com',
      faceList: [],
      textarea: '',
      graph: 'el-icon-caret-bottom',
      openDown: false,
      checkAll: '',
      count: '',
      show: false,
      changeColor: 1,
      ematy: true,
      text: '',
      radio: '0',
      remove: [],
      options: [{
        value: '1',
        label: '前端'
      }, {
        value: '2',
        label: 'java'
      }, {
        value: '3',
        label: '招聘主管'
      }, {
        value: '4',
        label: '招聘经理'
      }, {
        value: '5',
        label: '人事'
      }],
      list: [
        {
          id: 1,
          img: 'https://znzz.tech/loc/static/img/1 (2)_30e4b8e4.jpg',
          name: '韩磊',
          job: '出纳',
          content: '面试地点我可以接受',
          text: 1,
          checked: ''

        },
        {
          id: 2,
          img: 'https://img2.baidu.com/it/u=3618236253,1028428296&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
          name: '晓梅',
          job: '出纳',
          content: '面试地点我可以接受',
          text: 2,
          checked: ''
        },
        {
          id: 3,
          img: 'https://img2.baidu.com/it/u=1035356506,3713698341&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
          name: '张雅诗',
          job: '出纳',
          content: '面试地点我可以接受',
          text: 3,
          checked: ''
        },
        {
          id: 4,
          img: 'https://img2.baidu.com/it/u=2015865969,3401990894&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=546',
          name: '张萌',
          job: '出纳',
          content: '面试地点我可以接受',
          text: 4,
          checked: ''
        },
        {
          id: 5,
          img: 'https://img0.baidu.com/it/u=2514336285,1350279655&fm=253&fmt=auto&app=138&f=JPEG?w=501&h=500',
          name: '吴媛媛',
          job: '出纳',
          content: '面试地点我可以接受',
          text: 5,
          checked: ''

        },
        {
          id: 6,
          img: 'https://img0.baidu.com/it/u=2514336285,1350279655&fm=253&fmt=auto&app=138&f=JPEG?w=501&h=500',
          name: '媛媛',
          job: '出纳',
          content: '面试地点我可以接受',
          text: 5,
          checked: ''

        },
        {
          id: 7,
          img: 'https://img0.baidu.com/it/u=2514336285,1350279655&fm=253&fmt=auto&app=138&f=JPEG?w=501&h=500',
          name: '吴媛媛',
          job: '出纳',
          content: '面试地点我可以接受',
          text: 5,
          checked: ''

        },
        {
          id: 8,
          img: 'https://img0.baidu.com/it/u=2514336285,1350279655&fm=253&fmt=auto&app=138&f=JPEG?w=501&h=500',
          name: '吴媛媛',
          job: '出纳',
          content: '面试地点我可以接受',
          text: 5,
          checked: ''

        }, {
          id: 9,
          img: 'https://img0.baidu.com/it/u=2514336285,1350279655&fm=253&fmt=auto&app=138&f=JPEG?w=501&h=500',
          name: '吴媛媛',
          job: '出纳',
          content: '面试地点我可以接受',
          text: 5,
          checked: ''

        }, {
          id: 10,
          img: 'https://img0.baidu.com/it/u=2514336285,1350279655&fm=253&fmt=auto&app=138&f=JPEG?w=501&h=500',
          name: '吴媛媛',
          job: '出纳',
          content: '面试地点我可以接受',
          text: 5,
          checked: ''

        }, {
          id: 11,
          img: 'https://img0.baidu.com/it/u=2514336285,1350279655&fm=253&fmt=auto&app=138&f=JPEG?w=501&h=500',
          name: '吴媛媛',
          job: '出纳',
          content: '面试地点我可以接受',
          text: 5,
          checked: ''

        }, {
          id: 12,
          img: 'https://img0.baidu.com/it/u=2514336285,1350279655&fm=253&fmt=auto&app=138&f=JPEG?w=501&h=500',
          name: '吴媛媛',
          job: '出纳',
          content: '面试地点我可以接受',
          text: 5,
          checked: ''

        }, {
          id: 13,
          img: 'https://img0.baidu.com/it/u=2514336285,1350279655&fm=253&fmt=auto&app=138&f=JPEG?w=501&h=500',
          name: '吴媛媛',
          job: '出纳',
          content: '面试地点我可以接受',
          text: 5,
          checked: ''

        }
      ],
      say: '', // 消息
      answer: this.$store.state.num.answer, // 消息列表
      memberInfo: this.$store.state.num.memberInfo, // 用户信息
      targetId: this.$store.state.num.targetId,
      image: '', // 目标ID
      nowDate: '',
      nowTime: '',
      nowWeek: '',
      phones: '',
      phoneState: false

    }
  },
  computed: {

  },
  mounted () {
    // for (const i in appData) {
    //   console.log('appData', appData)
    //   this.emojList.push(appData[i].char)
    // }
  },

  created () {
    // this.sendMessage()
    this.emojList = appData
    // this.resume()
  },
  methods: {
    // 上传简历

    async resumes () {
      const res1 = await getCv()
      console.log('文件地址', res1, this.fileList1)
      if (res1.data.path !== null && res1.data.name !== null) {
        this.numList = `https://znzz.tech/loc/${res1.data.path}`
        this.sam(this.numList)
      } else {
        this.$message.success('没有上传的简历，去上传吧')
      }
      console.log(this.numList)
    },
    again () {
      this.phoneState = true
      // this.phoneNumber()
      console.log('nkjno', this.phoneState)

      // this.resume()
      // const _this = this
      // // _this.answer = JSON.parse(localStorage.getItem('answer')) // 消息列表
      // _this.answer = this.$store.state.num.answer // 消息列表
      // _this.memberInfo = this.$store.state.num.memberInfo // 用户信息
      // _this.targetId = this.$store.state.num.targetId// 目标ID
      // var msg = new RongIMLib.TextMessage({ content: _this.phone, extra: _this.memberInfo.avatar })
      // console.log('msg', msg)
      // var conversationType = RongIMLib.ConversationType.PRIVATE // 单聊, 其他会话选择相应的消息类型即可
      // var targetId = this.targetId // 目标 Id
      // RongIMClient.getInstance().sendMessage(conversationType, targetId, msg, {
      //   onSuccess: function (message) {
      //     console.log('message', message)
      //     // message 为发送的消息对象并且包含服务器返回的消息唯一 Id 和发送消息时间戳
      //     const say = {
      //       css: 'left',
      //       txt: _this.phone,
      //       headImg: _this.memberInfo.avatar,
      //       time: _this.nowTime

      //       // condition: 'false'

      //     }
      //     console.log('_this.memberInfo', say, message.content.content)
      //     _this.answer.push(say)
      //     // _this.$store.commit('SET_ANSWER', _this.answer)
      //     // localStorage.setItem('answer', JSON.stringify(_this.answer))
      //     // _this.$store.commit('SET_ANSWER', _this.answer)
      //     console.log('  _this.answer', _this.answer, _this.$store.state.num.answer)
      //     _this.image = ''
      //     _this.say = ''
      //   },
      //   onError: function (errorCode, message) {
      //     var info = ''
      //     switch (errorCode) {
      //       case RongIMLib.ErrorCode.TIMEOUT:
      //         info = '超时'
      //         break
      //       case RongIMLib.ErrorCode.UNKNOWN:
      //         info = '未知错误'
      //         break
      //       case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
      //         info = '在黑名单中，无法向对方发送消息'
      //         break
      //       case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
      //         info = '不在讨论组中'
      //         break
      //       case RongIMLib.ErrorCode.NOT_IN_GROUP:
      //         info = '不在群组中'
      //         break
      //       case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
      //         info = '不在聊天室中'
      //         break
      //     }
      //     console.log('发送失败: ' + info + errorCode)
      //   }
      // })
    },
    // 交换电话
    phoneChange () {
      this.visible = true
      // const salary = localStorage.getItem('phone')
      // console.log('salary', salary)
      // if (salary) {
      //   this.isBackground = true
      //   this.visible = false
      //   this.$message.success('已发送过此请求')
      // } else {
      //   this.visible = true
      // }
    },
    // 取消发送
    padlock () {
      this.visible = false
    },
    // 确定发送
    async phoneNumber () {
      const { data } = await getList()

      console.log('安全中心', data)
      if (data.phone === '' || data.phone === null) {
        this.$message.success('未绑定手机号，去绑定吧')
      } else {
        // this.resume()
        this.phoneState = false
        this.phones = data.phone
        localStorage.setItem('phone', data.phone)

        this.resume()
        const _this = this
        // _this.answer = JSON.parse(localStorage.getItem('answer')) // 消息列表
        _this.answer = this.$store.state.num.answer // 消息列表
        _this.memberInfo = this.$store.state.num.memberInfo // 用户信息
        _this.targetId = this.$store.state.num.targetId// 目标ID
        var msg = new RongIMLib.TextMessage({ content: _this.phones, extra: _this.memberInfo.avatar })
        console.log('msg', msg)
        var conversationType = RongIMLib.ConversationType.PRIVATE // 单聊, 其他会话选择相应的消息类型即可
        var targetId = this.targetId // 目标 Id
        RongIMClient.getInstance().sendMessage(conversationType, targetId, msg, {
          onSuccess: function (message) {
            console.log('message', message)
            // message 为发送的消息对象并且包含服务器返回的消息唯一 Id 和发送消息时间戳
            const say = {
              css: 'right',
              txt: message.content.content,
              headImg: _this.memberInfo.avatar,
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
          }
        })
        this.padlock()
        // this.isBackground = true
      }
    },
    // 时间
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
    // 上传
    handleInfoPic (file) {
      console.log(file)
      const isJPG = file.type === 'image/jpeg'
      const isJPG2 = file.type === 'image/jpg'
      const isPNG = file.type === 'image/png'
      if (!isJPG && !isJPG2 && !isPNG) this.$message.error('请上传格式为 png, jpg, jpeg 的图片！')
      return isJPG || isJPG2 || isPNG
    },
    async testUpload (file) {
      var formData = new FormData()
      formData.append('image', file.file)
      const res = await getFirm(formData)
      console.log('res', res)
      if (res.code === 200) {
        this.phoneState = false
        this.image = 'https://znzz.tech/loc/' + res.data.data.image
        console.log('this.say', this.say, this.image)
        this.images = false
        this.resume()
        const _this = this
        // _this.answer = JSON.parse(localStorage.getItem('answer')) // 消息列表
        _this.answer = this.$store.state.num.answer // 消息列表
        _this.memberInfo = this.$store.state.num.memberInfo // 用户信息
        _this.targetId = this.$store.state.num.targetId// 目标ID
        var msg = new RongIMLib.TextMessage({ content: _this.image, extra: _this.memberInfo.avatar })
        var conversationType = RongIMLib.ConversationType.PRIVATE // 单聊, 其他会话选择相应的消息类型即可
        var targetId = this.targetId // 目标 Id
        RongIMClient.getInstance().sendMessage(conversationType, targetId, msg, {
          onSuccess: function (message) {
            // message 为发送的消息对象并且包含服务器返回的消息唯一 Id 和发送消息时间戳
            const say = {
              css: 'right',
              txt: message.content.content,
              headImg: _this.memberInfo.avatar,
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
          }
        })
      } else {
        this.message.error(res.data.msg)
      }
    },
    uploadSuccess (res, file, fileList) {
      console.log(res, file, fileList)
      this.image = URL.createObjectURL(file.raw)
    },
    // 常用语
    expressionsClick (text) {
      console.log('text', text)
      this.say = text

      this.sendMessage()
      this.$refs.popovers.doClose()
    },
    usernameInput (val) {
      console.log('val', val)
    },
    // 消息
    onClickLeft () {
      this.$router.go(-1)
    },
    addPromptInfo (prompt, userId = null) {
      const _this = this

      // const avatarList = [
      //   'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4100987808,2324741924&fm=26&gp=0.jpg',
      //   'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2988245209,2476612762&fm=26&gp=0.jpg',
      //   'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4259300811,497831842&fm=26&gp=0.jpg',
      //   'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3684587473,1286660191&fm=26&gp=0.jpg',
      //   'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2884107401,3797902000&fm=26&gp=0.jpg'
      // ]

      // 真实环境是通过登录 后台接口返回的 token 拿到的用户信息  我在这为为了模拟 所以给初始化后的用户随机生成一个头像
      // const avatar = avatarList[Math.floor(Math.random() * (3 + 1))]
      const avatar = 'https://znzz.tech/loc/static/img/1 (2)_30e4b8e4.jpg'
      _this.showDatas.push(prompt)
      const timer = setInterval(() => {
        if (userId) {
          clearInterval(timer) // 路由跳转后销毁定时器
          _this.$store.commit('SET_MEMBER', { // 保存用户信息
            userId: userId,
            avatar: avatar
          })
          _this.$store.commit('SET_TARGETID', _this.targetId)
          // this.$store.commit('SET_ANSWER', _this.showDatas)// 保存目标ID
          _this.states = true
          console.log('_this.$store.state.memberInfo', _this.$store.state.num.memberInfo, userId, _this.showDatas)
          // this.$refs.send.sendMessage()

          this.num()
          // this.$emit('res')

          // _this.$router.push({ name: 'RongCloud' })
        }
      }, 500)
    },
    initRongCloud () {
      var appkey = this.appkey
      var token = this.token
      if (!appkey || !token) {
        alert('appkey 和 token 不能为空')
      } else {
        // 这个init 是我们之前撸的 `utils.js`
        init({
          appkey: appkey,
          token: token
        })
      }
    },
    sendMessage () {
      this.resume()
      this.phoneState = false
      const _this = this
      // _this.initRongCloud()
      // _this.answer = JSON.parse(localStorage.getItem('answer')) // 消息列表
      _this.answer = this.$store.state.num.answer // 消息列表
      _this.memberInfo = this.$store.state.num.memberInfo // 用户信息
      _this.targetId = this.$store.state.num.targetId// 目标ID
      console.log('_this.memberInfo', _this.answer)
      console.log('_this.say', _this.say)
      // var msg = {}
      // if (this.image !== '') {
      //   // _this.say = this.image
      //   // msg = new RongIMLib.TextMessage({ content: _this.image, extra: _this.memberInfo.avatar })
      //   console.log('msg', msg)
      // } else {
      //   msg = new RongIMLib.TextMessage({ content: _this.say, extra: _this.memberInfo.avatar })
      // }
      // _this.say = RongIMLib.RongIMEmoji.symbolToEmoji(_this.say)
      console.log('this.say', _this.say)
      var msg = new RongIMLib.TextMessage({ content: _this.say, extra: _this.memberInfo.avatar })
      var conversationType = RongIMLib.ConversationType.PRIVATE // 单聊, 其他会话选择相应的消息类型即可
      var targetId = this.targetId // 目标 Id
      RongIMClient.getInstance().sendMessage(conversationType, targetId, msg, {
        onSuccess: function (message) {
          // message 为发送的消息对象并且包含服务器返回的消息唯一 Id 和发送消息时间戳
          const say = {
            css: 'right',
            txt: message.content.content,
            headImg: _this.memberInfo.avatar,
            time: _this.nowTime

            // condition: 'false'

          }
          console.log('_this.memberInfo', say, message.content.content)
          _this.answer.push(say)
          localStorage.setItem('answer', JSON.stringify(_this.answer))
          // _this.$store.commit('SET_ANSWER', _this.answer)
          // console.log('  _this.answer', _this.answer, _this.$store.state.num.answer)
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
        }
      })
    },
    sendInfo () {
      console.log(1313)
    },
    getEmo (index) {
      var textArea = document.getElementById('textarea')
      function changeSelectedText (obj, str) {
        if (window.getSelection) {
          // 非IE浏览器
          textArea.setRangeText(str)
          // 在未选中文本的情况下，重新设置光标位置
          textArea.selectionStart += str.length
          textArea.focus()
        } else if (document.selection) {
          // IE浏览器
          obj.focus()
          var sel = document.selection.createRange()
          sel.text = str
        }
      }
      changeSelectedText(textArea, this.faceList[index])
      this.say = textArea.value // 要同步data中的数据
      // console.log(this.faceList[index]);
      return
    },
    checkedEmoji (symbol, item) {
      console.log('this.emojList', symbol)
      // this.stat.sendMsgVal += RongIMLib.RongIMEmoji.symbolToEmoji(symbol) // 表情包需要RongIMLib.RongIMEmoji.symbolToEmoji解析
      // this.emojiShow = false

      const emoji = []
      this.faceList.push(item)
      console.log('this', emoji, this.faceList)
      // this.$refs.popoverRef.doClose()
      this.say = this.say + item
    },
    num () {
      console.log('13u9')
    },
    // 折叠消息
    open () {
      // this.graph = 'el-icon-caret-top'

      this.openDown = true
    },
    opens () {
      this.openDown = false
    },
    // 取消
    abrogate () {
      this.show = false
    },
    // 批量
    batch () {
      this.show = true
    }, // 边框
    tinct (i) {
      console.log('i', i)
      this.count = i
    },
    // 未读
    radioClick (e) {
      console.log('e', e)
      if (e === '1') {
        this.radio = '0'
      } else {
        this.radio = '1'
      }
    },
    helloChange () {
      this.changeColor = 1
      // this.emojList = appData
      console.log('appData', appData)
    },
    haveIntentionTo () {
      this.changeColor = 2
    },
    inCommunicationC () {
      this.changeColor = 3
    },
    posted () {
      this.changeColor = 4
    },
    inappropriate () {
      this.changeColor = 5
    },
    num () {

    },
    // 全选
    handleCheckedCitiesChange () {
      console.log('this.checkAll', this.checkAll)
      if (this.checkAll) {
        this.list.forEach(item => {
          // console.log(item)
          // this.arrList.push(item.enterprise_id)
          // console.log('123', this.arrList)
          item.checked = true // 只改变数据的状态
        })
      } else {
        this.list.forEach(item => {
          item.checked = false
        })
      }
    },
    sam (num) {
      console.log(num)
      this.resume()
      const _this = this
      // _this.answer = JSON.parse(localStorage.getItem('answer')) // 消息列表
      _this.answer = this.$store.state.num.answer // 消息列表
      _this.memberInfo = this.$store.state.num.memberInfo // 用户信息
      _this.targetId = this.$store.state.num.targetId// 目标ID
      var msg = new RongIMLib.TextMessage({ content: num, extra: _this.memberInfo.avatar })
      console.log('msg', msg)
      var conversationType = RongIMLib.ConversationType.PRIVATE // 单聊, 其他会话选择相应的消息类型即可
      var targetId = this.targetId // 目标 Id
      RongIMClient.getInstance().sendMessage(conversationType, targetId, msg, {
        onSuccess: function (message) {
          console.log('message', message)
          // message 为发送的消息对象并且包含服务器返回的消息唯一 Id 和发送消息时间戳
          const say = {
            css: 'right',
            txt: message.content.content,
            headImg: _this.memberInfo.avatar,
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
        }
      })
    }
  }

}

</script>
<style scoped lang="scss">
.interview {
  height: 50px;
  border-bottom: 1px solid #e6e3e3;
  line-height: 50px;
  padding-left: 30px;
  color: #256efd;
  font-weight: 600;
  font-size: 20px;
}
.bt {
  // border-bottom: 2px solid #256efd;
  color: #256efd;
  background-color: #fff;
}
.grid-content {
  // height: 45px;
  // width: 60px;
  line-height: 40px;
  text-align: center;
  font-size: 15px;
  // margin-bottom: 10px;
  // background-color: pink;
}
.max {
  height: 100%;
  overflow: hidden;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
.num {
  width: 100%;
  height: 600px;

  padding-top: 30px;
  position: relative;
  display: flex;
  // background-color: #256efd;
  .footer {
    position: absolute;
    bottom: 0px;
    left: 0;
    // margin-top: 20px;
  }
}
.left {
  width: 25%;
  height: 600px;

  border-right: 1px solid #e6e3e3;
}
.right {
  width: 75%;
  .header {
    width: 100%;
    height: 70px;
    // background-color: pink;
    font-size: 12px;
    padding-left: 20px;
    border-bottom: 1px solid #e6e3e3;
    display: flex;
    .age {
      padding: 0px 10px;
      border-right: 1px solid #e6e3e3;
    }
  }
  .icons {
    // height: 10px;
    // background-color: pink;
    text-align: center;
    // line-height: 30px;
    border-bottom: 1px solid #e6e3e3;
    color: rgb(211, 220, 230);
    // width: 80%;
  }
}
::v-deep .el-input__inner {
  height: 33px;
}
.state {
  // margin-top: 20px;
  display: flex;
}
::v-deep
  .el-radio:focus:not(.is-focus):not(:active):not(.is-disabled)
  .el-radio__inner {
  box-shadow: 0 0 2px 2px #fff;
}
// .num {
//   position: relative;
//   background-color: #256efd;
//   .footer {
//     position: absolute;
//     bottom: 0px;
//     left: 0;
//     // margin-top: 20px;
//   }
// }
.innerbox {
  margin-top: 10px;
  height: 450px;
  overflow-y: auto;

  .box {
    height: 70px;

    // border: 1px solid #256efd;
    // background-color: pink;
    // padding-top: 10px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    width: 265px;
    .img {
      width: 40px;
      height: 40px;
      border-radius: 100px;
      position: relative;
    }
    .text {
      width: 15px;
      height: 15px;
      border-radius: 100px;
      background-color: red;
      position: absolute;
      left: 60px;
      top: 10px;
      text-align: center;
      line-height: 15px;
      color: #fff;
    }
    .texte {
      width: 15px;
      height: 15px;
      border-radius: 100px;
      background-color: red;
      position: absolute;
      left: 30px;
      top: 0px;
      text-align: center;
      line-height: 15px;
      color: #fff;
    }
  }
}

::v-deep .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #606266;
  // color: none;
}
.bg {
  background-color: rgb(240, 242, 245);
}
/*滚动条样式*/
.innerbox::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 0.5px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 0.5px;
}
.innerbox::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgb(244, 246, 249);
  background: rgba(0, 0, 0, 0.2);
}
.innerbox::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}

::v-deep main.el-main.right {
  // overflow: hidden !important;
}
.tall {
  height: 600px;
}
::v-deep svg.svg-icon {
  width: 0.8em;
  // padding: 0px 10px;
}
.Btn {
  height: 35px;
  padding: 8px 2px;
  font-size: 5px;
  // padding-top: 10px;
  background-color: rgb(0, 186, 189);
  color: #fff;
}
.el-popover {
  height: 200px;
  width: 400px;
  overflow: scroll;
  overflow-x: auto;
}
.chatIcon {
  padding: 0 10px;
  font-size: 25px;
}
.emotionList {
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
}
.emotionItem {
  width: 10%;
  font-size: 20px;
  text-align: center;
}
/*包含以下四种的链接*/
.emotionItem {
  text-decoration: none;
}
/*正常的未被访问过的链接*/
.emotionItem:link {
  text-decoration: none;
}
/*已经访问过的链接*/
.emotionItem:visited {
  text-decoration: none;
}
/*鼠标划过(停留)的链接*/
.emotionItem:hover {
  text-decoration: none;
}
/* 正在点击的链接*/
.emotionItem:active {
  text-decoration: none;
}
::v-deep .el-textarea__inner {
  border: none;
  line-height: 1;
}
.innerboxs::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 0.1px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 0.1px;
}
.innerboxs::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgb(244, 246, 249);
  background: rgba(0, 0, 0, 0.2);
}
.innerboxs::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}

.frequent-expressions {
  // background-color: pink;
  .frequent {
    // width: 100px;
    height: 40px;
    // background-color: #256efd;
    font-size: 17px;
    line-height: 40px;
    border-bottom: 1px solid #e6e3e3;
  }
  .frequent:hover {
    color: rgb(0, 186, 189);
  }
}
div#el-popover-700 {
  padding: 0px;
}
::v-deep [data-v-72b21b76] .el-textarea__inner {
  height: 55px;
}
::-webkit-scrollbar {
  width: 2px; /*滚动条宽度*/
  height: 2px; /*滚动条高度*/
}
::v-deep .el-textarea__inner::-webkit-scrollbar-thumb {
  background-color: rgba(168, 168, 168, 0.4); /*滚动条默认显示的颜色*/
}

::v-deep .el-textarea__inner::-webkit-scrollbar {
  width: 2px;
  height: 2px;
  background-color: white; /*滚动条背景色显示的颜色*/
}
.block {
  width: 60px;
  height: 20px;
  // background-color: pink;
  font-size: 11px;
  margin-top: 5px;
  text-align: center;
  line-height: 20px;
  border: 1px solid #d3cccc;
  color: #8a8a8a;
  margin-right: 8px;
  border-radius: 5px;
}
::v-deep .el-upload:focus {
  color: #8a8a8a;
}
.small {
  cursor: not-allowed;
}
</style>

