<script lang="ts" setup>
import { computed } from 'vue'
import type { Props } from './types'

const props = defineProps<Props>()
const classes = computed(() => ({
  button: true,
  'is-primary': props.colors === 'primary',
  'is-danger': props.colors === 'danger',
  'is-small': props.size === 'sm',
  'is-white': props.colors === 'white',
  'is-success': props.colors === 'success'
}))
</script>

<template>
  <button data-testid="vbutton" :class="classes">
    <slot>{{ label }}</slot>
  </button>
</template>
