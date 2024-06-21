<script lang="ts" setup>
import type { Props } from './types'

withDefaults(defineProps<Props>(), {
  title: '',
  subtitle: ''
})
</script>
<template>
  <div class="level">
    <div class="level-left">
      <div class="level-item">
        <slot name="left">
          <div>
            <h1 class="title">{{ title }}</h1>
            <slot name="subtitle">
              <h2 v-if="subtitle" class="subtitle">
                {{ subtitle }}
              </h2>
            </slot>
          </div>
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
