<template>
	<good-detail :good-detail="info" :goods-id="goodsId" v-if="info" :styleType="1">
		<template #goodStockDesc>
			{{''}}
		</template>
		<template #footer>
			<view class="footerBox flex_bt">
				<view class="subBtn subBtn1" @tap="openSalePopup()" v-if="btnflag||rank==1">寄 售</view>
				<view class="subBtn" @tap="openTransferPopup()">转 赠</view>
			</view>

			<uni-popup ref="salePopup" type="center" :mask-click="false">
				<view class="specs_boxs">
					<view class="flex">
						<input type="digit" v-model="price" class="ipt" placeholder-class="iptP"
							placeholder="请输入寄售价格" />
					</view>
					<view class="btnBox flex">
						<view class="btn" @tap="closeSalePopup()">取消</view>
						<view class="btn btn1" @tap="sale()">确定</view>
					</view>
				</view>
			</uni-popup>

			<uni-popup ref="TransferPopup" type="center" :mask-click="false">
				<view class="specs_boxs">
					<view class="flex">
						<input type="number" v-model="phone" class="ipt" placeholder-class="iptP"
							placeholder="请输入受赠人手机号码" />
					</view>
					<view class="btnBox flex">
						<view class="btn" @tap="closeTransferPopup()">取消</view>
						<view class="btn btn1" @tap="Transfer()">确定</view>
					</view>
				</view>

			</uni-popup>
			<common-footer></common-footer>
		</template>
	</good-detail>
</template>

<script>
	export default {
		data() {
			return {
				goodsId: '',
				banner: {},
				info: {},
				price: '',
				saleFlag: false,
				phone: '',
				TransferFlag: false,
				btnflag: false,
				rank: null,
				mycp_number: undefined
			}
		},
		onLoad(e) {
			this.rank = uni.getStorageSync('rank');
			this.goodsId = e.goodsId;
			this.mycp_number = e.mycp_number;
			this.getData();
			this.getflag();
		},
		methods: {
			async getflag() {
				try {
					let res = await this.$http.get('order/ej');
					if (res == 1) {
						this.btnflag = true;
					} else if (res == 0) {
						this.btnflag = false;
					}
				} catch (e) {
					//TODO handle the exception
				}
			},
			openTransferPopup() {
				this.TransferFlag = true;
				if (this.saleFlag) {
					this.closeSalePopup();
				}
				this.$refs.TransferPopup.open()
			},
			closeTransferPopup() {
				this.phone = '';
				this.TransferFlag = false;
				this.$refs.TransferPopup.close()
			},
			Transfer() { //转赠
				if (!this.phone) {
					this.toast('请输入受赠人手机号码');
					return;
				}
				let data = {
					id: this.goodsId,
					target_phone: this.phone
				}
				this.$http.post('order/transfer', data).then(res => {
					if (res.code == 1) {
						this.toast(res.msg);
						this.closeTransferPopup();
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 1200)
					} else {
						this.toast(res.msg)
					}
				})
			},
			openSalePopup() {
				this.price = this.info.price;
				this.saleFlag = true;
				if (this.TransferFlag) {
					this.closeTransferPopup();
				}
				this.$refs.salePopup.open()
			},
			closeSalePopup() {
				this.price = '';
				this.saleFlag = false;
				this.$refs.salePopup.close()
			},
			sale() { //寄售
				if (!this.price) {
					this.toast('请输入寄售价格');
					return;
				}
				let data = {
					id: this.goodsId,
					price: this.price
				}
				this.$http.post('order/sales', data).then(res => {
					if (res.code == 1) {
						this.toast(res.msg);
						this.closeSalePopup();
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 1200)
					} else {
						this.toast(res.msg)
					}
				})
			},
			pay() {
				this.go('orderMakeSure?goodsId=' + this.goodsId);
			},
			getData() {
				this.$http.get('order/collectionDetail', {
					id: this.goodsId
				}).then(res => {
					if (res.code == 1) {
						this.banner = res.data.images;
						this.info = res.data;
					}
				})
			}
		}
	}
</script>

</style>
<style lang="scss" scoped>
	@keyframes myfirst {
		0% {
			transform: rotatey(0deg)
		}

		25% {
			transform: rotatey(90deg)
		}

		50% {
			transform: rotatey(180deg)
		}

		75% {
			transform: rotatey(270deg)
		}

		100% {
			transform: rotatey(360deg)
		}
	}

	.content {
		padding-bottom: 200rpx;

		.bigbox {
			background: url(../../static/img/index/bg.jpg) no-repeat left top;
			background-size: 100%;
			background-color: #000;
		}

		.Box {
			width: 100%;
			height: 680rpx;
			padding-bottom: 50rpx;
			background: url(../../static/img/index/bj1.png) no-repeat left top;
			background-size: 100%;
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			align-items: center;
			perspective: 1000;
			-webkit-perspective: 1000;

			.rotateBox {
				width: 540rpx;
				height: 540rpx;
				animation: myfirst 10s linear 150ms 100;

				.image {
					width: 540rpx;
					height: 540rpx;
				}
			}
		}

		.Box1 {
			width: 100%;
			height: 360rpx;
			margin-top: -120rpx;
			padding-bottom: 30rpx;
			background: url(../../static/img/index/bj2.png) no-repeat top center;
			background-size: 620rpx;
			display: flex;
			justify-content: center;
			align-items: flex-end;

			.img {
				width: 84rpx;
				height: 152rpx;
				margin: 0 15rpx;
			}

			.center {
				max-width: 500rpx;
				height: 152rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				align-items: center;

				.goodsName {
					color: #FFFFFF;
					font-size: 30rpx;
					text-align: center;
					overflow: hidden;
					word-break: break-all;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
				}

				.LimitBox {
					height: 40rpx;
					line-height: 40rpx;
					background: #4C464A;
					border-radius: 6rpx;
					font-size: 12px;
					text-align: center;

					.Limit {
						width: 60rpx;
						padding: 0 10rpx;
						border-radius: 6rpx;
						color: #010101;
						background-color: #F1E2BC;
					}

					.stock {
						padding: 0 10rpx;
						color: #F1E2BC;
					}
				}
			}
		}

		.specs_boxs {
			padding: 50rpx 0 10rpx;
			width: 600rpx;
			background: #FFFFFF;
			border-radius: 12rpx;
			margin: 0 auto;

			.ipt {
				flex: 1;
				height: 100rpx;
				line-height: 100rpx;
				font-size: 28rpx;
				font-weight: 500;
				color: #333;
				background-color: #F8F8F8;
				padding-left: 30rpx;
				margin: 0 30rpx;
			}

			.iptP {
				color: #777777;
				font-weight: 400;
			}

			.btnBox {
				margin-top: 20rpx;

				.btn {
					flex: 1;
					height: 80rpx;
					line-height: 80rpx;
					text-align: center;
					font-size: 30rpx;
				}

				.btn1 {
					color: #AE3523;
				}
			}
		}

		.banner {
			width: 100%;
			height: 500rpx;
			background-color: #23272C;

			.uni-swiper-wrapper {
				z-index: 10;
			}

			image {
				width: 100%;
				height: 500rpx;
			}
		}

		.msgBox {
			margin: 0 30rpx;
			background-color: #fff;
			padding: 30rpx;
			box-shadow: 0px 0px 15rpx 6rpx rgba(52, 52, 52, 0.1);
			border-radius: 10rpx;

			.goodsName {
				color: #FFFFFF;
				font-size: 36rpx;
				font-weight: 500;
				margin-bottom: 20rpx;
			}

			.describe {
				color: #666666;
				font-size: 24rpx;
				line-height: 36rpx;
				font-weight: 500;
				margin-top: 20rpx;
			}

			.priceBox {
				color: #000;
				font-size: 24rpx;
				font-weight: 500;

				text {
					font-weight: 500;
					font-size: 36rpx;
					margin-left: 10rpx;
				}
			}
		}

		.descBox {
			padding: 20rpx 30rpx;
			color: #AAAAAA;
			margin: 0 30rpx;
			box-shadow: 0px 0px 15rpx 6rpx rgba(52, 52, 52, 0.1);
			border-radius: 10rpx;

			.item {
				font-size: 26rpx;
				font-weight: 500;
				color: $uni-text-color-grey;
				margin-bottom: 10rpx;
			}

			.desinfo {
				overflow: hidden;
				font-size: 24rpx;
				word-wrap: break-word;

				video {
					width: 100%;
				}
			}
		}

		.goodsinfo {
			padding: 0 20rpx;
			margin: 20rpx 30rpx;
			box-shadow: 0px 0px 15rpx 6rpx rgba(52, 52, 52, 0.1);
			border-radius: 10rpx;

			.iptBox {
				padding: 20rpx 0;
				border-bottom: 1rpx solid #F0F0F0;

				.label {
					width: 20%;
					font-size: 24rpx;
					color: $uni-text-color-grey;
				}

				.center {
					width: 75%;
					color: $uni-text-color-grey;
					font-size: 24rpx;
					word-break: break-word;
					line-height: 44rpx;
					position: relative;
					justify-content: left;
				}

				.copy {
					width: 44rpx;
					height: 44rpx;
					position: absolute;
					bottom: 0;
					right: 0;
				}
			}

			.iptBox1 {
				.center {
					color: #AAAAAA;
					font-weight: 500;
				}
			}
		}

		.footerBox {
			position: fixed;
			left: 0;
			bottom: 0;
			z-index: 10;
			width: 100%;
			height: 120rpx;
			background-color: #fff;
			box-shadow: 0rpx -4rpx 32rpx 0rpx rgba(180, 180, 180, 0.5);

			.subBtn {
				width: 320rpx;
				height: 88rpx;
				line-height: 88rpx;
				text-align: center;
				color: #fff;
				font-size: 32rpx;
				font-weight: 500;
				background: #00DB7D;
				border-radius: 44rpx;
				margin: 0 30rpx;
			}

			.subBtn1 {
				background: #fff;
				color: #00DB7D;
				border: 2rpx solid #00DB7D;
			}
		}

		.tech-tip {
			margin-top: 30rpx;
			display: flex;
			justify-content: center;

			image {
				width: 427rpx;
				height: 42rpx;
			}
		}
	}
</style>
