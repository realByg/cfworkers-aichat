import { createI18n } from 'vue-i18n'
import messages from '../data/locale.json'

const i18n = createI18n({
	legacy: false,
	locale: 'enUS',
	fallbackLocale: 'enUS',
	messages,
})

export default i18n
