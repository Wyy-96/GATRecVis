import {login} from "@/api/cust"

const state = {
    custId: '',
    custMobile: '',
    custName: '',
}

const mutations = {
    SET_CUST_ID: (state, custId) => {
        state.custId = custId
    },
    SET_CUST_MOBILE: (state, custMobile) => {
        state.custMobile = custMobile
    },
    SET_CUST_NAME: (state, custName) => {
        state.custName = custName
    }
}
const actions = {
    login({ commit }, custInfo) {
      const { custId, custPwd } = custInfo
      return new Promise((resolve, reject) => {
        login({ user_id: custId.trim(), user_password: custPwd }).then(response => {
          commit('SET_CUST_ID', response.user_id);
          commit('SET_CUST_MOBILE', response.user_mobile);
          commit('SET_CUST_NAME', response.user_name);
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    logout({ commit }){
      commit('SET_CUST_ID', '');
      commit('SET_CUST_MOBILE', '');
      commit('SET_CUST_NAME', '');
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}