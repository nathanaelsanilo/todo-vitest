<script lang="ts" setup>
import { computed } from 'vue'
import type { Props } from './types'
const props = withDefaults(defineProps<Props>(), {
  as: 'span',
  size: 'default'
})

const classes = computed(() => ({
  ['is-large']: props.size === 'lg'
}))
</script>

<template>
  <component :is="props.as" class="icon" :class="classes" data-testid="vicon">
    <slot name="default"></slot>
  </component>
</template>
