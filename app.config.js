let baseUrl = '/'
if (process.env.NODE_ENV === 'development') {
	//本地路径
	baseUrl = 'http://nft1.liulifrpnode1.ml/api/'
} else {
	//线上路径
	baseUrl = 'http://api.alpha.jzjxxy.top/api/'
}

export default {
	base: baseUrl
}
