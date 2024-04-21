<script setup lang="ts">
import Todo from '@/components/Todo.vue'
import { VNotification } from '@/components/VNotification'
import { useNotificationStore } from '@/stores/notification'
import type { INotificationDataView } from './models/NotificationDataView'
import { computed } from 'vue'

const notificationStore = useNotificationStore()
const notificationParams = computed<INotificationDataView>(() => ({
  content: notificationStore.dataView.content,
  title: notificationStore.dataView.title,
  type: notificationStore.dataView.type
}))
</script>

<template>
  <Teleport to="#notification">
    <VNotification v-if="notificationStore.isShow" :params="notificationParams" />
  </Teleport>
  <main>
    <Todo />
  </main>
</template>

<style scoped lang="scss"></style>
