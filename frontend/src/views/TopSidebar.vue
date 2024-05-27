<template>
  <nav class="navbar">
    <h1 class="title">Menu</h1>
    <Separator class="separator" />
    <template v-if="isSignIn">
      <div>
        <p class="username">{{ user.email }}</p>
      </div>
      <Separator class="separator" />
      <div>
        <a class="navbar-item" @click.stop="onSignOut">SignOut</a>
      </div>
      <Separator class="separator" />
      <div>
        <RouterLink class="navbar-item" to="/videoList">Videos</RouterLink>
        <RouterLink class="navbar-item" to="/tagList">Tags</RouterLink>
        <RouterLink class="navbar-item" to="/upload">Upload</RouterLink>
      </div>
    </template>
    <template v-else>
      <RouterLink class="navbar-item" to="/signUp">SignUp</RouterLink>
      <RouterLink class="navbar-item" to="/signIn">SingIn</RouterLink>
    </template>
  </nav>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { RouterLink } from 'vue-router'
import { useAuth } from '@/stores/auth'
import { signOut } from '@/utils/auth'

import Separator from '@/components/Separator.vue'

const router = useRouter()
const { user, isSignIn } = storeToRefs(useAuth())

const onSignOut = () => {
  signOut()
  router.push({ name: 'signIn' })
}
</script>

<style scoped>
.wrapper {
  width: 200px;
  height: 100vh;
}

.navbar {
  display: flex;
  text-align: center;
  flex-direction: column;
  background-color: var(--sidebar-bg-color);
  width: 200px;
  height: 100%;
}

.title {
  font-size: 24px;
  color: white;
  margin-top: 12px;
  margin-bottom: 0;
}

.separator {
  width: 150px;
  background-color: white;
  margin: 8px auto 8px;
}

.username {
  font-size: 11px;
}
</style>
