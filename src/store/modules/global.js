// 全局参数
const state = {
    userId: '',
}

const mutations = {
    SET_USER_ID: (state, userId) => {
        state.userId = userId
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