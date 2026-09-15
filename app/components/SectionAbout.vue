<script setup lang="ts">
const notes = [
  {
    color: 'yellow' as const,
    rotation: '2deg',
    tape: false,
    label: 'CURRENTLY INTO',
    text: 'Laravel 12, Nuxt 4, and way too many side quests',
  },
  {
    color: 'blue' as const,
    rotation: '-2.5deg',
    tape: false,
    label: 'FUN FACT',
    text: 'I name projects after plants. Tandur means “to plant”',
  },
  {
    color: 'green' as const,
    rotation: '1.5deg',
    tape: false,
    label: 'PRINCIPLE',
    text: 'Ship small, learn fast, stay curious',
  },
]
</script>

<template>
  <section
    id="about"
    class="grid-paper grid-paper--fine scroll-mt-24 bg-emerald-deep py-24 text-cream sm:py-32"
  >
    <div class="mx-auto max-w-6xl px-6 lg:px-8">
      <div class="reveal">
        <p class="font-mono text-[11px] font-semibold tracking-[0.3em] text-cream/40 uppercase">
          03 — About
        </p>
        <h2 class="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
          Behind <span class="font-serif font-normal italic text-note-yellow">the screen</span>
        </h2>
      </div>

      <div class="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div class="reveal relative lg:col-span-7" :style="{ '--reveal-delay': '100ms' }">
          <ThePaper color="cream" rotation="-1deg" tape="top-center" tape-tilt="2deg" class="px-7 py-8 sm:px-10 sm:py-10">
            <p class="text-lg leading-relaxed text-ink sm:text-xl">
              I'm a developer who enjoys turning ideas into real digital products.
            </p>
            <p class="mt-5 leading-relaxed text-ink-soft">
              I like working across development and interface design — sketching a
              feature in the morning, shipping it by night. Most of what I know comes
              from building things that didn't exist yet, breaking them, and building
              them better. When I'm not coding, I'm usually annotating notebooks,
              rearranging my desk, or over-researching a problem I could have just
              started.
            </p>
            <p class="mt-6 font-hand text-2xl text-emerald-deep/80">— Keyza</p>
          </ThePaper>
          <p
            class="hand-arrow pointer-events-none absolute -top-7 right-2 hidden rotate-[-6deg] lg:block"
            aria-hidden="true"
          >
            actual desk energy →
          </p>
        </div>

        <div class="flex flex-col gap-6 lg:col-span-5 lg:pt-4">
          <ThePaper
            v-for="(note, i) in notes"
            :key="note.label"
            :color="note.color"
            :rotation="note.rotation"
            class="reveal px-5 py-4"
            :style="{ '--reveal-delay': `${160 + i * 110}ms` }"
          >
            <p class="font-mono text-[10px] font-semibold tracking-[0.3em] text-ink/50 uppercase">
              {{ note.label }}
            </p>
            <p class="mt-2 text-sm leading-snug font-semibold text-ink/85">
              {{ note.text }}
            </p>
          </ThePaper>
        </div>
      </div>
    </div>
  </section>
</template>
