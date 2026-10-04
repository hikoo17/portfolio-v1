<script setup lang="ts">
const { t } = useI18n()

// Split so the name can carry its own word spacing, evenly between every word.
const nameWords = computed(() => t('hero.name').split(' ').filter(Boolean))
</script>

<template>
  <section class="hero-desk relative min-h-screen overflow-hidden bg-emerald-deep text-cream">
    <div class="relative mx-auto w-full max-w-6xl px-6 pt-28 pb-40 sm:px-8 sm:pt-32 lg:pb-48">
      <div class="scrapbook-scene">
        <div class="relative mx-auto w-full max-w-[40rem] md:max-w-[44rem]">
          <span class="scrapbook__shadow" aria-hidden="true" />

          <!-- ==================== THE OPEN SCRAPBOOK ==================== -->
          <div class="scrapbook">
          <span class="scrapbook__stack scrapbook__stack--left" aria-hidden="true" />
          <span class="scrapbook__stack scrapbook__stack--right" aria-hidden="true" />
          <span class="scrapbook__stack scrapbook__stack--bottom" aria-hidden="true" />

          <!-- ---------- LEFT PAGE · introduction ---------- -->
          <article class="scrapbook__page scrapbook__page--left">
            <div class="relative z-[4] flex h-full flex-col justify-center p-6 sm:p-9 lg:p-10">
              <div class="relative mt-4">
                <span
                  class="pointer-events-none absolute -top-8 right-0 -rotate-6 font-hand text-2xl text-emerald-soft sm:text-3xl"
                  aria-hidden="true"
                >{{ t('hero.hello') }}</span>

                <p class="font-mono text-xs font-semibold tracking-[0.34em] text-ink-faint uppercase sm:text-sm">
                  {{ t('hero.greeting') }}
                </p>

                <h1 class="mt-3 text-[1.35rem] leading-[1.02] font-extrabold tracking-tight whitespace-nowrap text-ink sm:text-[1.45rem] lg:text-[1.6rem]">
                  <span v-for="word in nameWords" :key="word" class="mr-[0.2em] inline-block">{{ word }}</span>
                </h1>

                <p class="mt-4 inline-block -rotate-1 border-b-2 border-note-yellow/80 pb-0.5 font-hand text-xl text-emerald-deep sm:text-2xl lg:text-[1.75rem]">
                  {{ t('hero.role') }}
                </p>
              </div>

              <p class="mt-6 max-w-md text-[0.9rem] leading-relaxed text-ink-soft sm:text-[0.95rem]">
                {{ t('hero.intro') }}
              </p>

              <div class="mt-8 flex items-center justify-between gap-3">
                <a
                  href="#work"
                  class="group -rotate-1 bg-emerald-deep px-5 py-3 text-sm font-bold text-cream shadow-paper transition-transform duration-300 hover:-translate-y-1 hover:rotate-0"
                >
                  {{ t('hero.viewWork') }}
                  <span class="inline-block transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
                </a>

                <a
                  href="#contact"
                  class="rotate-[0.5deg] border border-ink/25 px-5 py-3 text-sm font-semibold text-ink-soft transition-colors duration-300 hover:border-emerald-deep hover:text-emerald-deep"
                >
                  {{ t('hero.letsTalk') }}
                </a>
              </div>

              <!-- A pen resting on the page, below the buttons, nib to the right. -->
              <img
                src="/images/scrapbook/pen.svg"
                alt=""
                width="529"
                height="120"
                class="pointer-events-none mt-8 w-[60%] -scale-x-100 rotate-[1.2deg] select-none drop-shadow-[0_7px_9px_rgba(10,20,15,0.4)] sm:mt-14 sm:w-[88%]"
                draggable="false"
                loading="lazy"
                decoding="async"
                aria-hidden="true"
              >

            </div>
          </article>

          <!-- ---------- RIGHT PAGE · portrait ---------- -->
          <article class="scrapbook__page scrapbook__page--right">
            <div class="relative z-[4] flex h-full flex-col p-6 sm:p-9 lg:p-10">
              <div class="relative flex flex-1 items-center justify-center">
                  <figure
                    class="paper photo-sheet hero-photo relative w-full max-w-[14rem] sm:max-w-[15rem]"
                    style="--paper-color: #fff"
                  >
                    <div class="relative overflow-hidden border border-ink/10">
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
                        sizes="xs:224px sm:240px lg:260px"
                        loading="eager"
                        decoding="async"
                        :img-attrs="{ class: 'h-full w-full object-cover', fetchpriority: 'high' }"
                        :preload="{ fetchPriority: 'high' }"
                      />
                    </div>
                    <figcaption class="px-1.5 pt-3 pb-0.5">
                      <span class="-rotate-1 font-hand text-[1.35rem] leading-none text-ink/85">
                        {{ t('hero.photoCaption') }}
                      </span>
                    </figcaption>

                    <span
                      class="tape tape--top-left"
                      style="--tape-tilt: -12deg; --tape-color: rgba(216, 230, 239, 0.85)"
                      aria-hidden="true"
                    />
                    <span
                      class="tape tape--top-right"
                      style="--tape-tilt: 12deg; --tape-color: rgba(249, 233, 168, 0.85)"
                      aria-hidden="true"
                    />
                  </figure>
              </div>
            </div>
          </article>

            <!-- ---------- CENTRE SPIRAL ---------- -->
            <div class="scrapbook__binding" aria-hidden="true">
              <span v-for="coil in 16" :key="coil" class="scrapbook__coil" />
            </div>
          </div>
        </div>

        <!-- ==================== DESK STATIONERY ==================== -->
        <!-- Static ruler image: the old inline-SVG component carried an
             feTurbulence grain filter plus ~100 tick/number nodes that were
             re-painted every frame. An <img> rasterizes once. -->
        <img
          src="/images/scrapbook/ruler.svg"
          alt=""
          width="480"
          height="76"
          class="desk-item desk-ruler top-1/2 left-[4%] hidden select-none xl:block"
          style="--ruler-tilt: -72deg"
          draggable="false"
          loading="lazy"
          decoding="async"
          aria-hidden="true"
        />
        <img
          src="/images/scrapbook/pencil-holder.svg"
          alt=""
          width="240"
          height="340"
          class="desk-item desk-pencil-holder top-[56%] right-0 hidden w-auto select-none xl:block"
          draggable="false"
          loading="lazy"
          decoding="async"
          aria-hidden="true"
        >

      </div>
    </div>

    <a
      href="#work"
      class="absolute bottom-6 left-1/2 -translate-x-1/2 font-hand text-lg text-cream/50 transition-colors hover:text-note-yellow"
    >
      {{ t('hero.keepExploring') }}
    </a>
  </section>
</template>
