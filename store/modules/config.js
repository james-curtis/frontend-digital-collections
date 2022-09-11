export default {
	state: {
		beian: "",
		appLogo: "",
		name: "",
		contactPhone: "",
		contactQR: "",
		appMarketCloseImg: "",
		appRegisterBackgroundImage: "",
		isMarketOpen: true
	},
	mutations: {
		SET_CONFIG(state, data) {
			Object.assign(state, data)
		}
	},
}
