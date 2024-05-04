<template>
  <div class="video-wrapper">
    <video
      ref="videoRef"
      class="player video-js vjs-16-9"
      @seeked="(e) => emit('video-seeked', e.timeStamp)"
      @play="() => emit('video-play')"
    ></video>
  </div>
</template>

<script setup lang="ts">
import { type Ref, ref, watch, onMounted, onBeforeUnmount } from 'vue'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

let player: any = null
const videoRef: Ref<HTMLVideoElement | null> = ref(null)

const props = defineProps<{
  url: string
  contentType: string
  muted?: boolean
}>()

const emit = defineEmits<{
  'video-update': [videoElement: HTMLVideoElement]
  'video-seeked': [time: number]
  'video-play': []
}>()

const setupPlayer = () => {
  const options = {
    controls: true,
    muted: props.muted ?? false,
    preload: true,
    sources: [
      {
        src: props.url,
        type: props.contentType
      }
    ]
  }

  if (!videoRef.value) return

  player = videojs(videoRef.value, options, () => {
    if (!videoRef.value) return
    emit('video-update', videoRef.value)
  })
}

watch(
  () => props.url,
  (newUrl) => {
    player?.src({ src: newUrl, type: props.contentType })
  }
)

onMounted(() => {
  setupPlayer()
})

onBeforeUnmount(() => {
  if (player) player.dispose()
})
</script>

<style scoped>
.video-wrapper {
  text-align: center;
}

.player {
  width: 100%;
  height: 100%;
}
</style>
