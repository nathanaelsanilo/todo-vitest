<script lang="ts" setup data-testid="selectionsort">
import { VBar } from '@/components/VBar'
import { VButton } from '@/components/VButton'
import { VHeading } from '@/components/VHeading'
import twenty from '@/json/twenty.json'
import { wait } from '@/utils/Wait'
import { ref } from 'vue'
import { VRange } from '@/components/VRange'

type Data = typeof twenty

const data = ref([...twenty])
const speed = ref(100)

const selectionSort = async (arr: Data) => {
  const n = arr.length

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i

    arr[i].selected = true

    for (let j = i + 1; j < n; j++) {
      const current = arr[j]
      const minValue = arr[minIndex]

      current.selected = true

      if (current.value < minValue.value) {
        const prevMinIndex = minIndex

        // save new minimum value from the unsorted sub array
        minIndex = j

        arr[minIndex].iteration = true
        arr[prevMinIndex].iteration = false
      }

      await wait(speed.value)

      current.selected = false
    }

    // swap
    const temp = arr[minIndex]
    arr[minIndex] = arr[i]
    arr[i] = temp

    arr[minIndex].iteration = false
    arr[minIndex].selected = false
    arr[i].selected = false
    arr[i].iteration = false
  }
}

const doSort = () => {
  selectionSort(data.value)
}

const doReset = () => {
  data.value.length = 0
  data.value = [...twenty]
}
</script>

<template>
  <VHeading title="Selection Sort">
    <template #action>
      <VRange v-model="speed" label="Speed" />
      <div class="field is-grouped ml-4">
        <div class="control">
          <VButton class="" colors="primary" @click="doSort">Sort</VButton>
        </div>
        <div class="control">
          <VButton class="" @click="doReset">Reset</VButton>
        </div>
      </div>
    </template>
  </VHeading>

  <VBar :data="data" class="">
    <template #bar="{ bar }">
      <div
        class="item"
        :style="{ height: `${bar.value}px` }"
        :class="{ 'item--selected': bar.selected, 'item--iteration': bar.iteration }"
      ></div>
    </template>
  </VBar>
</template>

<style lang="scss" scoped>
.item {
  flex: 1;
  width: 10px;
  background-color: var(--bulma-text-30);

  &--iteration {
    background-color: var(--bulma-danger);
  }

  &--selected {
    background-color: var(--bulma-primary);
  }
}
</style>
