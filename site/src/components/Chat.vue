<template>
	<ChatScroll ref="chatScrollRef">
		<Message
			v-for="message in messageList"
			:position="message.isFromUser ? 'right' : 'left'"
			:content="message.content"
			:type="message.type"
		/>
		<Message v-if="isLoading" position="left" isLoading />
	</ChatScroll>
	<ChatInput @send="sendMessage" />
</template>

<script setup lang="ts">
import ChatScroll from './ChatScroll.vue'
import Message from './Message.vue'
import ChatInput from './ChatInput.vue'
import { ref, nextTick, watch, computed } from 'vue'
import useStore from '../utils/useStore'
import { storeToRefs } from 'pinia'
import request from '../utils/request'

const chatScrollRef = ref<typeof ChatScroll>()

const { messageList, mode } = storeToRefs(useStore())

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
		type: 'text'
	})
	isLoading.value = true

	// let apiPath = ''
	// let prompt = ''
	// const apiConfigData: Record<string, any> = {}

	// if (mode.value === 'dialog') {
	// 	apiPath = '/completions'
	// 	for (const item of messageList.value) {
	// 		// if (item.isFromUser) prompt += 'Human: '
	// 		// else prompt += 'AI: '
	// 		prompt += item.content + '\n'
	// 	}
	// 	// prompt += 'AI: '
	// 	apiConfigData.model = apiConfig.value.model
	// 	apiConfigData.n = apiConfig.value.dialogN
	// 	apiConfigData.temperature = apiConfig.value.temperature
	// 	apiConfigData.max_tokens = apiConfig.value.maxTokens
	// 	apiConfigData.top_p = apiConfig.value.topP
	// 	if (apiConfig.value.stop.length) {
	// 		apiConfigData.stop = apiConfig.value.stop
	// 	}
	// 	apiConfigData.frequency_penalty = apiConfig.value.frequencyPenalty
	// 	apiConfigData.presence_penalty = apiConfig.value.presencePenalty
	// 	apiConfigData.prompt = prompt
	// } else if (mode.value === 'image') {
	// 	apiPath = '/images/generations'
	// 	prompt = content
	// 	apiConfigData.n = apiConfig.value.imageN
	// 	apiConfigData.size = apiConfig.value.size
	// }

	// try {
	// 	const response = (await request.post(apiPath, apiConfigData)).data
	// 	if (mode.value === 'dialog') {
	// 		for (const choice of response.choices) {
	// 			messageList.value.push({
	// 				isFromUser: false,
	// 				content: choice.text.trim(),
	// 			})
	// 		}
	// 	}
	// } catch (error) {}
	isLoading.value = false
}
</script>
