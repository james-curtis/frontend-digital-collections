export default {
	state: { //存放状态
		beian: "",
		name: ""
	},
	mutations: {
		SET_CONFIG(state, data) {
			if (data?.beian)
				state.beian = data.beian
			if (data?.name)
				state.name = data.name
		}
	}
}
