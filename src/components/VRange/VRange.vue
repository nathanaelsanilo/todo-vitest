<script lang="ts" setup>
import type { Props } from './types'

withDefaults(defineProps<Props>(), {
  label: '',
  max: 500,
  min: 0,
  step: 100
})

const model = defineModel()
</script>

<template>
  <div class="field">
    <label v-if="!!label" for="" class="label">{{ label }} {{ modelValue }}</label>
    <div class="control">
      <input id="" v-model="model" type="range" name="" :max="max" :min="min" :step="step" />
    </div>
  </div>
</template>
