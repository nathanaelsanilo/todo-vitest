<script lang="ts" setup>
import type { Props } from './types'

withDefaults(defineProps<Props>(), {
  label: '',
  max: 2000,
  min: 0,
  step: 100,
  testid: 'vrange'
})

const model = defineModel<number>()
</script>

<template>
  <div class="field">
    <label v-if="!!label" :for="name" class="label">{{ label }} {{ modelValue }}</label>
    <div class="control">
      <input
        :id="name"
        v-model.number="model"
        type="range"
        :name="name"
        :max="max"
        :min="min"
        :step="step"
        :data-testid="testid"
      />
    </div>
  </div>
</template>
