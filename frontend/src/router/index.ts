import { createRouter, createWebHistory } from 'vue-router'
import { checkSignIn } from '@/utils/auth'

import HomeView from '@/views/main/HomeView.vue'
import SignInView from '@/views/main/SignInView.vue'
import SignUpView from '@/views/main/SignUpView.vue'
import VideoView from '@/views/main/VideoView.vue'
import UploadView from '@/views/main/UploadView.vue'
import TagListView from '@/views/main/TagListView.vue'
import VideoListView from '@/views/main/VideoListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/signIn',
      name: 'signIn',
      component: SignInView
    },
    {
      path: '/signUp',
      name: 'signUp',
      component: SignUpView
    },
    {
      path: '/video/:id',
      name: 'video',
      component: VideoView
    },
    { path: '/tagList', name: 'tagList', component: TagListView },
    { path: '/videoList', name: 'videoList', component: VideoListView },
    {
      path: '/upload',
      name: 'upload',
      component: UploadView
    }
  ]
})

router.beforeEach(async (to) => {
  if (['signIn', 'signUp'].includes(String(to.name?.toString()))) return true

  const alreadySignIn = await checkSignIn()
  if (alreadySignIn) {
    return true
  }

  return { name: 'signIn' }
})

export default router
