<template>
  <div v-if="videoFile">
    <VideoPlayer class="player" :url="videoFile.path" :contentType="videoFile.contentType" />
    <p>{{ videoFile.path }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import VideoPlayer from '@/components/VideoPlayer.vue'

import { useQuery, provideApolloClient } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import apolloClient from '@/apolloClient'

const route = useRoute()

const videosQuery = gql`
  query videoQuery($id: ID!) {
    video(id: $id) {
      videoFile {
        path
        contentType
      }
    }
  }
`
const query = provideApolloClient(apolloClient)(() =>
  useQuery(videosQuery, { id: route.params.id })
)

const videoFile = computed(() => query.result.value?.video?.videoFile)
</script>

<style>
.player {
  max-width: 800px;
  min-width: 100px;
}
</style>
