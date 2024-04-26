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
import ThumnailGenerator from '@/components/ThumnailGenerator.vue'
import { type Ref, ref, computed } from 'vue'
import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { useBanner } from '@/stores/banner'

const { setBanner } = useBanner()

const title: Ref<string> = ref('')
const video: Ref<File | null> = ref(null)
const thumnail: Ref<File | null> = ref(null)

const url = computed(() => (video.value ? URL.createObjectURL(video.value) : null))
const canUpload = computed(() => Boolean(video.value) && Boolean(thumnail.value))

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

onDone(() => {
  setBanner('Info', 'Succsess', 'upload successful.')
})

onError((error) => {
  setBanner('Error', 'Error', String(error))
})

const onChangeTitle = (e: any) => {
  title.value = e.target.value
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
  createVideo({ title: title.value, movie: video.value, thumnail: thumnail.value, tagIds: [] })
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
