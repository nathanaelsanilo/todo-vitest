import { createI18n } from 'vue-i18n'
import enUs from '@/locales/en-us.json'
import id from '@/locales/id.json'

type MessageSchema = typeof enUs

const i18n = createI18n<[MessageSchema], 'en-US' | 'id'>({
  legacy: false,
  allowComposition: true,
  locale: 'en-US',
  fallbackLocale: 'en-US',
  messages: {
    id,
    'en-US': enUs
  }
})

export { i18n }
