<template>
	<div class="bg-zinc-700 h-[54px] lg:h-[60px] flex items-center px-2 lg:px-4">
		<img src="/favicon.svg" class="block m-0 h-8 w-8 lg:h-10 lg:w-10" />

		<div class="h-10 px-2 flex-1 overflow-hidden">
			<div class="font-bold lg:text-lg lg:leading-tight">
				{{ t('header.title') }}
			</div>
			<div
				class="text-xs lg:text-sm leading-none text-zinc-400 w-full overflow-hidden whitespace-nowrap text-ellipsis"
			>
				{{ t('header.desc') }}
			</div>
		</div>

		<NButton class="!ml-2" type="error" quaternary circle @click="messageList = []">
			<template #icon>
				<NIcon size="24">
					<Clean />
				</NIcon>
			</template>
		</NButton>

		<NPopselect
			v-model:value="locale"
			:options="[
				{ label: '中文', value: 'zhCN' },
				{ label: 'English', value: 'enUS' },
			]"
			placement="bottom-start"
		>
			<NButton class="!ml-2" type="primary" quaternary circle>
				<template #icon>
					<NIcon size="30">
						<Translate16Regular />
					</NIcon>
				</template>
			</NButton>
		</NPopselect>

		<NButton class="!ml-2" type="primary" quaternary circle @click="settingsRef?.open()">
			<template #icon>
				<NIcon size="30">
					<Settings16Regular />
				</NIcon>
			</template>
		</NButton>

		<NButton
			class="!ml-2"
			type="info"
			quaternary
			circle
			tag="a"
			href="https://github.com/realByg/"
			target="_blank"
		>
			<template #icon>
				<NIcon size="30">
					<LogoGithub />
				</NIcon>
			</template>
		</NButton>
	</div>

	<Settings ref="settingsRef" />
</template>

<script setup lang="ts">
import { NIcon, NButton, NPopselect } from 'naive-ui'
import { Translate16Regular, Settings16Regular } from '@vicons/fluent'
import { Clean, LogoGithub } from '@vicons/carbon'
import Settings from './Settings.vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import useStore from '../utils/useStore'
import { storeToRefs } from 'pinia'

const { t } = useI18n()

const settingsRef = ref<typeof Settings>()

const { messageList, locale } = storeToRefs(useStore())
</script>
