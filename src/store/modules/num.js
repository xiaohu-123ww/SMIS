const state = {
  memberInfo: undefined, // 用户信息
  targetId: undefined, // 目标ID
  answer: [] // 消息列表
}
const mutations = {
  SET_MEMBER (state, memberInfo) {
    state.memberInfo = memberInfo
  },
  SET_TARGETID (state, targetId) {
    state.targetId = targetId
  },
  SET_ANSWER (state, playload) {
    const say = {
      css: 'left', // css 样式
      txt: playload.content, // 文本内容
      headImg: playload.extra // 头像
    }
    state.answer.push(say)
  }
}
export default {
  state,
  mutations

}

