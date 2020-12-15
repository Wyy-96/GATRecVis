import {MessageBox} from 'element-ui';

import axios from 'axios'
import config from './request.config.js'
import store from '@/store'
//import { removeCookie } from "@/utils/auth";
//import router from '@/router'

//import commonUtils from "@/utils/commonUtils.js"
// 创建axios实例 
const service = axios.create(config)

// request拦截器
service.interceptors.request.use(config => {
	store.getters.key;
	// 发出请求前的处理
	// config.headers['loginId'] = store.getters.userId
	// config.headers['sessionKey'] = store.getters.key // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
	return config
}, error => {
	console.log(error)
	Promise.reject(error)
})

// response 拦截器
service.interceptors.response.use(
// 如果您想要获取诸如头或状态之类的http信息
// 请返回response=>response
	response => {
		switch(response.data.return_code){
			case '200' :
				return Promise.resolve(response.data.data);
			case '603':
				MessageBox.alert(response.data.retObj, "返回异常", {
					type: "error"
				});
				return Promise.reject(response.data.retObj)
			case '602':
				MessageBox.alert(response.data.retObj, "返回异常", {
					type: "error"
				});
				return Promise.reject(response.data.retObj)
		}
	},
	error => {
		if(error.response.status==500){
			MessageBox.alert(error.response.message, "返回异常", {
				type: "error"
			});
			return Promise.reject(error)
		}else if(error.response.status==405){
			MessageBox.alert(error.response.message, "接口类型错误", {
				type: "error"
			});
		}
		return Promise.reject(error)
	}
)
const PUBLIC_API="/vir"
export default {
	post(url,data){
		url=PUBLIC_API+url;
		return service({
			method: process.env.VUE_APP_ENV_METHOD,
			url,
			data: data
		})
	},
	get(url,data){
		url=PUBLIC_API+url
		return service({
			method: 'get',
			url,
			params: data
		})
	},
	fileUpload(fileobj){
		let param = new FormData();
    // 上传文件对象 名称file与后台控制器参数要一致
		param.append('fileupload',fileobj.file);
		return service({
			method: 'post',
			// 上传地址
			url: PUBLIC_API+'/FileController/FileUploadFlow',
			// 定义上传头
			headers: {'Content-Type':'multipart/form-data'},
			data: param
		});
	},
}