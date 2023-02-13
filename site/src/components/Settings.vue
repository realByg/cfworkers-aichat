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
			</NGrid>
		</NForm>
		<a class="text-xs" target="_blank" href="https://platform.openai.com/account/api-keys">
			{{ t('settings.getAPI') }}
		</a>

		<NDivider class="!mt-1" />

		<NForm>
			<NGrid x-gap="26" cols="1 m:2" responsive="screen">
				<NFormItemGi :label="t('settings.preset')">
					<NSelect v-model:value="preset" />
				</NFormItemGi>
			</NGrid>
		</NForm>

		<NCollapse>
			<NCollapseItem :title="t('settings.advanced')" name="1">
				<NForm class="mt-3">
					<NGrid x-gap="26" cols="1 m:2" responsive="screen">
						<NFormItemGi :label="t('settings.model')">
							<NSelect v-model:value="apiConfig.model" />
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
						<NFormItemGi :label="t('settings.stop')">
							<NDynamicTags v-model:value="apiConfig.stop" :max="4" size="large" />
						</NFormItemGi>
					</NGrid>
				</NForm>
				<a
					class="text-xs"
					target="_blank"
					href="https://platform.openai.com/docs/api-reference/completions/create"
				>
					{{ t('settings.refer') }}
				</a>
			</NCollapseItem>
		</NCollapse>

		<NDivider />

		<NForm>
			<NGrid x-gap="26" cols="1 m:2" responsive="screen">
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
} from 'naive-ui'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import useStore from '../utils/useStore'
import { storeToRefs } from 'pinia'
import Dialog from './Dialog.vue'

const about = 'https://github.com/realByg/'

const localeOptions = [
	{ label: '中文', value: 'zhCN' },
	{ label: 'English', value: 'enUS' },
]

const { t } = useI18n()

const { apiConfig, locale, preset, apiKey, orgId } = storeToRefs(useStore())

const showDialog = ref(false)

defineExpose({
	openDialog: () => {
		showDialog.value = true
	},
})
</script>
