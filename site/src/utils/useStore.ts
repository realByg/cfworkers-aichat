import { createPinia, defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const store = createPinia()

const useStore = defineStore('store', () => ({
	messageList: useStorage<
		{
			isFromUser: boolean
			text: string
		}[]
	>('messageList', []),

	apiKey: useStorage('apiKey', null),

	orgId: useStorage('orgId', null),

	mode: useStorage<'dialog' | 'image'>('mode', 'dialog'),

	apiConfig: useStorage('apiConfig', {
		model: 'text-davinci-003',
		temperature: 0,
		maxTokens: 200,
		topP: 0,
		stop: ['\\n'],
		frequencyPenalty: 0,
		presencePenalty: 0,
		size: '1024x1024',
		dialogN: 1,
		imageN: 1,
	}),

	locale: useStorage<'enUS' | 'zhCN'>('locale', 'enUS'),
}))

export default useStore
