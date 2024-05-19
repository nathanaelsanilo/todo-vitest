<script lang="ts" setup>
import type { BarItemProps } from './types.ts'

const props = defineProps<BarItemProps>()
</script>

<template>
  <div
    class="bar__item"
    :style="{ height: `${value}px` }"
    :class="{ 'bar__item--selected': selected }"
  ></div>
</template>

<style lang="scss" scoped>
.bar__item {
  flex: 1;
  width: 10px;
  background-color: var(--bulma-text-30);

  &--selected {
    background-color: var(--bulma-primary);
  }
}
</style>
