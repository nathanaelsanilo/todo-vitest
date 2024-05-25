<script lang="ts" setup>
import BubbleSort from '@/components/Sorts/BubbleSort.vue'
import SelectionSort from '@/components/Sorts/SelectionSort.vue'
import FiftyJson from '@/json/fifty.json'
import TwentyJson from '@/json/twenty.json'
import { ref } from 'vue'

defineOptions({
  name: 'SortsPage'
})
const fifty = () => [...FiftyJson]
const twenty = () => [...TwentyJson]
const bubbleSortData = ref(fifty())
const selectionSortData = ref(twenty())
</script>

<template>
  <div class="section">
    <div class="container is-max-desktop">
      <BubbleSort :data="bubbleSortData" @reset="bubbleSortData = fifty()" />
    </div>
    <div class="container is-max-desktop mt-6">
      <SelectionSort :data="selectionSortData" @reset="selectionSortData = twenty()" />
    </div>
  </div>
</template>
