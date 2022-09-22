<template>
	<view class="content container">

		<view class="goodsList">
			<view class="goodsItem" v-for="(item, index) in collectionList" :key="item.id"
				@tap="goDetail(item.id,item.mycp_number)">
				<image class="goodsImg" :src="item.goods_image" mode="aspectFill"></image>
				<view class="goodsinfo" style="padding-left: 0;">
					<view class="goodsName">{{item.goods_name}}</view>
				</view>
				<view class="goodsinfo" style="padding: 0;">
					<view class="goodsName" style="font-size: 24rpx;">编号:{{item.mycp_number}}</view>
				</view>
			</view>
		</view>

		<uni-footer currentTab="3"></uni-footer>
	</view>
</template>

<script>
	import {
		mapState,
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				collectionList: []
			}
		},
		watch: {
			collectionListUnique: {
				handler(val) {
					this.collectionList = val
						.find(e => Number(e.goods_id) === Number(this.$route.query.goodsId)).children
				},
				deep: true,
				immediate: true
			}
		},
		computed: {
			...mapState({
				member: s => s.user.member,
			}),
			...mapGetters(['collectionListUnique']),
		},
		methods: {
			goDetail(a, mycp_number) {
				uni.navigateTo({
					url: `../user/myArtDetail?goodsId=${a}&mycp_number=${mycp_number}`
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 20px 0 0;
	}

	.goodsList {
		padding: 0 30rpx;
		display: flex;
		flex-wrap: wrap;

		justify-content: space-between;

		.goodsItem {
			width: 335rpx;
			border-radius: 20rpx;
			margin-bottom: 20rpx;

			.goodsImg {
				width: 335rpx;
				height: 335rpx;
				border-radius: 20rpx;
			}

			.goodsinfo {
				padding: 20rpx;
				display: flex;
				justify-content: space-between;

				.goodsName {
					font-size: 26rpx;
					font-weight: 500;
					// color: #333333;
					color: $uni-text-color;
					overflow: hidden;
					word-break: break-all;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
				}
			}

			.label {
				height: 40rpx;
				line-height: 40rpx;
				background: #EDDFC0;
				border-radius: 6rpx;
				font-size: 22rpx;
				padding: 0 16rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #333333;
			}

			.labelwrapper {
				height: 40rpx;
				line-height: 40rpx;
				background: #59699A;
				border-radius: 6rpx;
				font-size: 22rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				padding-right: 16rpx;
				margin: 0 16rpx;
				display: flex;
			}
		}

		.listItem {
			width: 100%;
			border-radius: 10rpx;
			margin-bottom: 30rpx;
			padding: 0 30rpx;
			background-color: #1B1A1A;

			.goodsList {
				padding: 30rpx 0;
				display: flex;
				align-items: center;

				.goodImg {
					width: 160rpx;
					height: 160rpx;
					margin-right: 20rpx;
				}

				.msgBox {
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-around;

					.goodName {
						font-size: 28rpx;
						font-weight: 400;
						color: #FFFFFF;
						line-height: 40rpx;
						margin-bottom: 20rpx;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
						display: flex;
						justify-content: flex-start;

						.manghe_flag {
							width: 60rpx;
							height: 32rpx;
							line-height: 32rpx;
							text-align: center;
							padding: 2rpx 4rpx;
							background: #00DB7D;
							margin-right: 10rpx;
							border-radius: 4rpx;
							color: #333;
							font-size: 24rpx;
						}
					}

					.time {
						color: #AAAAAA;
						font-size: 24rpx;
						text-align: right;
						padding: 15rpx 0rpx;
					}

					.no_open {
						margin-left: 20rpx;
						color: red;
					}

					.total {
						margin-left: 0rpx;
					}
				}

				.gotoMangheBtn {
					width: 150rpx;
					height: 50rpx;
					background: #00DB7D;
					border-radius: 30rpx;
					line-height: 50rpx;
					padding: 4rpx 10rpx;
					color: #333;
					text-align: center;
					font-size: 26rpx;
					font-weight: bold;
				}
			}


			.handBox {
				height: 108rpx;
				font-size: 28rpx;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				border-top: 2rpx solid #666262;

				.Btn {
					width: 140rpx;
					height: 56rpx;
					line-height: 56rpx;
					text-align: center;
					border-radius: 28rpx;
					font-weight: 500;
					font-family: PingFangSC-Medium;
					font-size: 28rpx;
					border: 2rpx solid #777777;
					color: #777777;
					margin-left: 20rpx;
				}

				.payBtn {
					border: 2rpx solid #4BAE45;
					color: #4BAE45;
				}

			}
		}
	}
</style>
