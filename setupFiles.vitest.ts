// tsyringe
// look https://github.com/microsoft/tsyringe/issues/180#issuecomment-982651609
import '@abraham/reflection'

import { config } from '@vue/test-utils'
import { i18n } from './src/modules/i18n'

config.global.plugins = [i18n]
config.global.mocks = {
  $t: (key: string) => key,
  t: (key: string) => key
}
