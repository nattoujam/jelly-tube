<template>
  <TopSidebar class="sidebar" />
  <main class="flex-column">
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import TopSidebar from '@/views/TopSidebar.vue'
</script>

<style scoped>
.sidebar {
  flex-shrink: 0;
  flex-direction: column;
}
.flex-column {
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: scroll;
  margin: 30px;
}
</style>
