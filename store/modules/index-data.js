export default {
	state: {
		banner: [],
		shopList: []
	},
	mutations: {
		SET_INDEX_DATA_STATE(state, data) {
			Object.assign(state, data)
		}
	},
}
