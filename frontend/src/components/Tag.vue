<template>
  <span class="tag">
    {{ props.name }}
    <button
      v-if="props.withCloseButton"
      class="delete is-small"
      :value="id"
      @click="emits('delete', id)"
    ></button>
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{
  id: string
  name: string
  withCloseButton?: boolean
}>()

const emits = defineEmits<{
  delete: [tagId: string]
}>()
</script>
