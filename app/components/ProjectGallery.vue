<script setup lang="ts">
const { t } = useI18n()

const props = defineProps<{
  images: string[]
  label: string
}>()

const index = ref(0)
const dragDelta = ref(0)
let startX = 0
let dragging = false

function next() {
  index.value = (index.value + 1) % props.images.length
}

function prev() {
  index.value = (index.value - 1 + props.images.length) % props.images.length
}

function onPointerDown(e: PointerEvent) {
  dragging = true
  startX = e.clientX
  dragDelta.value = 0
  ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
}

function onPointerMove(e: PointerEvent) {
  if (!dragging) return
  dragDelta.value = e.clientX - startX
}

function onPointerUp() {
  if (!dragging) return
  dragging = false
  if (Math.abs(dragDelta.value) > 48) {
    if (dragDelta.value < 0) next()
    else prev()
  }
  dragDelta.value = 0
}
</script>

<template>
  <div class="select-none" :aria-label="`Screenshots of the ${label} website`">
    <div
      class="relative aspect-[16/11] w-full cursor-grab touch-pan-y overflow-hidden rounded-sm border border-ink/10 bg-white active:cursor-grabbing"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
    >
      <div
        class="flex h-full w-full ease-out"
        :class="dragging ? 'transition-none' : 'transition-transform duration-300'"
        :style="{ transform: `translateX(calc(${-index * 100}% + ${dragDelta}px))` }"
      >
        <NuxtImg
          v-for="(src, i) in images"
          :key="src"
          :src="src"
          :alt="`Screenshot ${i + 1} of ${images.length} of the ${label} website`"
          class="h-full w-full shrink-0 object-contain p-2"
          width="640"
          height="440"
          fit="inside"
          :loading="i === 0 ? 'eager' : 'lazy'"
          decoding="async"
          draggable="false"
        />
      </div>

      <button
        type="button"
        class="absolute top-1/2 left-2.5 -translate-y-1/2 rounded-full bg-cream/90 p-1.5 text-ink shadow-paper transition-colors hover:bg-cream"
        :aria-label="t('gallery.prev')"
        @click="prev"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M8 1.5L3.5 6l4.5 4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
      <button
        type="button"
        class="absolute top-1/2 right-2.5 -translate-y-1/2 rounded-full bg-cream/90 p-1.5 text-ink shadow-paper transition-colors hover:bg-cream"
        :aria-label="t('gallery.next')"
        @click="next"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M4 1.5L8.5 6 4 10.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </div>

    <div class="mt-3 flex justify-center gap-2">
      <button
        v-for="(src, i) in images"
        :key="src"
        type="button"
        class="size-2 rounded-full transition-colors"
        :class="i === index ? 'bg-emerald-base' : 'bg-ink/20 hover:bg-ink/40'"
        :aria-label="t('gallery.dot', { n: i + 1 })"
        @click="index = i"
      />
    </div>
  </div>
</template>
