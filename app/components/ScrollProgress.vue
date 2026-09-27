<script setup lang="ts">
// The bar is updated outside Vue's reactivity: a scroll handler must not force
// a layout flush (reading `scrollHeight`) nor schedule a re-render on every
// frame. The page height is measured only when the document actually changes
// size, and the transform is written straight to the element.
const bar = ref<HTMLElement | null>(null)

let frame = 0
let max = 1
let needsMeasure = true
let resizeObserver: ResizeObserver | null = null

function measure() {
  const doc = document.documentElement
  max = Math.max(doc.scrollHeight - doc.clientHeight, 1)
  needsMeasure = false
}

function paint() {
  const el = bar.value
  if (!el) {
    return
  }
  if (needsMeasure) {
    measure()
  }
  const top = document.documentElement.scrollTop
  // A taller document than the last measurement means content grew between
  // measurements (images or fonts finishing); re-measure instead of clamping.
  if (top > max) {
    measure()
  }
  const ratio = Math.min(Math.max(top / max, 0), 1)
  el.style.transform = `scaleX(${ratio})`
}

function onScroll() {
  if (frame) {
    return
  }
  frame = requestAnimationFrame(() => {
    frame = 0
    paint()
  })
}

function onResize() {
  needsMeasure = true
  onScroll()
}

onMounted(() => {
  measure()
  paint()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onResize)
  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(onResize)
    resizeObserver.observe(document.body)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onResize)
  resizeObserver?.disconnect()
  if (frame) {
    cancelAnimationFrame(frame)
  }
})
</script>

<template>
  <div
    ref="bar"
    class="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-note-yellow"
    style="transform: scaleX(0)"
    aria-hidden="true"
  />
</template>
