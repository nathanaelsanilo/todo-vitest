<script lang="ts" setup>
import { computed } from 'vue'
import type { VColumnProps as Props } from './types'

const props = withDefaults(defineProps<Props>(), {})

const classes = computed(() => ({
  [`is-${props.gridSize}`]: props.gridSize
}))
</script>

<template>
  <div :class="['column', classes]">
    <slot></slot>
  </div>
</template>
