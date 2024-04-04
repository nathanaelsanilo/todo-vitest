// tsyringe
// look https://github.com/microsoft/tsyringe/issues/180#issuecomment-982651609
import '@abraham/reflection'

import { i18n } from './src/modules/i18n'
import { config } from '@vue/test-utils'

config.global.plugins = [i18n]
config.global.mocks = {
  $t: (key: string) => key,
  t: (key: string) => key
}
