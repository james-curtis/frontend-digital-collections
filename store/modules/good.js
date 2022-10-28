export default {
	state: {
		good_desc: {
			name: '作品名称',
			id: '商品编号',
			creator: '作品指纹',
			owner: '合约地址',
			casting_name: '合约平台',
			casting_time: '铸造时间',
			content: '藏品介绍',
			gmsm: '购买说明',
		},
		secondMarketGoodList: []
	},
	mutations: {
		SET_GOOD_DESC(state, data) {
			Object.assign(state.good_desc, data)
		},
		SET_GOOD_STORE_DESC(state, data) {
			Object.assign(state, data)
		}
	},
	actions: {}
}
