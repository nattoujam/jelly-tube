<template>
  <div>
    <h1 class="title">SignIn</h1>
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
        <PasswordInput v-model="password" auto-complete-type="current-password" />
        <span class="icon is-small is-left">
          <i class="fas fa-lock"></i>
        </span>
      </p>
    </div>
    <div class="field">
      <p class="buttons is-centered">
        <button class="button is-success" :disabled="!canSignIn" @click="onSignIn">SignIn</button>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { signIn } from '@/utils/auth'
import { useAuth } from '@/stores/auth'
import { useBanner } from '@/stores/banner'

import PasswordInput from '@/components/atoms/PasswordInput.vue'

const router = useRouter()
const { isSignIn } = storeToRefs(useAuth())
const { setBanner } = useBanner()

const email = ref<string>('')
const password = ref<string>('')

const canSignIn = computed<boolean>(() => {
  return Boolean(email.value) && Boolean(password.value)
})

const onSignIn = async () => {
  try {
    await signIn(email.value, password.value)
    setBanner('Info', 'Success', 'SignIn success.')
    router.push({ name: 'home' })
  } catch (error) {
    let mes: string = ''
    if (error instanceof Error) {
      mes = error.message
    }
    setBanner('Error', 'Failed to SignIn', mes)
  }
}

watch(isSignIn, (signIn) => {
  if (signIn) {
    router.push({ name: 'home' })
  }
})
</script>

<style scoped></style>
