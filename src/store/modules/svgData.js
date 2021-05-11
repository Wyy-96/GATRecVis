const state = {
    nowData: {},
    d3DataList: [],
}

const mutations = {
  SET_NOW_DATA: (state, nowData) => {
    state.nowData = nowData
  },
  ADD_D3_DATA_LIST: (state, data) => {
    state.d3DataList.push(data)
  },
  Empty_D3_DATA_LIST: (state,data) =>{
    state.d3DataList = []
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