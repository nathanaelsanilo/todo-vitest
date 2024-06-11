<script lang="ts" setup>
import { VControl } from '@/components/VControl'

defineProps<{
  label?: string
  name?: string
  isGrouped?: boolean
}>()
</script>

<template>
  <div class="field" :class="{ 'is-grouped': isGrouped }">
    <label v-if="label" :for="name">
      {{ label }}
    </label>
    <slot name="grouped">
      <VControl>
        <slot name="default" :html-name="name"></slot>
      </VControl>
    </slot>
  </div>
</template>
