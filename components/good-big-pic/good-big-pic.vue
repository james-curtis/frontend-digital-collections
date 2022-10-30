<template>
	<view class="bigbox">
		<img :src='info.image' style="width: 100%;height: auto;"></img>
		<slot name="goodStockDesc" :info='info' v-if="showRemainingItems">
			<view class="flex good-stock-desc">
				<view class="flexBox LimitBox">
					<view class="Limit">剩余</view>
					<view class="stock">{{info.surplus}}份</view>
				</view>
				<view class="flexBox LimitBox" v-if="info.xgstatus">
					<view class="Limit">限购</view>
					<view class="stock">{{info.xgstatus}}份</view>
				</view>
			</view>
		</slot>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		name: 'GoodBigPic',
		computed: {
			...mapState({
				showRemainingItems: s => s.config.showRemainingItems
			})
		},
		props: {
			info: {
				type: Object,
				required: true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bigbox {
		// background: url(../../static/img/detail-bg.png) no-repeat left top;
		background: url(../../static/img/index/bg.jpg) no-repeat left top;
		background-size: 100%;
		background-color: #000;
		position: relative;

		.good-stock-desc {
			justify-content: center;
			position: absolute;
			bottom: 30px;
			left: 50%;
			transform: translateX(-50%);
			width: 100%;
		}
	}

	.LimitBox {
		// width: 200rpx;
		height: 40rpx;
		line-height: 40rpx;
		background: #4C464A;
		border-radius: 6rpx;
		font-size: 24rpx;
		text-align: center;
		margin-right: 20rpx;

		.Limit {
			min-width: 60rpx;
			padding: 0 8rpx;
			border-radius: 6rpx;
			color: #010101;
			background-color: #F1E2BC;
		}

		.stock {
			min-width: 80rpx;
			padding: 0 8rpx;
			color: #F1E2BC;
		}
	}
</style>
