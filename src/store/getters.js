const getters = {
    custId: state => state.cust.custId,
    custMobile: state => state.cust.custMobile,
    custName: state => state.cust.custName,

    userId: state => state.global.userId,
    movieId: state => state.global.movieId,
    HetGNNShow: state => state.global.HetGNNShow,
    KGATShow: state => state.global.KGATShow,
    NIRecShow: state => state.global.NIRecShow,

    // ===========截图功能=============
    nowData:state => state.svgData.nowData,
    d3DataList:state => state.svgData.d3DataList
}
export default getters