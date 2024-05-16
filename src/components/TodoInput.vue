<script lang="ts" setup>
import { useTodoCreate } from '@/composables/useTodoCreate'
import { useQueryClient } from '@tanstack/vue-query'
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { VButton } from './VButton'
import { VCard } from './VCard'
import { VTextField } from './VTextField'

const { t } = useI18n()
const state = reactive({
  inputTodo: ''
})
const queryClient = useQueryClient()

const { create, isLoading } = useTodoCreate({
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['todo', 'list'] })
  }
})
const addTodo = () => {
  create({ todo: state.inputTodo })
}
</script>

<template>
  <VCard :title="t('common.input-text', { text: t('common.todo') })">
    <template #content>
      <form name="form-todo" novalidate @submit.prevent="addTodo">
        <VTextField
          id="inputTodo"
          v-model="state.inputTodo"
          name="inputTodo"
          :label="t('common.new-text', { text: t('common.todo') })"
          data-testid="input-todo"
        />
        <div class="field">
          <div class="control">
            <VButton type="submit" colors="primary" data-testid="btn-add" :loading="isLoading">
              {{ t('common.save') }}
            </VButton>
          </div>
        </div>
      </form>
    </template>
  </VCard>
</template>
