<template>
  <div v-if="states" id="rongcloud">
    <el-dialog title="" :visible.sync="states" width="width">
      <div class="num">
        <div class="wrapper">
          <Message v-for="(item, index) in answer" :key="index" :data="item" />
        </div>
        <el-input v-model="say" placeholder="请输入"></el-input>
        <el-button @click="sendMessage">发送</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Message from './Message'
export default {
  components: {
    Message
  },
  props: {
    states: {
      type: Boolean
    }
  },
  data () {
    return {
      say: '',
      answer: '', // 消息列表
      memberInfo: '', // 用户信息
      targetId: '' // 消息
    }
  },
  watch: {
    answer () {
      this.$nextTick(() => {
        const list = document.getElementById('rongcloud')
        // document.documentElement.scrollTop = list.scrollHeight
        // 如不行，请尝试-> list.scrollTop = list.scrollHeight
      })
    }
  },
  created () {
    this.$nextTick(() => {
      const list = document.getElementById('rongcloud')
      // document.documentElement.scrollTop = list.scrollHeight
      // 如不行，请尝试-> list.scrollTop = list.scrollHeight
    })
  },
  // computed: {
  //   ...mapState({
  //     answer: 'answer', // 消息列表
  //     memberInfo: 'memberInfo', // 用户信息
  //     targetId: 'targetId' // 目标ID
  //   })
  // },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    sendMessage () {
      const _this = this
      _this.answer = this.$store.state.num.answer // 消息列表
      _this.memberInfo = this.$store.state.num.memberInfo // 用户信息
      _this.targetId = this.$store.state.num.targetId// 目标ID
      var msg = new RongIMLib.TextMessage({ content: _this.say, extra: _this.memberInfo.avatar })
      var conversationType = RongIMLib.ConversationType.PRIVATE // 单聊, 其他会话选择相应的消息类型即可
      var targetId = this.targetId // 目标 Id
      RongIMClient.getInstance().sendMessage(conversationType, targetId, msg, {
        onSuccess: function (message) {
          // message 为发送的消息对象并且包含服务器返回的消息唯一 Id 和发送消息时间戳
          const say = {
            css: 'right',
            txt: message.content.content,
            headImg: _this.memberInfo.avatar
          }
          _this.answer.push(say)
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

<style lang="scss" scoped>
// @import '~@/scss/utils';
.wrapper {
  padding-top: vw(92px);
  padding-bottom: vw(200px);
}
.send-message {
  width: 100vw;
  height: vw(200px);
  position: fixed !important;
  bottom: 0;
  left: 0;
  .message-textarea {
    height: 100%;
  }
  .send-button {
    position: fixed;
    right: vw(30px);
    bottom: vw(30px);
  }
}
</style>

