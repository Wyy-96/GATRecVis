// 全局参数
const state = {
    userId: '',
    HetGNNShow:true,
    KGATShow: true,
    NIRecShow: true,
}

const mutations = {
    SET_USER_ID: (state, userId) => {
        state.userId = userId
    },
    SET_HETGNN_SHOW: (state, HetGNNShow) => {
        state.HetGNNShow = HetGNNShow
    },
    SET_KGAT_SHOW: (state, KGATShow) => {
        state.KGATShow = KGATShow
    },
    SET_NIRec_SHOW: (state, NIRecShow) => {
        state.NIRecShow = NIRecShow
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