<script lang="ts" setup>
import { VButton } from '@/components/VButton'
import { VHeading } from '@/components/VHeading'
import { VRange } from '@/components/VRange'
import { wait } from '@/utils/Wait'
import { reactive, ref, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  data: number[]
}>()
const { data } = toRefs(props)
const emits = defineEmits<{
  reset: []
}>()
const { t } = useI18n()
const state = reactive({
  speed: 2000,
  isSorting: false
})
const max = ref<number>(Math.max(...data.value))
const countArray = ref<number[]>(Array(max.value + 1).fill(0))

const countingSort = async (arr: number[]) => {
  while (arr.length > 0) {
    const first_element: number = arr.shift() ?? 0
    countArray.value[first_element]++

    await wait(state.speed)
  }

  for (let i = 0; i < countArray.value.length; i++) {
    while (countArray.value[i] > 0) {
      arr.push(i)
      countArray.value[i]--

      await wait(state.speed)
    }
  }
}

const doSort = () => {
  countingSort(data.value)
}

const doReset = () => {
  countArray.value = []
  max.value = 0
  emits('reset')
}
</script>

<template>
  <VHeading title="Counting Sort">
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
  <div>
    <div class="block">
      <h5 class="title is-5">Original Array</h5>
      <div class="fixed-grid has-12-cols">
        <div class="grid">
          <template v-for="n in data" :key="`og-${n}`">
            <div class="cell">
              <p class="has-text-white">{{ n }}</p>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="block">
      <h5 class="title is-5">Counting Array</h5>
      <div class="fixed-grid has-12-cols">
        <div class="grid">
          <template v-for="n in countArray" :key="`count-${n}`">
            <div class="cell">
              <p class="has-text-white">{{ n }}</p>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
