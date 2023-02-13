<template>
	<NModal v-model:show="show">
		<NDialog
			class="!w-[90%]"
			:style="{
				'max-width': `${width} !important`,
			}"
			:title="title"
			:show-icon="false"
			@close="show = false"
		>
			<NScrollbar class="dialog-scrollbar max-h-[80vh]">
				<slot />
			</NScrollbar>
		</NDialog>
	</NModal>
</template>

<script setup lang="ts">
import { NDialog, NModal, NScrollbar } from 'naive-ui'
import { computed } from 'vue'

const props = defineProps<{
	show: boolean
	width: string
	title: string
}>()

const emit = defineEmits<{
	(e: 'update:show', show: boolean): void
}>()

const show = computed({
	get: () => props.show,
	set: (v) => emit('update:show', v),
})
</script>

<style scoped>
:deep(.dialog-scrollbar.n-scrollbar) {
	@apply !overflow-visible;
}

:deep(.dialog-scrollbar > .n-scrollbar-rail--vertical) {
	@apply !right-[-24px];
}
</style>
