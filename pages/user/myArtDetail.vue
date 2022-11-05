<template>
	<good-detail :good-detail="info" :goods-id="goodsId" v-if="info" :styleType="1">
		<template #goodStockDesc>
			{{''}}
		</template>

		<template #goodBigPicStockDesc='{info:innerInfo}'>
			<view class="flex good-stock-desc" v-if="showRemainingItems">
				<view class="flexBox LimitBox" v-if="descSaleOnPersonal">
					<view class="Limit">{{descSaleOnPersonal}}/{{descTotalOnPersonal}}</view>
					<view class="stock">{{innerInfo.sales}}/{{innerInfo.stock}}</view>
				</view>
				<view class="flexBox LimitBox" v-else>
					<view class="Limit">{{descSurplusOnPersonal}}/{{descTotalOnPersonal}}</view>
					<view class="stock">{{innerInfo.surplus}}/{{innerInfo.stock}}</view>
				</view>
			</view>
		</template>

		<template #footer>
			<view class="footerBox flex_bt" v-if="info.is_can_buy">
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
	import {
		mapState
	} from 'vuex'
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
		computed: {
			...mapState({
				showRemainingItems: s => s.config.showRemainingItems,
				descSurplusOnPersonal: s => s.config.descSurplusOnPersonal,
				descTotalOnPersonal: s => s.config.descTotalOnPersonal,
				descSaleOnPersonal: s => s.config.descSaleOnPersonal,
			})
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
	.good-stock-desc {
		justify-content: center;
		position: absolute;
		bottom: 30px;
		left: 50%;
		transform: translateX(-50%);
		width: 100%;
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
			padding: 0 10px;
			border-radius: 6rpx;
			color: #010101;
			background-color: #F1E2BC;
		}

		.stock {
			min-width: 80rpx;
			padding: 0 10px;
			color: #F1E2BC;
		}
	}
</style>
