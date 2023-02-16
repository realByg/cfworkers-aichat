import { watch, ref } from 'vue'
import { zhCN, dateZhCN, darkTheme, enUS, dateEnUS } from 'naive-ui'
import useStore from './useStore'
import { storeToRefs } from 'pinia'
import i18n from './i18n'

const useConfigProviderProps = () => {
	const { locale: storedLocale } = storeToRefs(useStore())

	const locale = ref(enUS)
	const dateLocale = ref(dateEnUS)
	const theme = ref(darkTheme)

	watch(
		storedLocale,
		() => {
			i18n.global.locale.value = storedLocale.value
			switch (storedLocale.value) {
				case 'zhCN':
					locale.value = zhCN
					dateLocale.value = dateZhCN
					break

				default:
					locale.value = enUS
					dateLocale.value = dateEnUS
					break
			}
		},
		{ immediate: true },
	)

	return {
		locale,
		dateLocale,
		theme,
	}
}

export default useConfigProviderProps
