<template>
  <div class="grid is-col-min-10">
    <div v-for="(video, index) in videos" :key="index" class="cell">
      <RouterLink :to="{ name: 'video', params: { id: video.id } }">
        <img v-if="video.thumbnailPath" :src="backendUrl(video.thumbnailPath)" />
        <p>{{ video.title }}</p>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

import { useQuery, provideApolloClient } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import apolloClient from '@/utils/apolloClient'
import { backendUrl } from '@/utils/backendUrl'

const videosQuery = gql`
  query videosQuery {
    videos {
      id
      title
      thumbnailPath
    }
  }
`

const query = provideApolloClient(apolloClient)(() =>
  useQuery(videosQuery, null, () => ({
    fetchPolicy: 'cache-and-network'
  }))
)

const videos = computed(() => query.result.value?.videos ?? [])
</script>

<style scoped></style>
