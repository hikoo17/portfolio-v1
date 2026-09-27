<script setup lang="ts">
defineProps<{
  label: string
  image?: string
}>()
</script>

<template>
  <div
    class="relative aspect-[16/10] w-full overflow-hidden rounded-sm border border-ink/10 transition-transform duration-500 ease-out group-hover:scale-[1.04]"
    role="img"
    :aria-label="`Preview of the ${label} project`"
  >
    <NuxtPicture
      v-if="image"
      :src="image"
      :alt="`Screenshot of the ${label} website`"
      class="absolute inset-0 h-full w-full"
      width="640"
      height="400"
      fit="inside"
      format="avif,webp"
      legacy-format="webp"
      sizes="xs:324px sm:720px lg:568px"
      loading="lazy"
      decoding="async"
      :img-attrs="{ class: 'h-full w-full bg-white object-contain' }"
    />

    <!-- No screenshot yet: a plain grey plate under the card's own label. -->
    <ImagePlaceholder v-else class="absolute inset-0" />
  </div>
</template>
