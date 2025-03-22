<template>
  <div class="grid is-col-min-10">
    <div v-for="(video, index) in videos" :key="index" class="cell">
      <RouterLink :to="{ name: 'video', params: { id: video.id } }">
        <img :src="video.thumnail.path" />
      </RouterLink>
      <p>{{ video.title }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

import { useQuery, provideApolloClient } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import apolloClient from '@/utils/apolloClient'

const videosQuery = gql`
  query videosQuery {
    videos {
      id
      title
      thumnail {
        path
      }
    }
  }
`

const query = provideApolloClient(apolloClient)(() => useQuery(videosQuery))

const videos = computed(() => query.result.value?.videos ?? [])
</script>

<style scoped></style>
