<script lang="ts" setup>
import type { EnumVariant } from '@/types/variants'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    as?: string
    variant?: EnumVariant
  }>(),
  {
    as: 'section'
  }
)

const classes = computed(() => ({
  ['is-primary']: props.variant === 'primary'
}))
</script>

<template>
  <component :is="as" class="hero" :class="classes">
    <slot></slot>
  </component>
</template>
