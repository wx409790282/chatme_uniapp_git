<!--本文件由FirstUI授权予庄宇鸿（手机号：1  3 8 2  62   810 14，身份证尾号： 1  440 1 5）专用，请尊重知识产权，勿私下传播，违者追究法律责任。-->
<template>
	<view class="page">
		<Navbar title="支付历史"></Navbar>
		<view class="list">
			<view v-if="billList.length==0">
				<text> 无充值记录</text>
			</view>
			<view class="item" v-else v-for="(item, index) in billList" :key="index" >
				<view class="left">
					<view class="discount">
						<text>￥</text>
						<text>{{ item.amount }}</text>
					</view>
					<view class="standard">{{ item.count }}机会</view>
				</view>
				<view class="right">
					<view class="title" v-if="item.status == 1">支付成功</view>
					<view class="title2" v-else>支付失败了</view>
					<view class="date">订单时间： {{ item.createTime }}</view>
				</view>
				<view class="select" v-if="item.status == 1"></view>
			</view>
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				model:'',
				billList:[]
			}
		},
		onLoad:function(option){
			
			this.$u.api.getPayHistory().then(res => {
					this.billList=res.rows
				})
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.list {
	margin: 30rpx;
	.item {
		width: 100%;
		height: 174rpx;
		background-image: url('@/static/bg/discounts-bg.png');
		background-size: cover;
		margin-bottom: 30rpx;
		display: flex;
		justify-content: flex-start;
		align-items: flex-end;
		padding-bottom: 34rpx;
		position: relative;

		.left {
			margin-right: 60rpx;
			margin-left: 50rpx;
			.discount {
				text:nth-child(1) {
					font-size: 22rpx;
					color: $app-theme-text-money-color;
				}
				text:nth-child(2) {
					font-size: 64rpx;
					color: $app-theme-text-money-color;
				}
			}
			.standard {
				font-size: 20rpx;
				color: $app-theme-card-gray-color;
			}
		}
		.right {
			.title {
				font-size: 32rpx;
				color: $app-theme-text-black-color;
				margin-bottom: 32rpx;
			}
			.title2 {
				font-size: 32rpx;
				color: $app-theme-text-money-color;
				margin-bottom: 32rpx;
			}
			.date {
				font-size: 20rpx;
				color: $app-theme-card-gray-color;
			}
		}

		.select {
			height: 60rpx;
			width: 60rpx;
			background-image: url('@/static/bg/discounts-select.png');
			background-size: cover;
			position: absolute;
			top: 4rpx;
			right: 4rpx;
			z-index: $app-zIndex-absolute;
		}
	}
}
</style>