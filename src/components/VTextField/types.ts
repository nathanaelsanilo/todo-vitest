import type { InputTypeHTMLAttribute } from 'vue'

export type Props = Partial<{
  name: string
  label: string
  id: string
  modelValue: string
  type: InputTypeHTMLAttribute
}>
