<script lang="ts" setup generic="TData">
import { VIcon } from '@/components/VIcon'
import type { NodeItem } from '@/models/SinglyLinkedList'

defineProps<{
  data?: NodeItem<TData>
}>()
</script>

<template>
  <div class="tag is-large is-justify-content-space-between">
    <span>{{ data?.getData() }}</span>
    <template v-if="data?.hasNext()">
      <VIcon class="ml-4">
        <i class="bi bi-arrow-right"></i>
      </VIcon>
    </template>
  </div>

  <template v-if="data?.hasNext()">
    <LinkedItem :data="data.getNext() ?? undefined" />
  </template>
</template>
