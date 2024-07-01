<script lang="ts" setup>
import { VButton } from '@/components/VButton'
import { VCard } from '@/components/VCard'
import { VTextField } from '@/components/VTextField'
import { Generator } from '@/utils/Generator'
import { useToggle } from '@vueuse/core'
import { useForm } from 'vee-validate'
import { computed, reactive, ref, unref, type Ref } from 'vue'
import { object, number } from 'yup'

type FormState = {
  search: number | undefined
}

const state = reactive<FormState>({
  search: undefined
})

const randNumber = ref<number[]>(Generator.randNumber({ length: 12 }))
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
  randNumber.value.sort((a, b) => a - b)
  doSearch(randNumber.value, value.search)
})

const doSearch = (arr: number[], target: number | undefined) => {
  if (target === undefined) return false

  let left = 0
  let right = arr.length - 1
  let result = -1

  while (left <= right) {
    let mid = Math.floor((right + left) / 2)

    if (arr[mid] > target) {
      right = mid - 1
    } else if (arr[mid] < target) {
      left = mid + 1
    } else {
      result = arr[mid]
      setFound(result === target)
      return true
    }
  }

  result = arr[left]

  setFound(result === target)
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
        <div v-for="(n, i) in randNumber" :key="i" class="cell">
          <div class="tag is-large">
            {{ n }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
