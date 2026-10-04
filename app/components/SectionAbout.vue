<script setup lang="ts">
const { t } = useI18n()

// Four supporting notes. Colours and tilts follow the existing paper language,
// kept restrained so the main About Me sheet stays the anchor.
const facts = [
  { key: 'currently', color: 'white' as const, rotation: '-2deg' },
  { key: 'focus', color: 'blue' as const, rotation: '1.6deg' },
  { key: 'exploring', color: 'green' as const, rotation: '-1.4deg' },
  { key: 'basedIn', color: 'yellow' as const, rotation: '1.8deg' },
]
</script>

<template>
  <section
    id="about"
    class="section-bg section-bg-emerald scroll-mt-24 py-24 text-cream sm:py-32"
  >
    <div class="mx-auto max-w-6xl px-6 lg:px-8">
      <div class="reveal relative flex flex-wrap items-end justify-between gap-6">
        <PaperPlane
          variant="wave"
          class="pointer-events-none absolute top-1/2 right-0 -z-10 w-20 -translate-y-1/2 rotate-6 text-cream/10 sm:w-28 lg:w-32"
        />
        <div>
          <p class="font-mono text-[11px] font-semibold tracking-[0.3em] text-cream/40 uppercase">
            {{ t('about.eyebrow') }}
          </p>
          <h2 class="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
            {{ t('about.titleA') }} <span class="font-serif font-normal italic text-note-yellow">{{ t('about.titleB') }}</span>
          </h2>
        </div>
      </div>

      <div class="mt-14 grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
        <!-- Left: one large sheet for the introduction. -->
        <div class="reveal relative lg:col-span-7">
          <div
            class="paper-backing"
            style="--backing-tilt: -0.2deg; --backing-x: -3px; --backing-y: 10px"
            aria-hidden="true"
          />
          <ThePaper
            color="cream"
            rotation="-0.8deg"
            tape="top-center"
            tape-tilt="2deg"
            class="paper--stacked px-7 py-8 sm:px-10 sm:py-10"
            style="--tilt-hover: -2.8deg"
          >
            <p class="max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">
              {{ t('about.intro') }}
            </p>
            <p class="mt-6 font-hand text-2xl text-emerald-deep/80">
              — Keyza
            </p>

            <img
              src="/images/scrapbook/pen.svg"
              alt=""
              width="529"
              height="120"
              class="pointer-events-none absolute right-4 bottom-5 z-10 w-24 -rotate-[16deg] select-none drop-shadow-[0_5px_4px_rgba(6,69,58,0.28)] sm:right-6 sm:bottom-6 sm:w-32 lg:w-36"
              draggable="false"
              loading="lazy"
              decoding="async"
              aria-hidden="true"
            >

          </ThePaper>
        </div>

        <!-- Right: four separate paper notes in a 2×2 arrangement. -->
        <div class="lg:col-span-5">
          <div class="grid grid-cols-2 gap-4 sm:gap-5">
            <div
              v-for="(fact, i) in facts"
              :key="fact.key"
              class="reveal reveal--drop h-full"
              :style="{
                '--reveal-delay': `${140 + i * 90}ms`,
                '--drop-tilt': i % 2 === 0 ? '-2.5deg' : '2.5deg',
              }"
            >
              <ThePaper :color="fact.color" :rotation="fact.rotation" hover class="h-full px-4 py-4 sm:px-5 sm:py-5">
                <p class="font-mono text-[10px] font-semibold tracking-[0.26em] text-ink/45 uppercase">
                  {{ t(`about.cards.${fact.key}.label`) }}
                </p>
                <p class="mt-2 text-sm leading-snug font-semibold text-ink">
                  {{ t(`about.cards.${fact.key}.value`) }}
                </p>
              </ThePaper>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
