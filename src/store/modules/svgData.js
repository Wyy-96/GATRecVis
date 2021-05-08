const state = {
    nowData: {},
    d3DataList: [],
}

const mutations = {
  SET_NOW_DATA: (state, nowData) => {
    state.nowData = nowData
  },
}
const actions = {
    
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}