<script
  lang="ts"
  setup
  generic="TData extends { value: number; selected: boolean; lowest: boolean }"
>
import { VBar, VBarItem } from '@/components/VBar'
import { VButton } from '@/components/VButton'
import { VHeading } from '@/components/VHeading'
import { VRange } from '@/components/VRange'
import { wait } from '@/utils/Wait'
import { useToggle } from '@vueuse/core'
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'

type Props = {
  data: TData[]
}
const props = withDefaults(defineProps<Props>(), {
  data: () => []
})
const emits = defineEmits<{
  (e: 'reset'): void
}>()
const { t } = useI18n()
const state = reactive({
  speed: 100
})
const [loading, toggle] = useToggle(false)

const selectionSort = async (arr: TData[]) => {
  toggle()

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

        arr[minIndex].lowest = true
        arr[prevMinIndex].lowest = false
      }

      await wait(state.speed)

      current.selected = false
    }

    // swap
    const temp = arr[minIndex]
    arr[minIndex] = arr[i]
    arr[i] = temp

    arr[minIndex].lowest = false
    arr[minIndex].selected = false
    arr[i].selected = false
    arr[i].lowest = false
  }

  toggle()
}

const doSort = () => {
  selectionSort(props.data)
}
</script>

<template>
  <VHeading :title="t('common.selection-sort')">
    <template #action>
      <VRange v-model="state.speed" testid="range-speed" :label="t('common.speed')" name="speed" />
      <div class="field is-grouped ml-4">
        <div class="control">
          <VButton testid="btn-sort" colors="primary" :disabled="loading" @click="doSort">
            {{ t('common.sort') }}
          </VButton>
        </div>
        <div class="control">
          <VButton testid="btn-reset" :disabled="loading" @click="emits('reset')">
            {{ t('common.reset') }}
          </VButton>
        </div>
      </div>
    </template>
  </VHeading>

  <VBar :data="data">
    <template #bar="{ bar }">
      <VBarItem
        :lowest="bar.lowest"
        data-testid="bar-item"
        :selected="bar.selected"
        :value="bar.value"
      />
    </template>
  </VBar>
</template>
