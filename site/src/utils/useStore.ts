import { createPinia, defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { type Mode, type Message } from './types'

export const store = createPinia()

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

	messages: useStorage<Message[]>('messages', []),

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
