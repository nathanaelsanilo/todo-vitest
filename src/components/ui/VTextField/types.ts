import type { InputTypeHTMLAttribute } from 'vue'

export type Props = {
  name: string
  label?: string
  id?: string
  modelValue?: string
  type?: InputTypeHTMLAttribute
}
