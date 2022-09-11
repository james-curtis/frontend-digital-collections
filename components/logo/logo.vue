<template>
	<image class="img-logo" :src="logoUrl" mode="widthFix"></image>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		name: 'Logo',
		data() {
			return {}
		},
		computed: {
			...mapState({
				logoUrl: s => s.config.appLogo
			})
		},
		beforeMount() {
			(async () => {
				const res = await this.$http.get('login/getSysLogo')
				this.$store.commit('SET_CONFIG', {
					appLogo: res.data.logo
				})
			})()
		}
	}
</script>

<style lang="scss" scoped>
	.img-logo {
		margin-top: 20rpx;
		width: 280rpx;
	}
</style>
