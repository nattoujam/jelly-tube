<template>
  <table class="table">
    <thead>
      <th>ID</th>
      <th>Name</th>
      <th>Count</th>
      <th>Control</th>
    </thead>
    <tfoot>
      <th>ID</th>
      <th>Name</th>
      <th>Count</th>
      <th>Control</th>
    </tfoot>
    <tbody>
      <tr v-for="(tag, index) in tagList" :key="index">
        <td>
          {{ tag.id }}
        </td>
        <td>
          {{ tag.name }}
        </td>
        <td>
          {{ tag.videos.length }}
        </td>
        <td class="buttons">
          <button class="button is-small">Edit</button>
          <button class="button is-small is-danger" @click="() => onClickDelete(tag.id)">
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <OkCancelModal v-model="modalVisible" @ok="onDelete" @cancel="onCancelDelete">
    <div class="content">
      <p>
        Deleting
        <span class="has-text-weight-bold">"{{ deletingTag?.name }}"</span>.
      </p>
      <p>Continue?</p>
    </div>
  </OkCancelModal>
</template>

<script setup lang="ts">
import { type Ref, ref, computed } from 'vue'

import { useQuery, provideApolloClient, useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import apolloClient from '@/utils/apolloClient'

import { useBanner } from '@/stores/banner'

import OkCancelModal from '@/views/modal/OkCancelModal.vue'

const { setBanner } = useBanner()

const modalVisible: Ref<boolean> = ref(false)
const deletingTag: Ref<{
  id: string
  name: string
} | null> = ref(null)

const tagListQuery = gql`
  query tagListQuery {
    tags {
      id
      name
      videos {
        id
      }
    }
  }
`
const query = provideApolloClient(apolloClient)(() =>
  useQuery(tagListQuery, null, () => ({
    fetchPolicy: 'cache-and-network'
  }))
)

const deleteTagMutation = gql`
  mutation deleteTagMutation($id: ID!) {
    deleteTag(input: { id: $id }) {
      id
    }
  }
`
const {
  mutate: deleteTag,
  onDone: onTagDeleted,
  onError: onTagDeleteFailed
} = useMutation(deleteTagMutation, () => ({
  variables: {
    id: deletingTag.value?.id
  },
  update: (cache, { data: { deleteTag } }) => {
    let data: any = cache.readQuery({ query: tagListQuery })
    data = {
      ...data,
      tags: [...data.tags.filter((tag: any) => tag.id !== deleteTag.id)]
    }
    cache.writeQuery({ query: tagListQuery, data })
  }
}))

const tagList = computed(() => query.result.value?.tags ?? [])

onTagDeleted(() => {
  if (!deletingTag.value) return
  setBanner('Info', 'Success', `"${deletingTag.value?.name}" is deleted.`)
  deletingTag.value = null
})

onTagDeleteFailed((error) => {
  if (!deletingTag.value) return
  setBanner('Error', 'Error', String(error))
  deletingTag.value = null
})

const onClickDelete = (tagId: string) => {
  modalVisible.value = true
  deletingTag.value = tagList.value.find((tag: any) => tag.id === tagId)
}

const onDelete = () => {
  modalVisible.value = false
  deleteTag()
}

const onCancelDelete = () => {
  modalVisible.value = false
  deletingTag.value = null
}
</script>

<style scoped>
.table {
  width: 100%;
  background-color: var(--bg-color);
}
</style>
