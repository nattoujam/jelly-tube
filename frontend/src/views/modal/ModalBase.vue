<template>
  <div class="modal" :class="model ? 'is-active' : ''">
    <div class="modal-background"></div>
    <slot></slot>
    <button class="modal-close is-large" aria-label="close" @click="close"></button>
  </div>
</template>

<script setup lang="ts">
import { defineModel } from 'vue'

const model = defineModel<boolean>()

const close = () => {
  model.value = false
}
</script>
