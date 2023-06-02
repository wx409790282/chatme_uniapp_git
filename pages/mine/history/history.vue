<!--本文件由FirstUI授权予庄宇鸿（手机号：1  3 8 2  62   810 14，身份证尾号： 1  440 1 5）专用，请尊重知识产权，勿私下传播，违者追究法律责任。-->
<template>
	<view class="page">
		<Navbar title="会话历史"></Navbar>
		<view class="list">
			<view v-if="sessionList.length==0">
				<text> 无对话记录</text>
			</view>
			<view v-else class="item" v-for="(item, index) in sessionList" :key="index" @click="sessionClick(index)">
				<view class="pics">
					<u-image width="120rpx" height="120rpx" :src="`${config.baseProfileUrl}/${item.img}`">
						
					</u-image>
				</view>
				<view class="info">
					<view class="title2">{{ item.name }}</view>
					<view class="title">    {{"   "+ item.question }}</view>
					<view class="num">
						<text>{{item.startTime}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
	<view class="fui-wrap">
		<view class="fui-page__hd">
			<view class="fui-page__title">{{model.name}}</view>
			<view class="fui-page__desc">{{model.describ}}</view>
		</view>
		<view class="fui-page__bd">
			<view v-if="sessionList.length==0">
				<text> 无对话记录</text>
			</view>
			<fui-list class="fui-layout__item" v-else v-for="(item,index) in sessionList" :key="index">
				
				<fui-list-cell arrow >
					<view class="article-shadow tn-margin">
						<view class="tn-flex">
							<view class="image-pic tn-margin-sm" :style="'background-image:url(' + item.userAvatar + ')'">
								<view class="image-article">
								</view>
							</view>
							<view class="tn-margin-sm tn-padding-top-xs" style="width: 100%;">
								<view class="tn-text-lg tn-text-bold clamp-text-1">
									{{ item.userId }}
								</view>
								<view class="tn-padding-top-xs" style="min-height: 100rpx;">
									<text class=" tn-text-sm tn-color-gray clamp-text-2">
										{{ item.userId }}
									</text>
								</view>
								<view class="tn-flex tn-flex-row-between tn-flex-col-between">
									
									<view class="justify-content-item tn-color-gray tn-text-center tn-color-gray--disabled"
										style="padding-top: 5rpx;">
										<text class="tn-icon-footprint tn-padding-right-xs"></text>
										<text class="tn-padding-right">{{ item.userId }}</text>
										<text class="tn-icon-like-lack tn-padding-right-xs"></text>
										<text class="">{{ item.startTime }}</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				
				</fui-list-cell>

			</fui-list>

		</view>
	</view>
</template>

<script>
	import { UVIEWUI_HTTP_CONFIG } from '@/api/config';
	export default {
		data() {
			return {
				model: '',
				sessionList: [],
				timer: {},
				load: 0,
				loadingText: "正在努力抓取",
				loadingType: 0,
				contentText: {
					contentDown: "上拉显示更多",
					contentRefresh: "正在加载……",
					contentNoMore: "没有更多了",
				},
				page: 0,
				queryParams: {
					pageNum: 1,
					pageSize: 20,
					name: null,
					img: null,
					describ: null,
					content: null
				},
				config:UVIEWUI_HTTP_CONFIG
			}
		},
		onLoad: function(option) {
			this.getmorenews()
		},
		onReachBottom() {
			if (this.timer != null) {
				clearTimeout(this.timer)
			}
			this.timer = setTimeout(() => {
				this.getmorenews()
			}, 1000)
		},
		methods: {
			getmorenews() {
				if (this.loadingType !== 0) { //loadingType!=0;直接返回
					return false;
				}
				this.loadingType = 1;
				uni.showNavigationBarLoading();
				const that = this
				this.$u.api.getChatHistoryList(that.queryParams).then(res => {
					that.queryParams.pageNum++; // 得到数据之后 page+1
					if (res.rows < 1) { // 没有数据
						that.loadingType = 2;
						uni.hideNavigationBarLoading(); // 关闭加载动画
						return;
					}
					that.page++; // 每触底一次 page +1
					that.sessionList = this.sessionList.concat(res.rows)
					that.loadingType = 0; // 将loadingType归0重置
					uni.hideNavigationBarLoading(); // 关闭加载动画
				});
			},
			
			sessionClick(e) {
				console.log((e))
				const that = this
				this.$u.api.getSessionDetailList({
							'sessionId': this.sessionList[e].seq
						}).then(res => {
					var answerList = res.rows
					answerList = answerList.reverse();
					uni.navigateTo({
						// 方式一：此方式传参，刷新页面参数不丢失，参数在url上显示
						// 如果是对象或者数组参数可使用 JSON.stringfy()，将参数转化成字符串，然后获取时，通过 JSON.parse() 转化成对象
						url: '/pages/chat/chat/chat',
					
						// 方式二：通过eventChannel向被打开页面传送数据，此方式传参，刷新页面参数会丢失
						// 此方式只是适合 uni.navigateTo() 方法
						success: function(res) {
							res.eventChannel.emit('argParams', {
								'model': {
									'id': that.sessionList[e].modelId,
									// 'name':answerList.length()>0?answerList[0].questionFrom:"AI"
								},
								'isNew': false,
								"sessionId": that.sessionList[e].seq,
								'answerList': answerList.map(obj => {
									return {
										...obj,
										'sendText': obj.question,
										"chatmState": 1,
										"TextType": 0,
										'createTime': obj.questionTime
									};
								})
							})
						}
					})
				});
			},
			

		}
	}
</script>

<style lang="scss" scoped>
.page {
	padding: 30rpx;
}
.list {
	.item {
		padding: 30rpx;
		position: relative;
		border-radius: 16rpx;
		box-shadow: $app-theme-shadow;
		display: flex;
		align-items: center;
		margin-bottom: 24rpx;
		.pic {
			margin-right: 24rpx;
			border-radius: 12rpx;
			overflow: hidden;
		}
		.info {
			.title2 {
				font-size: 32rpx;
				color: $app-theme-text-black-color;
				margin-bottom: 4rpx;
			}
			.title {
				font-size: 28rpx;
				color: $app-theme-text-black-color;
				margin-bottom: 4rpx;
			}
			.num {
				font-size: 24rpx;
				color: $app-theme-text-gray-color;
				 float: right;
				
			}
		}
		.check {
			position: absolute;
			bottom: 30rpx;
			right: 30rpx;
		
		}
	}
}
.btn {
	padding: 30rpx;
	position: fixed;
	bottom: 30rpx;
	left: 0;
	width: 100%;
}
</style>
