<script lang="ts" setup>
import { VButton } from '@/components/VButton'
import { VCard } from '@/components/VCard'
import { VTextField } from '@/components/VTextField'
import { Generator } from '@/utils/Generator'
import { wait } from '@/utils/Wait'
import { useToggle } from '@vueuse/core'
import { useForm } from 'vee-validate'
import { computed, reactive, ref } from 'vue'
import { number, object } from 'yup'

type FormState = {
  search: number | undefined
}

const state = reactive<FormState>({
  search: undefined
})
const left = ref(-1)
const right = ref(-1)
const mid = ref(-1)

const numbers = ref<number[]>(Generator.randNumber({ length: 12 }))
const [found, setFound] = useToggle(false)

const { handleSubmit } = useForm<FormState>({
  initialValues: {
    search: undefined
  },
  validationSchema: computed(() =>
    object({ search: number().min(1).required().label('Required more than 1') })
  )
})

const onSubmit = handleSubmit((value) => {
  numbers.value.sort((a, b) => a - b)
  doSearch(numbers.value, value.search)
})

const reset = () => {
  left.value = 0
  right.value = 0
  mid.value = 0
}

const doSearch = async (arr: number[], target: number | undefined) => {
  if (target === undefined) return false

  reset()
  right.value = arr.length - 1
  let result = -1

  while (left.value <= right.value) {
    mid.value = Math.floor((right.value + left.value) / 2)

    await wait(2000)

    if (arr[mid.value] > target) {
      right.value = mid.value - 1
    } else if (arr[mid.value] < target) {
      left.value = mid.value + 1
    } else {
      result = arr[mid.value]
      setFound(result === target)
      return true
    }
  }

  result = arr[left.value]

  setFound(result === target)
  left.value = 0
  right.value = 0
}
</script>

<template>
  <VCard>
    <template #title>
      <h3 class="title">Binary Search</h3>
    </template>
    <template #content>
      <form name="form-search" novalidate @submit.prevent="onSubmit">
        <VTextField
          v-model.number="state.search"
          placeholder="Input number minimum 1"
          name="search"
        />
        <VButton
          colors="primary"
          type="submit"
          testid="btn-search"
          :disabled="false"
          @click="doSearch"
        >
          Search
        </VButton>
      </form>
    </template>
  </VCard>
  <div class="block">
    <div class="notification" :class="{ 'is-success': found, 'is-danger': !found }">
      {{ found ? 'Target has found!' : 'Not found' }}
    </div>
  </div>
  <div class="block">
    <div class="fixed-grid has-12-cols">
      <div class="grid">
        <div v-for="(n, i) in numbers" :key="i" class="cell">
          <div
            class="tag is-large"
            :class="{ 'is-primary': i === left || i === right, 'is-info': i === mid }"
          >
            {{ n }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
