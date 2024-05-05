<template>
  <table class="table">
    <thead>
      <th>ID</th>
      <th>Name</th>
      <th>Tags</th>
      <th>Control</th>
    </thead>
    <tfoot>
      <th>ID</th>
      <th>Name</th>
      <th>Tags</th>
      <th>Control</th>
    </tfoot>
    <tbody>
      <tr v-for="(video, index) in videoList" :key="index">
        <td>{{ video.id }}</td>
        <td>
          {{ video.title }}
        </td>
        <td>
          <div class="tags">
            <Tag
              v-for="(tag, index) in video.tags"
              :key="`tag-${index}`"
              :id="tag.id"
              :name="tag.name"
            />
          </div>
        </td>
        <td class="buttons">
          <button class="button is-small">Edit</button>
          <button class="button is-small is-danger" @click="() => onClickDelete(video.id)">
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
        <span class="has-text-weight-bold">"{{ deletingVideo?.title }}"</span>.
      </p>
      <p>Continue?</p>
    </div>
  </OkCancelModal>
</template>

<script setup lang="ts">
import Tag from '@/components/Tag.vue'

import { type Ref, ref, computed } from 'vue'

import { useQuery, provideApolloClient, useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import apolloClient from '@/apolloClient'

import { useBanner } from '@/stores/banner'

import OkCancelModal from '@/views/modal/OkCancelModal.vue'

const { setBanner } = useBanner()

const modalVisible: Ref<boolean> = ref(false)
const deletingVideo: Ref<{
  id: string
  title: string
} | null> = ref(null)

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
const query = provideApolloClient(apolloClient)(() =>
  useQuery(videoListQuery, null, () => ({
    fetchPolicy: 'cache-and-network'
  }))
)

const deleteVideoMutation = gql`
  mutation deleteVideoMutation($id: ID!) {
    deleteVideo(input: { id: $id }) {
      id
    }
  }
`
const {
  mutate: deleteVideo,
  onDone: onVideoDeleted,
  onError: onVideoDeleteFailed
} = useMutation(deleteVideoMutation, () => ({
  variables: {
    id: deletingVideo.value?.id
  },
  update: (cache, { data: { deleteVideo } }) => {
    let data: any = cache.readQuery({ query: videoListQuery })
    data = {
      ...data,
      videos: [...data.videos.filter((tag: any) => tag.id !== deleteVideo.id)]
    }
    cache.writeQuery({ query: videoListQuery, data })
  }
}))

const videoList = computed(() => query.result.value?.videos ?? [])

onVideoDeleted(() => {
  if (!deletingVideo.value) return
  setBanner('Info', 'Success', `"${deletingVideo.value?.title}" is deleted.`)
  deletingVideo.value = null
})

onVideoDeleteFailed((error) => {
  if (!deletingVideo.value) return
  setBanner('Error', 'Error', String(error))
  deletingVideo.value = null
})

const onClickDelete = (tagId: string) => {
  modalVisible.value = true
  deletingVideo.value = videoList.value.find((tag: any) => tag.id === tagId)
}

const onDelete = () => {
  modalVisible.value = false
  deleteVideo()
}

const onCancelDelete = () => {
  modalVisible.value = false
  deletingVideo.value = null
}
</script>

<style scoped>
.table {
  width: 100%;
  background-color: var(--bg-color);
}
</style>
