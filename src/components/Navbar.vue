<script lang="ts" setup>
defineOptions({
  name: 'AppNavbar'
})
</script>

<template>
  <nav class="navbar">
    <div class="container is-max-desktop">
      <div class="navbar-menu">
        <div class="navbar-start">
          <RouterLink class="navbar-item" :to="{ name: 'bubble-sort' }"> Bubble Sort </RouterLink>
          <RouterLink class="navbar-item" :to="{ name: 'todo' }"> Todo App </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>
