<!--本文件由FirstUI授权予庄宇鸿（手机号：1382      62810 1   4，身份证尾号：1  4  40 15）专用，请尊重知识产权，勿私下传播，违者追究法律责任。-->
<template>
	<view class="fui-wrap fui-page__bd">
		<view class="fui-banner__box">
			<image class="fui-banner" src="../../static/bg/my_banner_3x.png" mode="widthFix"></image>
			<view class="fui-vip__box fui-page__spacing">
				<view class="fui-mod__box">

					<image class="fui-vip__bg" src="../../static/bg/img_mod_bg.png"></image>

				</view>
				<view class="fui-flex__center fui-vip__text">
					<text>当前次数{{balance.data.balance}}次</text>
				</view>
				<view class="fui-vip__btn fui-flex__center" @tap="href('/pages/my/vip/vip')">
					<!-- #ifdef MP-BAIDU || MP-QQ || MP-TOUTIAO -->
					{{status==0?'会员权益':'立即开通'}}
					<!-- #endif -->
					<!-- #ifndef MP-BAIDU || MP-QQ || MP-TOUTIAO -->
					立即开通
					<!-- #endif -->
				</view>
			</view>
		</view>
		<view class="fui-page__spacing">
			<view class="fui-menu__wrap fui-align__center">
				<view class="fui-menu__item" v-for="(item,index) in menus" :key="index" @click="href(item.page,$event)">
					<button open-type="feedback" class="fui-btn__feedback" v-if="index===2"></button>
					<view class="fui-menu__img fui-flex__center" :style="{background:item.background}">
						<image :src="`../../static/icon/icon_${item.src}_3x.png`" mode="widthFix"></image>
					</view>
					<text>{{item.text}}</text>
				</view>
			</view>
		</view>
		<!-- <view class="fui-list__wrap">
			<fui-list-cell @click="href(item.page)" arrow bottomRight="32" v-for="(item,index) in list" :key="index">
				<view class="fui-align__center">
					<image class="fui-list__icon" :src="`../../static/icon/icon_${item.src}_3x.png`"
						mode="widthFix"></image>
					<text class="fui-list__text" style="margin-right: -20rpx;">{{item.text}}</text>
				</view>
			</fui-list-cell>
		</view> -->
		<view class="other-nav">
			
			<DialNav marginTopLine="28rpx" :mode="8" shadow :list="otherNavOps" nameSize="24rpx" imgSize="40rpx"> 
				<TitleOperate padding="30rpx 30rpx 0 30rpx" title="我的社区"></TitleOperate> 
				
			</DialNav>
		</view>
	</view>
</template>

<script>
	import {copyByUniappApi} from '../../utils/uniapp-api.js'
	import DialNav from '@/components/nav/dial-nav.vue';
	import TitleOperate from '../../components/title-operate.vue'
	
	export default {
		components: {
			DialNav,
			TitleOperate
		},
		data() {
			return {
				menus: [{
					text: '购买次数',
					background: '#F2FCF6',
					src: 'share',
					page: '/pages/my/pay/pay'
				}, {
					text: '我的订单',
					background: '#FFFBF2',
					src: 'appreciate',
					page: '/pages/mine/payHistory'
				}, {
					text: '问答历史',
					background: '#F6F7FF',
					src: 'proposal',
					page: '/pages/mine/history/history'
				}, {
					text: '联系客服',
					background: '#FFF4F4',
					src: 'cooperation',
					page: 'contract'
				}],
				list: [{
						text: '礼包兑换',
						src: 'edition',
						page: '/pages/mine/charge/charge'
					}, {
						text: '意见反馈',
						src: 'address',
						page: '/pages/mine/comment'
					}, {
						text: '设置',
						src: 'help',
						page: '/pages/mine/setting/index'
					}, {
						text: '关于我们',
						src: 'aboutus',
						page: '/pages/mine/about/index'
					}
					// #ifdef MP-WEIXIN
					, {
						text: '合作伙伴',
						src: 'partner',
						page: '/pages/my/partner/partner'
					}
					// #endif
				],
				otherNavOps: [
					{ name: '礼包兑换', img: require('../../static/nav/mine-setting-6.png'), url: '/pages/pay/charge' },
					{ name: '意见反馈', img: require('../../static/nav/mine-setting-5.png'), url: '/pages/mine/comment' },
					{ name: '修改密码', img: require('../../static/nav/mine-setting-1.png'), url: '/pages/mine/pwd' },
					{ name: '关于我们', img: require('../../static/nav/mine-setting-4.png'), url: '/pages/mine/about' },
					{ name: '用户协议', img: require('../../static/nav/mine-setting-2.png'), url: '/pages/mine/xieyi' },
					{ name: '隐私政策', img: require('../../static/nav/mine-setting-3.png'), url: '/pages/mine/mimi' },
					{ name: '系统设置', img: require('../../static/nav/mine-setting-7.png'), url: '/pages/mine/setting' }
				],
				user: '',
				balance:'',
			}
		},
		onLoad() {
			
			this.$u.api.getUserBalance().then((res) => {
				console.log(res)
				if(res){
					this.balance=res
				}
			})
		},
		methods: {
			
			href(page, e) {
				if (page === 'appreciate') {
					let urls = `${this.resUrl}/common/img_wxpay.png`
					// #ifdef MP-ALIPAY
					urls = `${this.resUrl}/common/img_alipay.png`
					// #endif

					// #ifdef MP-TOUTIAO || MP-BAIDU || MP-QQ
					if (this.status == 0) {
						this.fui.toast('感谢您的支持，暂不支持此功能！')
					} else {
						uni.previewImage({
							urls: [urls]
						});
					}
					// #endif

					// #ifndef MP-TOUTIAO || MP-BAIDU || MP-QQ
					uni.previewImage({
						urls: [urls]
					});
					// #endif
				} else if (page === 'feedback') {
					uni.showModal({
						title: '意见反馈',
						content: '欢迎拨打我们的电话，提供宝贵意见',
						confirmColor: this.appThemeColor,
						success: function(res) {
							if (res) {
								let phone = '‭18820041590‬'
								uni.makePhoneCall({
									phoneNumber: phone,
									success: function() {
										console.log('拨打电话成功');
									},
									fail() {
										console.log('打电话失败了');
									}
								})
							}
						}
					});
				} else if (page === 'contract') {
					uni.setClipboardData({
						data: "18820041590",
						success: function() {
							uni.showModal({
								title: '联系客服',
								content: '已复制客服微信，点击跳转添加？',
								confirmColor: this.appThemeColor,
								success: function(res) {
									if (res) {
										if (plus.os.name == 'Android') {
											plus.runtime.launchApplication({
													pname: 'com.tencent.mm'
												},
												function(e) {
													console.log('Open system default browser failed: ' + e
														.message);
												}
											);
										} else if (plus.os.name == 'iOS') {
											plus.runtime.launchApplication({
												action: 'taobao://'
											}, function(e) {
												console.log('Open system default browser failed: ' + e
													.message);
											});
										}
									}
								}
							});
						}
					});

				} else {
					// #ifdef MP-TOUTIAO || MP-BAIDU
					if (this.status == 0 && ~page.indexOf('share')) {
						this.fui.toast('功能完善中~')
						return;
					}
					// #endif
					this.$u.route({url:page})
					// this.fui.href(page)
				}
			},
			getLink(link, e) {
				$fui.getClipboardData(link, res => {
					this.fui.toast('链接复制成功');
				}, e);
			},
			getBalance() {
				this.$u.api.getUserBalance().then(res => {
					console.log(res)
					this.user = res;
					
				});
			}
		},
		onShareAppMessage() {
			return {
				title: 'First UI组件库'
			}
		}
	}
</script>

<style>
	page {
		background-color: #FFFFFF;
	}

	.fui-banner__box {
		width: 100%;
		height: 512rpx;
		background: #EDF9FF;
		position: relative;
	}

	.fui-banner {
		width: 100%;
		height: 512rpx;
		display: block;
	}

	.fui-vip__box {
		width: 100%;
		position: absolute;
		left: 0;
		bottom: 0;
	}

	.fui-mod__box {
		width: 100%;
		height: 124rpx;
		background: #31344D;
		border-radius: 16rpx 16rpx 0 0;
		overflow: hidden;
	}

	.fui-vip__bg {
		width: 100%;
		height: 124rpx;
		display: block;
	}

	.fui-vip__text {
		font-size: 28rpx;
		color: #FFD694;
		position: absolute;
		height: 100%;
		left: 200rpx;
		top: 0;
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
	}

	.fui-vip__btn {
		font-size: 28rpx;
		color: #FFD694;
		position: absolute;
		height: 100%;
		right: 64rpx;
		top: 0;
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
	}

	.fui-menu__wrap {
		height: 210rpx;
		background: #FFFFFF;
		box-shadow: 0 4rpx 8rpx 0 rgba(2, 4, 38, 0.05);
		border-radius: 0 0 16rpx 16rpx;
	}

	.fui-menu__item {
		flex: 1;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		font-size: 24rpx;
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
		position: relative;
	}

	.fui-menu__img {
		width: 96rpx;
		height: 96rpx;
		border-radius: 24rpx;
		margin-bottom: 16rpx;
	}

	.fui-menu__img image {
		width: 64rpx;
		height: 64rpx;
		display: block;
	}

	.fui-btn__feedback {
		background: transparent !important;
		position: absolute;
		height: 100%;
		width: 100%;
		left: 0;
		top: 0;
		border: 0;
		z-index: 1;
	}

	.fui-btn__feedback::after {
		border: 0;
	}

	.fui-list__wrap {
		padding-top: 32rpx;
	}

	.fui-list__icon {
		width: 48rpx;
		height: 48rpx;
	}

	.fui-list__text {
		padding-left: 24rpx;
	}
</style>