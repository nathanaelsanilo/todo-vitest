<script lang="ts" setup>
import { VButton } from '@/components/VButton'
import { VHeading } from '@/components/VHeading'
import { VIcon } from '@/components/VIcon'
import { VRange } from '@/components/VRange'
import { wait } from '@/utils/Wait'
import { reactive, ref, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'

type CountArrayType = {
  value: number
  selected: boolean
}

const props = defineProps<{
  data: number[]
}>()
const { data } = toRefs(props)
const emits = defineEmits<{
  reset: []
}>()
const { t } = useI18n()
const state = reactive({
  speed: 500,
  isSorting: false
})
const max = ref<number>(Math.max(...data.value))

const toCountArray = (n: number): CountArrayType => ({
  value: n,
  selected: false
})

const countArray = ref<CountArrayType[]>(
  Array((max.value ?? 0) + 1)
    .fill(0)
    .map(toCountArray)
)

const countingSort = async (arr: number[]) => {
  while (arr.length > 0) {
    const first_element: number = arr.shift() ?? 0
    countArray.value[first_element].selected = true

    countArray.value[first_element].value++
    await wait(state.speed)

    countArray.value[first_element].selected = false
  }

  for (let i = 0; i < countArray.value.length; i++) {
    while (countArray.value[i].value > 0) {
      arr.push(i)

      countArray.value[i].selected = true
      countArray.value[i].value--

      await wait(state.speed)

      countArray.value[i].selected = false
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
          <div v-for="n in data" :key="`og-${n}`" class="cell">
            <p class="tag is-medium">{{ n }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="block">
      <h5 class="title is-5">Counting Array</h5>
      <div class="fixed-grid has-12-cols">
        <div class="grid">
          <div v-for="(n, i) in countArray" :key="`c-${i}`" class="cell">
            <p class="tag is-medium" :class="{ 'is-primary': n.selected }">{{ n.value }}</p>
            <div v-if="n.selected" class="block">
              <VIcon>
                <i class="bi bi-arrow-up-circle-fill"></i>
              </VIcon>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
