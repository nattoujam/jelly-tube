<template>
  <table class="table">
    <thead>
      <th>Name</th>
      <th>Tags</th>
      <th>Control</th>
    </thead>
    <tfoot>
      <th>Name</th>
      <th>Tags</th>
      <th>Control</th>
    </tfoot>
    <tbody>
      <tr v-for="(video, index) in videoList" :key="index">
        <td>
          {{ video.title }}
        </td>
        <td>
          <div class="tags">
            <TagIcon
              v-for="(tag, index) in video.tags"
              :key="`tag-${index}`"
              :tagId="tag.id"
              :name="tag.name"
            />
          </div>
        </td>
        <td class="buttons">
          <button class="button is-small">Edit</button>
          <button class="button is-small is-danger">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import TagIcon from '@/components/TagIcon.vue'

import { computed } from 'vue'

import { useQuery, provideApolloClient } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import apolloClient from '@/apolloClient'

const videoListQuery = gql`
  query videoListQuery {
    videos {
      id
      title
      tags {
        id
        name
      }
    }
  }
`

const query = provideApolloClient(apolloClient)(() => useQuery(videoListQuery))
const videoList = computed(() => query.result.value?.videos ?? [])
</script>

<style scoped>
.table {
  width: 100%;
}
</style>
