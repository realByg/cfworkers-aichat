<template>
	<Dialog v-model:show="showDialog" width="1000px" :title="t('settings.title')">
		<NForm class="mt-3">
			<NGrid xGap="26" cols="1 m:2" responsive="screen">
				<NFormItemGi :label="t('settings.api')">
					<NInput v-model:value="apiKey" clearable />
				</NFormItemGi>

				<NFormItemGi :label="t('settings.org')">
					<NInput v-model:value="orgId" clearable />
				</NFormItemGi>

				<NFormItemGi
					v-if="creditGrants"
					:label="`${t('settings.creditGrants')}: $${Number(
						creditGrants?.totalAvailable,
					).toFixed(2)} / $${Number(creditGrants?.totalGranted).toFixed(2)}`"
				>
					<NProgress
						type="line"
						:percentage="
							(creditGrants?.totalAvailable / creditGrants?.totalGranted) * 100
						"
						:height="34"
						:borderRadius="3"
						:fillBorderRadius="0"
						color="rgb(99, 226, 183)"
						railColor="rgb(99, 226, 183, 0.2)"
						:showIndicator="false"
					/>
				</NFormItemGi>
			</NGrid>
		</NForm>

		<NCollapse>
			<NCollapseItem :title="t('mode.text')" name="text">
				<NForm>
					<NGrid xGap="26" cols="1 m:2" responsive="screen">
						<NFormItemGi :label="t('settings.model')">
							<NSelect
								v-model:value="apiConfigs.text.model"
								filterable
								tag
								:options="textModelOptions"
							/>
						</NFormItemGi>

						<NFormItemGi
							:label="`${t('settings.temperature')}: ${apiConfigs.text.temperature}`"
						>
							<NSlider
								v-model:value="apiConfigs.text.temperature"
								:tooltip="false"
								:min="0"
								:max="1"
								:step="0.01"
							/>
						</NFormItemGi>

						<NFormItemGi
							:label="`${t('settings.maxTokens')}: ${apiConfigs.text.maxTokens}`"
						>
							<NSlider
								v-model:value="apiConfigs.text.maxTokens"
								:tooltip="false"
								:min="1"
								:max="4000"
								:step="1"
							/>
						</NFormItemGi>

						<NFormItemGi :label="`${t('settings.topP')}: ${apiConfigs.text.topP}`">
							<NSlider
								v-model:value="apiConfigs.text.topP"
								:tooltip="false"
								:min="0"
								:max="1"
								:step="0.01"
							/>
						</NFormItemGi>

						<NFormItemGi
							:label="`${t('settings.frequencyPenalty')}: ${
								apiConfigs.text.frequencyPenalty
							}`"
						>
							<NSlider
								v-model:value="apiConfigs.text.frequencyPenalty"
								:tooltip="false"
								:min="0"
								:max="2"
								:step="0.01"
							/>
						</NFormItemGi>

						<NFormItemGi
							:label="`${t('settings.presencePenalty')}: ${
								apiConfigs.text.presencePenalty
							}`"
						>
							<NSlider
								v-model:value="apiConfigs.text.presencePenalty"
								:tooltip="false"
								:min="0"
								:max="2"
								:step="0.01"
							/>
						</NFormItemGi>

						<NFormItemGi :label="`${t('settings.n')}: ${apiConfigs.text.n}`">
							<NSlider
								v-model:value="apiConfigs.text.n"
								:tooltip="false"
								:min="1"
								:max="10"
								:step="1"
							/>
						</NFormItemGi>

						<NFormItemGi :label="t('settings.stop')">
							<NDynamicTags
								v-model:value="apiConfigs.text.stop"
								:max="4"
								size="large"
							/>
						</NFormItemGi>
					</NGrid>
				</NForm>
			</NCollapseItem>

			<NCollapseItem :title="t('mode.image')" name="image">
				<NForm>
					<NGrid xGap="26" cols="1 m:2" responsive="screen">
						<NFormItemGi :label="`${t('settings.n')}: ${apiConfigs.image.n}`">
							<NSlider
								v-model:value="apiConfigs.image.n"
								:tooltip="false"
								:min="1"
								:max="10"
								:step="1"
							/>
						</NFormItemGi>

						<NFormItemGi :label="t('settings.size')">
							<NSelect
								v-model:value="apiConfigs.image.size"
								filterable
								:options="sizeOptions"
							/>
						</NFormItemGi>
					</NGrid>
				</NForm>
			</NCollapseItem>

			<NCollapseItem :title="t('mode.code')" name="code">
				<NForm>
					<NGrid xGap="26" cols="1 m:2" responsive="screen">
						<NFormItemGi :label="t('settings.model')">
							<NSelect
								v-model:value="apiConfigs.code.model"
								filterable
								tag
								:options="codeModelOptions"
							/>
						</NFormItemGi>

						<NFormItemGi
							:label="`${t('settings.temperature')}: ${apiConfigs.code.temperature}`"
						>
							<NSlider
								v-model:value="apiConfigs.code.temperature"
								:tooltip="false"
								:min="0"
								:max="1"
								:step="0.01"
							/>
						</NFormItemGi>

						<NFormItemGi
							:label="`${t('settings.maxTokens')}: ${apiConfigs.code.maxTokens}`"
						>
							<NSlider
								v-model:value="apiConfigs.code.maxTokens"
								:tooltip="false"
								:min="1"
								:max="4000"
								:step="1"
							/>
						</NFormItemGi>

						<NFormItemGi :label="`${t('settings.topP')}: ${apiConfigs.code.topP}`">
							<NSlider
								v-model:value="apiConfigs.code.topP"
								:tooltip="false"
								:min="0"
								:max="1"
								:step="0.01"
							/>
						</NFormItemGi>

						<NFormItemGi
							:label="`${t('settings.frequencyPenalty')}: ${
								apiConfigs.code.frequencyPenalty
							}`"
						>
							<NSlider
								v-model:value="apiConfigs.code.frequencyPenalty"
								:tooltip="false"
								:min="0"
								:max="2"
								:step="0.01"
							/>
						</NFormItemGi>

						<NFormItemGi
							:label="`${t('settings.presencePenalty')}: ${
								apiConfigs.code.presencePenalty
							}`"
						>
							<NSlider
								v-model:value="apiConfigs.code.presencePenalty"
								:tooltip="false"
								:min="0"
								:max="2"
								:step="0.01"
							/>
						</NFormItemGi>

						<NFormItemGi :label="`${t('settings.n')}: ${apiConfigs.code.n}`">
							<NSlider
								v-model:value="apiConfigs.code.n"
								:tooltip="false"
								:min="1"
								:max="10"
								:step="1"
							/>
						</NFormItemGi>

						<NFormItemGi :label="t('settings.stop')">
							<NDynamicTags
								v-model:value="apiConfigs.code.stop"
								:max="4"
								size="large"
							/>
						</NFormItemGi>
					</NGrid>
				</NForm>
			</NCollapseItem>
		</NCollapse>
	</Dialog>
</template>

<script setup lang="ts">
import {
	NForm,
	NFormItemGi,
	NGrid,
	NInput,
	NProgress,
	NCollapse,
	NCollapseItem,
	NSelect,
	NSlider,
	NDynamicTags,
} from 'naive-ui'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import useStore from '../utils/useStore'
import { storeToRefs } from 'pinia'
import Dialog from './Dialog.vue'
import request from '../utils/request'

const textModelOptions = [
	{
		label: 'text-davinci-003',
		value: 'text-davinci-003',
	},
	{
		label: 'text-curie-001',
		value: 'text-curie-001',
	},
	{
		label: 'text-babbage-001',
		value: 'text-babbage-001',
	},
	{
		label: 'text-ada-001',
		value: 'text-ada-001',
	},
]

const codeModelOptions = [
	{
		label: 'code-davinci-002',
		value: 'code-davinci-002',
	},
	{
		label: 'code-cushman-001',
		value: 'code-cushman-001',
	},
]

const sizeOptions = [
	{ label: '1024x1024', value: '1024x1024' },
	{ label: '512x512', value: '512x512' },
	{ label: '256x256', value: '256x256' },
]

const { apiKey, orgId, apiConfigs, messages } = storeToRefs(useStore())

const { t } = useI18n()

const showDialog = ref(false)

const creditGrants = ref<null | Record<string, any>>(null)

const getCreditGrants = async () => {
	try {
		creditGrants.value = (await request.get('/dashboard/billing/credit_grants')).data
	} catch (error) {
		creditGrants.value = null
	}
}

watch(apiKey, () => {
	getCreditGrants()
	messages.value = []
})

defineExpose({
	open: () => {
		showDialog.value = true
		getCreditGrants()
	},
})
</script>
