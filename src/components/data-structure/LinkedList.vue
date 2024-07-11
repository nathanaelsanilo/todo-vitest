<script lang="ts" setup>
import { VButton } from '@/components/ui/VButton'
import { VControl } from '@/components/ui/VControl'
import { VEmpty } from '@/components/ui/VEmpty'
import { VField } from '@/components/ui/VField'
import * as VHero from '@/components/ui/VHero'
import { VTextField } from '@/components/ui/VTextField'
import { SinglyLinkedList } from '@/models/linked-list/SinglyLinkedList'
import { toTypedSchema } from '@vee-validate/yup'
import { useForm } from 'vee-validate'
import { computed, reactive } from 'vue'
import { object, string } from 'yup'
import LinkedItem from './LinkedItem.vue'

const formState = reactive({
  data: ''
})
const { handleSubmit, resetForm } = useForm({
  validationSchema: toTypedSchema(object({ data: string().required() }))
})
const list = reactive(new SinglyLinkedList<string>())

const head = computed(() => list.getFirst())

const onSubmit = handleSubmit(
  () => {
    list.append(formState.data)
    resetForm()
  },
  (err) => console.log(err)
)

const insertFirst = () => {
  list.insertFirst(formState.data)
  resetForm()
}

const clear = () => {
  list.clear()
}
</script>

<template>
  <VHero.VHero variant="primary">
    <VHero.VHeroBody>
      <div class="container">
        <h1 class="title">Linked List</h1>
        <h3 class="subtitle">
          Linked List is a linear collection of data elements whose order is not given by their
          physical placement in memory. Instead, each elements points to the next.
        </h3>
        <div class="content">
          <p>Characteristics</p>
          <ol>
            <li>
              Data structure consisting of a collection of nodes which together represent a sequence
            </li>
            <li>Contain two fields: data and a link to the next node</li>
            <li>Simplest and most common data structures</li>
            <li>
              Can be easily inserted or removed without reallocation or reorganization of the entire
              structure
            </li>
          </ol>
        </div>
      </div>
    </VHero.VHeroBody>
  </VHero.VHero>
  <section class="section">
    <div class="container is-max-desktop block">
      <div class="box block">
        <form @submit="onSubmit">
          <VTextField
            v-model="formState.data"
            placeholder="Type anything as data, for example Fish"
            name="data"
            label="Data"
          />
          <VField is-grouped>
            <template #grouped>
              <VControl>
                <VButton type="submit" colors="primary">Append</VButton>
              </VControl>
              <VControl>
                <VButton type="button" @click="insertFirst">Insert First</VButton>
              </VControl>
              <VControl>
                <VButton type="button" @click="clear">Clear</VButton>
              </VControl>
            </template>
          </VField>
        </form>
      </div>
    </div>
    <div class="container block is-max-desktop">
      <div class="block">
        <h1 class="title is-5">Visualization</h1>
      </div>
      <div class="block grid">
        <LinkedItem v-if="head" :data="head" />
        <VEmpty v-else />
      </div>
    </div>
  </section>
</template>
