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
            <!-- <el-radio
              v-model="radio"
              label="1"
              @click.native.prevent="radioClick(radio)"
              >未读</el-radio
            > -->
          </div>
          <!-- <el-button type="text" @click="batch">批量</el-button> -->
        </div>
        <div class="innerbox" style="" :class="{ tall: !show }">
          <!-- <div v-if="show">
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
          </div> -->
          <div v-if="show" class="textnum">暂无30天内联系人</div>
          <div v-if="!show" style="margin-bottom: 30px">
            <div
              v-for="item in list"
              :key="item.id"
              class="box"
              style="width: 305px"
              :class="{ bg: count === item.id }"
              @click="
                tinct(item.id, item.candidate_info.uid, item.hr_info.uid, item)
              "
            >
              <div class="img">
                <img
                  :src="`https://znzz.tech/loc/${item.hr_info.avatar}`"
                  alt=""
                  style="width: 40px; height: 40px; border-radius: 100px"
                />
                <!-- 未读消息几条 -->
                <!-- <div class="texte"></div> -->
              </div>

              <div style="padding-left: 10px; font-size: 13px">
                <div>
                  <span style="padding-right: 10px">{{
                    item.hr_info.name
                  }}</span
                  ><span>{{ item.position.position_name }}</span>
                </div>
                <!-- 最新消息 -->
                <!-- <div style="margin-top: 3px">{{ item.content }}</div> -->
              </div>
            </div>
          </div>
        </div>
        <!-- <div v-if="show" class="footer" style="display: flex">
          <div style="margin-top: 10px; width: 200px">
            <el-checkbox v-model="checkAll" @change="handleCheckedCitiesChange"
              >全选</el-checkbox
            >
          </div>
          <div>

            <el-button type="text" style="">删除</el-button>
            <el-button
              type="text"
              style="color: rgb(96, 98, 102)"
              @click="abrogate"
              >取消</el-button
            >
          </div>
        </div> -->
      </div>
      <div class="right">
        <div
          v-if="messageTxt"
          style="
            height: 100%;
            height: 100%;

            display: flex;
            justify-content: center;
            align-items: center;
          "
        >
          <div>
            <img
              src="../../../assets/images/互动消息.png"
              alt=""
              style="width: 250px; hieght: 100px"
            />
            <div style="font-size: 15px; color: #636567">
              与您进行过沟通的 Boss 都会在左侧列表中显示
            </div>
          </div>
        </div>
        <div v-if="!messageTxt">
          <div class="header" style="position: relative; width: 100%">
            <div style="width: 80%">
              <div>
                <span style="margin-right: 10px; font-size: 17px">{{
                  hr.name
                }}</span>
                <Item :icon="hr.sex === 1 ? 'nan' : 'nv'" style="width: 15px" />
                <span style="margin-left: 10px; color: rgb(254, 135, 110)">{{
                  hr.state
                }}</span>
              </div>
              <div style="margin-top: 12px">
                <span class="age" style="padding-left: 0px">{{
                  hr.company
                }}</span>
                <!-- <span class="age">23年应届生</span>
                <span class="age">本科</span>
                <span class="age" style="border: 0; color: rgb(15, 171, 172)"
                  >背景调查</span
                > -->
              </div>
            </div>
            <!-- <div style="margin-top: 17px; width: 30%">
            <el-button class="Btn" icon="el-icon-document">在线简历</el-button>
            <el-button
              class="Btn"
              style="background-color: rgb(115, 131, 255)"
              icon="el-icon-paperclip"
              >附件简历</el-button
            >
          </div> -->
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
          <!-- <div
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
        </div> -->
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
              :status="status"
              @again="again"
              @resetChange="resetChange"
              @file="file"
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
                <!-- <Item icon="地图" style="width: 1.2em" /> -->
                <!-- <span style="font-size: 19px; color: #8a8a8a; margin: 3px 8px"
                >|</span
              > -->
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
                  <!-- <span
                    class="block"
                    :class="{ small: isBackground }"
                    @click="phoneChange"
                    >换电话</span
                  > -->
                </a>
                <!-- <a href="javascript:;">
                <span class="block">换微信</span>
              </a> -->
                <!-- <a href="javascript:;">
                <span class="block"><i class="el-icon-time"></i>约面试</span></a
              > -->
              </div>
            </div>
            <!--     @keyup.enter.native="send"   -->
            <el-input
              id="textarea"
              v-model="say"
              class="chatText"
              resize="none"
              type="textarea"
              rows="5"
              @input="usernameInput"
            >
            </el-input>
          </div>
          <div style="display: flex">
            <div style="width: 88%"></div>
            <div>
              <el-button
                v-if="changeColor === 1"
                type="primary"
                style="
                  width: 50px;
                  height: 23px;
                  font-size: 12px;
                  padding: 2px 0px 0px 2px;
                "
                :disabled="enterText || say === ''"
                @click="sendMessage"
                >感兴趣</el-button
              >
              <el-button
                v-if="changeColor === 1"
                type="primary"
                style="
                  width: 50px;
                  height: 23px;
                  font-size: 12px;
                  padding: 2px 0px 0px 2px;
                "
                :disabled="enterText || say === ''"
                @click="sendMessage"
                >不合适</el-button
              >
              <el-button
                v-if="changeColor !== 1"
                type="primary"
                style="
                  width: 50px;
                  height: 23px;
                  font-size: 12px;
                  padding: 2px 0px 0px 2px;
                "
                :disabled="enterText || say === ''"
                @click="sendMessage"
                >发送</el-button
              >
            </div>
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
import { getRongyun, getpreChat, getInterest, getComming, getPosted, getReject } from '@/api/Rongyun.js'
import { getChatingId } from '@/api/my/job.js'

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
      appkey: '', // 这是我们之前保存的 appkey *重要
      // token: 'LfWddfqXjPDAC0wBYe7EXs46VaBqkAqrId2b4bcqU5I=@dl0v.cn.rongnav.com;dl0v.cn.rongcfg.com', // token 可以多次生成 之前也有介绍过
      token: '',
      faceList: [],
      textarea: '',
      graph: 'el-icon-caret-bottom',
      openDown: false,
      checkAll: '',
      count: '',
      show: true,
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
      phoneState: false,
      status: false,
      showDatas: [],
      messageTxt: true,
      rongYun: {
        sender_class: 0, // 0-求职者；1-hr
        sender_uid: 0,
        receiver_class: 1, // 同上
        receiver_uid: 0
      },
      hr: {
        name: '',
        sex: '',
        state: '',
        company: '',
        id: ''
      },
      enterText: true

    }
  },
  computed: {

  },
  mounted () {
    this.initRongCloud()
    // for (const i in appData) {
    //   console.log('appData', appData)
    //   this.emojList.push(appData[i].char)
    // }
  },

  created () {
    // this.sendMessage()
    // this.initRongCloud()
    this.emojList = appData
    this.helloChange()
    // this.resume()
  },

  methods: {
    async file () {
      console.log('同意交换简历')
      const res = await getChatingId(this.hr.id)
      console.log('发送简历', res)
      if (res.code === 200) {
        this.$message.success('已发送至hr邮箱')
      } else {
        this.$message.warning(res.data.msg)
      }
    },
    // send () {
    //   console.log('123', this.say)
    //   if (this.say) {
    //     this.sendMessage()
    //   }
    // },
    reset () {
      this.isBackground = true
    },
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
      this.reset()
      console.log('nkjno', this.phoneState)
    },
    // 交换电话
    phoneChange () {
      this.visible = true
    },
    // 取消发送
    padlock () {
      this.visible = false
    },
    resetChange () {
      this.status = false
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
        var msg = new RongIMLib.TextMessage({ content: _this.phones, extra: _this.memberInfo.img })
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
        this.padlock()
        this.status = true
        this.reset()
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
        const targetId = _this.$store.state.num.targetId
        var conversationType = RongIMLib.ConversationType.PRIVATE
        // 创建一个 ImageMessage 对象
        var imageMessage = RongIMLib.ImageMessage.obtain('图片', _this.image)

        // 创建一个消息对象
        var message = {
          content: imageMessage,
          conversationType: conversationType,
          targetId: targetId
        }
        console.log('233', targetId, imageMessage, message)

        // 发送图片消息
        RongIMClient.getInstance().sendMessage(conversationType, targetId, message.content, {
          onSuccess: function (message) {
            console.log('Send image message successfully.', message)
            const say = {
              css: 'right',
              imageUri: message.content.imageUri,
              content: message.content.content,
              headImg: _this.$store.state.num.memberInfo.img,
              messageName: message.content.messageName,
              time: _this.nowTime

              // condition: 'false'

            }
            // _this.answer.push(say)
            _this.answer.push(say)
            _this.image = ''
            console.log(say, _this.answer)
          },
          onError: function (errorCode, message) {
            console.log('Send image message error: ' + errorCode)
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
      // this.say = text

      // this.sendMessage()
      this.sam(text)
      this.$refs.popovers.doClose()
    },
    usernameInput (val) {
      if (val.replace(/(^\s*)|(\s*$)/g, '') === '' || val === '') {
        console.log('未输入或者输入为空格')
        this.enterText = true
      } else {
        console.log('输入：', val)
        this.enterText = false
      }
    },
    // 消息
    onClickLeft () {
      this.$router.go(-1)
    },
    addPromptInfo (prompt, userId = null) {
      //
      console.log(12113)
      console.log('prompt', prompt, userId)
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
      // const avatar = 'https://znzz.tech/loc/static/img/1 (2)_30e4b8e4.jpg'
      _this.showDatas.push(prompt)
      const timer = setInterval(() => {
        if (userId) {
          clearInterval(timer) // 路由跳转后销毁定时器
          _this.$store.commit('SET_UserId', { // 保存用户信息
            userId: userId,
            avatar: _this.$store.state.num.memberInfo.img
          })
          // _this.$store.commit('SET_TARGETID', _this.targetId)
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
      var appkey = this.$store.state.num.appkey
      var token = this.$store.state.num.memberInfo.token
      if (!appkey || !token) {
        // alert('appkey 和 token 不能为空')
      } else {
        // 这个init 是我们之前撸的 `utils.js`
        init({
          appkey: appkey,
          token: token
        }, this.addPromptInfo)
      }
    },
    sendMessage () {
      // this.say = this.say.replace(/^\s+|\s+$/gm, '')
      this.initRongCloud()
      this.resume()
      this.phoneState = false
      if (this.say !== '') {
        const _this = this
        // _this.initRongCloud()
        // _this.answer = JSON.parse(localStorage.getItem('answer')) // 消息列表
        _this.answer = this.$store.state.num.answer // 消息列表
        _this.memberInfo = this.$store.state.num.memberInfo // 用户信息
        _this.targetId = this.$store.state.num.targetId// 目标ID
        console.log('_this.memberInfo', _this.memberInfo)
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
        var msg = new RongIMLib.TextMessage({ content: _this.say, extra: _this.memberInfo.img })
        var conversationType = RongIMLib.ConversationType.PRIVATE // 单聊, 其他会话选择相应的消息类型即可
        var targetId = this.$store.state.num.targetId// 目标 Id
        RongIMClient.getInstance().sendMessage(conversationType, targetId, msg, {
          onSuccess: function (message) {
            // message 为发送的消息对象并且包含服务器返回的消息唯一 Id 和发送消息时间戳
            console.log('message', message)
            const say = {
              css: 'right',
              txt: message.content.content,
              headImg: _this.memberInfo.img,
              time: _this.nowTime,
              messageName: 'TextMessage'

              // condition: 'false'

            }
            console.log('_this.memberInfo', say, message.content.content)
            _this.answer.push(say)
            localStorage.setItem('answer', JSON.stringify(_this.answer))
            // _this.$store.commit('SET_ANSWER', _this.answer)
            // console.log('  _this.answer', _this.answer, _this.$store.state.num.answer)

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
            // this.$message.warning('发送失败，刷新下页面吧')
          }
        })
      }
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
      this.enterText = false
      console.log('this.emojList', symbol)
      // this.stat.sendMsgVal += RongIMLib.RongIMEmoji.symbolToEmoji(symbol) // 表情包需要RongIMLib.RongIMEmoji.symbolToEmoji解析
      // this.emojiShow = false

      const emoji = []
      this.faceList.push(item)
      console.log('this', emoji, this.faceList)
      // this.$refs.popoverRef.doClose()
      this.say = this.say + item
    },
    // num () {
    //   console.log('13u9')
    // },
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
    },
    // 边框 点击每一个联系人
    async tinct (i, sender, receiver, item) {
      console.log('i', i, sender, receiver)
      this.count = i
      this.rongYun.sender_uid = sender
      this.rongYun.receiver_uid = receiver
      const res = await getRongyun(this.rongYun)
      console.log(res.code)
      if (res.code === 200) {
        console.log(res.data.receiver, res.data.sender)
        this.$store.commit('SET_MEMBER', res.data.sender)
        this.$store.commit('SET_TARGETID', res.data.receiver.uid)
        this.hr.name = item.hr_info.name
        this.hr.sex = item.hr_info.sex
        this.hr.state = item.hr_info.online_status
        this.hr.company = item.position.enterprise.enterprise_name
        this.hr.id = item.id
        this.messageTxt = false
        this.initRongCloud()
      } else {
        this.$message.success(res.data.msg)
      }
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
    // 新招呼
    async helloChange () {
      this.changeColor = 1
      // this.emojList = appData
      console.log('appData', appData)
      const res = await getpreChat()
      console.log('新招呼', res)
      if (res.data.results.length === 0) {
        console.log('没有联系人')
        this.show = true
        this.messageTxt = true
      } else {
        console.log('有人找')
        this.answer = []
        this.list = res.data.results
        console.log(this.list)
        this.show = false
      }
    },
    // 未回复
    async haveIntentionTo () {
      this.changeColor = 2
      const res = await getInterest()
      console.log('未回复', res)
      if (res.data.results.length === 0) {
        console.log('没有联系人')
        this.show = true
        this.messageTxt = true
      } else {
        console.log('有人找')
        this.answer = []
        this.list = res.data.results
        console.log(this.list)
        this.show = false
      }
    },
    // 沟通中
    async inCommunicationC () {
      this.changeColor = 3
      const res = await getComming()
      console.log('沟通中', res)
      if (res.data.results.length === 0) {
        console.log('没有联系人')
        this.show = true
        this.messageTxt = true
      } else {
        console.log('有人找')
        this.answer = []
        this.list = res.data.results
        console.log(this.list)
        this.show = false
      }
    },
    // 已约面
    async posted () {
      this.changeColor = 4
      const res = await getPosted()
      console.log('已约面', res)
      if (res.data.results.length === 0) {
        console.log('没有联系人')
        this.show = true
        this.messageTxt = true
      } else {
        console.log('有人找')
        this.answer = []
        this.list = res.data.results
        console.log(this.list)
        this.show = false
      }
    },
    // 不合适
    async inappropriate () {
      this.changeColor = 5
      const res = await getReject()
      console.log('不合适', res)
      if (res.data.results.length === 0) {
        console.log('没有联系人')
        this.show = true
        this.messageTxt = true
      } else {
        console.log('有人找')
        this.answer = []
        this.list = res.data.results
        console.log(this.list)
        this.show = false
      }
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
      var msg = new RongIMLib.TextMessage({ content: num, extra: _this.memberInfo.img })
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
            time: _this.nowTime,
            messageName: 'TextMessage'

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
      font-size: 13px;
      // color: #256efd;
      // border-right: 1px solid #e6e3e3;
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
  height: 500px;
  overflow-y: auto;
  .textnum {
    height: 100%;
    width: 100%;
    // background-color: pink;
    font-size: 15px;
    line-height: 500px;
    text-align: center;
    color: #636567;
  }

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
  width: 20px;
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
  // cursor: not-allowed;
  pointer-events: none;
  background-color: #f2efef;
  color: #b3a9a9;
}
</style>

