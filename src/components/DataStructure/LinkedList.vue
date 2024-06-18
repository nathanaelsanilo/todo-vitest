<script lang="ts" setup>
import { VButton } from '@/components/VButton'
import { VControl } from '@/components/VControl'
import { VField } from '@/components/VField'
import { VTextField } from '@/components/VTextField'
import { SinglyLinkedList } from '@/models/SinglyLinkedList'
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
</script>

<template>
  <section class="section">
    <div class="container is-max-desktop block">
      <div class="block">
        <h1 class="title">Linked List</h1>
        <h3 class="subtitle">This page show you how singly linked list works</h3>
      </div>
      <div class="box block">
        <form @submit="onSubmit">
          <VTextField v-model="formState.data" name="data" label="Data" />
          <VField is-grouped>
            <template #grouped>
              <VControl>
                <VButton type="submit" colors="primary">Append</VButton>
              </VControl>
              <VControl>
                <VButton type="button" @click="insertFirst">Insert First</VButton>
              </VControl>
              <VControl>
                <VButton type="button">Clear</VButton>
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
        <LinkedItem v-if="head" :data="head"> </LinkedItem>
      </div>
    </div>
  </section>
</template>
