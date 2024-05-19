<script lang="ts" setup>
import type { Props } from './types'

withDefaults(defineProps<Props>(), {
  title: ''
})
</script>
<template>
  <div class="level">
    <div class="level-left">
      <div class="level-item">
        <slot name="left">
          <h1 class="title">{{ title }}</h1>
        </slot>
      </div>
    </div>

    <div v-if="$slots.action" class="level-right">
      <div class="level-item">
        <slot name="action"> </slot>
      </div>
    </div>
  </div>
</template>
