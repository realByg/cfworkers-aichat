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

				<NGridItem :span="2">
					<a
						class="text-xs"
						target="_blank"
						href="https://platform.openai.com/account/api-keys"
					>
						{{ t('settings.getAPI') }}
					</a>
				</NGridItem>

				<NGridItem :span="2">
					<NDivider />
				</NGridItem>

				<NFormItemGi :label="t('settings.mode')">
					<NSelect v-model:value="mode" filterable :options="modeOptions" />
				</NFormItemGi>

				<NGridItem class="hidden lg:block"></NGridItem>

				<NFormItemGi v-if="mode === 'dialog'" :label="t('settings.model')">
					<NSelect
						v-model:value="apiConfig.model"
						filterable
						tag
						:options="modelOptions"
					/>
				</NFormItemGi>

				<NFormItemGi
					v-if="mode === 'dialog'"
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

				<NFormItemGi
					v-if="mode === 'dialog'"
					:label="`${t('settings.maxTokens')}: ${apiConfig.maxTokens}`"
				>
					<NSlider
						v-model:value="apiConfig.maxTokens"
						:tooltip="false"
						:min="1"
						:max="4000"
						:step="1"
					/>
				</NFormItemGi>

				<NFormItemGi
					v-if="mode === 'dialog'"
					:label="`${t('settings.topP')}: ${apiConfig.topP}`"
				>
					<NSlider
						v-model:value="apiConfig.topP"
						:tooltip="false"
						:min="0"
						:max="1"
						:step="0.01"
					/>
				</NFormItemGi>

				<NFormItemGi
					v-if="mode === 'dialog'"
					:label="`${t('settings.frequencyPenalty')}: ${apiConfig.frequencyPenalty}`"
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
					v-if="mode === 'dialog'"
					:label="`${t('settings.presencePenalty')}: ${apiConfig.presencePenalty}`"
				>
					<NSlider
						v-model:value="apiConfig.presencePenalty"
						:tooltip="false"
						:min="0"
						:max="2"
						:step="0.01"
					/>
				</NFormItemGi>

				<NFormItemGi :label="`${t('settings.n')}: ${apiConfig.n}`">
					<NSlider
						v-model:value="apiConfig.n"
						:tooltip="false"
						:min="1"
						:max="10"
						:step="1"
					/>
				</NFormItemGi>

				<NFormItemGi v-if="mode === 'dialog'" :label="t('settings.stop')">
					<NDynamicTags v-model:value="apiConfig.stop" :max="4" size="large" />
				</NFormItemGi>

				<NFormItemGi v-if="mode === 'image'" :label="t('settings.size')">
					<NSelect v-model:value="apiConfig.size" filterable :options="sizeOptions" />
				</NFormItemGi>

				<NGridItem :span="2">
					<a
						class="text-xs"
						target="_blank"
						href="https://platform.openai.com/docs/api-reference/completions/create"
					>
						{{ t('settings.refer') }}
					</a>
				</NGridItem>

				<NGridItem :span="2">
					<NDivider />
				</NGridItem>

				<NFormItemGi :label="t('settings.locale')">
					<NSelect :options="localeOptions" v-model:value="locale" />
				</NFormItemGi>

				<NFormItemGi :label="t('settings.about')">
					<NButton text tag="a" :href="about" target="_blank" type="primary">
						{{ about }}
					</NButton>
				</NFormItemGi>
			</NGrid>
		</NForm>
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
	NButton,
	NCollapse,
	NCollapseItem,
	NInput,
	SelectGroupOption,
	SelectOption,
	NGridItem,
} from 'naive-ui'
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import useStore from '../utils/useStore'
import { storeToRefs } from 'pinia'
import Dialog from './Dialog.vue'
import models from '../data/models.json'

const { apiConfig, locale, preset, apiKey, orgId, mode } = storeToRefs(useStore())

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

const about = 'https://github.com/realByg/'

const localeOptions = [
	{ label: '中文', value: 'zhCN' },
	{ label: 'English', value: 'enUS' },
]

const modeOptions = [
	{ label: () => t('mode.dialog'), value: 'dialog' },
	{ label: () => t('mode.image'), value: 'image' },
]

const sizeOptions = [
	{ label: '1024x1024', value: '1024x1024' },
	{ label: '512x512', value: '512x512' },
	{ label: '256x256', value: '256x256' },
]

const showDialog = ref(false)

defineExpose({
	openDialog: () => {
		showDialog.value = true
	},
})
</script>
