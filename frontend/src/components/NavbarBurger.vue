<template>
  <a class="navbar-burger" role="button" aria-label="menu" @click="emits('click')">
    <span aria-hidden="true"></span>
    <span aria-hidden="true"></span>
    <span aria-hidden="true"></span>
    <span aria-hidden="true"></span>
  </a>
</template>

<script setup lang="ts">
const emits = defineEmits<{
  click: [void]
}>()
</script>

<style scoped>
.navbar-burger {
  margin-inline-start: 0;
}
</style>
