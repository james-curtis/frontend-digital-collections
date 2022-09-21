import http from '@/common/http.js'
export default {
	state: {
		member: {},
		collectionList: []
	},
	mutations: {
		SET_USER_DATA(state, data) {
			Object.assign(state, data)
		}
	},
	getters: {
		collectionListUnique(state) {
			return Object.values(state.collectionList.reduce((prev, cursor, index, array) => {
				if (!prev[cursor.goods_id])
					prev[cursor.goods_id] = JSON.parse(JSON.stringify(cursor))
				if (!prev[cursor.goods_id].children) prev[cursor.goods_id].children = []
				prev[cursor.goods_id].children.push(cursor)
				return prev;
			}, {}))
		}
	},
	actions: {
		getMemInfo(ctx) {
			http.get('user/userInfo').then(res => {
				if (res.code == 1) {
					ctx.commit('SET_USER_DATA', {
						member: res.data
					})
					uni.setStorageSync('phone', res.data.phone);
					uni.setStorageSync('wx_auth', res.data.wx_small_auth);
				}
			})
		},
		getList(ctx, showType) {
			let data = {
				status: showType
			}
			http.post('order/collectionList', data).then(res => {
				if (res.code == 1) {
					ctx.commit('SET_USER_DATA', {
						collectionList: res.data
					})
				}
			})
		},
		clearList(ctx) {
			ctx.commit('SET_USER_DATA', {
				collectionList: []
			})
		},
	}
}
