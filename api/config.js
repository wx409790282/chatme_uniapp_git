// api请求地址
// export const HTTP_URL_DEV = 'http://47.106.224.109:8080'
export const HTTP_URL_DEV = 'http://localhost:8080'
export const HTTP_URL_PROD = 'http://localhost:8080/'

// api前缀
export const HTTP_URL_DEV_PREFIX = ''
export const HTTP_URL_PROD_PREFIX = '/api'
export const SOCKET_URL_PREFIX = '/sms/message/'

// 基于uview-ui的http配置
export const UVIEWUI_HTTP_CONFIG = {
	// 地址
	baseUrl: process.env.NODE_ENV === 'development' ?
		HTTP_URL_DEV + HTTP_URL_DEV_PREFIX : HTTP_URL_PROD + HTTP_URL_PROD_PREFIX,
	baseProfileUrl: process.env.NODE_ENV === 'development' ?
			HTTP_URL_DEV+"/profile" + HTTP_URL_DEV_PREFIX : HTTP_URL_PROD +"/profile"+ HTTP_URL_PROD_PREFIX,
	wsUrl: process.env.NODE_ENV === 'development' ?
			HTTP_URL_DEV.replace("http","ws").replace("localhost","127.0.0.1")+ SOCKET_URL_PREFIX : HTTP_URL_PROD.replace("http","ws")+ SOCKET_URL_PREFIX ,
	
	// 请求方式
	method: 'GET',
	// 参数类型
	dataType: 'json',
	// 是否显示请求中的loading
	showLoading: true,
	// 请求loading中的文字提示
	loadingText: '请求中...',
	// 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
	loadingTime: 800,
	// 是否在拦截器中返回服务端的原始数据
	originalData: true,
	// 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
	loadingMask: true,
	// 配置请求头信息
	header: {
		'content-type': 'application/json;charset=UTF-8',
	},
}

// 此处配置请求拦截器
export const httpRequest = (config) => {
	const token = uni.getStorageSync('APP_USER_TOKEN')
	config.header = {
		Authorization: 'Bearer ' +token
	}
	return config;
}

// 此处配置响应拦截器
export const httpResponse = (response) => {
	let res = response
	// if (error) {
	//   toast('后端接口连接异常')
	//   reject('后端接口连接异常')
	//   return
	// }
	const code = res.data.code || 200
	const msg = res.data.msg 
	if (code === 401) {
		uni.showModal({
			title: '重新登录',
			content: '登录状态已过期，您可以继续留在该页面，或者重新登录?',
			cancelText: '取消',
			confirmText: '确定',
			success: function(res) {
			  uni.reLaunch({ url: '/pages/login/index' })
			}
		})
	  
	  // toast('无效的会话，或者会话已过期，请重新登录。')
	} else if (code === 500) {
	  uni.showToast({
	  	title: msg,
	  	icon: 'none',
	  	duration: 3000
	  })
	  // reject(res.data)
	} else if (code !== 200) {
		uni.showToast({
			title: msg,
			icon: 'none',
			duration: 3000
		})
		// return res
		// reject(res.data)
	}else{
		return res.data
		resolve(res.data)
	}
	
	
}

// http安装方法
export const installHttpConfig = (Vue, vm) => {
	Vue.prototype.$u.http.setConfig(UVIEWUI_HTTP_CONFIG);
	Vue.prototype.$u.http.interceptor.request = httpRequest
	Vue.prototype.$u.http.interceptor.response = httpResponse
}
