<script lang="ts" setup>
import type { CardHeaderIconProps as Props } from './types'

const props = withDefaults(defineProps<Props>(), {
  as: 'div'
})
</script>

<template>
  <component :is="props.as" class="card-header-icon">
    <slot name="icon"></slot>
  </component>
</template>
