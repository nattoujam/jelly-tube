<template>
  <table class="table">
    <thead>
      <th>Name</th>
      <th>count</th>
      <th>Control</th>
    </thead>
    <tfoot>
      <th>Name</th>
      <th>count</th>
      <th>Control</th>
    </tfoot>
    <tbody>
      <tr v-for="(tag, index) in tagList" :key="index">
        <td>
          {{ tag.name }}
        </td>
        <td>
          {{ tag.videos.length }}
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
import { computed } from 'vue'

import { useQuery, provideApolloClient } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import apolloClient from '@/apolloClient'

const tagListQuery = gql`
  query tagListQuery {
    tags {
      name
      videos {
        id
      }
    }
  }
`

const query = provideApolloClient(apolloClient)(() => useQuery(tagListQuery))
const tagList = computed(() => query.result.value?.tags ?? [])
</script>

<style scoped>
.table {
  width: 100%;
}
</style>
