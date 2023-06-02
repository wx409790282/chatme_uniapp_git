<!--本文件由FirstUI授权予庄宇鸿（手机号：1  3 8 2  62   810 14，身份证尾号： 1  440 1 5）专用，请尊重知识产权，勿私下传播，违者追究法律责任。-->
<template>
	<view class="fui-wrap">
		<view class="fui-page__hd">
			<view class="fui-page__title">{{model.name}}</view>
			<view class="fui-page__desc">{{model.describ}}</view>
		</view>
		<view class="fui-page__bd">
			<view v-if="promotList.length==0">
				<text> 无对话记录</text>
			</view>
			<u-cell-group :border="false">
				<view v-for="(item,index) in promotList" :key="index" @click="changePromot(index)">
					<u-cell-item :title='item.content' :arrow="true"></u-cell-item>
				</view>
			</u-cell-group>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				model: '',
				promotList: [],
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
			}
		},
		onLoad:function(option){
			const eventChannel=this.getOpenerEventChannel();
			const that=this
			// const eventChannel=this.$scope.eventChannel;
			eventChannel.on("argParams",function(data){
				that.model=data
				console.log(data); 
				that.getmorenews()
			})
			
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
				this.$u.api.getPromotListByModel(this.model.id).then(res => {
					that.queryParams.pageNum++; // 得到数据之后 page+1
					if (res.rows < 1) { // 没有数据
						that.loadingType = 2;
						uni.hideNavigationBarLoading(); // 关闭加载动画
						return;
					}
					that.page++; // 每触底一次 page +1
					that.promotList = this.promotList.concat(res.rows)
					that.loadingType = 0; // 将loadingType归0重置
					uni.hideNavigationBarLoading(); // 关闭加载动画
				});
			},
			
			changePromot(e){
				const that=this
				uni.navigateTo({
				    // 方式一：此方式传参，刷新页面参数不丢失，参数在url上显示
				    // 如果是对象或者数组参数可使用 JSON.stringfy()，将参数转化成字符串，然后获取时，通过 JSON.parse() 转化成对象
				    url: '/pages/chat/chat/chat', 
				    
				    // 方式二：通过eventChannel向被打开页面传送数据，此方式传参，刷新页面参数会丢失
				    // 此方式只是适合 uni.navigateTo() 方法
				    success: function(res) {
				        res.eventChannel.emit('argParams', {'model':that.modelList[selectedModel],'promot':that.promotList[e],'isNew':true
				        })
				 }
				})
			},
			

		}
	}
</script>

<style>
	page {
		font-weight: normal;
		/* 非nvue端使用此变量改变list线条颜色，nvue端请查看文档 */
		/* --fui-color-border:#B2B2B2; */
	}

	.fui-section__title {
		margin-left: 32rpx;
	}

	.fui-list__item {
		flex: 1;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.fui-text__explain {
		font-size: 28rpx;
		color: #7F7F7F;
		flex-shrink: 0;
	}

	.fui-list__icon {
		width: 48rpx;
		height: 48rpx;
		margin-right: 24rpx;
	}
	
	.article-shadow {
	  border-radius: 15rpx;
	  box-shadow: 0rpx 0rpx 50rpx 0rpx rgba(0, 0, 0, 0.07);
	}
	
	/* 文字截取*/
	.clamp-text-1 {
	  -webkit-line-clamp: 1;
	  display: -webkit-box;
	  -webkit-box-orient: vertical;
	  text-overflow: ellipsis;
	  overflow: hidden;
	}
	
	.clamp-text-2 {
	  -webkit-line-clamp: 2;
	  display: -webkit-box;
	  -webkit-box-orient: vertical;
	  text-overflow: ellipsis;
	  overflow: hidden;
	}
	
	/* 标签内容 start*/
	.tn-tag-content {
	  &__item {
	    display: inline-block;
	    line-height: 35rpx;
	    padding: 5rpx 25rpx;
	
	    &--prefix {
	      padding-right: 10rpx;
	    }
	  }
	}
</style>