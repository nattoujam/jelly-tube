<template>
  <div class="upload-view-wrapper">
    <div class="field">
      <label class="label">Title</label>
      <div class="control">
        <input class="input" :value="title" @change="onChangeTitle" />
      </div>
    </div>
    <div class="field">
      <label class="label">Tags</label>
      <div class="control">
        <select class="select" @change="onSelectedTags">
          <option value="0">{{ INITIAL_SELECT_VALUE }}</option>
          <option v-for="(tag, index) in tagList" :key="index" :value="tag.id">
            {{ tag.name }}
          </option>
        </select>
      </div>
      <div class="control">
        <div class="tags">
          <TagIcon
            v-for="(id, index) in selectedTagIds"
            :key="index"
            :tagId="id"
            :name="tagList.find((tag: any) => tag.id === id).name"
            withCloseButton
            @delete="onDeleteTag"
          />
        </div>
      </div>
    </div>
    <div class="field">
      <label class="label">video</label>
      <DropArea class="drop-area" @dropped="onDropped" />
    </div>
    <div v-if="url && video?.type" class="field">
      <label class="label">Thumnail</label>
      <ThumnailGenerator :url="url" :contentType="video.type" @selected="onSelectedThumnail" />
    </div>
    <div class="buttons">
      <button class="button is-medium is-info" :disabled="!canUpload" @click="onUpload">
        Upload
      </button>
      <button class="button is-medium is-danger" @click="">Cancel</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import DropArea from '@/components/DropArea.vue'
import TagIcon from '@/components/TagIcon.vue'
import ThumnailGenerator from '@/components/ThumnailGenerator.vue'
import { type Ref, ref, computed } from 'vue'
import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { useQuery, provideApolloClient } from '@vue/apollo-composable'
import apolloClient from '@/apolloClient'
import { useBanner } from '@/stores/banner'

const INITIAL_SELECT_VALUE = '-- Select --'

const { setBanner } = useBanner()

const createVideoMutation = gql`
  mutation createVideo($title: String!, $movie: Upload!, $thumnail: Upload!, $tagIds: [Int!]!) {
    createVideo(input: { title: $title, movie: $movie, thumnail: $thumnail, tagIds: $tagIds }) {
      video {
        title
      }
    }
  }
`
const {
  mutate: createVideo,
  loading: createVideoLoading,
  error: createVideoError,
  onDone,
  onError
} = useMutation(createVideoMutation)

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
const thumnail: Ref<File | null> = ref(null)
const selectedTagIds: Ref<Array<string>> = ref([])

const url = computed(() => (video.value ? URL.createObjectURL(video.value) : null))
const canUpload = computed(() => Boolean(video.value) && Boolean(thumnail.value))
const tagList = computed(() => query.result.value?.tags ?? [])

onDone(() => {
  setBanner('Info', 'Succsess', 'upload successful.')
})

onError((error) => {
  setBanner('Error', 'Error', String(error))
})

const onChangeTitle = (e: any) => {
  title.value = e.target.value
}

const onSelectedTags = (e: any) => {
  if (e.target.value === '0') return
  selectedTagIds.value.push(e.target.value)
}

const onDeleteTag = (e: string) => {
  selectedTagIds.value = selectedTagIds.value.filter((id) => id !== e)
}

const onDropped = (e: File) => {
  video.value = e
}

const onSelectedThumnail = (image: Blob) => {
  if (!video.value) return

  const name = video.value.name.replace(/^(.+)\..+$/, '$1') + '.jpg'
  thumnail.value = new File([image], name, { type: image.type })
}

const onUpload = () => {
  createVideo({
    title: title.value,
    movie: video.value,
    thumnail: thumnail.value,
    tagIds: selectedTagIds.value.map((tag) => Number.parseInt(tag))
  })
}
</script>

<style scoped>
.upload-view-wrapper {
  max-width: 700px;
  margin: 0 auto 0;
}
.drop-area {
  height: 100px;
}
</style>
