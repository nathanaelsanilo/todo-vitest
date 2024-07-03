<script lang="ts" setup>
import { VButton } from '@/components/ui/VButton'
import { VHeading } from '@/components/ui/VHeading'
import { VTextField } from '@/components/ui/VTextField'
import { useFindTarget } from '@/composables/two-pointer/useFindTarget'
import { useForm } from 'vee-validate'
import { reactive } from 'vue'
import { number, object } from 'yup'

const formState = reactive({
  target: 4
})
const arr = reactive([
  {
    selected: false,
    value: 7
  },
  {
    selected: false,
    value: 4
  },
  {
    selected: false,
    value: 2
  },
  {
    selected: false,
    value: 1
  },
  {
    selected: false,
    value: 5
  },
  {
    selected: false,
    value: 9
  },
  {
    selected: false,
    value: 8
  },
  {
    selected: false,
    value: 3
  },
  {
    selected: false,
    value: 6
  }
])
const result = reactive<number[]>([])

const { find: findSum } = useFindTarget(arr)

const { handleSubmit } = useForm({
  validationSchema: object({
    target: number()
  })
})

const find = handleSubmit(async ({ target }) => {
  // reset
  arr.forEach((el) => (el.selected = false))

  const res = await findSum(target)

  result.length = 0
  if (!res) return

  result.push(...res)
})

const sort = () => {
  arr.sort((a, b) => a.value - b.value)
}
</script>

<template>
  <section class="hero is-primary">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">Two Pointer Technique</h1>
        <h2 class="subtitle">Two pointer technique is commonly used to solve array</h2>
        <div class="">
          <ol>
            <li>typically used for searching pairs in a sorted array</li>
            <li>one pointer slow-runner and the other fast-runner</li>
            <li>the input array should be sorted before using two pointer technique</li>
          </ol>
        </div>
      </div>
    </div>
  </section>
  <section class="section">
    <div class="container">
      <VHeading title="Find two sum">
        <template #subtitle>
          <h3 class="subtitle">Find two sum in elements that has same value with target</h3>
          <code> nums = [1,2,3,4,5]; target = 7; output = 3,4; </code>
        </template>
      </VHeading>

      <div class="block">
        <form @submit="find">
          <VTextField v-model.number="formState.target" label="Target" name="target" />
          <div class="buttons">
            <VButton colors="primary" type="submit">Find</VButton>
            <VButton type="button" @click="sort">Sort</VButton>
          </div>
        </form>
      </div>

      <div class="block">
        <h5 class="title is-5">Original Array</h5>
        <div class="fixed-grid has-12-cols">
          <div class="grid">
            <div v-for="(n, i) in arr" :key="i" class="cell">
              <p class="tag is-medium" :class="{ 'is-primary': n.selected }">{{ n.value }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="block">
        <h5 class="title is-5">Result</h5>
        <pre v-if="result.length">{{ result }}</pre>
        <p v-else class="has-text-danger">No result</p>
      </div>
    </div>
  </section>
</template>
