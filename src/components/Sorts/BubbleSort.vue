<script lang="ts" setup>
import { VButton } from '@/components/VButton'
import { VHeading } from '@/components/VHeading'
import { VRange } from '@/components/VRange'
import Fifty from '@/json/fifty.json'
import { ref } from 'vue'
import { wait } from '@/utils/Wait'

const arr = ref([...Fifty])
const isSorting = ref(false)
const speed = ref(100)

const bubbleSort = async (arr: typeof Fifty) => {
  isSorting.value = true
  const n = arr.length

  for (let i = 1; i < n - 1; i++) {
    for (let j = 0; j < n - i; j++) {
      const current = arr[j]
      const next = arr[j + 1]

      current.selected = true
      next.selected = true

      if (current.value > next.value) {
        arr[j + 1] = current
        arr[j] = next
      }

      await wait(speed.value)

      current.selected = false
      next.selected = false
    }
  }

  isSorting.value = false
}

const doSort = () => {
  bubbleSort(arr.value)
}

const doReset = () => {
  arr.value.length = 0
  arr.value = [...Fifty]
}
</script>

<template>
  <VHeading title="Bubble Sort">
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

  <div class="bar">
    <div
      v-for="item in arr"
      :key="item.value"
      class="bar__item"
      :style="{ height: `${item.value}px` }"
      :class="{ 'bar__item--selected': item.selected }"
    ></div>
  </div>
</template>

<style lang="scss" scoped>
.bar {
  display: flex;
  align-items: baseline;
  gap: 2px;

  &__item {
    flex: 1;
    width: 10px;
    background-color: var(--bulma-text-30);

    &--selected {
      background-color: var(--bulma-primary);
    }
  }
}
</style>
