import router from './router'
import store from './store'
import vailableRoutes from './router/routes'
import commonUtils from "./utils/commonUtils.js"
import {getCookie,removeCookie} from "./utils/auth.js"


router.beforeEach(async (to, from, next) => {
	if (to.path === '/login'||to.path ==='/temp') {
		if(commonUtils.isNull(store.getters.custId) && commonUtils.isNull(getCookie("custId"))){
			next();
		}else{
			next('/');
		}
	}else{
		let temp = store.getters.custId
		temp
		if(commonUtils.isNull(store.getters.custId)){
			// 无cookie记录 不自动登录 跳转login
			if(commonUtils.isNull(getCookie("custId"))){
				next('/login');
			}else{
				// 自动登录
				let loginForm = {'custId':getCookie("custId"),custPwd:getCookie("custPwd")};
				await store.dispatch('cust/login', loginForm).then(() => {
					// 登录成功
					router.addRoutes(vailableRoutes);
					next({...to });
				}).catch(() => {
					//登录失败清楚cookie  跳转login
					removeCookie();
					next('/login')
				})
			}
		}else{
			next();
		}
	}
})