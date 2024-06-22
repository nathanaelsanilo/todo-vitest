<script lang="ts" setup>
import { VControl } from '@/components/VControl'
import { useField } from 'vee-validate'
import { toRefs, useAttrs } from 'vue'
import type { Props } from './types'

defineOptions({
  inheritAttrs: false
})
const props = defineProps<Props>()

defineModel<string | number>('modelValue')

const { name, id, type, label } = toRefs(props)
const attrs = useAttrs()
const { value, errorMessage, meta } = useField(name, undefined, {
  syncVModel: 'modelValue'
})
</script>

<template>
  <div class="field">
    <label :for="id" class="label" data-testid="vtextfield-label">
      {{ label }}
    </label>
    <VControl>
      <input
        v-bind="$attrs"
        :id="id"
        v-model="value"
        :data-testid="attrs['data-testid'] ?? 'vtextfield-input'"
        :type="type ?? 'text'"
        class="input"
        :name="name"
      />
    </VControl>
    <p v-if="errorMessage && meta.touched" class="help is-danger">
      {{ errorMessage }}
    </p>
  </div>
</template>
