<template>
  <span class="tag">
    {{ props.name }}
    <button
      v-if="props.withCloseButton"
      class="delete is-small"
      :value="tagId"
      @click="emits('delete', tagId)"
    ></button>
  </span>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  tagId: string
  name: string
  withCloseButton?: boolean
}>()

const emits = defineEmits<{
  delete: [tagId: string]
}>()
</script>
