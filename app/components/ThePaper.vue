<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    color?: 'white' | 'cream' | 'yellow' | 'pink' | 'blue' | 'green' | 'orange'
    rotation?: string
    tape?: boolean | 'top-center' | 'top-left' | 'top-right'
    tapeColor?: string
    tapeTilt?: string
    variant?: 'plain' | 'torn' | 'ruled'
    hover?: boolean
  }>(),
  {
    color: 'white',
    rotation: '0deg',
    tape: false,
    tapeColor: undefined,
    tapeTilt: undefined,
    variant: 'plain',
    hover: false,
  },
)

const colorMap: Record<string, string> = {
  white: 'var(--color-paper-white)',
  cream: 'var(--color-cream)',
  yellow: 'var(--color-note-yellow)',
  pink: 'var(--color-note-pink)',
  blue: 'var(--color-note-blue)',
  green: 'var(--color-note-green)',
  orange: 'var(--color-note-orange)',
}

const tapePosition = computed(() =>
  typeof props.tape === 'string' ? `tape--${props.tape}` : 'tape--top-center',
)
</script>

<template>
  <div
    class="paper"
    :class="[
      variant === 'torn' && 'paper--torn',
      variant === 'ruled' && 'paper--ruled',
      hover && 'paper--hover',
    ]"
    :style="{
      '--tilt': rotation,
      '--paper-color': colorMap[color],
      ...(tapeColor ? { '--tape-color': tapeColor } : {}),
    }"
  >
    <span
      v-if="tape"
      class="tape"
      :class="tapePosition"
      :style="tapeTilt ? { '--tape-tilt': tapeTilt } : undefined"
      aria-hidden="true"
    />
    <slot />
  </div>
</template>
