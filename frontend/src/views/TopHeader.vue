<template>
  <div class="hero is-small">
    <div class="hero-body">
      <NavbarBurger class="burger" @click="onClickBurger" />
      <RouterLink to="/">
        <div class="title">Jelly-Tube</div>
      </RouterLink>
    </div>
  </div>
  <Separator />
  <TopSidebarModal v-model="sidebarVisible" class="sidebar" @close="onClose" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

import Separator from '@/components/Separator.vue'
import NavbarBurger from '@/components/NavbarBurger.vue'

import TopSidebarModal from '@/views/modal/TopSidebarModal.vue'

const sidebarVisible = ref<boolean>(false)

const onClickBurger = () => {
  sidebarVisible.value = true
}

const onClose = () => {
  sidebarVisible.value = false
}
</script>

<style scoped>
@media (min-width: 550px) {
  .burger {
    display: none;
  }
}
.sidebar {
  position: fixed;
  height: 100%;
}

.hero-body {
  display: flex;
  flex-direction: row;
}
</style>
