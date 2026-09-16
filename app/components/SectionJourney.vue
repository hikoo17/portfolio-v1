<script setup lang="ts">
const { t, te } = useI18n()

const milestones = [
  { key: 'first', year: '2023', color: 'white' as const, rotation: '-1.5deg' },
  { key: 'serious', year: '2024', color: 'blue' as const, rotation: '1.8deg' },
  { key: 'lks2025', year: '2025', color: 'yellow' as const, rotation: '-2deg' },
  { key: 'iot', year: '2025', color: 'orange' as const, rotation: '2deg' },
  { key: 'lks2026', year: '2026', color: 'pink' as const, rotation: '1.2deg' },
  { key: 'province', year: '2026', color: 'green' as const, rotation: '-1.2deg' },
]
</script>

<template>
  <section
    id="journey"
    class="grid-paper grid-paper--fine scroll-mt-24 bg-emerald-deep py-24 text-cream sm:py-32"
  >
    <div class="mx-auto max-w-5xl px-6 lg:px-8">
      <div class="reveal">
        <p class="font-mono text-[11px] font-semibold tracking-[0.3em] text-cream/40 uppercase">
          {{ t('journey.eyebrow') }}
        </p>
        <h2 class="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
          {{ t('journey.titleA') }} <span class="font-serif font-normal italic text-note-yellow">{{ t('journey.titleB') }}</span>
        </h2>
      </div>

      <ol class="relative mt-16 space-y-14 before:absolute before:top-2 before:bottom-2 before:left-[7px] before:border-l-2 before:border-dashed before:border-cream/20 lg:before:left-1/2">
        <li
          v-for="(m, i) in milestones"
          :key="m.key"
          class="reveal relative pl-10 lg:w-1/2 lg:pl-0"
          :class="i % 2 === 0 ? 'lg:pr-14 lg:text-right' : 'lg:ml-auto lg:pl-14'"
          :style="{ '--reveal-delay': `${i * 110}ms` }"
        >
          <span
            class="absolute top-6 left-0 size-4 rounded-full border-2 border-emerald-deep bg-note-yellow shadow-sm lg:top-7"
            :class="i % 2 === 0 ? 'lg:left-auto lg:-right-2' : 'lg:-left-2'"
            aria-hidden="true"
          />
          <ThePaper :color="m.color" :rotation="m.rotation" hover class="relative px-6 py-5">
            <span
              v-if="te(`journey.milestones.${m.key}.badge`)"
              class="absolute -top-3 right-4 inline-block -rotate-2 rounded-sm bg-emerald-base px-2.5 py-1 font-mono text-[10px] font-bold tracking-[0.18em] text-cream uppercase shadow-paper"
            >
              {{ t(`journey.milestones.${m.key}.badge`) }}
            </span>
            <p class="font-serif text-3xl italic text-emerald-deep/85">{{ m.year }}</p>
            <h3 class="mt-1.5 text-lg font-bold text-ink">
              {{ t(`journey.milestones.${m.key}.title`) }}
            </h3>
            <p class="mt-1.5 text-sm leading-relaxed text-ink-soft">
              {{ t(`journey.milestones.${m.key}.text`) }}
            </p>
          </ThePaper>
        </li>
      </ol>

      <p
        class="reveal hand-arrow mt-16 text-center text-2xl"
        aria-hidden="true"
      >
        {{ t('journey.handNote') }}
      </p>
    </div>
  </section>
</template>
