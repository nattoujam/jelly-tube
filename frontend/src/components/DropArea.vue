<template>
  <label
    class="upload-square"
    @dragover.prevent="onDragover"
    @dragleave.prevent="onDragleave"
    @drop.prevent="onDrop"
  >
    <input class="file-input" type="file" accept="video/*" @change="onSelect" />
    <div class="text">{{ areaText }}</div>
  </label>
</template>

<script setup lang="ts">
import { type Ref, ref, computed } from 'vue'

const file = defineModel<File | null>()

const isDrag: Ref<boolean> = ref(false)

const areaText = computed(() => {
  if (isDrag.value) return 'Dragging'
  return file.value?.name ?? 'Drag & Drop or click to select file'
})

const onDragover = () => {
  isDrag.value = true
}
const onDragleave = () => {
  isDrag.value = false
}
const onDrop = (e: DragEvent) => {
  isDrag.value = false
  const dropped = e.dataTransfer?.files[0]
  if (dropped) file.value = dropped
}
const onSelect = (e: Event) => {
  const input = e.target as HTMLInputElement
  const selected = input.files?.[0]
  if (selected) file.value = selected
  input.value = ''
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
  cursor: pointer;
}
.file-input {
  display: none;
}
.text {
  pointer-events: none;
}
</style>
