import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/main/HomeView.vue'
import VideoView from '@/views/main/VideoView.vue'
import UploadView from '@/views/main/UploadView.vue'
import TagListView from '@/views/main/TagListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/video/:id',
      name: 'video',
      component: VideoView
    },
    { path: '/tagList', name: 'tagList', component: TagListView },

    {
      path: '/upload',
      name: 'upload',
      component: UploadView
    }
  ]
})

export default router
