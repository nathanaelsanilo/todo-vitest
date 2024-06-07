<script lang="ts" setup>
import { SinglyLinkedList } from '@/models/SinglyLinkedList'

const list = new SinglyLinkedList<string>()
list.append('fish')
</script>

<template>
  <section class="section">
    <pre>
        {{ list }}
    </pre>
  </section>
</template>
