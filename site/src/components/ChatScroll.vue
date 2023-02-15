<template>
	<div class="flex-1 overflow-hidden">
		<NScrollbar class="chat-scrollbar" ref="scrollbarRef" trigger="hover" :onScroll="onScroll">
			<slot />

			<div
				class="absolute right-[20px] bottom-[20px] lg:right-[40px] lg:bottom-[40px] transition-all duration-200"
				:class="[showBackBottom ? 'opacity-100' : 'opacity-0']"
			>
				<NButton @click="scrollToBottom('smooth')" strong secondary circle type="primary">
					<template #icon>
						<NIcon><VerticalAlignBottomOutlined /></NIcon>
					</template>
				</NButton>
			</div>
		</NScrollbar>
	</div>
</template>

<script setup lang="ts">
import { NIcon, NScrollbar, NButton } from 'naive-ui'
import { VerticalAlignBottomOutlined } from '@vicons/material'
import { onMounted, ref } from 'vue'

const scrollbarRef = ref<typeof NScrollbar>()

const showBackBottom = ref(false)

const onScroll = (e: Event) => {
	const scrollTop = (e.target as HTMLElement).scrollTop || 0
	const clientHeight = scrollbarRef.value?.scrollbarInstRef.contentRef.clientHeight || 0
	showBackBottom.value = scrollTop < clientHeight - 1000
}

const scrollToBottom = (behavior: 'smooth' | 'auto' = 'auto') => {
	scrollbarRef.value &&
		scrollbarRef.value.scrollTo({
			top: scrollbarRef.value.scrollbarInstRef.contentRef.clientHeight,
			behavior,
		})
}

onMounted(() => {
	scrollToBottom()
})

defineExpose({
	scrollToBottom,
})
</script>

<style scoped>
:deep(.chat-scrollbar > .n-scrollbar-container > .n-scrollbar-content) {
	@apply min-h-full flex flex-col justify-end pt-4 px-2;
}

:deep(.chat-scrollbar > .n-scrollbar-rail--vertical) {
	@apply !right-[2px];
}
</style>
