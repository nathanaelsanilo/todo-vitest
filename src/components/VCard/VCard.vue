<script lang="ts" setup>
import type { Props } from './types'

defineProps<Props>()
</script>

<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        <slot name="title">
          {{ title }}
        </slot>
      </p>
      <slot name="header-icon"></slot>
    </header>
    <div class="card-content">
      <slot name="content"></slot>
    </div>
    <footer class="card-footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>
