// tsyringe
// look https://github.com/microsoft/tsyringe/issues/180#issuecomment-982651609
import '@abraham/reflection'

import { createTestingPinia } from '@pinia/testing'
import { QueryClient } from '@tanstack/vue-query'
import { config } from '@vue/test-utils'
import { vi } from 'vitest'
import { i18n } from './src/modules/i18n'

config.global.plugins = [i18n, createTestingPinia({ createSpy: vi.fn })]
config.global.mocks = {
  $t: (key: string) => key,
  t: (key: string) => key
}
config.global.provide = {
  VUE_QUERY_CLIENT: new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    }
  })
}
