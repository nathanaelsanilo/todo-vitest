<script lang="ts" setup>
import type { Props } from './types'

const props = withDefaults(defineProps<Props>(), {
  value: 0
})
</script>

<template>
  <progress
    data-testid="vprogress"
    class="progress is-primary"
    :value="props.value"
    max="100"
  ></progress>
</template>
