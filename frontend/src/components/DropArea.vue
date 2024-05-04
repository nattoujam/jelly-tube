<template>
  <div
    class="upload-square"
    @dragover.prevent="onDragover"
    @dragleave.prevent="onDragleave"
    @drop.prevent="onDrop"
  >
    <div class="text">{{ areaText }}</div>
  </div>
</template>

<script setup lang="ts">
import { type Ref, ref, computed } from 'vue'

const emit = defineEmits<{
  dropped: [file: File]
}>()

const isDrag: Ref<boolean> = ref(false)

const areaText = computed(() => {
  return isDrag.value ? 'Dragging' : 'Drag & Drop file'
})

const onDragover = () => {
  isDrag.value = true
}
const onDragleave = () => {
  isDrag.value = false
}
const onDrop = (e: DragEvent) => {
  isDrag.value = false
  if (e?.dataTransfer?.files?.length) {
    emit('dropped', e.dataTransfer?.files[0])
  }
}
</script>

<style scoped>
.upload-square {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-color: gray;
  border-radius: 10px;
  border-width: 3px;
  border-style: dashed;
}
</style>
