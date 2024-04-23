<template>
  <div class="video-wrapper">
    <video ref="videoRef" class="player video-js vjs-16-9"></video>
  </div>
</template>

<script setup lang="ts">
import { type Ref, ref, watch, onMounted, onBeforeUnmount } from 'vue'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

let player: any = null
const videoRef: Ref<string | Element> = ref('')

const props = defineProps<{
  url: string
  contentType: string
}>()

const setupPlayer = () => {
  const options = {
    controls: true,
    muted: true,
    sources: [
      {
        src: props.url,
        type: props.contentType
      }
    ]
  }

  player = videojs(videoRef.value, options, () => {
    console.log('player is ready')
  })
}

watch(
  () => props.url,
  () => {
    player?.src({ src: props.url, type: props.contentType })
  }
)

onMounted(() => {
  setupPlayer()
})

onBeforeUnmount(() => {
  player?.dispose()
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
