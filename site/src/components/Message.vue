<template>
	<div
		class="w-full pb-4 flex"
		:class="{
			'justify-start': props.position === 'left',
			'justify-end': props.position === 'right',
			'animate-pulse': props.isLoading,
		}"
	>
		<div v-if="props.position === 'left'" class="lg:w-4 w-3 bg-zinc-800 border-none">
			<div class="w-full h-full rounded-br-lg bg-zinc-600"></div>
		</div>
		<div
			class="lg:max-w-[60%] max-w-[80%] inline relative p-4 rounded-lg overflow-hidden break-words"
			:class="{
				'bg-zinc-800 rounded-bl-none': props.position === 'left',
				'bg-zinc-500 rounded-br-none': props.position === 'right',
			}"
		>
			<div v-if="props.content" class="whitespace-pre-wrap">
				{{ props.content }}
			</div>
			<div v-if="props.isLoading" class="w-[30vw] h-16"></div>
			<div v-if="props.tags?.length"></div>
		</div>
		<div v-if="props.position === 'right'" class="lg:w-4 w-3 bg-zinc-500">
			<div class="w-full h-full rounded-bl-lg bg-zinc-600"></div>
		</div>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{
	position: 'left' | 'right'
	isLoading?: boolean
	content?: string
	tags?: string[]
}>()
</script>
