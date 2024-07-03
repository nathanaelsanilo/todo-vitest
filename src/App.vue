<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import { VNotification } from '@/components/ui/VNotification'
import type { INotificationDataView } from '@/models/notification/NotificationDataView'
import { useNotificationStore } from '@/stores/notification'
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
  <Teleport to="#header">
    <Navbar />
  </Teleport>
  <main>
    <RouterView></RouterView>
  </main>
</template>

<style scoped lang="scss"></style>
