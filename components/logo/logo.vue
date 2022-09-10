<template>
	<image class="img-logo" :src="logoUrl" mode="widthFix"></image>
</template>

<script>
	export default {
		name: 'Logo',
		data() {
			return {
				logoUrl: ''
			}
		},
		beforeMount() {
			(async () => {
				const res = await this.$http.get('login/getSysLogo')
				this.logoUrl = res.data.logo
			})()
		}
	}
</script>
