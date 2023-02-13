<template>
	<div class="bg-zinc-700 h-[54px] lg:h-[60px] flex items-center px-3 lg:px-6">
		<img src="/favicon.svg" class="block m-0 h-8 w-8 lg:h-10 lg:w-10" />
		<div class="h-10 ml-2">
			<div class="font-bold lg:text-lg lg:leading-tight">ChatGPT</div>
			<div class="text-xs lg:text-sm leading-none text-zinc-400">
				{{ t('header.desc') }}
			</div>
		</div>

		<div class="flex-1"></div>

		<NDropdown
			trigger="click"
			:options="dropdownOptions"
			@select="onDropdownSelect"
			placement="bottom-end"
		>
			<NButton quaternary circle type="primary" class="!ml-2">
				<template #icon>
					<NIcon size="30"><MoreVertical32Filled /></NIcon>
				</template>
			</NButton>
		</NDropdown>
	</div>

	<Settings ref="settingsRef" />
</template>

<script setup lang="ts">
import { NIcon, NButton, NDropdown } from 'naive-ui'
import { MoreVertical32Filled } from '@vicons/fluent'
import Settings from './Settings.vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import useStore from '../utils/useStore'
import { storeToRefs } from 'pinia'

const { t } = useI18n()

const settingsRef = ref<typeof Settings>()

const { messageList } = storeToRefs(useStore())

const dropdownOptions = [
	{ label: () => t('header.clearMsg'), key: 'clearMsg', props: { class: '!text-red-500' } },
	{ label: () => t('settings.title'), key: 'settings' },
]

const onDropdownSelect = (key: string) => {
	if (key === 'clearMsg') {
		messageList.value = []
	} else if (key === 'settings') {
		settingsRef.value?.openDialog()
	}
}
</script>
