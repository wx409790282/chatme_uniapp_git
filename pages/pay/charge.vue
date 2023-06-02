<!--本文件由FirstUI授权予庄宇鸿（手机号：   1  3  82628 10  14，身份证尾号：   1 44 015）专用，请尊重知识产权，勿私下传播，违者追究法律责任。-->
<template>
	<view class="fui-wrap">
		<navbar title="礼包兑换"></navbar>
		<view class="fui-page__hd">
			<view class="fui-page__title fui-align__center" @tap="vip">礼包兑换<image
					src="/static/images/index/light/icon_member_3x.png"></image>
			</view>
			<view class="fui-page__desc" >输入兑换码，兑换礼包次数</view>
		</view>
		<view class="fui-page__bd">
			<!--H5端如果使用了默认导航栏，则top值不可设置为0，默认为44px-->
			<fui-form ref="form" top="0" style="margin: 20rpx;">
				<u-input required style="width: 60%;margin-left: 40rpx;"  v-model="formData.secret" placeholder="请输入兑换码"
					:placeholder-style="{ color: '#ccc', fontSize: '30rpx' }" />
				<view class="fui-btn__box">
					<u-button :disabled="!formData.secret " type="primary" shape="circle"
						@click="submit">提交</u-button>
				</view>
			</fui-form>
		</view>
		
	</view>
</template>

<script>
	//微信号自定义校验方法
	
	const rules = [{
		name: "secret",
		rule: ["required",  "minLength:5", "maxLength:10"],
		msg: ["请输入兑换码",  "姓名必须2个或以上字符", "姓名不能超过6个字符"]
	}];
	export default {
		data() {
			return {
				formData: {
					secret: '',
					
				},
				
			}
		},
		methods: {
			submit() {
				const that=this
				console.log(this.formData)
				this.$refs.form.validator(this.formData, rules).then(res => {
					console.log(res)
					if (res.isPassed) {
						
						that.getPromotList().then(
							res => {
								that.fui.toast('兑换成功！')
								that.formData.code=""
							}
						)
					}else{
						that.fui.toast(res.errorMsg)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			getPromotList() {
				const that=this
				return new Promise((resolve, reject) => {
				  request({
				    'url': '/chat/charge/use',
				    'method': 'post',
					data:that.formData
				  }).then(res => {
				    resolve(res)
				  }).catch(error => {
				    reject(error)
				  })
				})
			}
			
		}
	}
</script>

<style>
	page {
		font-weight: normal;
	}

	.fui-section__title {
		margin-left: 32rpx;
	}

	.fui-list__cell {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.fui-text {
		font-size: 30rpx;
		padding-left: 16rpx;
	}

	.fui-section__title:not(:first-child) {
		margin-top: 64rpx;
	}

	.fui-clause--cell {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24rpx;
	}

	.fui-clause--wrap {
		width: 100%;
		margin-top: 64rpx;
	}

	.fui-clause--text {
		padding-left: 16rpx;
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
	}

	.fui-color__link {
		color: var(--fui-color-link);
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
	}

	.fui-color__link:active {
		opacity: .5;
	}

	.fui-btn__box {
		width: 100%;
		padding: 64rpx 32rpx;
		box-sizing: border-box;
	}
</style>