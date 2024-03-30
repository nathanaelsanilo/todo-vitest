<script lang="ts" setup>
import { computed } from 'vue'
import type { VColumnsProps } from './types'

const props = defineProps<VColumnsProps>()

const classes = computed(() => ({
  [`is-${props.alignItems}`]: !!props.alignItems
}))
</script>

<template>
  <div :class="['columns', classes]">
    <slot></slot>
  </div>
</template>
