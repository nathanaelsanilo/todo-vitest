<script lang="ts" setup>
import BubbleSort from '@/components/Sorts/BubbleSort.vue'
import InsertionSort from '@/components/Sorts/InsertionSort.vue'
import SelectionSort from '@/components/Sorts/SelectionSort.vue'
import { Generator } from '@/utils/Generator'
import { ref } from 'vue'

defineOptions({
  name: 'SortsPage'
})

const initData = () => {
  const rand = Generator.randNumber()
  return rand.map((n) => ({
    value: n,
    selected: false,
    lowest: false
  }))
}

const bubbleSortData = ref(initData())
const selectionSortData = ref(initData())
const insertionSortData = ref(initData())
</script>

<template>
  <div class="section">
    <div class="container is-max-desktop">
      <BubbleSort :data="bubbleSortData" @reset="bubbleSortData = initData()" />
    </div>
    <div class="container is-max-desktop mt-6">
      <SelectionSort :data="selectionSortData" @reset="selectionSortData = initData()" />
    </div>
    <div class="container is-max-desktop mt-6">
      <InsertionSort :data="insertionSortData" @reset="insertionSortData = initData()" />
    </div>
  </div>
</template>
