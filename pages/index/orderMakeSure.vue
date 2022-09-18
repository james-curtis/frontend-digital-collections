<template>
	<view class="content">
		<uni-section class='card' title="存储账户" type="line" titleColor="var(--font-color)" padding="10px 20px">
			<view class="line-text" v-if="member.uuid">
				{{member.wallet_address}}
				<image class="copy" @tap="copy(member.wallet_address)" src="../../static/img/my/copy.png" mode="">
				</image>
			</view>
			<view class="tips">
				*该账户由平台代创建，帮您存储数字藏品及寄售。未经允许，平台不会干涉该账户信息。
			</view>
		</uni-section>

		<view class="storeBox">
			<view class="goodsItem flex">
				<image class="goodImg" :src="goodsInfo.image" mode=""></image>
				<view class="msgBox">
					<view class="goodName">{{goodsInfo.name}}</view>
					<view class="flex_bt">
						<view class="label" v-if="goodsInfo.label">{{goodsInfo.label}}</view>
						<view class="price">¥ {{goodsInfo.price}}元 </view>
					</view>
				</view>
			</view>
		</view>

		<uni-section class='card' title="购买须知" type="line" titleColor="var(--font-color)" padding="10px 20px">
			<view class="tips">
				<u-parse :content='checkoutTips'></u-parse>
			</view>
		</uni-section>

		<view class="storeBox" style="padding: 0 20px;background-color: transparent;color: #76fbac;font-size: 28rpx;">
			*24小时内锁单5单未支付，将限制购买（含首发藏品）24小时
		</view>

		<view class="footerBox flex_bt">
			<view class="TotalMoney">
				<text>合计：</text>
				<text class="price red">¥ {{goodsInfo.price}}元 </text>
			</view>
			<view @tap="submit()" class="subBtn">提交订单</view>
		</view>

	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				goodsInfo: {}, //商品详情
				goodsId: '',
				type: ''
			}
		},
		computed: {
			...mapState({
				member: s => s.user.member,
				checkoutTips: s => s.config.checkoutTips,
			})
		},
		onLoad(e) {
			this.goodsId = e.goodsId;
			this.type = e.type;
			this.getInfo();
		},
		mounted() {
			this.refreshMemberInfo()
		},
		methods: {
			submit() {
				if (this.type == 'second') {
					this.$http.post('order/memberApply', {
						id: this.goodsId,
					}).then(res => {
						if (res.code == 1) {
							// this.toast(res.msg);
							setTimeout(() => {
								uni.redirectTo({
									url: '../order/orderPayMoney?orderId=' + res.data.order_id +
										'&is_market=' + 1
								});
							}, 1000)
						} else {
							this.toast(res.msg);
						}
					})

				} else {
					this.$http.post('order/apply', {
						id: this.goodsId,
					}).then(res => {
						if (res.code == 1) {
							// this.toast(res.msg);
							setTimeout(() => {
								uni.redirectTo({
									url: '../order/orderPayMoney?orderId=' + res.data.order_id
								});
							}, 1000)
						} else {
							this.toast(res.msg);
						}
					})
				}
			},
			getInfo() { //商品详情
				if (this.type == 'second') { //二手商品
					this.$http.get('order/memberGoodsDetail', {
						id: this.goodsId
					}).then(res => {
						if (res.code == 1) {
							this.goodsInfo = res.data;
						} else {
							this.toast(res.msg);
						}
					})
				} else {
					this.$http.get('goods/goodsDetail', {
						id: this.goodsId
					}).then(res => {
						if (res.code == 1) {
							this.goodsInfo = res.data;
						} else {
							this.toast(res.msg);
						}
					})
				}
			},
			refreshMemberInfo() {
				if (Object.entries(this.member).length !== 0) return true;
				this.$store.dispatch('getMemInfo')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		--font-color: #{$uni-text-color};
		--backgroud: #{$uni-bg-color-grey};
		padding-top: 30rpx;
		display: flex;
		flex-direction: column;
		gap: 20px;

		.copy {
			width: 44rpx;
			height: 44rpx;
			position: absolute;
			bottom: 0;
			right: 0;
		}

		/deep/ .card {
			background-color: $uni-bg-color-grey;

			.uni-section-content,
			.uni-section__content-title {
				color: $uni-text-color;
			}

			.uni-section-header__decoration {
				background-color: #76f7ae;
			}

			.line-text {
				position: relative;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
				padding-right: 25px;
			}

			.tips {
				color: $uni-text-color-grey;
			}
		}

		.storeBox {
			background-color: $uni-bg-color-grey;
			color: $uni-text-color;

			.goodsItem {
				margin: 0 30rpx;
				padding: 20rpx 0;

				.goodImg {
					width: 200rpx;
					height: 200rpx;
					margin-right: 20rpx;
				}
			}

			.msgBox {
				flex: 1;

				.goodName {
					color: $uni-text-color;
					font-size: 28rpx;
					font-weight: 500;
					line-height: 40rpx;
					overflow: hidden;
					word-break: break-all;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					margin-bottom: 40rpx;
				}

			}

			.price {
				color: #DFA35A;
				font-size: 26rpx;
				font-weight: 500;
				font-family: PingFangSC-Medium;

				text {
					font-size: 32rpx;
				}
			}

			.label {
				height: 40rpx;
				line-height: 40rpx;
				font-size: 20rpx;
				padding: 0 15rpx;
				background-color: #8A683A;
				border-radius: 20rpx;
				color: #FFDD9D;
			}
		}

		.footerBox {
			position: fixed;
			left: 0;
			bottom: 0;
			z-index: 100;
			width: 100%;
			height: 120rpx;
			background-color: $uni-bg-color-grey;
			box-shadow: 0rpx -4rpx 32rpx 0rpx rgba(0, 0, 0, 0.5);

			.TotalMoney {
				margin-left: 30rpx;
				color: $uni-text-color;
				font-size: 24rpx;
				font-weight: 500;

				.price {
					color: $uni-text-color;
					font-size: 32rpx;
				}
			}

			.subBtn {
				width: 360rpx;
				height: 88rpx;
				line-height: 88rpx;
				text-align: center;
				color: #333333;
				font-size: 32rpx;
				font-weight: 500;
				// background: url(../../static/img/index/button.png) no-repeat;
				background: #00DB7D;
				border-radius: 44rpx;
				background-size: 100%;
				margin-right: 30rpx;
			}
		}

	}
</style>
