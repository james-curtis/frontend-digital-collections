let baseUrl = '/'
if (process.env.NODE_ENV === 'development') {
	//本地路径
	baseUrl = '//nft1.testsite.tianhaoltd.top/api/'
} else {
	//线上路径
	// baseUrl = 'http://api.alpha.jzjxxy.top/api/'
	baseUrl = '//api.space-9.cn/api/'
}

export {
	baseUrl
}
