<template>
	<view class="status_bar flexBox" :class="[scrollTopt>0?'fixedbotto':'','']">
		<view class="search">
			<input type="text" v-model="search" placeholder="请输入搜索内容">
			<view class="search-btn" @tap="searchClick">
				搜索
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'SearchBar',
		data() {
			return {
				search: "",
			}
		},
		props: {
			click: {
				type: Function,
			},
			scrollTopt: {
				type: Number,
				default: 0
			}
		},
		methods: {
			searchClick() {
				if (this.click) this.click()
				else
					uni.redirectTo({
						url: `secondHand?search=${this.search}`
					})
			},
		}
	}
</script>

<style scoped lang="scss">
	.status_bar {
		width: calc(100% - 40rpx);
		padding: 0 20rpx;
		height: 80rpx;

		padding-top: var(--status-bar-height);

		.search {
			width: calc(100%);
			height: 60rpx;
			border-radius: 10rpx;
			box-shadow: 0rpx 0rpx 15rpx 6rpx rgba(52, 52, 52, 0.1);
			display: flex;
			color: $uni-text-color;

			input {
				width: calc(100% - 140rpx);
				;
				height: 60rpx;
				font-size: 26rpx;
				padding: 0 20rpx;
				border-radius: 5rpx;
			}

			.search-btn {
				width: 99rpx;
				height: 60rpx;
				border-left: 1rpx solid rgba(52, 52, 52, 0.1);
				font-size: 28rpx;
				color: $uni-text-color;
				text-align: center;
				line-height: 60rpx;
			}
		}
	}
</style>
