<template>
	
	<view style="font-size: 14px;line-height: 26px;padding: 32upx;background: #FFFFFF;" class="home1">
		<Navbar title="隐私政策"></Navbar>
		

	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {
			toLogout() {
				let that = this;
				uni.showModal({
					content: '确定要退出登录么',
					success: (e) => {
						if (e.confirm) {
							that.$queue.remove("token");
							that.$queue.remove("userId");
							that.$queue.remove("mobile");
							that.$queue.remove("openid");
							that.$queue.remove("nickName");
							that.$queue.remove("image_url");
							that.$queue.remove("relation");
							that.$queue.remove("relation_id");
							that.isShow = false;
							setTimeout(() => {
								uni.switchTab({
									url: '/pages/member/user'
								});
							}, 200)
						}
					}
				});
			},
		}
	}
</script>

<style>
	page {
		background: #FFFFFF;
	}
</style>
