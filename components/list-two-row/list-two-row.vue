<template>
	<view class="goodsList">
		<view class="goodsItem" v-for="(item, index) in goodsList" :key="index"
			@tap="go(`secondGoodsDetail?goodsId=${item.id}`)">
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
	export default {
		name: 'ListTwoRow',
		props: {
			goodsList: Array
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
