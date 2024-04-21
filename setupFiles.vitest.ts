// tsyringe
// look https://github.com/microsoft/tsyringe/issues/180#issuecomment-982651609
import '@abraham/reflection'

import { createTestingPinia } from '@pinia/testing'
import { config } from '@vue/test-utils'
import { i18n } from './src/modules/i18n'
import { vi } from 'vitest'

config.global.plugins = [i18n, createTestingPinia({ createSpy: vi.fn })]
config.global.mocks = {
  $t: (key: string) => key,
  t: (key: string) => key
}
