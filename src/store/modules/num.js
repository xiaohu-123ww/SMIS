const state = {
  memberInfo: {}, // 用户信息
  targetId: '', // 目标ID
  answer: [], // 消息列表
  appkey: 'x18ywvqfxypqc',
  list: {}, // 消息列表
  senderUserId: '' // 消息列表

}
const mutations = {
  SET_MEMBER (state, memberInfo) {
    state.memberInfo = memberInfo
    // sessionStorage.setItem('memberInfos', JSON.stringify(state.memberInfo))
  },
  SET_UserId (state, memberInfo) {
    state.list = memberInfo
    // sessionStorage.setItem('lists', JSON.stringify(state.memberInfo))
  },
  SET_TARGETID (state, targetId) {
    state.targetId = targetId
    // sessionStorage.setItem('targetIds', state.targetId)
  },
  SET_ANSWER (state, playload) {
    const say = {
      css: 'left', // css 样式
      txt: playload.content, // 文本内容
      headImg: playload.extra,
      time: playload.time,
      messageName: playload.messageName,
      imageUri: playload.imageUri,
      latitude: playload.latitude,
      longitude: playload.longitude,
      poi: playload.poi,
      title: playload.title,
      content: playload.content,
      senderUserId: playload.senderUserId,
      targetId: playload.targetId

      // 头像
    }
    state.answer.push(say)
    // sessionStorage.setItem('lists', JSON.stringify(state.memberInfo))
    // 将动态数组转换为 JSON 字符串
    // const jsonString = JSON.stringify(state.answer)

    // // 将 JSON 字符串存储到 localStorage
    // window.sessionStorage.setItem('answer', JSON.stringify(state.answer))
  },
  ANSWERS (state, playload) {
    state.answer = playload
  },
  SET_senderUserId (state, targetId) {
    state.senderUserId = targetId
    // localStorage.setItem('targetId', state.targetId)
  },
  MEMBER (state, playload) {
    state.memberInfo = playload
  },
  UserId (state, playload) {
    state.list = playload
  }
}
export default {
  state,
  mutations

}

