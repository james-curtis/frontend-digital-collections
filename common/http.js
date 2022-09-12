import {
	baseUrl
} from '../app.config.js'

function callback(res, resolve) {
	const pages = getCurrentPages()
	const vm = pages.pop()
	if (res[1].data.code == 401) {
		const path = "/pages/login/login"
		if (vm.$route.path === path) return false
		uni.showToast({
			title: "请先登录",
			icon: "none",
		})
		setTimeout(() => {
			uni.navigateTo({
				url: path
			})
		}, 1000)
		return
	} else if (res[1].data.code == 402) {
		const path = "/pages/my/mySetSecPsd"
		if (vm.$route.path === path) return false
		uni.showToast({
			title: "请先设置支付密码",
			icon: "none",
		})
		setTimeout(() => {
			uni.navigateTo({
				url: path
			})
		}, 1000)
	} else if (res[1].data.code == 403) {
		const path = "/pages/login/bindPhone"
		if (vm.$route.path === path) return false
		uni.showToast({
			title: "请先绑定手机号",
			icon: "none",
		})
		setTimeout(() => {
			uni.navigateTo({
				url: path
			})
		}, 1000)
	} else if (res[1].data.code === 601) {
		// 滑动验证
		const path = "/pages/login/valid"
		if (vm.$route.path === path) return false
		uni.navigateTo({
			url: path
		})
	} else {
		resolve(res[1].data)
	}
}

const post = (url, data, hideloding) => {

	let token = ''
	try {
		token = uni.getStorageSync("app_token")
	} catch (e) {}

	let httpDefaultOpts = {
		url: baseUrl + url,
		data: data,
		method: "POST",
		header: {
			'Accept': 'application/json',
			'Content-Type': 'application/x-www-form-urlencoded',
			'token': token
		},
		dataType: 'json',
		withCredentials: true
	}
	let promise = new Promise(function(resolve, reject) {
		uni.request(httpDefaultOpts).then(
			(res) => callback(res, resolve)
		)
	})
	return promise
};

const get = (url, data, hideloding) => {
	let httpDefaultOpts = ''
	let token = ''
	try {
		token = uni.getStorageSync("app_token")
	} catch (e) {}
	httpDefaultOpts = {
		url: baseUrl + url,
		method: "GET",
		data: data,
		header: {
			'Accept': 'application/json',
			'Content-Type': 'application/x-www-form-urlencoded',
			'token': token
		},
		dataType: 'json',
		withCredentials: true
	}
	let promise = new Promise(function(resolve, reject) {
		uni.request(httpDefaultOpts).then(
			(res) => callback(res, resolve)
		)
	})
	return promise
};
export default {
	post,
	get,
	baseUrl
}
