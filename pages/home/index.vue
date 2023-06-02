<template>
	<view class="page">
		<!-- 带城市、搜索框的导航栏 -->
		<!-- 金刚区 -->
		<view class="fui-banner__box">
			<image class="fui-banner" src="/static/bg/index_banner_3x.png" mode="widthFix"></image>
			<view class="fui-banner__content">
				<image class="fui-logo" src="/static/app/logo.png" mode="widthFix"></image>
				<view class="fui-title">AI助手</view>
				<view class="fui-desc">有了好助手，生活乐无忧！选择角色开启你的顺畅生活之旅吧！</view>
			</view>
			<view class="fui-page__bd">
				<!-- <view class="fui-section__title">选择角色</view> -->
				<!-- <fui-grid>
					<fui-grid-item v-for="(item,index) in modelList" :key="index" @click="changeModel(index)">
						<view class="fui-grid__cell">
							<image :src="`${baseUrl}${item.img}`" class="fui-icon" mode="scaleToFill"></image>
							<text>{{item.name}}</text>
						</view>
					</fui-grid-item>
				</fui-grid> -->
				<view class="nav-list">
					<view
						class="nav-item"
						style="width: 25%;"
						:style="[{ marginTop: index > 3 ? marginTopLine : '' }]"
						v-for="(item, index) in modelList"
						:key="index"
						@click="changeModel(index)"
					>
						<view class="list-img"><u-image width="84rpx" height="84rpx" mode="widthFix" :src="`${config.baseProfileUrl}/${item.img}`"></u-image></view>
						<view class="list-text" style="fontSize: 28rpx ">{{ item.name }}</view>
					</view>
				</view>
			</view>
		
		</view>
		<!-- 横向滚动列表 -->
		
	</view>
</template>

<script>
// 导入组件
import NavbarCitySearch from '@/components/navbar/navbar-city-search.vue';
import DialNav from '@/components/nav/dial-nav.vue';
import HorizontalScrollNav from '@/components/nav/horizontal-scroll-nav.vue';
import CardGoods from '@/pages/mall/components/card.vue';
import PostCardSimple from '@/pages/community/components/post-card-simple.vue';
import TitleOperate from '@/components/title-operate.vue';
// 导入假数据
import { goodsList, topicList, dialNavListHome, horizontalScrollNavList } from '@/static/test-data.js';
import { UVIEWUI_HTTP_CONFIG } from '../../api/config';
export default {
	components: { NavbarCitySearch, DialNav, HorizontalScrollNav, CardGoods, PostCardSimple, TitleOperate },
	data() {
		return {
			// 金刚区
			dialNavList: dialNavListHome,
			// 横向滚动列表
			horizontalScrollNavList: horizontalScrollNavList,
			// 由城市选择页面返回的选择城市数据
			nowSelectedCity: '',
			// 推荐商品列表
			recommendGoodsList: [],
			// 精选晒单列表
			modelList: [],
			config:UVIEWUI_HTTP_CONFIG
		};
	},
	onShow() {
		// 处理是否手动选择了城市
		
	},
	onLoad() {
		this.$u.api.getModelList().then(res => {
			this.modelList = res.rows;
		});
	},
	methods: {
		// 首页需要渲染的数据
		changeModel(item) {
			console.log(item)
			const that=this
			uni.navigateTo({
				// 方式一：此方式传参，刷新页面参数不丢失，参数在url上显示
				// 如果是对象或者数组参数可使用 JSON.stringfy()，将参数转化成字符串，然后获取时，通过 JSON.parse() 转化成对象
				url: '/pages/chat/chat/chat',
		
				// 方式二：通过eventChannel向被打开页面传送数据，此方式传参，刷新页面参数会丢失
				// 此方式只是适合 uni.navigateTo() 方法
				success: function(res) {
					res.eventChannel.emit('argParams',{'model':that.modelList[item],'isNew':true} )
				}
			})
		
		},
	}
};
</script>

<style lang="scss" scoped>
.list {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	padding: 0 30rpx;
}
.dial-nav {
	padding: 24rpx 30rpx 30rpx 30rpx;
}
.nav-list {
			display: flex;
			flex-wrap: wrap;
			justify-content: flex-start;
			padding-top: 30rpx;
			padding-bottom: 32rpx;

			.nav-item {
				display: flex;
				flex-wrap: wrap;
				justify-content: center;
				align-items: center;

				.list-img {
					width: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
					margin-bottom: 16rpx;
				}

				.list-text {
					text-align: center;
					font-weight: 400;
					color: $app-theme-text-black-color;
				}
			}
		}
.fui-banner__box {
		width: 100%;
		height: 540rpx;
		position: relative;
		background-color: #EDF9FF;
	}

	.fui-icon {
		width: 96rpx;
		height: 96rpx;
	}

	.fui-grid__cell {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		flex: 1;
		font-size: 28rpx;
		font-weight: 400;
	}

	.fui-banner {
		width: 100%;
		height: 540rpx;
		display: block;
	}

	.fui-banner__content {
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: 2;
		left: 0;
		top: 0;
		padding: 80rpx 32rpx 0;
		box-sizing: border-box;
	}

	.fui-logo {
		width: 80rpx;
		height: 80rpx;
		border-radius: 16rpx;
		display: block;
	}

	.fui-title {
		font-size: 40rpx;
		line-height: 40rpx;
		padding: 24rpx 0 40rpx;
		box-sizing: border-box;
	}

	.fui-desc {
		width: 280rpx;
		font-size: 24rpx;
		line-height: 40rpx;
		color: #333333;
	}

	.fui-tabs__box {
		width: 100%;
		height: 108rpx;
		background: #FFFFFF;
		border-radius: 40rpx 40rpx 0 0;
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 12;
	}

	.fui-scroll__view {
		min-width: 100%;
		height: 108rpx;
		white-space: nowrap;
	}

	.fui-tab__item {
		flex-shrink: 0;
		padding: 0 26rpx;
		height: 108rpx;
		font-size: 28rpx;
		color: #7F7F7F;
		position: relative;
	}

	.fui-tab__item-text {
		transform: scale(1.2);
		color: #465CFF;
		transition: transform 0.2s linear;
	}

	.fui-tab__item-active::after {
		content: '';
		position: absolute;
		width: 0;
		height: 2px;
		background-color: #465CFF;
		border-radius: 2px;
		left: 24rpx;
		bottom: 0;
		transform: scale(1.2);
		animation: ani 0.2s linear forwards;
	}

	@keyframes ani {
		0% {
			width: 0;
		}

		100% {
			width: 45rpx;
		}
	}

	.fui-swiper__box,
	.fui-swiper__item,
	.fui-scroll__box {
		width: 100%;
	}

	.fui-list__view {
		width: 100%;
		min-height: 101%;
		padding: 8rpx 32rpx 32rpx;
		box-sizing: border-box;
	}

	.fui-list__item {
		width: 100%;
		height: 112rpx;
	}

	.fui-list__item text {
		padding-left: 24rpx;
		padding-right: 12rpx;
		flex-shrink: 0;
	}

	.fui-item__icon-box {
		width: 48rpx;
		height: 48rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.fui-item__icon,
	.fui-vip__icon {
		width: 48rpx;
		height: 48rpx;
		display: block;
		flex-shrink: 0;
	}
</style>
