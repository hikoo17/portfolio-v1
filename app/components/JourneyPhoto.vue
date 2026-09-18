<script setup lang="ts">
const props = defineProps<{
  src: string
  alt: string
  width: number
  height: number
  sizes: string
}>()

defineOptions({ inheritAttrs: false })

// In production the site is prerendered with `ipxStatic`, which has no runtime
// `/_ipx` handler: the milestone photos only exist as variants generated during
// prerender (see `journeyVisuals.ts` and the inventory in `SectionJourney.vue`).
// If an optimized URL ever fails to decode — a missing variant, a stale
// `immutable` cache entry holding the SPA fallback HTML, or a format the browser
// rejects — the `<img>` would render its alt text only. Detect that and swap the
// `<picture>` for the original asset under `/images`, which is always deployed.
const failed = ref(false)

watch(() => props.src, () => {
  failed.value = false
})
</script>

<template>
  <img
    v-if="failed"
    v-bind="$attrs"
    :src="src"
    :alt="alt"
    :width="width"
    :height="height"
    class="object-cover"
    loading="lazy"
    decoding="async"
    draggable="false"
  >
  <NuxtPicture
    v-else
    v-bind="$attrs"
    :src="src"
    :alt="alt"
    :width="width"
    :height="height"
    :sizes="sizes"
    fit="cover"
    format="avif,webp"
    legacy-format="webp"
    loading="lazy"
    decoding="async"
    :img-attrs="{ class: 'h-full w-full object-cover', draggable: 'false' }"
    @error="failed = true"
  />
</template>
