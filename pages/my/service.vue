<template>
	<view class="content container">
		<view class="text">
			{{contactPhone}}
		</view>
		<view class="box">
			<image class="box-img" :src="contactQR" mode=""></image>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {}
		},
		computed: {
			...mapState({
				contactPhone: s => s.config.contactPhone,
				contactQR: s => s.config.contactQR,
			})
		},
		methods: {
			async getList() {
				try {
					let res = await this.$http.get('index/contacts');
					console.log(res);
					this.img = res[1];
					this.phone = res[0].value;
				} catch (e) {
					this.toast(e);
				}
			},
			callPhone() {
				// #ifdef H5
				this.copy(this.phone);
				return;
				// #endif
				uni.makePhoneCall({
					phoneNumber: this.phone
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		position: relative;
		overflow: hidden;

		.title {
			width: 100%;
			margin-top: 40rpx;
			padding: 0 30rpx;
			font-size: 43rpx;
			font-family: KaiTi;
			font-weight: bold;
			color: $uni-text-color;
		}

		.text {
			width: 100%;
			margin-top: 30rpx;
			padding: 0 30rpx;
			font-size: 28rpx;
			font-family: Microsoft YaHei;
			font-weight: bold;
			color: $uni-text-color;
		}

		.box {
			margin: 40rpx auto;
			width: 362rpx;
			height: 412rpx;

			.box-top {
				padding: 0 20rpx;
				height: 60rpx;
				font-size: 30rpx;
				font-family: Microsoft YaHei;
				font-weight: bold;
				color: $uni-text-color;
				line-height: 60rpx;
			}

			.box-img {
				display: block;
				margin: 0 auto;
				margin-top: 20rpx;
				width: 290rpx;
				height: 290rpx;
			}
		}

		.btn {
			margin: 40rpx auto;
			width: 687rpx;
			height: 100rpx;
			background: #00DB7D;
			border-radius: 10rpx;
			font-size: 30rpx;
			font-family: Microsoft YaHei;
			font-weight: bold;
			color: #fff;
			text-align: center;
			line-height: 100rpx;
		}
	}
</style>
