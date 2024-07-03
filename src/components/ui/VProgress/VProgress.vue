<script lang="ts" setup>
import type { Props } from './types'

const props = withDefaults(defineProps<Props>(), {
  value: 0,
  loading: false
})
</script>

<template>
  <progress
    data-testid="vprogress"
    class="progress is-primary"
    :class="{ 'is-skeleton': loading }"
    :value="props.value"
    max="100"
  ></progress>
</template>
