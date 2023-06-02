export const useMallApi = (Vue, vm) => {
	return {
		// 查询商城轮播图
		getMallHomeData: () => vm.$u.get('/index'),

		// 查询分类
		getMallClassify: () => vm.$u.get('/category'),
		getPayHistory: () => vm.$u.get('/chat/bills/listByMe'),
		commentSave:(params) => vm.$u.post('/chat/comment',params),
	}
}
