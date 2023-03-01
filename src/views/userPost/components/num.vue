<template>
  <el-dialog title="" :visible.sync="state" width="width">
    <div class="hello">
      2111111111111111111111111
      <button @click="sendMsga">发送给test账号数据</button>
      <div v-for="(item, index) in dataInfo" :key="index">
        {{ item }}
      </div>
      <!-- {{ dataInfo }} -->
    </div>
    <div slot="footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
var data = {}
export default {
  name: 'HelloWorld2',
  props: {
    state: {
      type: Boolean
    }
  },
  data () {
    return {
      nim: '',
      msgdata: '',
      dataInfo: {
        msgs: []
      }
    }
  },
  watch: {
    'dataInfo': {
      handler (newvalue, oldvalue) {
        console.warn(newvalue, oldvalue, '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
      },
      deep: true
    }
  },
  mounted () {
    // this.nim = this.$root.$options.$nim
    // console.log('this.nim', this.nim)
    console.log('this.nim', this.nim)
    this.nim = this.NIM.getInstance({
      // 初始化SDK
      debug: true,
      appKey: '你从控制台处获得的appKey',
      account: '你的账号',
      token: '控制台处账号生成的唯一token',
      // appKey: '06427999ef9b9d74c67dca57901bd723',
      // account: 'znzzkfz1234',
      // token: '123456WW',
      onconnect: this.onConnect,
      onerror: this.onError,
      onwillreconnect: this.onWillReconnect,
      ondisconnect: this.onDisconnect,
      // 会话
      onsessions: this.onSessions,
      onupdatesession: this.onUpdateSession,
      // 消息
      onroamingmsgs: this.onRoamingMsgs,
      onofflinemsgs: this.onOfflineMsgs,
      onmsg: this.onMsg,
      // 同步完成
      onsyncdone: this.onSyncDone
    })
    setTimeout(() => {
      this.nim.getHistoryMsgs({
        scene: 'p2p',
        to: 'check',
        done: this.getHistoryMsgsDone
      })
    }, 300)
    console.log('this.nim', this.nim)
  },
  methods: {
    sendMsga () {
      // let obj={
      //   gender:'',
      //   content:''
      // }
      // 写个对象,把自己的性别带上去
      var msg = this.nim.sendCustomMsg({
        scene: 'p2p',
        to: 'check1',
        content: '自定义内容随便来电',
        done: this.sendMsgDone
      })
      this.pushMsg(msg)
      this.dataInfo.msgs.push(msg)
      console.log(this.dataInfo, '找里面的msg进行渲染')
    },
    getHistoryMsgsDone (error, obj) {
      console.log('获取报错和对应信息:', error, obj, '对应参数信息=====================================================================================================================>')
    },
    onMsg (msg) {
      console.log('收到消息', msg.scene, msg.type, msg, '收到消息了啊')
      this.pushMsg(msg)
      this.dataInfo.msgs.push(msg)
    },
    connect () {
      console.log('连接成功!')
    },
    sendMsgDone (error, msg) {
      console.log(error, msg, '发送成功后')
    },
    onConnect () {
      console.log('连接成功')
    },
    onWillReconnect (obj) {
      // 此时说明 `SDK` 已经断开连接, 请开发者在界面上提示用户连接已断开, 而且正在重新建立连接
      console.log('即将重连', obj)
    },
    onDisconnect (error) {
      // 此时说明 `SDK` 处于断开状态, 开发者此时应该根据错误码提示相应的错误信息, 并且跳转到登录页面
      console.log('连接断开', error)
      if (error) {
        switch (error.code) {
          // 账号或者密码错误, 请跳转到登录页面并提示错误
          case 302:
            break
          // 重复登录, 已经在其它端登录了, 请跳转到登录页面并提示错误
          case 417:
            break
          // 被踢, 请提示错误后跳转到登录页面
          case 'kicked':
            break
          default:
            break
        }
      }
    },
    onError (error, obj) {
      console.log('发生错误', error, obj)
    },
    onLoginPortsChange (loginPorts) {
      console.log('当前登录帐号在其它端的状态发生改变了', loginPorts)
    },
    onBlacklist (blacklist) {
      console.log('收到黑名单', blacklist)
      data.blacklist = this.nim.mergeRelations(data.blacklist, blacklist)
      data.blacklist = this.nim.cutRelations(data.blacklist, blacklist.invalid)
      refreshBlacklistUI()
    },
    onMarkInBlacklist (obj) {
      console.log(
        obj.account + '被你' + (obj.isAdd ? '加入' : '移除') + '黑名单',
        obj
      )
      if (obj.isAdd) {
        addToBlacklist(obj)
      } else {
        removeFromBlacklist(obj)
      }
    },
    addToBlacklist (obj) {
      data.blacklist = this.nim.mergeRelations(data.blacklist, obj.record)
      refreshBlacklistUI()
    },
    removeFromBlacklist (obj) {
      data.blacklist = this.nim.cutRelations(data.blacklist, obj.record)
      refreshBlacklistUI()
    },
    refreshBlacklistUI () {
      // 刷新界面
    },
    onMutelist (mutelist) {
      console.log('收到静音列表', mutelist)
      data.mutelist = this.nim.mergeRelations(data.mutelist, mutelist)
      data.mutelist = this.nim.cutRelations(data.mutelist, mutelist.invalid)
      refreshMutelistUI()
    },
    onMarkInMutelist (obj) {
      console.log(
        obj.account + '被你' + (obj.isAdd ? '加入' : '移除') + '静音列表',
        obj
      )
      if (obj.isAdd) {
        addToMutelist(obj)
      } else {
        removeFromMutelist(obj)
      }
    },
    addToMutelist (obj) {
      data.mutelist = this.nim.mergeRelations(data.mutelist, obj.record)
    },
    removeFromMutelist (obj) {
      data.mutelist = this.nim.cutRelations(data.mutelist, obj.record)
    },
    refreshMutelistUI () {
      // 刷新界面
    },
    onFriends (friends) {
      console.log('收到好友列表', friends)
      data.friends = this.nim.mergeFriends(data.friends, friends)
      data.friends = this.nim.cutFriends(data.friends, friends.invalid)
    },
    onSyncFriendAction (obj) {
      console.log('收到好友操作', obj)
      switch (obj.type) {
        case 'addFriend':
          console.log('你在其它端直接加了一个好友' + obj)
          onAddFriend(obj.friend)
          break
        case 'applyFriend':
          console.log('你在其它端申请加了一个好友' + obj)
          break
        case 'passFriendApply':
          console.log('你在其它端通过了一个好友申请' + obj)
          onAddFriend(obj.friend)
          break
        case 'rejectFriendApply':
          console.log('你在其它端拒绝了一个好友申请' + obj)
          break
        case 'deleteFriend':
          console.log('你在其它端删了一个好友' + obj)
          onDeleteFriend(obj.account)
          break
        case 'updateFriend':
          console.log('你在其它端更新了一个好友', obj)
          onUpdateFriend(obj.friend)
          break
      }
    },
    onAddFriend (friend) {
      data.friends = this.nim.mergeFriends(data.friends, friend)
    },
    onDeleteFriend (account) {
      data.friends = this.nim.cutFriendsByAccounts(data.friends, account)
    },
    onUpdateFriend (friend) {
      data.friends = this.nim.mergeFriends(data.friends, friend)
    },
    refreshFriendsUI () {
      // 刷新界面
    },
    onMyInfo (user) {
      console.log('收到我的名片', user)
      data.myInfo = user
    },
    onUpdateMyInfo (user) {
      console.log('我的名片更新了', user)
      data.myInfo = this.nim.util.merge(data.myInfo, user)
    },
    updateMyInfoUI () {
      // 刷新界面
    },
    onUsers (users) {
      console.log('收到用户名片列表', users)
      data.users = this.nim.mergeUsers(data.users, users)
    },
    onUpdateUser (user) {
      console.log('用户名片更新了', user)
      data.users = this.nim.mergeUsers(data.users, user)
    },
    onSuperTeams (superTeams) {
      console.log('收到超大群列表', superTeams)
      data.superTeams = this.nim.mergeTeams(data.superTeams, superTeams)
    },
    onInvalidSuperTeams (teams) {
      data.superTeams = this.nim.cutTeams(data.superTeams, teams)
      data.invalidSuperTeams = this.nim.mergeTeams(data.invalidSuperTeams, teams)
      refreshSuperTeamsUI()
    },
    onSyncCreateSuperTeam (team, owner) {
      console.log('创建了一个超大群 onSyncCreateSuperTeam ', team, owner)
      data.superTeams = this.nim.mergeTeams(data.superTeams, team)
      refreshSuperTeamsUI()
      onSuperTeamMembers({
        teamId: team.teamId,
        members: owner
      })
    },
    onAddSuperTeamMembers (team, accounts, members) {
      console.log('添加群成员 onAddSuperTeamMembers ', team, accounts, members)
      if (!accounts && !members) {
        accounts = team.accounts || []
        members = team.members || []
        team = team.team || {}
      }
      var teamId = team.teamId

      // 如果是别人被拉进来了，那么拼接群成员列表
      // 如果是自己被拉进来了，那么同步一次群成员列表

      if (accounts.indexOf(data.account) === -1) {
        onSuperTeamMembers({
          teamId: teamId,
          members: members
        })
      } else {
        // ...
      }
      onSuperTeams(team)
    },
    onDismissSuperTeam (obj) {
      console.log('解散超大群 onDismissSuperTeam', obj)
      var teamId = obj.teamId
      removeAllSuperTeamMembers(teamId)
      data.superTeams = this.nim.cutTeams(data.superTeams, obj)
      refreshSuperTeamsUI()
      refreshSuperTeamMembersUI()
    },
    onRemoveSuperTeamMembers (obj) {
      console.log('移除了群成员 onRemoveSuperTeamMembers ', obj.accounts, obj)
      var teamId = obj.team.teamId
      var accounts = obj.accounts
      var team
      if (!teamId && !accounts) {
        accounts = obj.accounts || []
      }
      // 如果是别人被踢了，那么移除群成员
      // 如果是自己被踢了，那么离开该群
      if (accounts.indexOf(data.account) === -1) {
        if (team) {
          onSuperTeams(team)
        }
        if (!data.superTeamMembers) {
          data.superTeamMembers = {}
        }
        data.superTeamMembers[teamId] = this.nim.cutTeamMembersByAccounts(
          data.superTeamMembers[teamId],
          teamId,
          accounts
        )
        refreshSuperTeamMembersUI()
      } else {
        leaveSuperTeam(teamId)
      }
    },
    onUpdateSuperTeam (err, msg) {
      console.log('更新了超大群 teamId', err, msg)
    },
    onUpdateSuperTeamMember (member) {
      console.log('群成员信息更新了', member)
    },
    leaveSuperTeam (teamId) {
      removeAllSuperTeamMembers(teamId)
    },
    refreshSuperTeamsUI () { },
    refreshSuperTeamMembersUI () { },
    removeAllSuperTeamMembers () { },
    onTeams (teams) {
      console.log('群列表', teams)
      data.teams = this.nim.mergeTeams(data.teams, teams)
    },
    onInvalidTeams (teams) {
      data.teams = this.nim.cutTeams(data.teams, teams)
      data.invalidTeams = this.nim.mergeTeams(data.invalidTeams, teams)
      refreshTeamsUI()
    },
    onCreateTeam (team) {
      console.log('你创建了一个群', team)
      data.teams = this.nim.mergeTeams(data.teams, team)
      refreshTeamsUI()
      onTeamMembers({
        teamId: team.teamId,
        members: owner
      })
    },
    refreshTeamsUI () {
      // 刷新界面
    },
    onTeamMembers (obj) {
      console.log('收到群成员', obj)
      var teamId = obj.teamId
      var members = obj.members
      data.teamMembers = data.teamMembers || {}
      data.teamMembers[teamId] = this.nim.mergeTeamMembers(
        data.teamMembers[teamId],
        members
      )
      data.teamMembers[teamId] = this.nim.cutTeamMembers(
        data.teamMembers[teamId],
        members.invalid
      )
      refreshTeamMembersUI()
    },
    onSyncTeamMembersDone () {
      console.log('同步群列表完成')
    },
    onUpdateTeamMember (teamMember) {
      console.log('群成员信息更新了', teamMember)
      onTeamMembers({
        teamId: teamMember.teamId,
        members: teamMember
      })
    },
    refreshTeamMembersUI () {
      // 刷新界面
    },
    onSessions (sessions) {
      console.log('收到会话列表', sessions)
      data.sessions = this.nim.mergeSessions(data.sessions, sessions)
      this.updateSessionsUI()
    },
    onUpdateSession (session) {
      console.log('会话更新了', session)
      data.sessions = this.nim.mergeSessions(data.sessions, session)
      this.updateSessionsUI()
    },
    updateSessionsUI () {
      // 刷新界面
    },
    onRoamingMsgs (obj) {
      console.warn('漫游消息============================>', obj)
      this.pushMsg(obj.msgs)
      this.dataInfo.msgs.push(obj.msgs)
    },
    onOfflineMsgs (obj) {
      console.log('离线消息', obj)
      this.pushMsg(obj.msgs)
      this.dataInfo.msgs.push(obj.msgs)
    },
    onMsg (msg) {
      console.log('收到消息', msg.scene, msg.type, msg)
      this.pushMsg(msg)
      this.dataInfo.msgs.push(obj.msgs)
    },
    pushMsg (msgs) {
      if (!Array.isArray(msgs)) {
        msgs = [msgs]
      }
      var sessionId = msgs[0].sessionId
      this.dataInfo.msgs = this.dataInfo.msgs || {}
      this.dataInfo.msgs[sessionId] = this.nim.mergeMsgs(this.dataInfo.msgs[sessionId], msgs)
      console.warn('执行完之后', this.dataInfo)
    },
    onOfflineSysMsgs (sysMsgs) {
      console.log('收到离线系统通知', sysMsgs)
      pushSysMsgs(sysMsgs)
    },
    onSysMsg (sysMsg) {
      console.log('收到系统通知', sysMsg)
      pushSysMsgs(sysMsg)
    },
    onUpdateSysMsg (sysMsg) {
      pushSysMsgs(sysMsg)
    },
    pushSysMsgs (sysMsgs) {
      data.sysMsgs = this.nim.mergeSysMsgs(data.sysMsgs, sysMsgs)
    },
    onSysMsgUnread (obj) {
      console.log('收到系统通知未读数', obj)
      data.sysMsgUnread = obj
    },
    onUpdateSysMsgUnread (obj) {
      console.log('系统通知未读数更新了', obj)
      data.sysMsgUnread = obj
    },
    refreshSysMsgsUI () {
      // 刷新界面
    },
    onOfflineCustomSysMsgs (sysMsgs) {
      console.log('收到离线自定义系统通知', sysMsgs)
    },
    onCustomSysMsg (sysMsg) {
      console.log('收到自定义系统通知', sysMsg)
    },
    onSyncDone () {
      console.log('同步完成')
    },
    getHistoryMsgsDone (error, obj) {
      console.warn('获取云端历史记录' + (!error ? '成功' : '失败'), error, obj)
      if (!error) {
        console.log(obj.msgs)
        setTimeout(() => {
          this.dataInfo = obj
        }, 200)
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

