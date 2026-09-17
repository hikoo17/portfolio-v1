<script setup lang="ts">
// The dashed trail behind the plane is the decorative point, so the shape is
// swappable. Every trail ends at the same point where the plane sits, which
// lets one drawing travel in different "directions" per section.
const props = withDefaults(
  defineProps<{
    variant?: 'swoop' | 'arc' | 'wave' | 'curl'
  }>(),
  {
    variant: 'swoop',
  },
)

const trails: Record<string, string> = {
  swoop:
    'M 8 140 C 48 150 84 138 104 108 C 120 84 100 62 78 74 C 58 85 72 116 108 100 C 140 86 156 60 186 44',
  arc: 'M 6 132 C 58 140 116 116 186 44',
  wave: 'M 8 134 C 34 112 54 146 84 124 C 110 105 128 130 154 104 C 166 92 178 68 186 44',
  curl: 'M 12 138 C 58 148 96 122 88 100 C 82 82 60 80 56 96 C 52 112 76 122 104 104 C 138 82 158 62 186 44',
}

const trail = computed(() => trails[props.variant] ?? trails.swoop)
</script>

<template>
  <svg viewBox="0 0 220 150" fill="none" aria-hidden="true">
    <path
      :d="trail"
      stroke="currentColor"
      stroke-width="2.2"
      stroke-linecap="round"
      stroke-dasharray="0.5 9"
    />
    <g transform="translate(186,34) rotate(-14) scale(2.6) translate(-8,-8)" fill="currentColor">
      <path d="M0,9l4,1.5L6,16l2.861-3.82L14,14l2-14L0,9z M7.169,11.44l-0.916,2.485l-1.086-3.118l8.402-7.631L7.169,11.44z" />
    </g>
  </svg>
</template>
