<script lang="ts" setup>
import { useAttrs } from 'vue'
import type { Props } from './types'
defineOptions({
  inheritAttrs: false
})
const props = defineProps<Props>()
const model = defineModel<string>('modelValue')
const attrs = useAttrs()
</script>

<template>
  <div class="field">
    <label :for="id" class="label" data-testid="vtextfield-label">
      {{ label }}
    </label>
    <div class="control">
      <input
        v-bind="$attrs"
        :id="props.id"
        v-model="model"
        :data-testid="attrs['data-testid'] ?? 'vtextfield-input'"
        :type="props.type ?? 'text'"
        class="input"
        :name="props.name"
      />
    </div>
  </div>
</template>
