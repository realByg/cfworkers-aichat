<template>
	<Dialog v-model:show="showDialog" width="900px" :title="t('settings.title')">
		<NForm class="mt-3">
			<NGrid x-gap="26" cols="1 m:2" responsive="screen">
				<NFormItemGi :label="t('settings.api')">
					<NInput v-model:value="apiKey" clearable />
				</NFormItemGi>

				<NFormItemGi :label="t('settings.org')">
					<NInput v-model:value="orgId" clearable />
				</NFormItemGi>

				<!-- <NGridItem :span="2">
					<a
						class="text-xs"
						target="_blank"
						href="https://platform.openai.com/account/api-keys"
					>
						{{ t('settings.getAPI') }}
					</a>
				</NGridItem> -->
			</NGrid>
		</NForm>

		<NCollapse>
			<NCollapseItem :title="t('mode.dialog')" name="1">
				<NForm>
					<NGrid x-gap="26" cols="1 m:2" responsive="screen">
						<NFormItemGi :label="t('settings.model')">
							<NSelect
								v-model:value="apiConfig.model"
								filterable
								tag
								:options="modelOptions"
							/>
						</NFormItemGi>

						<NFormItemGi
							:label="`${t('settings.temperature')}: ${apiConfig.temperature}`"
						>
							<NSlider
								v-model:value="apiConfig.temperature"
								:tooltip="false"
								:min="0"
								:max="1"
								:step="0.01"
							/>
						</NFormItemGi>

						<NFormItemGi :label="`${t('settings.maxTokens')}: ${apiConfig.maxTokens}`">
							<NSlider
								v-model:value="apiConfig.maxTokens"
								:tooltip="false"
								:min="1"
								:max="4000"
								:step="1"
							/>
						</NFormItemGi>

						<NFormItemGi :label="`${t('settings.topP')}: ${apiConfig.topP}`">
							<NSlider
								v-model:value="apiConfig.topP"
								:tooltip="false"
								:min="0"
								:max="1"
								:step="0.01"
							/>
						</NFormItemGi>

						<NFormItemGi
							:label="`${t('settings.frequencyPenalty')}: ${
								apiConfig.frequencyPenalty
							}`"
						>
							<NSlider
								v-model:value="apiConfig.frequencyPenalty"
								:tooltip="false"
								:min="0"
								:max="2"
								:step="0.01"
							/>
						</NFormItemGi>

						<NFormItemGi
							:label="`${t('settings.presencePenalty')}: ${
								apiConfig.presencePenalty
							}`"
						>
							<NSlider
								v-model:value="apiConfig.presencePenalty"
								:tooltip="false"
								:min="0"
								:max="2"
								:step="0.01"
							/>
						</NFormItemGi>

						<NFormItemGi :label="`${t('settings.dialogN')}: ${apiConfig.dialogN}`">
							<NSlider
								v-model:value="apiConfig.dialogN"
								:tooltip="false"
								:min="1"
								:max="10"
								:step="1"
							/>
						</NFormItemGi>

						<NFormItemGi :label="t('settings.stop')">
							<NDynamicTags v-model:value="apiConfig.stop" :max="4" size="large" />
						</NFormItemGi>
					</NGrid>
				</NForm>
			</NCollapseItem>

			<NCollapseItem :title="t('mode.image')" name="2">
				<NForm>
					<NGrid x-gap="26" cols="1 m:2" responsive="screen">
						<NFormItemGi :label="`${t('settings.imageN')}: ${apiConfig.imageN}`">
							<NSlider
								v-model:value="apiConfig.imageN"
								:tooltip="false"
								:min="1"
								:max="10"
								:step="1"
							/>
						</NFormItemGi>

						<NFormItemGi :label="t('settings.size')">
							<NSelect
								v-model:value="apiConfig.size"
								filterable
								:options="sizeOptions"
							/>
						</NFormItemGi>
					</NGrid>
				</NForm>
			</NCollapseItem>
		</NCollapse>

		<!-- <a
			class="text-xs"
			target="_blank"
			href="https://platform.openai.com/docs/api-reference/completions/create"
		>
			{{ t('settings.refer') }}
		</a> -->
	</Dialog>
</template>

<script setup lang="ts">
import {
	NForm,
	NFormItemGi,
	NSelect,
	NGrid,
	NDynamicTags,
	NSlider,
	NDivider,
	NInput,
	SelectGroupOption,
	NGridItem,
	NCollapse,
	NCollapseItem,
} from 'naive-ui'
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import useStore from '../utils/useStore'
import { storeToRefs } from 'pinia'
import Dialog from './Dialog.vue'
import models from '../data/models.json'

const { apiConfig, apiKey, orgId } = storeToRefs(useStore())

const { t } = useI18n()

const modelOptions = computed(() => {
	let options: SelectGroupOption[] = []
	for (const model of models) {
		if (options.every((i) => i.key !== model.serie)) {
			options.push({
				type: 'group',
				label: model.serie,
				key: model.serie,
				children: models
					.filter((i) => i.serie === model.serie)
					.map((i) => ({
						label: i.id,
						value: i.id,
					})),
			})
		}
	}
	return options
})

const sizeOptions = [
	{ label: '1024x1024', value: '1024x1024' },
	{ label: '512x512', value: '512x512' },
	{ label: '256x256', value: '256x256' },
]

const showDialog = ref(false)

defineExpose({
	open: () => {
		showDialog.value = true
	},
})
</script>
