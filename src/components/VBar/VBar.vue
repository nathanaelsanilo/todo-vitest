<script lang="ts" setup generic="TData extends BarItemProps">
import { toRefs } from 'vue'
import VBarItem from './VBarItem.vue'
import type { BarItemProps, Props } from './types'

const props = withDefaults(defineProps<Props<TData>>(), {
  data: () => []
})

const { data } = toRefs(props)
</script>

<template>
  <div class="bar">
    <slot v-for="item in data" name="bar" :bar="item">
      <VBarItem :value="item.value" :selected="item.selected" />
    </slot>
  </div>
</template>

<style lang="scss" scoped>
.bar {
  min-height: 200px;
  display: flex;
  align-items: end;
  gap: 2px;
}
</style>
