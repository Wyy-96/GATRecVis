const getters = {
    custId: state => state.cust.custId,
    custMobile: state => state.cust.custMobile,
    custName: state => state.cust.custName,

    userId: state => state.global.userId,
    HetGNNShow: state => state.global.HetGNNShow,
    KGATShow: state => state.global.KGATShow,
    NIRecShow: state => state.global.NIRecShow,

   
}
export default getters