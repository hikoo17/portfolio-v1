<script setup lang="ts">
defineProps<{
  src: string
  alt: string
  width: number
  height: number
  sizes: string
}>()
</script>

<template>
  <NuxtPicture
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
  />
</template>
