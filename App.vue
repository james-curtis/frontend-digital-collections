<script>
	import {
		mapState,
		mapGetters,
		mapActions
	} from 'vuex'
	export default {
		onLaunch(e) {
			uni.setStorage({
				key: "popUp",
				data: true
			})
			this.$http.get("login/ej").then(res => {
				uni.setStorage({
					key: 'rank',
					data: res,
					success: function() {
						console.log('success');
					}
				});
			})
			this.$http.get("index/siteConfig").then(res => {
				this.$store.commit('SET_CONFIG', res)
			})
			this.$http.get('login/getGoodDesc').then(res => {
				this.$store.commit('SET_GOOD_DESC', res.data)
			})
			this.init()
		},
		methods: {
			init() {},
		}
	}
</script>

<style lang="scss">
	@import "@/common/comm.scss";

	page {
		height: 100%;
		// background-image: url(./static/img/bg.png);
		background-color: $uni-bg-color;
		background-size: 100% auto;

		--uni-bg-color-grey: $uni-bg-color-grey;
	}

	.u-notice-bar {
		padding: 0 !important;
	}

	.navigator-hover {
		background: none;
	}

	.clearBox {
		overflow: hidden;
	}

	.fl {
		float: left;
	}

	.fr {
		float: right;
	}

	.flex {
		display: flex;
	}

	.flexBox {
		display: flex;
		align-items: center;
	}

	.flex_ct {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.flex_bt {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.flex_ar {
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.flex_column {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.flexItem {
		flex: 1;
	}

	.tc {
		text-align: center;
	}

	.tr {
		text-align: right;
	}

	/* 清除浮动 */
	.clearfix:after {
		content: ".";
		display: block;
		height: 0;
		clear: both;
		visibility: hidden;
	}
</style>
