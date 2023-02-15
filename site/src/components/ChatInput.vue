<template>
	<div class="bg-zinc-700 w-full px-2 py-4 lg:px-4 flex items-end">
		<NPopselect v-model:value="mode" :options="modeOptions" placement="top-start">
			<NButton type="primary" quaternary circle>
				<template #icon>
					<NIcon size="30">
						<SlideText20Filled v-if="mode === 'text'" />
						<ImageMultiple16Filled v-else-if="mode === 'image'" />
						<CodeCircle20Filled v-else-if="mode === 'code'" />
					</NIcon>
				</template>
			</NButton>
		</NPopselect>

		<NInput
			class="lg:mx-4 mx-2"
			v-model:value="input"
			autofocus
			showCount
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
import { NInput, NButton, NPopselect, NIcon, SelectOption } from 'naive-ui'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ImageMultiple16Filled, SlideText20Filled, Send24Filled, CodeCircle20Filled } from '@vicons/fluent'
import useStore from '../utils/useStore'
import { storeToRefs } from 'pinia'

const emit = defineEmits<{
	(e: 'send', input: string): void
}>()

const { t } = useI18n()

const { mode } = storeToRefs(useStore())

const input = ref('')

const modeOptions: SelectOption[] = [
	{ label: () => t('mode.text'), value: 'text' },
	{ label: () => t('mode.image'), value: 'image' },
	{ label: () => t('mode.code'), value: 'code' },
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
