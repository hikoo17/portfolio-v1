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

    <PaperPlane
      class="pointer-events-none absolute top-16 left-4 hidden w-24 text-cream/30 sm:block lg:top-20 lg:left-8 lg:w-28"
    />

    <!-- The plane's trail continues out of its nose and drifts toward the
         portrait, so the two halves of the hero read as one path. Decorative
         only, and desktop-only so the stacked mobile layout stays calm. -->
    <svg
      class="pointer-events-none absolute top-14 left-24 hidden w-64 text-cream/20 lg:block xl:left-32 xl:w-72"
      viewBox="0 0 300 90"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M28 44C76 48 108 26 152 20s98-8 136-4"
        stroke="currentColor"
        stroke-width="2.2"
        stroke-linecap="round"
        stroke-dasharray="0.5 9"
      />
      <path
        d="m260 4 28 10-24 16"
        stroke="currentColor"
        stroke-width="2.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>

    <span
      class="pointer-events-none absolute top-6 right-8 hidden font-mono text-[10px] tracking-[0.3em] text-cream/30 lg:block"
      aria-hidden="true"
    >
      7.3°S — 108.2°E
    </span>

    <!-- Postmark beside the coordinates, using the same dashed-stamp kit as the
         journal covers. Wrapped so the desktop-only hiding actually applies:
         `.journal-stamp` sets its own `display`, which would beat `hidden`. -->
    <span class="pointer-events-none absolute top-14 right-8 hidden lg:block" aria-hidden="true">
      <span
        class="journal-stamp text-[11px]"
        style="--stamp-color: rgba(246, 241, 228, 0.55); --scrap-tilt: -7deg"
      >
        {{ t('hero.openToWork') }}
      </span>
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
      <div class="relative flex flex-col justify-center">
        <!-- One hand-drawn plus in the gutter, echoing the journal doodles. -->
        <svg
          class="pointer-events-none absolute top-[40%] -left-5 hidden w-5 rotate-12 text-cream/25 lg:block"
          viewBox="0 0 100 100"
          fill="none"
          aria-hidden="true"
        >
          <path d="M50 12v28M50 60v28M12 50h28M60 50h28" stroke="currentColor" stroke-width="9" stroke-linecap="round" />
        </svg>

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
          <div
            class="paper-backing"
            style="--backing-tilt: -3deg; --backing-x: 3px; --backing-y: 12px"
            aria-hidden="true"
          />

          <figure
            class="paper photo-sheet paper--stacked"
            style="--tilt: -2deg; --tilt-hover: -5deg; --paper-color: var(--color-cream-warm)"
          >
            <span
              class="tape tape--top-center"
              style="--tape-tilt: -5deg; --tape-color: rgba(246, 241, 228, 0.5)"
              aria-hidden="true"
            />
            <span
              class="tape tape--bottom-left"
              style="--tape-tilt: 8deg; --tape-color: rgba(216, 230, 239, 0.45)"
              aria-hidden="true"
            />
            <img
              src="/images/scrapbook/paperclip.svg"
              alt=""
              width="272"
              height="205"
              class="pointer-events-none absolute -top-5 -left-5 z-10 w-16 -rotate-12 select-none sm:-top-6 sm:-left-6 sm:w-20"
              draggable="false"
              loading="lazy"
              decoding="async"
              aria-hidden="true"
            >
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
                quality="70"
                sizes="xs:292px sm:356px lg:404px"
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

          <!-- A little star tucked over the photo's top corner, like a doodle
               someone drew on the print after it was glued down. -->
          <svg
            class="pointer-events-none absolute -top-3 -right-3 w-8 -rotate-6 text-note-yellow/80"
            viewBox="0 0 100 100"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M50 8 58 40 90 50 58 60 50 92 42 60 10 50 42 40Z"
              stroke="currentColor"
              stroke-width="6"
              stroke-linejoin="round"
            />
          </svg>
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
