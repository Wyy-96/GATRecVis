import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//配置项
const routes = [
  {
    path: '/',
    name: 'Temp',
    component: () => import('@/views/public/Temp.vue')
  }
]


const createRouter = () => new VueRouter({
  routes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
