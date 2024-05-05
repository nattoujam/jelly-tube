<template>
  <ModalBase v-model="model">
    <div class="modal-content">
      <div class="box">
        <slot></slot>
        <footer class="buttons is-centered">
          <button class="button is-info" @click="emits('ok')">OK</button>
          <button class="button is-danger" @click="emits('cancel')">Cancel</button>
        </footer>
      </div>
    </div>
  </ModalBase>
</template>

<script setup lang="ts">
import { defineModel, defineEmits } from 'vue'
import ModalBase from '@/views/modal/ModalBase.vue'

const model = defineModel<boolean>()

const emits = defineEmits<{
  ok: [void]
  cancel: [void]
}>()
</script>
