<script lang="ts" setup>
import { VButton } from '@/components/VButton'
import { VTextField } from '@/components/VTextField'
import { SinglyLinkedList } from '@/models/SinglyLinkedList'
import { computed } from 'vue'
import LinkedItem from './LinkedItem.vue'

const list = new SinglyLinkedList<string>()
list.append('fish')
list.append('dog')
list.append('giraffe')
list.append('shark')
list.append('duck')
list.append('bird')
list.append('eagle')
list.append('crab')

const head = computed(() => list.getFirst())
</script>

<template>
  <section class="section">
    <div class="container is-max-desktop block">
      <div class="block">
        <h1 class="title">Linked List</h1>
      </div>
      <div class="box block">
        <form>
          <VTextField label="Data" />
          <div class="field">
            <div class="control">
              <VButton colors="primary">Insert</VButton>
            </div>
          </div>
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
