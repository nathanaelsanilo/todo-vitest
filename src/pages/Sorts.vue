<script lang="ts" setup>
import BubbleSort from '@/components/Sorts/BubbleSort.vue'
import SelectionSort from '@/components/Sorts/SelectionSort.vue'

defineOptions({
  name: 'SortsPage'
})
</script>

<template>
  <div class="section">
    <div class="container is-max-desktop">
      <BubbleSort />
    </div>
    <div class="container is-max-desktop mt-6">
      <SelectionSort />
    </div>
  </div>
</template>
