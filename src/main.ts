// tsyringe
// look https://github.com/microsoft/tsyringe/issues/180#issuecomment-982651609
import '@abraham/reflection'

import './assets/main.scss'
import 'bootstrap-icons/font/bootstrap-icons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import { i18n } from '@/modules/i18n'

const app = createApp(App)
app.use(i18n)
app.use(createPinia())

app.mount('#app')
