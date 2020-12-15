import store from '@/store'
import commonUtils from "@/utils/commonUtils.js"
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/Home.vue'),
    meta: { title: '主页', rule:"Home",control:false},
    redirect: '/InvestigationConfig',
    children: [
      {
        path: 'dayDataSummary',
        name: 'DayDataSummary',
        component: () => import('@/views/dayDataSummary/DayDataSummary.vue'),
        meta: { title: '日度数据整理', rule:"DayDataSummary",control:false}
      }
    ]
  },
]

//返还可用路由
function vailableRoutes() {
  let newRoutes = commonUtils.deepCopy(routes);
  buildRoutes(newRoutes)
  return newRoutes;
}
//构建可用路由
function buildRoutes(newRoutes){
  let length = newRoutes.length;
  for(let i=0;i<length;i){
    if(newRoutes[i].meta.control){
      // 如果进行控制则判断是否有权限
      if(store.getters.ruleList.indexOf(newRoutes[i].meta.rule)==-1){
        // 失败删除此元素跳入下一循环
        newRoutes.splice(i,1);
        length--;
        continue;
      }
    }
    if(newRoutes[i].children!=null && newRoutes[i].children.length > 0){
      // 递归
      buildRoutes(newRoutes[i].children);
    }
    i++
  }
}

export default vailableRoutes()