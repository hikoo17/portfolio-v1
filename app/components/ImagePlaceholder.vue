<script setup lang="ts">
// The neutral stand-in for a project that has no screenshot yet: a plain grey
// plate with a picture glyph, so an empty slot reads as "photo pending" rather
// than as a broken or branded image. Pass `label` when the plate has to speak
// for itself; leave it out when an ancestor already names the region.
withDefaults(
  defineProps<{
    label?: string
    large?: boolean
  }>(),
  {
    label: '',
    large: false,
  },
)
</script>

<template>
  <div
    class="flex h-full w-full items-center justify-center bg-stone-200"
    :role="label ? 'img' : undefined"
    :aria-label="label || undefined"
    :aria-hidden="label ? undefined : 'true'"
  >
    <Icon
      name="ph:image"
      class="text-stone-400"
      :class="large ? 'image-placeholder__icon--lg' : 'image-placeholder__icon'"
    />
  </div>
</template>
