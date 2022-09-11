export default {
	state: {
		beian: "",
		name: "",
		appMarketCloseImg: "",
		appRegisterBackgroundImage: "",
		isMarketOpen: true
	},
	mutations: {
		SET_CONFIG(state, data) {
			Object.assign(state, data)
		}
	}
}
