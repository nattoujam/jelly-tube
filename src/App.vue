<template>
  <TopSidebar class="sidebar" />
  <main class="flex-column">
    <RouterView class="main-wrapper" />
  </main>
</template>

<script setup lang="ts">
import TopSidebar from '@/components/TopSidebar.vue'
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
  height: 100%;
  overflow-y: scroll;
}
.main-wrapper {
  margin: 30px;
}
</style>
