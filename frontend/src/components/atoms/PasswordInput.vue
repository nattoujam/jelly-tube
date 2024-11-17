<template>
  <input
    class="input"
    type="password"
    placeholder="Password"
    v-model="password"
    minlength="10"
    :autocomplete="props.autoCompleteType"
  />
</template>

<script setup lang="ts">
type AutoCompleteType = 'new-password' | 'current-password'

const password = defineModel<string>()
const props = defineProps<{
  autoCompleteType: AutoCompleteType
}>()
</script>
