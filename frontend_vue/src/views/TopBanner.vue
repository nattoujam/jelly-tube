<template>
  <section v-if="bannerVisible" class="hero is-small" :class="bannerColorClass">
    <div class="hero-body">
      <p class="title">{{ title }}</p>
      <p class="subtitle">{{ message }}</p>
    </div>
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
</script>
