<script lang="ts" setup generic="TData extends { value: number; selected: boolean }">
import { VBar, VBarItem } from '@/components/ui/VBar'
import { VButton } from '@/components/ui/VButton'
import { VHeading } from '@/components/ui/VHeading'
import { VRange } from '@/components/ui/VRange'
import { wait } from '@/utils/Wait'
import { reactive, toRefs, unref } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  data: TData[]
}>()
const emits = defineEmits(['reset'])
const { data } = toRefs(props)
const { t } = useI18n()
const state = reactive({
  isSorting: false,
  speed: 100
})

const bubbleSort = async (arr: TData[]) => {
  state.isSorting = true
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

      await wait(state.speed)

      current.selected = false
      next.selected = false
    }
  }

  state.isSorting = false
}

const doSort = () => {
  bubbleSort(unref(data))
}

const doReset = () => {
  emits('reset')
}
</script>

<template>
  <VHeading :title="t('common.bubble-sort')">
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
      <VBarItem data-testid="bar-item" :value="bar.value" :selected="bar.selected" />
    </template>
  </VBar>
</template>
