// vue.config.js，如没有此文件则手动创建
module.exports = {
	transpileDependencies: ['uview-ui'],
	devServer: {
		disableHostCheck: true,
		proxy: {
			'/api': {
				target: 'http://digital.cc',
				pathRewrite: {
					'^/api': ''
				},
			}
		},
	}
}
