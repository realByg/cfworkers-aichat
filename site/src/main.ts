import { createApp } from 'vue'
import App from './App.vue'
import { store } from './utils/useStore'
import i18n from './utils/i18n'

import 'tailwindcss/tailwind.css'
import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'

const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)

createApp(App).use(store).use(i18n).mount('#app')
