<script lang="ts" setup>
import type { Props } from './types'
defineOptions({
  inheritAttrs: false
})
const props = defineProps<Props>()
const model = defineModel<string>('modelValue')
</script>

<template>
  <div class="field">
    <label :for="id" class="label" data-testid="vtextfield-label">
      {{ label }}
    </label>
    <div class="control">
      <input
        v-bind="$attrs"
        :id="id"
        v-model="model"
        data-testid="vtextfield-input"
        type="text"
        class="input"
        :name="name"
      />
    </div>
  </div>
</template>
