<script lang="ts" setup>
import { useNotificationStore } from '@/stores/notification'
import type { Props } from './types'

const props = defineProps<Props>()

const notificationStore = useNotificationStore()
</script>

<template>
  <div
    class="notification"
    :class="{ 'is-success': props.params.type === 'success' }"
    data-testid="notif"
  >
    <button class="delete" data-testid="notif-close" @click="notificationStore.destroy"></button>
    <h4 class="title is-4" data-testid="notif-title">{{ props.params.title }}</h4>
    <h6 class="subtitle is-6" data-testid="notif-content">{{ props.params.content }}</h6>
  </div>
</template>

<style lang="scss" scoped>
.notification {
  position: fixed;
  width: 100%;
  z-index: 50;
  top: 0;
  right: 0;
}
</style>
