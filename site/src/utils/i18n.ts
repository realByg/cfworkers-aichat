import { createI18n } from 'vue-i18n'

const i18n = createI18n({
	legacy: false,
	locale: 'enUS',
	fallbackLocale: 'enUS',
	inheritLocale: true,
	messages: {
		enUS: {
			mode: {
				text: 'Text',
				image: 'Image',
				code: 'Code',
			},
		},
		zhCN: {
			mode: {
				text: '文字',
				image: '图片',
				code: '代码',
			},
		},
	},
})

export default i18n
