<template>
	<ChatScroll ref="chatScrollRef">
		<Message
			v-for="message in messageList"
			:position="message.isFromUser ? 'right' : 'left'"
			:content="message.content"
			:tags="message.tags"
		/>
		<Message v-if="isLoading" position="left" isLoading />
	</ChatScroll>
	<ChatInput @send="onSend" />
</template>

<script setup lang="ts">
import ChatScroll from './ChatScroll.vue'
import Message from './Message.vue'
import ChatInput from './ChatInput.vue'
import { ref, nextTick, watch } from 'vue'
import useStore from '../utils/useStore'
import { storeToRefs } from 'pinia'

const chatScrollRef = ref<typeof ChatScroll>()

const { messageList, apiConfig } = storeToRefs(useStore())

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

const onSend = (v: string) => {
	messageList.value.push({
		isFromUser: true,
		content: v,
	})
	messageList.value.push({
		isFromUser: false,
		content: v,
	})
}
</script>
