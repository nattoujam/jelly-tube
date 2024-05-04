<template>
  <input class="input" v-model="model" />
</template>

<script setup lang="ts">
import { defineModel } from 'vue'

const model = defineModel()
</script>

<style scoped>
.input {
  width: 100%;
}
</style>
