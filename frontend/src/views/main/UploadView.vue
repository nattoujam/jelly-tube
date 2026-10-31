<template>
  <div class="upload-view-wrapper">
    <label class="label">Title</label>
    <div class="field">
      <div class="control">
        <Input v-model="title" />
      </div>
    </div>
    <label class="label">Tags</label>
    <div class="field has-addons">
      <div class="control">
        <SelectBox :options="tagOptions" @select="onSelectedTags" />
      </div>
      <div class="control tag-input">
        <Input v-model="newTagName" />
      </div>
      <div class="control">
        <button :disabled="cannotCreateTag" class="button is-info" @click="onCreateTag">
          Create
        </button>
      </div>
    </div>
    <div class="field">
      <div class="control">
        <div class="tags">
          <Tag
            v-for="(id, index) in selectedTagIds"
            :key="index"
            :id="id"
            :name="tagList.find((tag: any) => tag.id === id).name"
            withCloseButton
            @delete="onDeleteTag"
          />
        </div>
      </div>
    </div>
    <label class="label">video</label>
    <div class="field">
      <DropArea v-model="video" class="drop-area" />
    </div>
    <label class="label">Thumbnail</label>
    <div v-if="url && video?.type" class="field">
      <ThumbnailGenerator :url="url" :contentType="video.type" @selected="onSelectedThumbnail" />
    </div>
    <div class="buttons">
      <button
        class="button is-medium is-info"
        :class="{ 'is-loading': createVideoLoading }"
        :disabled="!canUpload"
        @click="onUpload"
      >
        Upload
      </button>
    </div>
    <div v-if="uploadProgress" class="field">
      <progress
        class="progress is-info"
        :value="uploadSent ? undefined : uploadProgress.loaded"
        :max="uploadProgress.total"
      ></progress>
      <p class="help">{{ uploadProgressText }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import DropArea from '@/components/DropArea.vue'
import SelectBox from '@/components/SelectBox.vue'
import Tag from '@/components/Tag.vue'
import ThumbnailGenerator from '@/components/ThumbnailGenerator.vue'
import Input from '@/components/Input.vue'

import { type Ref, ref, computed, watch } from 'vue'
import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { useQuery, provideApolloClient } from '@vue/apollo-composable'
import apolloClient from '@/utils/apolloClient'
import type { UploadProgressOptions } from '@/utils/fetchWithUploadProgress'
import { useBanner } from '@/stores/banner'

const { setBanner } = useBanner()

const createVideoMutation = gql`
  mutation createVideo($title: String!, $movie: Upload!, $thumbnail: Upload!, $tagIds: [Int!]!) {
    createVideo(input: { title: $title, movie: $movie, thumbnail: $thumbnail, tagIds: $tagIds }) {
      clientMutationId
    }
  }
`
const {
  mutate: createVideo,
  loading: createVideoLoading,
  onDone,
  onError
} = useMutation(createVideoMutation, () => ({
  variables: {
    title: title.value,
    movie: video.value,
    thumbnail: thumbnail.value,
    tagIds: selectedTagIds.value.map((tag) => Number.parseInt(tag))
  },
  context: {
    fetchOptions: {
      onUploadProgress: (event: ProgressEvent) => {
        uploadProgress.value = { loaded: event.loaded, total: event.total }
      }
    } satisfies UploadProgressOptions
  }
}))

const createTagMutation = gql`
  mutation createTagMutation($name: String!) {
    createTag(input: { name: $name }) {
      tag {
        id
        name
      }
    }
  }
`

const { mutate: createTag } = useMutation(createTagMutation, () => ({
  variables: {
    name: newTagName.value
  },
  update: (cache, { data: { createTag } }) => {
    let data: any = cache.readQuery({ query: tagListQuery })
    data = {
      ...data,
      tags: [...data.tags, createTag.tag]
    }
    cache.writeQuery({ query: tagListQuery, data })
  }
}))

const tagListQuery = gql`
  query tagListQuery {
    tags {
      id
      name
    }
  }
`
const query = provideApolloClient(apolloClient)(() => useQuery(tagListQuery))

const title: Ref<string> = ref('')
const video: Ref<File | null> = ref(null)
const thumbnail: Ref<File | null> = ref(null)
const selectedTagIds: Ref<Array<string>> = ref([])
const newTagName: Ref<string> = ref('')
const uploadProgress: Ref<{ loaded: number; total: number } | null> = ref(null)

const url = computed(() => (video.value ? URL.createObjectURL(video.value) : null))
const canUpload = computed(
  () =>
    Boolean(title.value) &&
    Boolean(video.value) &&
    Boolean(thumbnail.value) &&
    !createVideoLoading.value
)
const tagList = computed(() => query.result.value?.tags ?? [])
const tagOptions = computed(() =>
  tagList.value.map((tag: any) => {
    return {
      name: tag.name,
      value: tag.id
    }
  })
)
const cannotCreateTag = computed(
  () =>
    newTagName.value === '' || tagList.value.map((tag: any) => tag.name).includes(newTagName.value)
)
const uploadSent = computed(
  () => uploadProgress.value !== null && uploadProgress.value.loaded >= uploadProgress.value.total
)
const uploadProgressText = computed(() => {
  if (!uploadProgress.value) return ''
  if (uploadSent.value) return 'Saving on the server...'

  const { loaded, total } = uploadProgress.value
  return `${Math.floor((loaded / total) * 100)}% (${formatMegabytes(loaded)} / ${formatMegabytes(total)})`
})

function formatMegabytes(bytes: number): string {
  return `${(bytes / 1024 ** 2).toFixed(1)} MB`
}

watch(tagList, (newTagList) => {
  const createdTag = newTagList.find((tag: any) => tag.name === newTagName.value)
  if (createdTag) onSelectedTags(createdTag.id)
})

watch(video, (newVideo) => {
  thumbnail.value = null
  if (newVideo && !title.value) title.value = newVideo.name.replace(/^(.+)\..+$/, '$1')
})

onDone(() => {
  setBanner('Info', 'Success', `"${title.value}" is uploaded.`)
  title.value = ''
  video.value = null
  selectedTagIds.value = []
  uploadProgress.value = null
})

onError((error) => {
  setBanner('Error', 'Error', String(error))
  uploadProgress.value = null
})

const onSelectedTags = (value: string) => {
  if (selectedTagIds.value.includes(value)) return
  selectedTagIds.value.push(value)
}

const onDeleteTag = (e: string) => {
  selectedTagIds.value = selectedTagIds.value.filter((id) => id !== e)
}

const onCreateTag = () => createTag()

const onSelectedThumbnail = (image: Blob) => {
  thumbnail.value = new File([image], 'thumbnail.jpg', { type: image.type })
}

const onUpload = () => createVideo()
</script>

<style scoped>
.upload-view-wrapper {
  max-width: 700px;
  margin: 0 auto 0;
}
.drop-area {
  height: 100px;
}

.tag-input {
  width: 100%;
}
</style>
