<template>
  <nav class="navbar">
    <h1 class="title">Menu</h1>
    <Separator class="separator" />
    <div class="navbar-brand">
      <div>
        <RouterLink class="navbar-item" to="/videoList">videos</RouterLink>
        <RouterLink class="navbar-item" to="/tagList">tags</RouterLink>
        <RouterLink class="navbar-item" to="/upload">upload</RouterLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

import Separator from '@/components/Separator.vue'
</script>

<style scoped>
.wrapper {
  width: 200px;
  height: 100vh;
}

.navbar {
  display: flex;
  text-align: center;
  flex-direction: column;
  background-color: #3f3f3f;
  width: 200px;
  height: 100%;
}
.title {
  font-size: 24px;
  color: white;
  margin-top: 12px;
  margin-bottom: 0;
}
.separator {
  width: 100px;
  background-color: white;
  margin: 17px auto 0;
}
.navbar-brand {
  margin-top: 8px;
}
</style>
