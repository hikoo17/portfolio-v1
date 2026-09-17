<script setup lang="ts">
const progress = ref(0)
let frame = 0

function update() {
  const doc = document.documentElement
  const max = doc.scrollHeight - doc.clientHeight
  progress.value = max > 0 ? doc.scrollTop / max : 0
}

function onScroll() {
  if (frame) {
    return
  }
  frame = requestAnimationFrame(() => {
    frame = 0
    update()
  })
}

onMounted(() => {
  update()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
  if (frame) {
    cancelAnimationFrame(frame)
  }
})
</script>

<template>
  <div
    class="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-note-yellow"
    :style="{ transform: `scaleX(${progress})` }"
    aria-hidden="true"
  />
</template>
