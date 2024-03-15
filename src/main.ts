import './assets/main.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import { i18n } from '@/modules/i18n'

const app = createApp(App)
app.use(i18n)
app.use(createPinia())

app.mount('#app')
