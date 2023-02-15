import { createPinia, defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const store = createPinia()

type Mode = 'text' | 'image' | 'code'
type ApiConfig = {
	model: string
	n: number
	temperature: number
	maxTokens: number
	topP: number
	stop: string[]
	frequencyPenalty: number
	presencePenalty: number
	size: string
}
type ApiConfigs = Record<Mode, Partial<ApiConfig>>

const useStore = defineStore('store', () => ({
	locale: useStorage<'enUS' | 'zhCN'>('locale', 'enUS'),

	apiKey: useStorage('apiKey', null),

	orgId: useStorage('orgId', null),

	messageList: useStorage<
		{
			isFromUser: boolean
			content: string
			type: Mode
			isError?: boolean
		}[]
	>('messageList', []),

	mode: useStorage<Mode>('mode', 'text'),

	apiConfigs: useStorage<ApiConfigs>('apiConfigs', {
		text: {
			model: 'text-davinci-003',
			n: 1,
			temperature: 0,
			maxTokens: 200,
			topP: 0,
			stop: ['\\n'],
			frequencyPenalty: 0,
			presencePenalty: 0,
		},
		image: {
			n: 1,
			size: '512x512',
		},
		code: {
			model: 'code-davinci-002',
			n: 1,
			temperature: 0,
			maxTokens: 64,
			topP: 1,
			stop: ['\\n'],
			frequencyPenalty: 0,
			presencePenalty: 0,
		},
	}),
}))

export default useStore
