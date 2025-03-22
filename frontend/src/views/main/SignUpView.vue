<template>
  <div>
    <h1 class="title">SignUp</h1>
    <div class="field">
      <label class="label">Email</label>
      <p class="control has-icons-left has-icons-right">
        <input class="input" type="email" placeholder="Email" v-model="email" />
        <span class="icon is-small is-left">
          <i class="fas fa-envelope"></i>
        </span>
        <span class="icon is-small is-right">
          <i class="fas fa-check"></i>
        </span>
      </p>
    </div>
    <div class="field">
      <label class="label">Password</label>
      <p class="control has-icons-left">
        <PasswordInput v-model="password" auto-complete-type="new-password" />
        <span class="icon is-small is-left">
          <i class="fas fa-lock"></i>
        </span>
      </p>
    </div>
    <div class="field">
      <p class="buttons is-centered">
        <button class="button is-info" :disabled="!canSignUp" @click="onSignUp">SignUp</button>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { signUp } from '@/utils/auth'
import { useBanner } from '@/stores/banner'

import PasswordInput from '@/components/atoms/PasswordInput.vue'

const { setBanner } = useBanner()

const email = ref<string>('')
const password = ref<string>('')

const canSignUp = computed<boolean>(() => {
  return Boolean(email.value) && Boolean(password.value)
})

const onSignUp = async () => {
  try {
    await signUp(email.value, password.value)
    setBanner('Info', 'SignUp Success', 'Please check and confirm email address.')
  } catch (error) {
    let mes: string = ''
    if (error instanceof Error) {
      mes = error.message
    }
    setBanner('Error', 'Failed to SignUp', mes)
  }
}
</script>

<style scoped></style>
