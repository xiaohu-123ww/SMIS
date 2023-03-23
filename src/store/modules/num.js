const state = {
  memberInfo: {}, // 用户信息
  targetId: '', // 目标ID
  answer: [] // 消息列表
}
const mutations = {
  SET_MEMBER (state, memberInfo) {
    state.memberInfo = memberInfo
    localStorage.setItem('memberInfo', JSON.stringify(state.memberInfo))
  },
  SET_TARGETID (state, targetId) {
    state.targetId = targetId
    localStorage.setItem('targetId', state.targetId)
  },
  SET_ANSWER (state, playload) {
    const say = {
      css: 'left', // css 样式
      txt: playload.content, // 文本内容
      headImg: playload.extra,
      time: playload.time
      // phone: playload.phone

      // 头像
    }
    state.answer.push(say)
    // localStorage.setItem('answer', JSON.stringify(state.answer))
  }
}
export default {
  state,
  mutations

}

