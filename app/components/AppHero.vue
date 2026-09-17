<script setup lang="ts">
const { t } = useI18n()

// Split so the name can carry its own word spacing, evenly between every word.
const nameWords = computed(() => t('hero.name').split(' ').filter(Boolean))
</script>

<template>
  <section
    class="grid-paper grid-paper--fine relative min-h-screen overflow-hidden bg-emerald-deep text-cream"
  >
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_62%_-10%,rgba(122,201,175,0.15),transparent_65%)]"
      aria-hidden="true"
    />

    <span
      class="pointer-events-none absolute top-6 right-8 hidden font-mono text-[10px] tracking-[0.3em] text-cream/30 lg:block"
      aria-hidden="true"
    >
      7.3°S — 108.2°E
    </span>
    <span
      class="pointer-events-none absolute bottom-6 right-8 hidden font-mono text-[10px] tracking-[0.3em] text-cream/30 lg:block"
      aria-hidden="true"
    >
      EST. 2024 / 01·07
    </span>

    <div
      class="relative z-10 mx-auto grid min-h-screen w-full max-w-6xl items-center gap-14 px-6 pt-36 pb-28 lg:grid-cols-[45fr_55fr] lg:gap-6 lg:px-8"
    >
      <!-- LEFT — introduction -->
      <div class="flex flex-col justify-center">
        <h1
          class="animate-rise-in text-5xl leading-[1.04] font-extrabold tracking-tight sm:text-6xl xl:text-7xl"
          style="animation-delay: 0ms"
        >
          <span class="block text-base font-semibold tracking-[0.2em] text-cream/60 uppercase sm:text-lg">
            {{ t('hero.greeting') }}
          </span>
          <span class="mt-2 block whitespace-nowrap text-2xl sm:text-4xl xl:text-5xl">
            <span
              v-for="(word, i) in nameWords"
              :key="word"
              class="inline-block"
              :class="i > 0 ? 'ml-[0.34em]' : ''"
            >{{ word }}</span>
          </span>
        </h1>

        <p
          class="animate-rise-in mt-7 max-w-xl text-base leading-relaxed text-cream/75 sm:text-lg"
          style="animation-delay: 260ms"
        >
          {{ t('hero.intro') }}
        </p>

        <div
          class="animate-rise-in mt-10 flex flex-wrap items-center gap-x-5 gap-y-4"
          style="animation-delay: 340ms"
        >
          <a
            href="#work"
            class="group inline-flex -rotate-1 items-center gap-2 rounded-sm bg-cream px-6 py-3 text-sm font-bold text-emerald-deep shadow-paper transition-all duration-300 hover:-translate-y-1 hover:rotate-0 hover:shadow-paper-lift"
          >
            {{ t('hero.viewWork') }}
            <span class="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
          </a>
          <a
            href="#contact"
            class="inline-flex rotate-[0.5deg] items-center rounded-sm border border-cream/35 px-6 py-3 text-sm font-semibold text-cream/90 transition-all duration-300 hover:-translate-y-1 hover:rotate-0 hover:border-cream/70 hover:bg-cream/5"
          >
            {{ t('hero.letsTalk') }}
          </a>
          <p
            class="hand-arrow hidden -rotate-3 xl:block"
            aria-hidden="true"
          >
            {{ t('hero.startHere') }}
          </p>
        </div>
      </div>

      <!-- RIGHT — the photograph -->
      <div class="relative mt-14 lg:mt-0 lg:-mr-4 lg:translate-y-4 xl:-mr-12">
        <div
          class="animate-photo-in relative mx-auto w-full max-w-[20rem] sm:max-w-[24rem] lg:ml-auto lg:max-w-[27rem]"
          style="animation-delay: 0ms"
        >
          <p
            class="paper-drift hand-arrow absolute -top-9 -left-1 z-10 -rotate-6 sm:-left-7"
            style="--rise-delay: 900ms; --drift-duration: 8s; --tilt: -6deg; font-size: 1.9rem"
            aria-hidden="true"
          >
            {{ t('hero.thatsMe') }}
          </p>

          <figure
            class="paper photo-sheet"
            style="--tilt: -2.5deg; --paper-color: var(--color-cream-warm)"
          >
            <span
              class="tape tape--top-center"
              style="--tape-tilt: -5deg; --tape-color: rgba(246, 241, 228, 0.5)"
              aria-hidden="true"
            />
            <div class="relative overflow-hidden border border-ink/15">
              <NuxtPicture
                src="/images/keyza.webp"
                alt="Portrait photograph of Keyza"
                class="block aspect-[4/5] w-full"
                width="640"
                height="800"
                fit="cover"
                format="avif,webp"
                legacy-format="webp"
                sizes="xs:320px sm:384px lg:432px"
                loading="eager"
                decoding="async"
                :img-attrs="{
                  class: 'h-full w-full object-cover',
                  fetchpriority: 'high',
                }"
                :preload="{ fetchPriority: 'high' }"
              />
              <div
                class="pointer-events-none absolute inset-0 shadow-[inset_0_1px_6px_rgba(10,20,15,0.22)]"
                aria-hidden="true"
              />
            </div>
            <figcaption class="flex items-end justify-between gap-3 px-1.5 pt-3.5 pb-1.5">
              <span class="-rotate-1 font-hand text-[1.7rem] leading-none text-ink/85">
                {{ t('hero.photoCaption') }}
              </span>
              <span
                class="mb-0.5 font-mono text-[9px] font-semibold tracking-[0.28em] text-ink/45 uppercase"
              >
                fig. 01
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>

    <a
      href="#work"
      class="absolute bottom-7 left-1/2 hidden -translate-x-1/2 font-hand text-lg text-cream/50 transition-colors hover:text-note-yellow [@media(min-height:780px)]:block"
    >
      {{ t('hero.keepExploring') }}
    </a>
  </section>
</template>
