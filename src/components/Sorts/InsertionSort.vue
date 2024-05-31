<script setup lang="ts" generic="TData extends { value: number; selected: boolean }">
import { VBar, VBarItem } from '@/components/VBar'
import { VButton } from '@/components/VButton'
import { VHeading } from '@/components/VHeading'
import { VRange } from '@/components/VRange'
import { wait } from '@/utils/Wait'
import { reactive, toRefs, unref } from 'vue'
import { useI18n } from 'vue-i18n'

const props = withDefaults(
  defineProps<{
    data: TData[]
  }>(),
  {
    data: () => []
  }
)
const emits = defineEmits<{
  reset: []
}>()
const { data } = toRefs(props)
const { t } = useI18n()
const state = reactive({
  speed: 100,
  isSorting: false
})

const insertionSort = async (arr: TData[]) => {
  const length = arr.length

  for (let i = 1; i < length; i++) {
    const current_value = arr[i]

    let comparator_index = i - 1

    while (comparator_index >= 0 && arr[comparator_index].value > current_value.value) {
      arr[comparator_index].selected = true
      arr[comparator_index + 1] = arr[comparator_index]
      comparator_index--

      await wait(state.speed)
      arr[comparator_index + 1].selected = false
    }

    arr[comparator_index + 1] = current_value
  }
}

const doSort = () => {
  insertionSort(unref(data))
}

const doReset = () => {
  emits('reset')
}
</script>

<template>
  <VHeading :title="t('common.insertion-sort')">
    <template #action>
      <VRange v-model="state.speed" :label="t('common.speed')" name="speed" />
      <div class="field is-grouped ml-4">
        <div class="control">
          <VButton colors="primary" testid="btn-sort" :disabled="state.isSorting" @click="doSort">
            {{ t('common.sort') }}
          </VButton>
        </div>
        <div class="control">
          <VButton testid="btn-reset" :disabled="state.isSorting" @click="doReset">
            {{ t('common.reset') }}
          </VButton>
        </div>
      </div>
    </template>
  </VHeading>

  <VBar :data="data">
    <template #bar="{ bar }">
      <VBarItem :value="bar.value" :selected="bar.selected" />
    </template>
  </VBar>
</template>
