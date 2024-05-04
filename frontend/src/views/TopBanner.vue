<template>
  <section v-if="bannerVisible" class="hero is-small" :class="bannerColorClass">
    <div class="hero-body">
      <p class="title">{{ title }}</p>
      <p class="subtitle">{{ message }}</p>
    </div>
    <button class="delete" @click="onDelete"></button>
  </section>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useBanner } from '@/stores/banner'
import { useRoute } from 'vue-router'

const bannerStore = useBanner()
const { bannerType, title, message } = storeToRefs(bannerStore)
const route = useRoute()

const bannerVisible = computed(() => bannerType.value !== 'None')

const bannerColorClass = computed(() => {
  switch (bannerType.value) {
    case 'Error':
      return 'is-danger'
    case 'Warn':
      return 'is-warning'
    case 'Info':
      return 'is-info'
    default:
      return ''
  }
})

watch(route, () => bannerStore.$reset())

const onDelete = () => {
  bannerStore.$reset()
}
</script>

<style scoped>
.delete {
  position: fixed;
  top: 20px;
  right: 20px;
}
</style>
