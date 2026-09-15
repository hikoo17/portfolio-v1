<script setup lang="ts">
defineProps<{
  variant: 'pos' | 'plant' | 'quiz' | 'art'
  label: string
}>()
</script>

<template>
  <div
    class="relative aspect-[16/10] w-full overflow-hidden rounded-sm border border-ink/10 transition-transform duration-500 ease-out group-hover:scale-[1.04]"
    role="img"
    :aria-label="`Abstract preview of the ${label} project`"
  >
    <div
      class="absolute inset-0 bg-gradient-to-br from-emerald-soft via-emerald-deep to-[#03302a]"
      aria-hidden="true"
    />

    <template v-if="variant === 'pos'">
      <div class="absolute inset-x-5 top-5 flex items-center gap-1.5">
        <span class="size-2 rounded-full bg-note-pink/80" />
        <span class="size-2 rounded-full bg-note-yellow/80" />
        <span class="size-2 rounded-full bg-note-green/80" />
        <span class="ml-3 h-2 w-28 rounded-full bg-cream/15" />
      </div>
      <div class="absolute inset-x-5 top-12 bottom-5 flex gap-3">
        <div class="flex w-1/4 flex-col gap-2 rounded-sm bg-cream/10 p-2.5">
          <span class="h-1.5 w-3/4 rounded-full bg-cream/40" />
          <span class="h-1.5 w-1/2 rounded-full bg-cream/20" />
          <span class="h-1.5 w-2/3 rounded-full bg-cream/20" />
          <span class="mt-1 h-1.5 w-1/2 rounded-full bg-note-yellow/70" />
        </div>
        <div class="flex flex-1 flex-col gap-2 rounded-sm bg-cream/10 p-2.5">
          <div class="flex items-end gap-1.5" aria-hidden="true">
            <span class="h-6 w-full rounded-t-sm bg-cream/25" />
            <span class="h-10 w-full rounded-t-sm bg-note-yellow/60" />
            <span class="h-8 w-full rounded-t-sm bg-cream/25" />
            <span class="h-13 w-full rounded-t-sm bg-note-pink/60" />
          </div>
          <span class="h-1.5 w-2/3 rounded-full bg-cream/30" />
          <span class="h-1.5 w-1/2 rounded-full bg-cream/20" />
          <span class="h-1.5 w-3/4 rounded-full bg-cream/20" />
        </div>
      </div>
    </template>

    <template v-else-if="variant === 'plant'">
      <div class="absolute inset-0 grid grid-cols-6 gap-2 p-6" aria-hidden="true">
        <div
          v-for="n in 12"
          :key="n"
          class="rounded-full"
          :class="[
            n % 4 === 0 ? 'bg-cream/15' : 'bg-cream/5',
            n % 3 === 0 ? 'self-end' : 'self-start',
          ]"
          :style="{ height: `${10 + (n % 5) * 8}px` }"
        />
      </div>
      <svg
        class="absolute bottom-5 left-1/2 h-24 w-24 -translate-x-1/2 text-note-green"
        viewBox="0 0 64 64"
        fill="none"
        aria-hidden="true"
      >
        <path d="M32 58V26" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" />
        <path
          d="M32 34C32 24 24 16 14 16c0 10 8 18 18 18Z"
          fill="currentColor"
          opacity="0.85"
        />
        <path d="M32 26c0-8 6-14 14-14 0 8-6 14-14 14Z" fill="#f9e9a8" opacity="0.9" />
      </svg>
      <span
        class="absolute top-5 left-5 h-2 w-16 rounded-full bg-cream/20"
        aria-hidden="true"
      />
      <span
        class="absolute top-8 left-5 h-2 w-10 rounded-full bg-cream/15"
        aria-hidden="true"
      />
    </template>

    <template v-else-if="variant === 'quiz'">
      <div class="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6">
        <span
          class="font-serif text-5xl italic text-note-yellow/90"
          aria-hidden="true"
        >
          ?
        </span>
        <div class="w-full max-w-52 space-y-2" aria-hidden="true">
          <div class="h-5 rounded-sm bg-cream/10" />
          <div class="h-5 rounded-sm bg-note-green/50" />
          <div class="h-5 rounded-sm bg-cream/10" />
        </div>
        <div class="mt-1 h-1.5 w-24 overflow-hidden rounded-full bg-cream/15" aria-hidden="true">
          <div class="h-full w-2/3 rounded-full bg-note-yellow/80" />
        </div>
      </div>
    </template>

    <template v-else>
      <div class="absolute inset-0 p-6" aria-hidden="true">
        <div class="grid h-full grid-cols-5 grid-rows-4 gap-2.5">
          <div
            v-for="(c, i) in [
              'bg-note-yellow/70', 'bg-cream/10', 'bg-note-pink/60', 'bg-cream/10', 'bg-note-blue/50',
              'bg-cream/10', 'bg-note-green/60', 'bg-cream/15', 'bg-note-orange/60', 'bg-cream/10',
              'bg-note-blue/50', 'bg-cream/10', 'bg-note-yellow/70', 'bg-cream/10', 'bg-note-pink/50',
              'bg-cream/10', 'bg-cream/15', 'bg-note-green/50', 'bg-cream/10', 'bg-cream/10',
            ]"
            :key="i"
            class="transition-transform duration-500"
            :class="[c, i % 2 ? 'rounded-none' : 'rounded-full', i % 3 === 0 ? 'self-end' : '']"
            :style="{ margin: `${(i % 3) * 4}px` }"
          />
        </div>
      </div>
    </template>
  </div>
</template>
