import { createPinia, defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const store = createPinia()

const useStore = defineStore('store', () => ({
	locale: useStorage<'enUS' | 'zhCN'>('locale', 'enUS'),

	apiKey: useStorage('apiKey', null),

	orgId: useStorage('orgId', null),

	messageList: useStorage<
		{
			isFromUser: boolean
			content: string
			type: 'text' | 'image'
		}[]
	>('messageList', []),

	mode: useStorage<'dialog' | 'image'>('mode', 'dialog'),
}))

export default useStore
