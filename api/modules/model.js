export const useModelApi = (Vue, vm) => {
	return {
		// 获取openid
		getModelList: () => vm.$u.get('/chat/model/list', {
			
		}),
		getPromotListByModel: (modelId) => vm.$u.get('/chat/content/list', {
			category:modelId
		}),
		getChatHistoryList:(params) => vm.$u.get('/chat/session/listByMe', params),
		getSessionDetailList:(params) => vm.$u.get('/chat/answer/listAll', params),
	}
}
