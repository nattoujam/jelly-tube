<template>
  <TopSidebar class="sidebar" />
  <main class="flex-column">
    <TopBanner />
    <div class="main-wrapper">
      <RouterView />
    </div>
  </main>
</template>

<script setup lang="ts">
import TopSidebar from '@/views/TopSidebar.vue'
import TopBanner from '@/views/TopBanner.vue'
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
}

.main-wrapper {
  margin: 30px;
  overflow-y: scroll;
}
</style>
