<script lang="ts" setup>
import Fifty from '@/json/fifty.json'
import { ref } from 'vue'
import { VButton } from './VButton'

const arr = ref([...Fifty])
const isSorting = ref(false)
const speed = ref(300)

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

      await new Promise((resolve) => {
        setTimeout(() => {
          current.selected = false
          next.selected = false

          resolve(true)
        }, speed.value)
      })
    }
  }

  isSorting.value = false
}

const doSort = () => {
  bubbleSort(arr.value)
}

const doReset = () => {
  arr.value = [...Fifty]
  arr.value.forEach((e) => (e.selected = false))
}
</script>

<template>
  <section class="section">
    <div class="container is-max-desktop">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <h1 class="title">Bubble sort</h1>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <div class="columns is-align-items-center">
              <div class="column">
                <span>Speed: {{ speed }}</span>
              </div>
              <div class="column">
                <input v-model="speed" type="range" :max="500" :step="10" :min="0" />
              </div>
              <div class="column">
                <VButton colors="primary" :disabled="isSorting" @click="doSort">Sort</VButton>
              </div>
              <div class="column">
                <VButton class="" :disabled="isSorting" @click="doReset">Reset</VButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bar">
        <div
          v-for="item in arr"
          :key="item.value"
          class="bar__item"
          :style="{ height: `${item.value}px` }"
          :class="{ 'bar__item--selected': item.selected }"
        ></div>
      </div>
    </div>
  </section>
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
