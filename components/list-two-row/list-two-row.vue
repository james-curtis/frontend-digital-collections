<template>
	<view class="goodsList">
		<view class="goodsItem" v-for="(item, index) in goodsList" :key="item.id"
			@tap="go(`secondGoodsDetail?goodsId=${item.id}`)">
			<view class="mask">
				<view class="" v-if="item.status == 3 && item.surplus > 0 ">
					<image :src='goodEnd' class="mask"></image>
				</view>
			</view>
			<image class="goodsImg" :src="item.image" mode=""></image>
			<view class="goodsinfo">
				<view class="flex_bt">
					<view class="goodsName">{{item.name}}</view>
					<view class="goodsPrice">
						{{item.price}}
					</view>
					<!-- <view class="label">{{item.goods_category_name}}</view> -->
				</view>
				<view class="flexBox flex_bt"
					style="margin-top: 20rpx;flex-direction: column;align-items: flex-start;gap: 10px;">
					<view class="label">{{item.goods_category_name}}</view>
					<view class="flexBox LimitBox">
						<view class="Limit">剩余/总量</view>
						<view class="stock">{{item.surplus}}/{{item.stock}}</view>
					</view>
				</view>

				<!-- 	<view class="">
					<view class="goodsPrice">
						<text class="size-22">当前 ¥</text>{{item.price}}
					</view>
				</view> -->

			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		name: 'ListTwoRow',
		props: {
			goodsList: Array
		},
		computed: {
			...mapState({
				goodEnd: s => s.config.goodEnd
			})
		}
	}
</script>

<style lang="scss" scoped>
	.LimitBox {
		height: 40rpx;
		line-height: 40rpx;
		background: #3A3A3A;
		border-radius: 6rpx;
		font-size: 24rpx;

		.Limit {
			padding: 0 10rpx;
			border-radius: 6rpx;
			color: #010101;
			background-color: #FFE9B5;
		}

		.stock {
			padding: 0 15rpx;
			color: #fff;
		}
	}

	.goodsList {
		padding: 0 28rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

		.goodsItem {
			width: 335rpx;
			margin-bottom: 25rpx;
			background: $uni-text-color-inverse;
			border-radius: 20rpx;
			position: relative;

			.mask {
				width: 330rpx;
				height: 300rpx;
				border-radius: 30rpx;
				position: absolute;
				left: 0;
				top: 0;
				z-index: 10;

				.state {
					display: inline-block;
					padding: 0 18rpx;
					height: 40rpx;
					line-height: 40rpx;
					text-align: center;
					color: #fff;
					font-size: 24rpx;
					border-radius: 22rpx;
					background: linear-gradient(90deg, #00D18B 0%, #00D18B 100%);
					margin-top: 30rpx;
					margin-left: 28rpx;
				}

				.state1 {
					color: rgba(255, 255, 255, 0.6);
					background: #010004;
					border-radius: 22rpx;
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					display: flex;
					max-width: 150rpx;
					box-sizing: border-box;

					.time {
						height: 26rpx;
						width: 26rpx;
						margin-right: 8rpx;
						margin: auto 8rpx auto 0;
					}
				}

				.center {
					width: 235rpx;
					height: 177rpx;
					background: url(../../static/img/index/bj.png) no-repeat left top;
					background-size: 100%;
					margin: 40rpx auto;

					image {
						width: 150rpx;
						height: 150rpx;
						border-radius: 12rpx;
					}
				}
			}


			.goodsImg {
				width: 330rpx;
				height: 300rpx;
				border-radius: 20rpx;
			}

			.goodsinfo {
				padding: 20rpx 20rpx;

				.label {
					height: 40rpx;
					line-height: 40rpx;
					text-align: center;
					font-size: 24rpx;
					padding: 0 10rpx;
					background: #FFE9B5;
					border-radius: 6rpx;
					color: #1E1817;
				}

				.goodsName {
					flex: 1;
					font-size: 28rpx;
					font-weight: 500;
					color: $uni-text-color;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}

				.creator {
					width: 40%;
					color: #FFFFFF;
					font-size: 20rpx;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}

				.goodsPrice {
					color: $uni-text-color;
					font-size: 28rpx;
					font-weight: 500;
				}
			}
		}
	}
</style>
