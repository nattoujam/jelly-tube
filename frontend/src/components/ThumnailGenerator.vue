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
      <button class="cell button" :disabled="!played" @click="drawThumnail">generate</button>
      <button class="cell button" :disabled="!thumnailBlob" @click="reserveThumnail">
        reserve
      </button>
      <div class="thumnail-wrapper">
        <img v-if="thumnailUrl" class="thumnail-preview" :src="thumnailUrl" />
      </div>
      <div class="thumnail-wrapper">
        <img
          v-if="reserveThumnailUrl"
          class="thumnail-preview thumnail-reserve"
          :src="reserveThumnailUrl"
        />
      </div>
    </div>
  </div>
  <canvas style="display: none" ref="thumnailCanvas"></canvas>
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
const thumnailCanvas: Ref<HTMLCanvasElement | null> = ref(null)
const thumnailBlob: Ref<Blob | null> = ref(null)
const reserveThumnailBlob: Ref<Blob | null> = ref(null)
const played: Ref<boolean> = ref(false)

const thumnailUrl = computed(() =>
  thumnailBlob.value ? URL.createObjectURL(thumnailBlob.value) : null
)
const reserveThumnailUrl = computed(() =>
  reserveThumnailBlob.value ? URL.createObjectURL(reserveThumnailBlob.value) : null
)

watch(
  () => props.url,
  () => {
    played.value = false
    thumnailBlob.value = null
    reserveThumnailBlob.value = null
  }
)

const drawThumnail = () => {
  if (!videoPlayer.value) return
  if (!thumnailCanvas.value) return

  thumnailCanvas.value.width = videoPlayer.value.videoWidth
  thumnailCanvas.value.height = videoPlayer.value.videoHeight
  thumnailCanvas.value?.getContext('2d')?.drawImage(videoPlayer.value, 0, 0)
  thumnailCanvas.value.toBlob(
    (blob) => {
      thumnailBlob.value = blob
      if (!reserveThumnailBlob.value) {
        reserveThumnailBlob.value = blob
        if (blob) emit('selected', blob)
      }
    },
    'img/jpeg',
    0.75
  )
}

const reserveThumnail = () => {
  reserveThumnailBlob.value = thumnailBlob.value

  if (reserveThumnailBlob.value) emit('selected', reserveThumnailBlob.value)
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
.thumnail-wrapper {
  padding: 3px;
}
.thumnail-preview {
  width: 100%;
}

.thumnail-reserve {
  border-style: solid;
  border-width: 3px;
  border-color: cyan;
}
.button {
  margin-top: 10px;
}
</style>
