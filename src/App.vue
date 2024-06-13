<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import { VNotification } from '@/components/VNotification'
import { useNotificationStore } from '@/stores/notification'
import { computed } from 'vue'
import type { INotificationDataView } from './models/NotificationDataView'

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
  <Teleport to="#header">
    <Navbar />
  </Teleport>
  <main>
    <RouterView></RouterView>
  </main>
</template>

<style scoped lang="scss"></style>
