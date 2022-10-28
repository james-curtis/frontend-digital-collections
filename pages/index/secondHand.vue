<template>
	<view class="content">
		<view v-if="isMarketOpen">
			<view class="status_bar flexBox" :class="[scrollTopt>0?'fixedbotto':'','']">
				<view class="search">
					<input type="text" v-model="search" placeholder="请输入搜索内容">
					<view class="search-btn" @tap="searchClick">
						搜索
					</view>
				</view>
			</view>
			<swiper class="banner" indicator-dots="true" circular="true" autoplay="true" interval="2000" duration="500"
				indicator-color="#FFFFFF" indicator-active-color="#00D18B">
				<swiper-item v-for="(item, index) in banner" :key="index">
					<image :src="item.image" mode=""></image>
				</swiper-item>
			</swiper>

			<view class="tabBox flex_bt">
				<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="120">
					<view :class="gid == item.id ? 'tab scroll-view-item_H act' : 'tab scroll-view-item_H'"
						v-for="(item, index) in CategoryList" @tap="reload(item.id)" :key="index">{{item.name}}</view>
				</scroll-view>
				<image class="right" v-if="block" @tap="block = !block" src="../../static/img/index/a2.png" mode="">
				</image>
				<image class="right" v-if="!block" @tap="block = !block" src="../../static/img/index/a1.png" mode="">
				</image>
			</view>


			<view class="goodsList" v-if="block">
				<view class="goodsItem" v-for="(item, index) in GoodsList" :key="index"
					@tap="go(`secondGoodsDetail?goodsId=${item.id}`)">
					<image class="goodsImg" :src="item.image" mode=""></image>
					<view class="goodsinfo">
						<view class="flex_bt">
							<view class="goodsName">{{item.name}}</view>
							<!-- <view class="label">{{item.goods_category_name}}</view> -->
						</view>
						<view class="flexBox flex_bt" style="margin-top: 20rpx;">
							<view class="label" v-if="item.goods_category_name">{{item.goods_category_name}}</view>
							<view class="goodsPrice" v-else>{{''}}</view>
							<view class="goodsPrice">
								{{item.price}}
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

			<view class="goodsList1" v-if="!block">
				<view class="goodsItem flex" v-for="(item, index) in GoodsList" :key="index"
					@tap="go(`secondGoodsDetail?goodsId=${item.id}`)">
					<image class="goodsImg" :src="item.image" mode=""></image>
					<view class="goodsinfo">
						<view class="goodsName">{{item.name}}</view>
						<view class="label">{{item.goods_category_name}}</view>
						<view class="creator">{{item.creator}}</view>
						<view class="goodsPrice">当前 ¥ <text style="font-size: 36rpx;">{{item.price}}</text></view>
					</view>
				</view>
			</view>

			<uni-load-more :status="status" v-if="GoodsList.length"></uni-load-more>
		</view>
		<view class="content-wrapper" v-else>
			<image :src="appMarketCloseImg" class="app-market-close-img"></image>
		</view>
		<uni-footer currentTab="1"></uni-footer>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				gid: '',
				search: "",
				banner: [],
				GoodsList: [],
				CategoryList: [{
					id: 0,
					name: '全部'
				}],
				status: 'more',
				pagesize: 15,
				page: 1,
				flag: false, //上拉加载
				block: true,
				scrollTopt: 0,
			};
		},
		computed: {
			...mapState({
				isMarketOpen: s => s.config.isMarketOpen,
				appMarketCloseImg: s => s.config.appMarketCloseImg,
				secondMarketGoodList: s => s.good.secondMarketGoodList,
			})
		},
		onShow(e) {
			this.Reset();
		},
		onPageScroll(e) {
			this.scrollTopt = e.scrollTop;
			if (this.scrollTopt > 220) {}
		},
		onPullDownRefresh() {
			this.Reset();
		},
		onReachBottom() {
			if (!this.flag) {
				this.status = "loading";
				this.page++;
				this.getGoodsList();
			}
		},
		beforeMount() {
			this.search = this.$route.query?.search
		},
		watch: {
			appMarketCloseImg: {
				handler(val) {
					// #ifdef H5
					if (!this.isMarketOpen)
						document.body.style.setProperty('--bkg', `url(` + val + `)`)
					// #endif
				},
				immediate: true
			},
			GoodsList: {
				handler(newValue) {
					this.$store.commit('SET_GOOD_STORE_DESC', {
						secondMarketGoodList: newValue
					})
				},
				deep: true,
				immediate: true
			}
		},
		methods: {
			searchClick() {
				this.gid = '';
				this.flag = false;
				this.page = 1;
				this.GoodsList = [];
				this.getGoodsList();
			},
			Reset() {
				this.flag = false;
				this.page = 1;
				this.GoodsList = [];
				this.CategoryList = [{
					id: 0,
					name: '全部'
				}]
				this.getBanner();
				this.getCategoryList();
			},
			reload(a) {
				if (this.gid != a) {
					this.gid = a;
					this.flag = false;
					this.page = 1;
					this.GoodsList = [];
					this.getGoodsList()
				}
			},
			getCategoryList() {
				this.$http.get('goods/goodsCategoryList').then(res => {
					if (res.code == 1) {
						this.CategoryList = this.CategoryList.concat(res.data);
						this.gid = 0;
						this.getGoodsList();
					}
				})
			},
			getGoodsList() {
				let data = {
					goods_category_id: this.gid,
					page: this.page,
					pagesize: this.pagesize,
				}
				if (this.search) {
					data.search = this.search;
				}
				this.$http.get('order/memberGoodsList', data).then(res => {
					uni.stopPullDownRefresh();
					if (res.code == 1) {
						if (res.data.data.length != 0) {
							this.GoodsList = this.GoodsList.concat(res.data.data)
							if (res.data.data.length < this.pagesize) {
								this.flag = true;
								this.status = 'noMore'
							}
						} else {
							this.flag = true;
							this.status = 'noMore'
						}
					} else {
						this.flag = true;
						this.status = 'noMore'
					}
				})
			},
			getBanner() {
				this.$http.get('index/bannerList', {
					type: '2'
				}).then(res => {
					uni.stopPullDownRefresh();
					if (res.code == 1) {
						this.banner = res.data;
					}
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	/deep/uni-swiper .uni-swiper-wrapper {
		overflow: inherit;
	}

	/deep/uni-swiper .uni-swiper-dots-horizontal {
		bottom: -20rpx !important;
	}

	/deep/uni-swiper .uni-swiper-dot-active {
		width: 30rpx;
		height: 12rpx;
		background: #00D18B;
		border-radius: 6rpx;
	}

	.content-wrapper {
		width: 100vw;
		height: calc(100vh - 120rpx);

		.app-market-close-img {
			width: 100%;
			height: 100%;
		}
	}

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

	.scroll-view_H {
		white-space: nowrap;
		width: 90%;
	}

	.scroll-view-item_H {
		padding: 0 10rpx;
		margin-right: 20rpx;
		display: inline-block;
		font-size: 30rpx;
		color: $uni-text-color;
		height: 88rpx;
		line-height: 88rpx;
		text-align: center;
	}

	.content {
		padding-bottom: 100rpx;

		.banner {
			padding: 0 0 20rpx 0;
			width: calc(100%);
			height: 320rpx;

			.uni-swiper-wrapper {
				z-index: 10;
			}

			image {
				width: 100%;
				height: 320rpx;
			}
		}

		.tabBox {
			padding: 0 28rpx;
			height: 88rpx;

			.tab {
				font-size: 30rpx;
				color: $uni-text-color;
				height: 88rpx;
				text-align: center;

				&.act {
					font-weight: 600;
					color: $uni-text-color;
				}
			}

			.right {
				width: 36rpx;
				height: 36rpx;
				padding: 10rpx;
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
						font-size: 28rpx;
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

		.goodsList1 {
			padding: 0 30rpx;

			.goodsItem {
				margin-bottom: 20rpx;

				.goodsImg {
					width: 300rpx;
					height: 300rpx;
					border-radius: 20rpx;
					margin-right: 25rpx;
				}

				.goodsinfo {
					padding: 10rpx 0;
					flex: 1;

					.label {
						width: 100rpx;
						height: 40rpx;
						line-height: 40rpx;
						text-align: center;
						font-size: 22rpx;
						padding: 0 15rpx;
						background: #F1E2BC;
						border-radius: 6rpx;
						color: #1E1817;
						margin: 20rpx 0;
					}

					.goodsName {
						font-size: 32rpx;
						font-weight: 500;
						color: #000000;
						line-height: 40rpx;
						height: 80rpx;
						overflow: hidden;
						word-break: break-all;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
					}

					.creator {
						color: #FFFFFF;
						font-size: 20rpx;
						margin-bottom: 15rpx;
					}

					.goodsPrice {
						color: #000000;
						font-size: 24rpx;
						font-weight: 500;
					}

				}
			}
		}

	}
</style>
