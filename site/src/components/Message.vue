<template>
	<div
		v-if="message?.type === 'chat' || loading"
		class="w-full pb-4 flex"
		:class="[{ 'animate-pulse': loading }, leftSide ? 'justify-start' : 'justify-end']"
	>
		<div v-if="leftSide" class="lg:w-4 w-3 bg-zinc-800 border-none">
			<div class="w-full h-full rounded-br-lg bg-zinc-600"></div>
		</div>

		<div
			class="lg:max-w-[60%] max-w-[80%] inline relative p-3 rounded-lg overflow-hidden break-words select-text"
			:class="[leftSide ? 'bg-zinc-800 rounded-bl-none' : 'bg-zinc-500 rounded-br-none']"
		>
			<template v-if="message?.content">
				<div
					v-if="message?.mode === 'text' || message?.mode === 'code'"
					class="whitespace-pre-wrap"
				>
					{{ message?.content }}
				</div>
				<!-- todo -->
				<NImage v-else-if="message?.mode === 'image'" :src="message.content">
					<template #placeholder>
						<div
							class="animate-pulse bg-zinc-700 max-w-full w-[500px] aspect-square"
						></div>
					</template>
				</NImage>
			</template>

			<div v-else-if="message?.error" class="text-red-400">
				{{ message?.error }}
			</div>

			<div v-else-if="loading" class="w-[20vw] h-6"></div>
		</div>

		<div v-if="!leftSide" class="lg:w-4 w-3 bg-zinc-500">
			<div class="w-full h-full rounded-bl-lg bg-zinc-600"></div>
		</div>
	</div>

	<div v-else-if="message?.type === 'info'" class="w-full text-center pb-4 text-sm text-zinc-400">
		{{ message?.content }}
	</div>
</template>

<script setup lang="ts">
import { NImage } from 'naive-ui'
import { computed } from 'vue'
import { type Message } from '../utils/types'

const props = defineProps<{
	message?: Message
	loading?: boolean
}>()

const leftSide = computed(() => props.message?.isAI || props.loading)
</script>
