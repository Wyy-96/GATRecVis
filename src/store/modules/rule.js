//页面权限列表 需要后台返还 暂时先写死测试
const state = {
    ruleList: [
        "InvestigationConfig", //调研配置
    ],
}

const mutations = {
    SET_RULE_LIST: (state, ruleList) => {
        state.ruleList = ruleList
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