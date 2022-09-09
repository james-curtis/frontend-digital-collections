<template>
	<view class="listBox">
		<view class="listItem" v-for="(item, index) in goodsList" :key="index">
			<view class="goodsList" @tap="gotoMangheDetail(item)">
				<image class="goodImg" :src="item.image" mode=""></image>
				<view class="msgBox">
					<view class="goodName">
						<view class="manghe_flag">合成</view>
						<view class="">{{item.name}}</view>
					</view>
					<view class="flex">
						<view class="time">总量:{{item.limitnum}}</view>
						<view class="time">剩余:{{item.surplus}}</view>
					</view>
				</view>
				<!-- <view class="gotoMangheBtn" @tap="gotoMangheDetail(item)">立即合成</view> -->
			</view>
			<view class="goodsList sub-good" v-if="Object.entries(goodsDetail).length">
				<view class="sub-good-item" v-for="(subItemNeedCount,subItemId,index) in item.hcgoods_id"
					:key="subItemId" v-if="getSubGood(subItemId)">
					<u--image width='130rpx' height='130rpx' class="sub-good-item__pic" radius='10'
						:src='getSubGood(subItemId).image'>
					</u--image>
					<view class="sub-good-item__name">
						<text>{{getSubGood(subItemId).name}}*{{subItemNeedCount}}</text>
						<!-- <text>{{myCollectionStatGetter(subItemId)}}/{{subItemNeedCount}}</text> -->
					</view>
				</view>
			</view>
		</view>
		<uni-load-more :status="status" v-if="goodsList.length"></uni-load-more>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsList: [],
				status: 'more',
				pagesize: 15,
				page: 1,
				flag: false, //上拉加载
				goodsDetail: {},
				myCollectionList: [],
				myCollectionStat: {}
			}
		},
		computed: {
			myCollectionStatGetter() {
				return id => this.myCollectionStat[id] ?? 0
			}
		},
		onShow() {
			this.Reset();
		},
		onLoad(e) {
			//this.Reset();
		},
		onReachBottom() {
			if (!this.flag) {
				this.status = "loading";
				this.page++;
				this.getList()
			}
		},
		onPullDownRefresh() {
			this.Reset();
		},
		methods: {
			async getCollectionList() {
				const res = await this.$http.post('order/collectionList', {
					status: 1
				})
				this.myCollectionList = res.data
				this.myCollectionStat = res.data.reduce((prev, cursor) => {
					if (!prev[cursor.goods_id])
						prev[cursor.goods_id] = 0
					prev[cursor.goods_id]++
					return prev
				}, {})
			},
			Reset() {
				this.flag = false;
				this.page = 1;
				this.goodsList = [];
				this.getList()
				this.getCollectionList()
			},
			gotoMangheDetail(item) {
				this.go('hechangDetail?id=' + item.id)
			},
			async getList() {
				let data = {
					typeStatus: this.status,
					page: this.page,
					pagesize: this.pagesize
				}
				const res = await this.$http.post('index/synthesisList', data)
				if (res.data.length == 0) {
					this.flag = true;
					this.status = 'noMore'
				} else {
					res.data.forEach(e => e.hcgoods_id = e.hcgoods_id.split(',').reduce((prev, cursor) => {
						if (!prev[cursor])
							prev[cursor] = 0
						prev[cursor]++
						return prev;
					}, {}))
					this.goodsList = this.goodsList.concat(res.data);
					if (res.data.length < this.pagesize) {
						this.flag = true;
						this.status = 'noMore'
					}
				}
				this.getGoodsDetail()
			},
			async getGoodsDetail() {
				let goods = this.goodsList.flatMap((e) => Object.keys(e.hcgoods_id))
				goods = [...new Set(goods)]
				const list = {}
				for (const good of goods) {
					const res = await this.$http.get('goods/goodsDetail', {
						id: good
					})
					list[Number(res.data.id)] = res.data
				}
				this.goodsDetail = list
			},
			getSubGood(id) {
				return this.goodsDetail[Number(id)]
			}
		},
	}
</script>

<style lang="scss" scoped>
	.listBox {
		padding: 80rpx 30rpx 0;

		.listItem {
			// background: #383B3F;
			border-radius: 10rpx;
			margin-bottom: 30rpx;
			padding: 0 30rpx;
			background-color: #1B1A1A;

			.goodsList {

				&.sub-good {
					display: grid;
					grid-template-columns: repeat(2, 1fr);
					grid-column-gap: 30rpx;
					justify-items: center;

					.sub-good-item {
						&__name {
							color: $uni-text-color-grey;
							padding: 10px 0;
							display: flex;
							flex-direction: column;
							align-items: center;
							gap: 10px
						}
					}
				}

				padding: 30rpx 0;
				display: flex;
				align-items: center;

				.goodImg {
					width: 160rpx;
					height: 160rpx;
					margin-right: 20rpx;
				}

				.msgBox {
					width: calc(100% - 180rpx);
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
						margin-right: 20rpx;
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
