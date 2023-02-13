<template>
	<div class="bg-zinc-700 w-full bottom-0 left-0 px-2 py-4 lg:px-6 lg:py-4">
		<NInputGroup>
			<NInput
				v-model:value="input"
				autofocus
				show-count
				type="textarea"
				size="large"
				:maxlength="300"
				@keydown.enter.exact.prevent="onSend"
				@keyup.ctrl.enter="newline"
				:autosize="{ minRows: 1, maxRows: 5 }"
				:placeholder="t('chatInput.placeholder')"
			/>
			<NButton class="!h-auto" type="primary" size="large" @click="onSend">
				{{ t('chatInput.send') }}
			</NButton>
		</NInputGroup>
	</div>
</template>

<script setup lang="ts">
import { NInput, NButton, NInputGroup } from 'naive-ui'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const emit = defineEmits<{
	(e: 'send', input: string): void
}>()

const { t } = useI18n()

const input = ref('')

const newline = () => {
	input.value += '\n'
}

const onSend = () => {
	const value = input.value.trim()
	if (!value) return
	emit('send', value)
	input.value = ''
}
</script>
