<template>
	<ChatScroll ref="chatScrollRef">
		<Message
			v-for="message in messageList"
			:position="message.isFromUser ? 'right' : 'left'"
			:content="message.content"
			:type="message.type"
			:isError="message.isError"
		/>
		<Message v-if="isLoading" position="left" isLoading />
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

const { messageList, mode, apiConfigs } = storeToRefs(useStore())

const isLoading = ref(false)

watch(
	() => [messageList.value.length, isLoading.value],
	() => {
		nextTick(() => {
			chatScrollRef.value?.scrollToBottom('smooth')
		})
	},
	{ immediate: true },
)

const sendMessage = async (content: string) => {
	messageList.value.push({
		isFromUser: true,
		content,
		type: 'text',
	})
	isLoading.value = true

	const apiPath = (() => {
		if (mode.value === 'text' || mode.value === 'code') return '/v1/completions'
		else if (mode.value === 'image') return '/v1/images/generations'
	})()!
	const prompt = (() => {
		if (mode.value === 'text') return messageList.value.map((i) => i.content).join('\n')
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
				messageList.value.push({
					isFromUser: false,
					content: choice.text.trim(),
					type: 'text',
				})
			}
		} else if (mode.value === 'image') {
			for (const item of response.data) {
				messageList.value.push({
					isFromUser: false,
					content: item.url,
					type: 'image',
				})
			}
		}
	} catch (error: any) {
		const errorMsg = error.response.data?.error?.message || String(error)
		messageList.value.push({
			isFromUser: false,
			content: errorMsg,
			type: 'text',
			isError: true,
		})
	}
	isLoading.value = false
}
</script>
