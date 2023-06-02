export const useWxApi = (Vue, vm) => {
	return {
		// 获取openid
		getOpenId: (code) => vm.$u.get('/appletsUser/openId', {
			code
		}),
		// 通过openid登录
		loginByOpenId: (openId) => vm.$u.get('/appletsUser/loginByOpenId', {
			openId
		}),
		loginByPhone: (loginForm) => vm.$u.post('/sms/login', {
			...loginForm
		}),
		getSmsCode: (openId) => vm.$u.post('/sms/code', {
			mobile:openId
		}),
		loginByPassword: (loginForm) => vm.$u.post('/login', {
			...loginForm
		}),
		getUserInfo:() => vm.$u.get('/getInfo', {
			
		}),
		getUserBalance:() => vm.$u.get('/chat/user/balance', {
			
		}),
		register:(loginForm) => vm.$u.post('/register', loginForm),
		registerAndLogin:(loginForm) => vm.$u.post('/registerAndLogin', loginForm),
		logout:(loginForm) => vm.$u.post('/logout', loginForm),
	}
}
