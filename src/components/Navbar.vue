<script lang="ts" setup>
import { RouterLink } from 'vue-router'

defineOptions({
  name: 'AppNavbar'
})
</script>

<template>
  <nav class="navbar">
    <div class="container is-max-desktop">
      <div class="navbar-menu">
        <div class="navbar-start">
          <RouterLink class="navbar-item" :to="{ name: 'sorts' }"> Sorts </RouterLink>
          <RouterLink class="navbar-item" :to="{ name: 'search' }"> Search </RouterLink>
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link"> Data Structure </a>

            <div class="navbar-dropdown">
              <RouterLink :to="{ name: 'data-structure.linked-list' }" class="navbar-item">
                Linked List
              </RouterLink>
            </div>
          </div>
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link"> Technique </a>

            <div class="navbar-dropdown">
              <RouterLink :to="{ name: 'technique.two-pointer' }" class="navbar-item">
                Two Pointer
              </RouterLink>
            </div>
          </div>
          <RouterLink class="navbar-item" :to="{ name: 'todo' }"> Todo App </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>
