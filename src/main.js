import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false


import * as d3 from 'd3'
Vue.prototype.$d3 = d3 //echarts全局挂载

import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';// 默认主题
// import './style/theme/index.css' // 导入自定义主题
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
