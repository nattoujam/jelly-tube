<template>
  <div v-if="video">
    <VideoPlayer class="player" :url="path" :contentType="contentType" />
    <p>{{ video.title }}</p>
    <p>{{ video.videoPath }}</p>
    <p>{{ video.m3u8Path }}</p>
    <div class="tags">
      <Tag v-for="(tag, index) in tags" :key="`tag-${index}`" :id="tag.id" :name="tag.name" />
    </div>
    <label class="label">Mode</label>
    <div class="field">
      <form class="control" @change="onChangeMode">
        <label class="radio">
          <input type="radio" name="mode" value="m3u8" checked />
          m3u8
        </label>
        <label class="radio">
          <input type="radio" name="mode" value="mp4" />
          mp4
        </label>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import Tag from '@/components/Tag.vue'

import { type Ref, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import VideoPlayer from '@/components/VideoPlayer.vue'

import { useQuery, provideApolloClient } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import apolloClient from '@/utils/apolloClient'
import { backendUrl } from '@/utils/backendUrl'

const route = useRoute()

const mode: Ref<'m3u8' | 'mp4'> = ref('m3u8')

const videosQuery = gql`
  query videoQuery($id: ID!) {
    video(id: $id) {
      title
      videoPath
      m3u8Path
      contentType
      tags {
        id
        name
      }
    }
  }
`
const query = provideApolloClient(apolloClient)(() =>
  useQuery(videosQuery, { id: route.params.id })
)

const video = computed(() => query.result.value?.video)
const path = computed(() => {
  const p = mode.value === 'm3u8' ? video.value?.m3u8Path : video.value?.videoPath
  return p && backendUrl(p)
})
const contentType = computed(() =>
  mode.value === 'm3u8' ? 'application/x-mpegURL' : video.value?.contentType
)
const tags = computed(() => query.result.value?.video?.tags)

const onChangeMode = (e: any) => {
  mode.value = e.target.value
}
</script>

<style>
.player {
  max-width: 800px;
  min-width: 100px;
}
</style>
