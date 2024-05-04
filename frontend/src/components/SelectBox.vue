<template>
  <div class="select">
    <select @change="onChange">
      <option value="0">{{ INITIAL_SELECT_VALUE }}</option>
      <option v-for="(option, index) in props.options" :key="index" :value="option.value">
        {{ option.name }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
const INITIAL_SELECT_VALUE = '-- Select --'

type Option = {
  name: string
  value: string
}

const props = defineProps<{
  options: Array<Option>
}>()

const emits = defineEmits<{
  select: [selectedValue: string]
}>()

const onChange = (e: any) => {
  const selectedValue = e.target.value
  if (selectedValue === '0') return
  emits('select', selectedValue)
}
</script>
