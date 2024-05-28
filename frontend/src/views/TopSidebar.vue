<template>
  <aside class="menu">
    <h1 class="title">Menu</h1>
    <Separator class="separator" />
    <template v-if="isSignIn">
      <div class="menu-label">User</div>
      <ul class="menu-list">
        <li>
          <a @click.stop="onSignOut">SignOut</a>
        </li>
      </ul>
      <p class="menu-label">General</p>
      <ul class="menu-list">
        <li>
          <RouterLink to="/">Home</RouterLink>
        </li>
        <li>
          <RouterLink to="/upload">Upload</RouterLink>
        </li>
      </ul>
      <p class="menu-label">Manage</p>
      <ul class="menu-list">
        <li>
          <RouterLink to="/videoList">Videos</RouterLink>
        </li>
        <li>
          <RouterLink to="/tagList">Tags</RouterLink>
        </li>
      </ul>
    </template>
    <template v-else>
      <div class="menu-label">User</div>
      <ul class="menu-list">
        <li>
          <RouterLink to="/signUp">SignUp</RouterLink>
        </li>
        <li>
          <RouterLink to="/signIn">SingIn</RouterLink>
        </li>
      </ul>
    </template>
  </aside>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useRouter } from 'vue-router'
import { RouterLink } from 'vue-router'
import { useAuth } from '@/stores/auth'
import { signOut } from '@/utils/auth'

import Separator from '@/components/Separator.vue'

const router = useRouter()
const { isSignIn } = storeToRefs(useAuth())

const onSignOut = () => {
  signOut()
  router.push({ name: 'signIn' })
}
</script>

<style scoped>
.menu {
  padding: 0 10px 0 10px;
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
  width: 180px;
  background-color: white;
  margin: 8px auto 8px;
}
</style>
