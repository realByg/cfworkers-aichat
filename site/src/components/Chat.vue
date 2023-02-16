<template>
	<ChatScroll ref="chatScrollRef">
		<Message v-for="message in messages" :message="message" />
		<Message v-if="loading" loading />
	</ChatScroll>
	<ChatInput @send="sendMessage" />
</template>

<script setup lang="ts">
import ChatScroll from './ChatScroll.vue'
import Message from './Message.vue'
import ChatInput from './ChatInput.vue'
import { ref, nextTick, watch } from 'vue'
import useStore from '../utils/useStore'
import { storeToRefs } from 'pinia'
import request from '../utils/request'

const chatScrollRef = ref<typeof ChatScroll>()

const { messages, mode, apiConfigs } = storeToRefs(useStore())

const loading = ref(false)

watch(
	() => [messages.value.length, loading.value],
	() => {
		nextTick(() => {
			chatScrollRef.value?.scrollToBottom('smooth')
		})
	},
	{ immediate: true },
)

const sendMessage = async (content: string) => {
	messages.value.push({
		isAI: false,
		content,
		mode: mode.value,
		as: 'text',
		type: 'chat',
	})
	loading.value = true

	const apiPath = (() => {
		if (mode.value === 'text' || mode.value === 'code') return '/v1/completions'
		else if (mode.value === 'image') return '/v1/images/generations'
	})()!
	const prompt = (() => {
		if (mode.value === 'text')
			return messages.value
				.filter((i) => i.mode === 'text')
				.map((i) => i.content)
				.join('\n')
		else if (mode.value === 'code' || mode.value === 'image') return content
	})()

	try {
		const response = (
			await request.post(apiPath, {
				...apiConfigs.value[mode.value],
				prompt,
			})
		).data
		if (mode.value === 'text' || mode.value === 'code') {
			for (const choice of response.choices) {
				messages.value.push({
					isAI: true,
					content: choice.text.trim(),
					mode: mode.value,
					as: mode.value,
					type: 'chat',
				})
			}
		} else if (mode.value === 'image') {
			for (const item of response.data) {
				messages.value.push({
					isAI: true,
					content: item.url,
					mode: mode.value,
					as: mode.value,
					type: 'chat',
				})
			}
		}
	} catch (error: any) {
		if (error?.response) {
			messages.value.push({
				isAI: true,
				mode: mode.value,
				as: mode.value,
				error: error?.response?.data?.error?.message || String(error),
				type: 'chat',
			})
		}
	}
	loading.value = false
}
</script>
