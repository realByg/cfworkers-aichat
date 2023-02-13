import { createPinia, defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const store = createPinia()

const useStore = defineStore('store', () => ({
	messageList: useStorage<
		{
			isFromUser: boolean
			content: string
			tags?: string[]
		}[]
	>('messageList', []),
	apiKey: useStorage('apiKey', null),
	orgId: useStorage('orgId', null),
	preset: useStorage('preset', null),
	apiConfig: useStorage('apiConfig', {
		model: null,
		n: 1,
		temperature: 0,
		maxTokens: 200,
		topP: 0,
		stop: [],
		frequencyPenalty: 0,
		presencePenalty: 0,
	}),
	locale: useStorage<'enUS' | 'zhCN'>('locale', 'enUS'),
}))

export default useStore
