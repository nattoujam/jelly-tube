<template>
  <div class="video-wrapper">
    <video ref="videoRef" class="player video-js vjs-16-9"></video>
  </div>
</template>

<script setup lang="ts">
import { type Ref, ref, onMounted, onBeforeUnmount } from 'vue'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

let player: any = null
const videoRef: Ref<string | Element> = ref('')

const props = defineProps<{
  url: string
  contentType: string
}>()

onMounted(() => {
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

  console.log(options)
  player = videojs(videoRef.value, options, () => {
    console.log('mounted player')
  })
})

onBeforeUnmount(() => {
  if (player) {
    player.dispose()
    console.log('dispose player')
  }
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
