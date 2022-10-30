<template>
	<view class="content container">
		<view class="status_bar flexBox">
			<logo></logo>
		</view>
		<swiper class="banner" indicator-dots="true" circular="true" autoplay="true" interval="3000" duration="800"
			indicator-color="#FFFFFF" indicator-active-color="#00D18B">
			<!-- next-margin="190rpx" -->
			<swiper-item v-for="(item, index) in banner" :key="index" @tap="next1(item)">
				<image :src="item.image" mode=""></image>
			</swiper-item>
		</swiper>
		<view class="notice">
			<view class="notice-left">
				<!-- 最新 <text @click="go('/pages/notice/notice')">公告</text> -->
				<u--image src='/static/img/index/tongao_icon.png' @click="go('/pages/notice/notice')" width="57px"
					height="40px"></u--image>
			</view>
			<view class="notice-text">
				<u-notice-bar v-if="firstNotice.title" url="/pages/notice/notice" :icon="''" :font-size="15"
					:text="firstNotice.title" bgColor="" color="#67c5cd"></u-notice-bar>
			</view>
		</view>
		<search-bar class='search-bar' :searchData.sync="search" :click="searchList"></search-bar>
		<!-- 三个筛选 -->
		<view :class="[scrollTopt>230?'fixedbotto':'','tabBox']">
			<view @tap="tab('0')" :class="showType == '0' ? 'tab act' : 'tab'">
				<text>数字藏品</text>
				<view class="line"></view>
			</view>
			<view @tap="tab('1')" :class="showType == '1' ? 'tab act' : 'tab'" v-if="rlflag">
				<text>发售日历</text>
				<view class="line"></view>
			</view>
			<!-- 			<view @tap="tab('2')" :class="showType == '2' ? 'tab act' : 'tab'">
				<text>内容精选</text>
				<view class="line"></view>
			</view> -->
			<view @tap="tab('3')" :class="showType == '3' ? 'tab act' : 'tab'">
				<text>全部</text>
				<view class="line"></view>
			</view>
		</view>
		<!-- 数字藏品 -->
		<view class="listBox" v-if="showType=='0'">
			<view class="listItem" v-for="(item,index) in shopList" :key="item.id" @tap="next(item)">
				<view class="mask">
					<view class="state" v-if="item.status == 1 &&  item.surplus > 0">{{item.end_time}} 结束</view>
					<view class="state state1" v-if="item.status == 1 &&   (item.surplus < 0 || item.surplus == 0)">
						<image src="../../static/img/index/time.png" mode="" class="time"></image>
						已售罄
					</view>
					<view class="state" v-if="item.status == 2 ">{{item.start_time}} 开售</view>
					<view class="state state1" v-if="item.status == 3 && (item.surplus < 0 || item.surplus == 0)">
						<image src="../../static/img/index/time.png" mode="" class="time"></image>
						已售罄
					</view>
					<view class="" v-if="item.status == 3 && item.surplus > 0 ">
						<!-- <image src="../../static/img/index/time.png" mode="" class="time"></image>
						已结束 -->
						<image :src='goodEnd' class="mask"></image>
					</view>
					<!-- <view class="center flex_column">
						<image :src="item.image" mode="aspectFill"></image>
					</view> -->
				</view>
				<image class="goodsImg" :src="item.image" mode=""></image>
				<view class="goodsinfo">
					<view class="goodsinfo-box">
						<view class="goodName">{{item.name}}</view>
						<view class="price">¥{{item.price}}</view>
					</view>
					<view class="flexBox" style="margin-top: 10rpx;">
						<view class="label">{{item.goods_category_name}}</view>
						<view class="flexBox LimitBox" v-if="showRemainingItems">
							<view class="Limit">{{descSurplusOnMall}}/{{descTotalOnMall}}</view>
							<view class="stock">{{item.surplus}}/{{item.stock}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 发售日历 -->
		<view class="plr-30" v-if="showType=='1'">
			<view class="con bg1 ptb-24 plr-24">
				<view v-for="(item,index) in shopList" :key="item.id">
					<view class="title flex calc">
						<image src="../../static/img/data.png" mode="" class="width36 height34"></image>
						<view class="size-26 black ml-12">{{item.time}}</view>
					</view>
					<view v-for="(itm,idex) in item.data" :key="idex">
						<view class="size-24 black mt-16 mb-20 calc">{{itm.time}}</view>
						<view v-for="(itm2,idx) in itm.data" :key="idx">
							<view class="conlist mb-30 flex" v-for="(itm3,idx3) in itm2.goods" :key="idx3">
								<image :src="itm3.image" mode="aspectFill" class="conimg"></image>
								<view class="conright ptb-20">
									<view class="black size-28 mb-12">{{itm3.name}}</view>
									<view class="flex">
										<view class="label">{{itm3.goods_category_name}}</view>
										<view class="labelwrapper">
											<view class="label ">限量</view>
											<text class="ml-16">{{itm3.stock}}份</text>
										</view>
									</view>
									<view class="size-36 black mt-16">
										<text class="size-26">¥</text>
										{{itm3.price}}
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 精选内容 -->
		<view class="jxbox" v-if="showType=='2'">
			<view class="list mt-20" v-for="(item,index) in shopList" :key="index" @click="detail(item)">
				<image :src="item.image" mode="" class="twoimg"></image>
				<view class="size-30 black bold plr-30 mt-10">{{item.title}}</view>
				<view class="jxbox-content size-26 mt-10 plr-30" style="color: #666666;word-break:break-all;">
					<!-- <u-parse :content="item.content"></u-parse>-->
					{{item.desc}}
				</view>
			</view>
		</view>
		<!-- 全部 -->
		<view class="" v-if="showType=='3'" style="margin: 10px 0 0;">
			<list-two-row :goods-list="shopList" turn-page='/pages/index/goodsDetail'></list-two-row>
		</view>
		<uni-load-more :status="status" v-if="shopList.length"></uni-load-more>
		<common-footer style="margin-bottom: 20px;"></common-footer>
		<uni-footer currentTab="0"></uni-footer>
		<u-popup :show="smshow" mode="center" :round="10" @close="close">
			<view class="smpop">
				<view class="smpop-title">
					最新公告
				</view>
				<scroll-view :scroll-y="true" class="cppop-cons">
					<image :src="firstNotice.image" mode=""></image>
					<u-parse :content="util.checkImg(text1)"></u-parse>
				</scroll-view>
				<view class="smpop-btn" @click="smshow=false">
					我知道了
				</view>
			</view>
		</u-popup>
	</view>
</template>
<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				status: 'more',
				pagesize: 15,
				page: 1,
				flag: false, //上拉加载\
				block: false,
				gid: '0',
				showType: '0',
				scrollTopt: 0,
				text1: "",
				firstNotice: {},
				smshow: false,
				isRequesting: false,
				search: ''
			}
		},
		computed: {
			...mapState({
				banner: s => s.indexData.banner,
				shopList: s => s.indexData.shopList,
				rlflag: s => s.config.isOpenIndexPageCalendar,
				goodEnd: s => s.config.goodEnd,
				member: s => s.user.member,
				showRemainingItems: s => s.config.showRemainingItems,
				descSurplusOnMall: s => s.config.descSurplusOnMall,
				descTotalOnMall: s => s.config.descTotalOnMall,
			})
		},
		onLoad(e) {
			this.getBanner()
			this.getList();
			const that = this
			uni.$on('init', () => {
				if (that.showType == '0') {
					that.flag = false;
					that.page = 1;
					that.getList();
				}
			})
			this.getNotice();
		},
		mounted() {
			if (Object.entries(this.member).length === 0)
				this.$store.dispatch('getMemInfo')
		},
		onPageScroll(e) {
			this.scrollTopt = e.scrollTop;
			if (this.scrollTopt > 220) {}
		},
		onReachBottom() {
			if (!this.flag) {
				this.status = "loading";
				this.page++;
				this.getList();
			}
		},
		onPullDownRefresh() {
			this.getBanner();
			this.flag = false;
			this.page = 1;
			this.getList();
		},
		methods: {
			searchList() {
				this.page = 1;
				this.getList();
			},
			close() {
				this.smshow = false;
			},
			async getNotice() {
				try {
					let res = await this.$http.get("index/noticeList");
					this.text1 = res.data[0].content;
					this.firstNotice = res.data[0]

					if (uni.getStorageSync("popUp")) {
						this.smshow = true;
						uni.removeStorageSync("popUp");
					}
				} catch (e) {

				}
			},
			next1(a) {
				if (a.url) {
					// #ifdef MP || APP-PLUS
					this.go('webView?ss=' + a.url)
					// #endif
					// #ifdef H5
					location.href = a.url;
					// #endif
				} else {
					this.go('/pages/manghe/index')
				}
			},
			tab(n) {
				if (this.showType != n) {
					this.showType = n;
					this.flag = false;
					this.page = 1;
					this.getList();
				}
			},
			reload(a) {
				if (a == '0') {
					this.block = !this.block
				}
				if (this.gid != a) {
					this.gid = a;
					this.$store.commit('SET_INDEX_DATA_STATE', {
						shopList: []
					})
					this.getList();
				}

			},
			detail(con) {
				this.go('txtdetail?con=' + JSON.stringify(con))
			},
			next(a) {
				this.go('goodsDetail?goodsId=' + a.id)
			},
			getList() {
				if (this.isRequesting) return false;
				this.isRequesting = true;
				const cursor_page = this.page
				const cursor_type = Number(this.showType)
				const typeMap = {
					shop: 0,
					calendar: 1
				}
				const cb = (res) => {
					uni.stopPullDownRefresh();
					if (res.code == 1) {
						let len = 0
						if (cursor_type !== typeMap.calendar)
							len = res.data.data.length
						else
							len = res.data.length
						if (len == 0) {
							this.flag = true;
							this.status = 'noMore'
							if (cursor_page === 1)
								this.$store.commit('SET_INDEX_DATA_STATE', {
									shopList: []
								})
						} else {
							let data = null
							if (cursor_type === typeMap.calendar) data = res.data
							else data = res.data.data

							if (cursor_page !== 1) {
								if (cursor_type !== typeMap.calendar)
									data = this.shopList.concat(res.data.data)
								else
									data = this.shopList.concat(res.data)
							}
							this.$store.commit('SET_INDEX_DATA_STATE', {
								shopList: data
							})

							if (len < this.pagesize) {
								this.flag = true;
								this.status = 'noMore'
							}
						}
					} else {
						this.flag = true;
						this.status = 'noMore'
					}

					this.isRequesting = false;
				}
				if (!['0', '3'].includes(this.showType)) {
					this.$http.get(this.showType == '2' ? 'index/noticeList' : 'index/calendar', {
						page: cursor_page,
						pagesize: this.pagesize,
						search: this.search
					}).then(res => cb(res))
					return false
				}
				this.$http.get('goods/goodsList', {
					goods_category_id: this.gid,
					page: cursor_page,
					pagesize: this.pagesize,
					search: this.search
				}).then(res => cb(res))
			},
			getBanner() {
				this.$http.get('index/bannerList', {
					type: '1'
				}).then(res => {
					uni.stopPullDownRefresh();
					if (res.code == 1) {
						// this.banner = res.data;
						this.$store.commit('SET_INDEX_DATA_STATE', {
							banner: res.data
						})
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

	.smpop {
		width: 600rpx;
		height: auto;

		.smpop-title {
			margin-top: 20rpx;
			margin-bottom: 20rpx;
			font-size: 30rpx;
			text-align: center;
			font-weight: bold;
			background-image: linear-gradient(#ceaae6, #61c7cb);
			background-clip: text;
			-webkit-background-clip: text;
			color: transparent;
		}

		.cppop-cons {
			margin-top: 10rpx;
			width: calc(100% - 60rpx);
			height: 500rpx;
			padding: 0 30rpx;
			font-size: 26rpx;
			line-height: 40rpx;
			color: #67c5cd;

			image {
				width: 100%;
				height: 240rpx;
			}
		}

		.smpop-btn {
			margin: 30rpx auto;
			width: 540rpx;
			height: 80rpx;
			// background-color: #00d18b;	
			background-image: linear-gradient(to right bottom, #ceaae6, #61c7cb);
			border-radius: 20rpx;
			font-size: 30rpx;
			color: #fff;
			text-align: center;
			line-height: 80rpx;
		}
	}

	.notice {
		margin: 0 30rpx;
		padding: 0 20rpx;
		background: $uni-bg-color-grey;
		box-shadow: 0px 0px 15rpx 6rpx rgba(52, 52, 52, 0.1);
		border-radius: 20rpx;
		display: flex;

		.notice-left {
			width: 70rpx;
			font-size: 30rpx;
			font-weight: bold;
			background-image: linear-gradient(#ceaae6, #61c7cb);
			background-clip: text;
			-webkit-background-clip: text;
			color: transparent;
		}

		.notice-text {
			margin-left: 20rpx;
			width: calc(100% - 90rpx);
			height: 80rpx;
			display: flex;
			align-items: center;
		}
	}

	.content {
		padding-bottom: 100rpx;

		.twoimg {
			height: 400rpx;
			width: 100%;
			border-radius: 20rpx;
		}

		.status_bar {
			width: calc(100% - 40rpx);
			padding: 0 20rpx;
			height: 80rpx;
			justify-content: center;

			padding-top: var(--status-bar-height);


		}

		.banner {
			margin: 20rpx 30rpx;
			// padding-top: calc(var(--status-bar-height) + 130rpx);
			height: 320rpx;
			border-radius: 20rpx;
			overflow: hidden;

			.uni-swiper-wrapper {
				z-index: 10;
				// background: #0A0A0A;
			}

			image {
				width: 100%;
				height: 320rpx;
			}

			.info {
				padding: 20rpx;

				.name {
					color: #FFFFFF;
					font-size: 30rpx;
				}

				.title {
					color: #757679;
					font-size: 22rpx;
				}
			}
		}

		.tabBox {
			width: 100%;
			// padding-top: 12rpx;
			display: flex;
			justify-content: space-around;

			.tab {
				width: 33%;
				position: relative;
				font-size: 30rpx;
				color: #666666;
				height: 90rpx;
				line-height: 90rpx;
				text-align: center;

				.line {
					position: absolute;
					left: calc(50% - 25rpx);
					bottom: 0rpx;
					width: 40rpx;
					height: 16rpx;
					background-image: url(../../static/img/index/line.png);
					background-repeat: no-repeat;
					background-size: 40rpx 16rpx;
					display: none;
				}

				&.act {
					font-size: 30rpx;
					font-weight: bold;
					color: #fff;
					background-image: linear-gradient(#ceaae6, #61c7cb);
					background-clip: text;
					-webkit-background-clip: text;
					color: transparent;

					.line {
						display: block;
					}
				}
			}
		}

		.fixedbotto {
			display: flex;
			position: fixed;
			top: 0;
			background: #000;
			z-index: 99;
		}

		.listBox {
			margin: 20rpx 20rpx;
			// display: flex;
			// flex-wrap: wrap;

			.listItem {
				background-color: #000;
				border-radius: 30rpx;
				margin-bottom: 35rpx;
				margin-right: 20rpx;
				position: relative;

				.mask {
					width: 100%;
					height: 690rpx;
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
					width: 100%;
					height: 690rpx;
					border-radius: 30rpx;
					// -webkit-filter: blur(4px);
					// filter: blur(4px);
				}

				.goodsinfo {
					padding: 15rpx 20rpx;

					.goodsinfo-box {
						width: 100%;
						display: flex;
						justify-content: space-between;
					}

					.goodName {
						color: #fff;
						font-size: 30rpx;
						margin-bottom: 15rpx;
					}

					.label {
						height: 40rpx;
						line-height: 40rpx;
						font-size: 22rpx;
						padding: 0 10rpx;
						background: #F1E2BC;
						border-radius: 6rpx;
						color: #1E1817;
						margin-right: 10rpx;
					}

					.LimitBox {
						height: 40rpx;
						line-height: 40rpx;
						background: #3A3A3A;
						border-radius: 6rpx;
						font-size: 12px;

						.Limit {
							font-size: 24rpx;
							padding: 0 10rpx;
							border-radius: 6rpx;
							color: #010101;
							background-color: #EDDFC0;
						}

						.stock {
							font-size: 24rpx;
							padding: 0 15rpx;
							color: #fff;
						}
					}

					.bottom {
						margin-top: 10rpx;
					}

					.company_image {
						width: 32rpx;
						height: 32rpx;
						margin-right: 10rpx;
					}

					.price {
						color: #6cb9c3;
						font-size: 30rpx;
						font-weight: bold;
					}

					.good {
						flex: 1;
						color: rgba(255, 255, 255, 0.35);
						// color: #777777;
						font-size: 24rpx;
						font-weight: 500;
					}
				}
			}

			.listItem:nth-child(2n) {
				margin-right: 0rpx;
			}

			.listItem:nth-child(n) {
				margin-right: 0rpx;
			}
		}

		.conlist {
			height: 200rpx;
			// background: url(../../static/img/index/bg1.png) no-repeat;
			// background-size: 100% auto;
			background: #F0F0F0;
			border-radius: 30rpx;

			.conimg {
				width: 200rpx;
				height: 200rpx;
				border-radius: 30rpx;
			}

			.conright {
				margin-left: 24rpx;
				flex: 1;

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
		}

		.search-bar {
			padding: 0 30rpx;
			width: auto;

			/deep/ .search {
				background-color: $uni-bg-color-grey;
			}
		}

		.jxbox {
			width: 100%;
			padding: 0 30rpx;

			.jxbox-content {
				width: calc(100% - 60rpx);
				word-wrap: break-word;
			}
		}

		.list {
			width: calc(100% - 60rpx);
			background: #F0F0F0;
			border-radius: 20rpx;
			padding-bottom: 20rpx;
		}
	}

	.calc {
		color: $uni-text-color;
	}
</style>
