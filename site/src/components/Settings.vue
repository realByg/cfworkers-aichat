<template>
	<Dialog v-model:show="showDialog" width="500px" :title="t('settings.title')">
		<NForm class="mt-3">
			<NGrid x-gap="26" cols="1" responsive="screen">
				<NFormItemGi :label="t('settings.api')">
					<NInput v-model:value="apiKey" clearable />
				</NFormItemGi>

				<NFormItemGi :label="t('settings.org')">
					<NInput v-model:value="orgId" clearable />
				</NFormItemGi>
			</NGrid>
		</NForm>
	</Dialog>
</template>

<script setup lang="ts">
import {
	NForm,
	NFormItemGi,
	NGrid,
	NInput,
} from 'naive-ui'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import useStore from '../utils/useStore'
import { storeToRefs } from 'pinia'
import Dialog from './Dialog.vue'

const { apiKey, orgId } = storeToRefs(useStore())

const { t } = useI18n()
const showDialog = ref(false)

defineExpose({
	open: () => {
		showDialog.value = true
	},
})
</script>
