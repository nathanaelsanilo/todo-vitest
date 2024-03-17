<script lang="ts" setup>
import type { Props } from './types'
const props = withDefaults(defineProps<Props>(), {
  as: 'span'
})
</script>

<template>
  <component :is="props.as" class="icon" data-testid="vicon">
    <slot name="default"></slot>
  </component>
</template>
