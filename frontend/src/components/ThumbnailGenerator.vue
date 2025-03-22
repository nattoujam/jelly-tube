<template>
  <VideoPlayer
    :url="props.url"
    :contentType="props.contentType"
    muted
    @video-update="onVideoUpdate"
    @video-play="onPlay"
  />
  <div class="fixed-grid has-2-cols">
    <div class="grid">
      <button class="cell button" :disabled="!played" @click="drawThumbnail">generate</button>
      <button class="cell button" :disabled="!thumbnailBlob" @click="reserveThumbnail">
        reserve
      </button>
      <div class="thumbnail-wrapper">
        <img v-if="thumbnailUrl" class="thumbnail-preview" :src="thumbnailUrl" />
      </div>
      <div class="thumbnail-wrapper">
        <img
          v-if="reserveThumbnailUrl"
          class="thumbnail-preview thumbnail-reserve"
          :src="reserveThumbnailUrl"
        />
      </div>
    </div>
  </div>
  <canvas style="display: none" ref="thumbnailCanvas"></canvas>
</template>

<script setup lang="ts">
import VideoPlayer from '@/components/VideoPlayer.vue'
import { type Ref, ref, computed, watch } from 'vue'

const props = defineProps<{
  url: string
  contentType: string
}>()
const emit = defineEmits<{
  selected: [file: Blob]
}>()

const videoPlayer: Ref<HTMLVideoElement | null> = ref(null)
const thumbnailCanvas: Ref<HTMLCanvasElement | null> = ref(null)
const thumbnailBlob: Ref<Blob | null> = ref(null)
const reserveThumbnailBlob: Ref<Blob | null> = ref(null)
const played: Ref<boolean> = ref(false)

const thumbnailUrl = computed(() =>
  thumbnailBlob.value ? URL.createObjectURL(thumbnailBlob.value) : null
)
const reserveThumbnailUrl = computed(() =>
  reserveThumbnailBlob.value ? URL.createObjectURL(reserveThumbnailBlob.value) : null
)

watch(
  () => props.url,
  () => {
    played.value = false
    thumbnailBlob.value = null
    reserveThumbnailBlob.value = null
  }
)

const drawThumbnail = () => {
  if (!videoPlayer.value) return
  if (!thumbnailCanvas.value) return

  thumbnailCanvas.value.width = videoPlayer.value.videoWidth
  thumbnailCanvas.value.height = videoPlayer.value.videoHeight
  thumbnailCanvas.value?.getContext('2d')?.drawImage(videoPlayer.value, 0, 0)
  thumbnailCanvas.value.toBlob(
    (blob) => {
      thumbnailBlob.value = blob
      if (!reserveThumbnailBlob.value) {
        reserveThumbnailBlob.value = blob
        if (blob) emit('selected', blob)
      }
    },
    'img/jpeg',
    0.75
  )
}

const reserveThumbnail = () => {
  reserveThumbnailBlob.value = thumbnailBlob.value

  if (reserveThumbnailBlob.value) emit('selected', reserveThumbnailBlob.value)
}

const onVideoUpdate = (e: HTMLVideoElement) => {
  played.value = false
  videoPlayer.value = e
}

const onPlay = () => {
  played.value = true
}
</script>

<style scoped>
.thumbnail-wrapper {
  padding: 3px;
}
.thumbnail-preview {
  width: 100%;
}

.thumbnail-reserve {
  border-style: solid;
  border-width: 3px;
  border-color: cyan;
}
.button {
  margin-top: 10px;
}
</style>
