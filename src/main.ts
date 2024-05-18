// tsyringe
// look https://github.com/microsoft/tsyringe/issues/180#issuecomment-982651609
import '@abraham/reflection'

import './container'

import 'bootstrap-icons/font/bootstrap-icons.css'
import './assets/main.scss'

import { VueQueryPlugin } from '@tanstack/vue-query'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'

import { i18n } from '@/modules/i18n'
import { router } from '@/modules/router'

const app = createApp(App)
app.use(i18n)
app.use(router)
app.use(createPinia())
app.use(VueQueryPlugin, {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
        refetchInterval: false
      }
    }
  }
})

app.mount('#app')
