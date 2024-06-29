<script lang="ts" setup>
import { VHeading } from '@/components/VHeading'
import { VButton } from '@/components/VButton'

const doSearch = () => {}
</script>

<template>
  <VHeading title="Binary Search">
    <template #action>
      <VButton colors="primary" testid="btn-search" :disabled="false" @click="doSearch">
        Search
      </VButton>
    </template>
  </VHeading>
</template>
