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
		showRemainingItems: true,
		beckoningTips: '进行实名认证,需要本人亲自完成!',

		// 商品销售结束显示图片
		goodEnd: '',

		// 商品余量描述
		descSurplusOnPersonal: '流通',
		descTotalOnPersonal: '总发行',
		descSurplusOnMall: '剩余',
		descTotalOnMall: '总量',

		rechargeQuickList: ["10", "15", "20", "100", "150"],
	},
	mutations: {
		SET_CONFIG(state, data) {
			Object.assign(state, data)
		}
	},
}
