export type Mode = 'text' | 'image' | 'code'

export interface Message {
	mode?: Mode
	as?: Mode
	content?: string
	type: 'chat' | 'info'
	error?: string
	isAI?: boolean
}
