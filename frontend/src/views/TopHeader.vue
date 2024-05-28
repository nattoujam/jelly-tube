<template>
  <div class="hero is-small">
    <div class="hero-body">
      <NavbarBurger class="burger" @click="onClickBurger" />
      <RouterLink to="/">
        <div class="title">Jelly-Tube</div>
      </RouterLink>
    </div>
  </div>
  <span v-if="user" class="username tag is-dark">{{ user?.email }}</span>
  <Separator />
  <TopSidebarModal v-model="sidebarVisible" class="sidebar" @close="onClose" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuth } from '@/stores/auth'

import Separator from '@/components/Separator.vue'
import NavbarBurger from '@/components/NavbarBurger.vue'

import TopSidebarModal from '@/views/modal/TopSidebarModal.vue'

const { user } = storeToRefs(useAuth())
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

.username {
  position: fixed;
  top: 35px;
  right: 10px;
  font-size: 10px;
}
</style>
