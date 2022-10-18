export default {
	state: {
		beian: "",
		appLogo: "",
		name: "",
		contactPhone: "",
		contactQR: "",
		appMarketCloseImg: "",
		appRegisterBackgroundImage: "",
		isMarketOpen: true,
		isOpenIndexPageCalendar: true,
		yundunAppKey: '',
		yundunScene: '',
		checkoutTips: '',
		beckoningTips: '进行实名认证,需要本人亲自完成!',

		// 商品销售结束显示图片
		goodEnd: '',
	},
	mutations: {
		SET_CONFIG(state, data) {
			Object.assign(state, data)
		}
	},
}
