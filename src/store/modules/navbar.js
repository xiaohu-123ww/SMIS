const state = {
  flag: 1,
  toCompany: true
}

const mutations = {
  toCompany(state) {
    if (state.flag == 1) {
      state.toCompany = false
      state.flag = 0
    }
  },
  toDash(state) {
    if (state.flag == 0) {
      state.toCompany = true
      state.flag = 1
    }
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
