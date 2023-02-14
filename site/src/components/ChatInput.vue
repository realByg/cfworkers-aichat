<template>
	<div class="bg-zinc-700 w-full px-2 py-4 lg:px-4 flex items-end">
		<NPopselect v-model:value="mode" :options="modeOptions" placement="top-start">
			<NButton type="primary" quaternary circle>
				<template #icon>
					<NIcon size="30">
						<Chat16Filled v-if="mode === 'dialog'" />
						<ImageMultiple16Filled v-else-if="mode === 'image'" />
					</NIcon>
				</template>
			</NButton>
		</NPopselect>

		<NInput
			class="lg:mx-4 mx-2"
			v-model:value="input"
			autofocus
			show-count
			type="textarea"
			:maxlength="300"
			@keydown.enter.exact.prevent="onSend"
			@keyup.ctrl.enter="newline"
			:autosize="{ minRows: 1, maxRows: 5 }"
			:placeholder="t('chatInput.placeholder')"
		/>

		<NButton type="primary" quaternary circle @click="onSend">
			<template #icon>
				<NIcon size="30">
					<Send24Filled />
				</NIcon>
			</template>
		</NButton>
	</div>
</template>

<script setup lang="ts">
import { NInput, NButton, NPopselect, NIcon } from 'naive-ui'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ImageMultiple16Filled, Chat16Filled, Send24Filled } from '@vicons/fluent'
import useStore from '../utils/useStore'
import { storeToRefs } from 'pinia'

const emit = defineEmits<{
	(e: 'send', input: string): void
}>()

const { t } = useI18n()

const { mode } = storeToRefs(useStore())

const input = ref('')

const modeOptions = [
	{ label: () => t('mode.dialog'), value: 'dialog' },
	{ label: () => t('mode.image'), value: 'image' },
]

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
