<script lang="ts" setup>
import BubbleSort from '@/components/Sorts/BubbleSort.vue'
import SelectionSort from '@/components/Sorts/SelectionSort.vue'
import FiftyJson from '@/json/fifty.json'
import { ref } from 'vue'

defineOptions({
  name: 'SortsPage'
})
const fifty = () => [...FiftyJson]
const bubbleSortData = ref(fifty())
</script>

<template>
  <div class="section">
    <div class="container is-max-desktop">
      <BubbleSort :data="bubbleSortData" @reset="bubbleSortData = fifty()" />
    </div>
    <div class="container is-max-desktop mt-6">
      <SelectionSort />
    </div>
  </div>
</template>
