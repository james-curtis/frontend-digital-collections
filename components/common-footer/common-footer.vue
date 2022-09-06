<template>
	<view class="tech-tip">
		<view>
			<image src="../../static/img/tect-tip.png" mode=""></image>
		</view>
		<view v-if="beian">
			<uni-link href='https://beian.miit.gov.cn/' target="_blank" :showUnderLine='false'>{{beian}}</uni-link>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		name: 'CommonFooter',
		data() {
			return {}
		},
		computed: {
			...mapState({
				beian: s => s.config.beian !== '' ? s.config.beian : undefined
			})
		}
	}
</script>

<style lang="scss" scoped>
	.tech-tip {
		margin-top: 30rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 10px;
		color: $uni-text-color-grey;

		image {
			width: 427rpx;
			height: 42rpx;
		}
	}
</style>
