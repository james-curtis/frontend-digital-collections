<template>
	<view id="afs"></view>
</template>

<script>
	import http from '@/common/http.js'
	import {
		mapState
	} from 'vuex'
	export default {
		name: 'Valid',
		data() {
			return {
				sessionId_: '',
				sig: '',
				token: '',
			}
		},
		computed: {
			...mapState({
				yundunAppKey: s => s.config.yundunAppKey,
				yundunScene: s => s.config.yundunScene,
			})
		},
		mounted() {
			this.initAWSC()
		},
		methods: {
			initAWSC() {
				const toggleAWSC = () => {
					if (!document.getElementById('afs')) return false
					if (document.getElementById('afs').style.display !== 'flex')
						document.getElementById('afs').style.display = 'flex'
					else document.getElementById('afs').style.display = 'none'
				}
				// toggleAWSC()

				const appkey = this.yundunAppKey
				const scene = this.yundunScene
				// 实例化ic对象
				AWSC.use("ic", function(state, module) {
					// 初始化
					window.ic = module.init({
						// 应用类型标识。它和使用场景标识（scene字段）一起决定了智能验证的业务场景与后端对应使用的策略模型。您可以在阿里云验证码控制台的配置管理页签找到对应的appkey字段值，请务必正确填写。
						appkey,
						// 使用场景标识。它和应用类型标识（appkey字段）一起决定了智能验证的业务场景与后端对应使用的策略模型。您可以在阿里云验证码控制台的配置管理页签找到对应的scene值，请务必正确填写。
						scene,
						// 声明智能验证需要渲染的目标元素ID。
						renderTo: 'afs',
						// 验证通过时会触发该回调参数。您可以在该回调参数中将会话ID（sessionId）、签名串（sig）、请求唯一标识（token）字段记录下来，随业务请求一同发送至您的服务端调用验签。
						success: async (data) => {
							window.console && console.log(data.sessionId)
							window.console && console.log(data.sig)
							window.console && console.log(data.token)
							const res = await http.post('Validate/valid', data)
							if (res.Code !== 100) return false;
							setTimeout(() => {
								uni.reLaunch({
									url: '/pages/index/index',
								})
							}, 500)
						},
						// 验证失败时触发该回调参数
						fail: function(failCode) {
							console.log(failCode)
						},
						// 验证码加载异常时触发该回调参数
						error: function(errorCode) {
							console.log(errorCode)
						}
					});
				})
			}
		}
	}
</script>

<style>
	#afs {
		width: 100vw;
		height: 100vh;
		position: fixed;
		inset: 0;
		z-index: 99999;
		background-color: white;
		display: flex;
		/* display: none; */
		align-items: center;
		justify-content: center;
	}
</style>
