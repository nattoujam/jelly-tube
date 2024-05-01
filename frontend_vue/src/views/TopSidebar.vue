<template>
  <nav class="navbar wrapper">
    <RouterLink to="/">
      <div class="title">Jelly-Tube</div>
    </RouterLink>
    <hr class="separator" />
    <div class="navbar-brand container">
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
</script>

<style scoped>
.wrapper {
  width: 200px;
  max-height: 100vh;
  background-color: #3f3f3f;
  text-align: center;
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
.container {
  margin-top: 8px;
}
</style>
