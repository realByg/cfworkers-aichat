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

	mode: useStorage<'dialog' | 'image'>('mode', 'dialog'),

	preset: useStorage('preset', null),

	apiConfig: useStorage('apiConfig', {
		model: 'text-davinci-003',
		n: 1,
		temperature: 0,
		maxTokens: 200,
		topP: 0,
		stop: ['\\n'],
		frequencyPenalty: 0,
		presencePenalty: 0,
		size: '1024x1024'
	}),

	locale: useStorage<'enUS' | 'zhCN'>('locale', 'enUS'),
}))

export default useStore
