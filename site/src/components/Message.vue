<template>
	<div
		class="w-full pb-4 flex"
		:class="{
			'justify-start': position === 'left',
			'justify-end': position === 'right',
			'animate-pulse': isLoading,
		}"
	>
		<div v-if="position === 'left'" class="lg:w-4 w-3 bg-zinc-800 border-none">
			<div class="w-full h-full rounded-br-lg bg-zinc-600"></div>
		</div>
		<div
			class="lg:max-w-[60%] max-w-[80%] inline relative p-3 rounded-lg overflow-hidden break-words select-text"
			:class="{
				'bg-zinc-800 rounded-bl-none': position === 'left',
				'bg-zinc-500 rounded-br-none': position === 'right',
				'text-red-600': isError,
			}"
		>
			<template v-if="content">
				<div v-if="type === 'text'" class="whitespace-pre-wrap">
					{{ content }}
				</div>
				<NImage v-else-if="type === 'image'" :src="content">
					<template #placeholder>
						<div
							class="animate-pulse bg-zinc-700 max-w-full w-[500px] aspect-square"
						></div>
					</template>
				</NImage>
			</template>
			<div v-else-if="isLoading" class="w-[30vw] h-6"></div>
		</div>
		<div v-if="position === 'right'" class="lg:w-4 w-3 bg-zinc-500">
			<div class="w-full h-full rounded-bl-lg bg-zinc-600"></div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { NImage } from 'naive-ui'

defineProps<{
	position: 'left' | 'right'
	isLoading?: boolean
	content?: string
	type?: 'text' | 'image' | 'code'
	isError?: boolean
}>()
</script>
