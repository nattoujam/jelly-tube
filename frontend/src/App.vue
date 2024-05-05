<template>
  <div class="main-row">
    <TopSidebar class="left" />
    <div class="right">
      <main class="main-column">
        <TopBanner />
        <TopHeader />
        <div class="router-wrapper">
          <div class="router-view">
            <RouterView />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import TopHeader from './views/TopHeader.vue'
import TopSidebar from '@/views/TopSidebar.vue'
import TopBanner from '@/views/TopBanner.vue'
</script>

<style scoped>
.main-row {
  display: flex;
  flex-direction: row;
  height: 100%;
}
.right {
  flex-grow: 1;
  flex-shrink: 1;
}
.left {
  width: 200px;
  flex-shrink: 0;
}
@media (max-width: 550px) {
  .left {
    display: none;
  }
}
.main-column {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.router-wrapper {
  overflow-y: scroll;
}
.router-view {
  margin: 30px;
}
</style>
