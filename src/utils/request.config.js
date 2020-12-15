export default {
	//baseURL: 'http://10.35.106.143/', // api的base_url
	// 自定义的请求头
	headers: {
		'Content-Type': 'application/json;charset=utf-8',
	},
	// 超时设置
	timeout: 60000,
	// 跨域是否带Token
	withCredentials: false,
	// 响应的数据格式 json / blob /document /arraybuffer / text / stream
	responseType: 'json'
}