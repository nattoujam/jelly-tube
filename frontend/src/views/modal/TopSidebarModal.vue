<template>
  <ModalBase v-model="model">
    <TopSidebar />
  </ModalBase>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'

import TopSidebar from '@/views/TopSidebar.vue'
import ModalBase from '@/views/modal/ModalBase.vue'

const route = useRoute()

const model = defineModel<boolean>()

watch(route, () => {
  model.value = false
})
</script>

<style scoped>
.modal {
  align-items: start;
}
</style>
