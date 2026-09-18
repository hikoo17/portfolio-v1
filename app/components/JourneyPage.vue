<script setup lang="ts">
type PageKind = 'cover' | 'endpaper' | 'milestone' | 'continued'

interface MilestoneVisual {
  /** Sticky-note paper colour, reused from ThePaper's palette. */
  note: 'white' | 'cream' | 'yellow' | 'pink' | 'blue' | 'green' | 'orange'
  sticker: string
  layout: 'spark' | 'stack' | 'stage' | 'circuit' | 'trophy' | 'map'
  image?: string
  alt?: string
}

const props = withDefaults(
  defineProps<{
    kind: PageKind
    milestoneKey?: string
    number?: number
    total?: number
    side?: 'left' | 'right'
  }>(),
  {
    milestoneKey: undefined,
    number: 1,
    total: 8,
    side: 'right',
  },
)

const { t } = useI18n()

// Each milestone gets its own collage layout plus its own props, so the pages
// feel gathered one at a time rather than assembled from one template.
const visuals: Record<string, MilestoneVisual> = {
  first: { note: 'blue', sticker: '#075e4f', layout: 'spark' },
  serious: {
    note: 'green',
    sticker: '#a9603a',
    layout: 'stack',
    image: '/images/keyza.webp',
    alt: 'Portrait photograph of Keyza',
  },
  lks2025: {
    note: 'yellow',
    sticker: '#b23a3a',
    layout: 'stage',
    image: '/images/lks-pplg-2025-tasikzone.jpg',
    alt: 'Participants working at laptops during the LKS PPLG Kota Tasikmalaya 2025 competition.',
  },
  iot: { note: 'orange', sticker: '#3f7d5a', layout: 'circuit' },
  lks2026: {
    note: 'pink',
    sticker: '#b8862b',
    layout: 'trophy',
    image: '/images/lks-pplg-2025-radartasik.webp',
    alt: 'Participants taking part in the LKS PPLG Kota Tasikmalaya competition at SMK BPN.',
  },
  province: { note: 'blue', sticker: '#3f6b8a', layout: 'map' },
}

const visual = computed(() => (props.milestoneKey ? visuals[props.milestoneKey] : undefined))

const pageNumber = computed(() => String(props.number).padStart(2, '0'))
const totalPages = computed(() => String(props.total).padStart(2, '0'))

const sheetClass = computed(() => ({
  'journal-sheet--cover': props.kind === 'cover',
  'journal-sheet--endpaper': props.kind === 'endpaper',
  'journal-sheet--left': props.side === 'left',
}))

function field(name: string) {
  return props.milestoneKey ? t(`journey.milestones.${props.milestoneKey}.${name}`) : ''
}

const list = computed<string[]>(() => {
  if (!props.milestoneKey) {
    return []
  }
  const value = t(`journey.milestones.${props.milestoneKey}.list`)
  return Array.isArray(value) ? (value as unknown as string[]) : []
})
</script>

<template>
  <article class="journal-sheet" :class="sheetClass">
    <span v-if="kind !== 'endpaper'" class="journal-sheet__margin" aria-hidden="true" />

    <!-- COVER -->
    <div v-if="kind === 'cover'" class="journal-collage">
      <JourneyCoverCollage />
    </div>

    <!-- INSIDE COVER -->
    <div v-else-if="kind === 'endpaper'" class="journal-collage text-cream">
      <svg
        class="absolute inset-0 h-full w-full text-cream/15"
        viewBox="0 0 100 133"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M8 40c18-16 30 10 46 2s26-22 40-14" stroke="currentColor" stroke-width="0.6" stroke-dasharray="3 3" />
        <path d="M12 96c16-10 26 8 42 2s28-18 40-12" stroke="currentColor" stroke-width="0.6" stroke-dasharray="3 3" />
      </svg>

      <p class="absolute top-[9%] left-[10%] font-mono text-[2.3cqw] tracking-[0.3em] text-cream/45 uppercase">
        {{ t('journey.eyebrow') }}
      </p>
      <p class="absolute top-[15%] left-[10%] w-[74%] font-hand text-[6.4cqw] leading-tight text-cream/85">
        {{ t('journey.cover.owner') }} <span class="text-note-yellow">Keyza</span>
      </p>

      <div class="absolute top-[44%] left-[10%] w-[52%]">
        <ThePaper color="cream" rotation="-5deg" class="px-[4cqw] py-[3.4cqw]">
          <p class="font-mono text-[2cqw] tracking-[0.24em] text-ink/45 uppercase">
            {{ t('about.currentlyInto') }}
          </p>
          <p class="mt-[1.6cqw] font-hand text-[4.4cqw] leading-tight text-ink/80">
            {{ t('about.currentlyIntoText') }}
          </p>
        </ThePaper>
      </div>

      <div
        class="journal-stamp absolute right-[9%] bottom-[14%] text-[2.6cqw]"
        style="--stamp-color: #e9d9a6; --scrap-tilt: -8deg"
      >
        {{ t('journey.cover.started') }}
      </div>
    </div>

    <!-- TO BE CONTINUED -->
    <div v-else-if="kind === 'continued'" class="journal-collage">
      <p class="absolute top-[9%] left-[9%] font-mono text-[2.4cqw] tracking-[0.3em] text-ink-faint uppercase">
        {{ t('journey.eyebrow') }}
      </p>
      <p class="absolute top-[16%] left-[8%] w-[50%] font-hand text-[12cqw] leading-[0.98] font-bold text-emerald-deep">
        {{ t('journey.continued.title') }}
      </p>

      <div class="absolute top-[10%] right-[8%] w-[34%] rotate-[5deg]">
        <figure class="relative">
          <ThePaper color="white" class="journal-polaroid shadow-paper">
            <span class="tape tape--top-center" style="--tape-tilt: -6deg" />
            <div class="flex aspect-square w-full items-center justify-center border border-dashed border-ink/20 bg-cream/50">
              <span class="font-hand text-[7cqw] leading-none text-ink-faint">…</span>
            </div>
          </ThePaper>
        </figure>
      </div>

      <p class="absolute top-[48%] left-[9%] w-[76%] font-hand text-[5.4cqw] leading-snug text-ink-soft">
        {{ t('journey.continued.note') }}
      </p>

      <svg
        class="journal-doodle absolute top-[66%] left-[12%] w-[13cqw] -rotate-6"
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
      >
        <path d="M10 78c14-44 44-58 82-46" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-dasharray="8 7" />
        <path d="m82 24 12 8-11 9" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
      </svg>

      <img
        src="/images/scrapbook/pen.svg"
        alt=""
        width="529"
        height="120"
        class="pointer-events-none absolute right-[9%] bottom-[13%] w-[38%] -rotate-6 select-none"
        draggable="false"
        loading="lazy"
        decoding="async"
        aria-hidden="true"
      >

      <p class="absolute bottom-[9%] left-[9%] font-hand text-[4.6cqw] text-emerald-soft">
        — {{ t('journey.continued.signature') }}
      </p>
    </div>

    <!-- MILESTONE · FIRST LINE OF CODE — text top, collage below -->
    <div v-else-if="visual?.layout === 'spark'" class="journal-collage flex flex-col p-[7cqw]">
      <div class="relative z-10 shrink-0">
        <p class="font-hand text-[5cqw] leading-none text-emerald-soft">{{ field('kicker') }}</p>
        <p class="mt-[1.4cqw] font-mono text-[2.4cqw] tracking-[0.28em] text-ink-faint uppercase">{{ field('date') }}</p>
        <h3 class="mt-[2.2cqw] text-[7.8cqw] leading-[1.02] font-extrabold tracking-tight text-ink">
          {{ field('title') }}
        </h3>
        <p class="mt-[2.6cqw] w-[94%] text-[3.3cqw] leading-relaxed text-ink-soft">{{ field('text') }}</p>
      </div>

      <div class="relative mt-[5cqw] min-h-0 flex-1">
        <div class="absolute top-[3%] left-0 w-[56%]">
          <ThePaper color="white" rotation="-2deg" class="px-[3.4cqw] pt-[3.4cqw] pb-[8cqw] shadow-paper-lift">
            <span class="tape tape--top-left" style="--tape-tilt: -10deg" />
            <svg viewBox="0 0 120 84" class="w-full" fill="none" aria-hidden="true">
              <rect x="1" y="1" width="118" height="82" rx="4" stroke="#22271f" stroke-opacity="0.5" />
              <path d="M1 14h118" stroke="#22271f" stroke-opacity="0.4" />
              <circle cx="9" cy="7.5" r="2" fill="#f5d5d2" />
              <circle cx="16" cy="7.5" r="2" fill="#f9e9a8" />
              <circle cx="23" cy="7.5" r="2" fill="#dcead4" />
              <path
                d="M10 26h36M10 36h58M10 46h44M10 56h62M10 66h30"
                stroke="#0a6e5c"
                stroke-width="2.4"
                stroke-linecap="round"
                stroke-opacity="0.75"
              />
              <path d="M78 26h24M78 36h16" stroke="#c08a2e" stroke-width="2.4" stroke-linecap="round" stroke-opacity="0.8" />
            </svg>
            <span class="absolute bottom-[2.6cqw] left-[3.4cqw] font-hand text-[4.2cqw] text-ink/75">
              {{ field('caption') }}
            </span>
          </ThePaper>
        </div>

        <div class="absolute top-[2%] right-0 w-[38%]">
          <ThePaper color="white" rotation="2deg" class="px-[3.6cqw] py-[3.4cqw]">
            <ul class="space-y-[1.4cqw]">
              <li
                v-for="item in list"
                :key="item"
                class="flex gap-[1.6cqw] text-[2.7cqw] leading-snug text-ink-soft"
              >
                <span class="text-emerald-soft">✓</span>{{ item }}
              </li>
            </ul>
          </ThePaper>
        </div>

        <div class="absolute bottom-[1%] left-[3%] w-[54%]">
          <ThePaper :color="visual.note" rotation="3.5deg" class="px-[4.4cqw] py-[4cqw]">
            <p class="font-hand text-[4.8cqw] leading-tight text-ink/85">{{ field('note') }}</p>
          </ThePaper>
        </div>

        <span
          class="journal-sticker absolute right-[2%] bottom-[4%] text-[2.6cqw]"
          :style="{ '--sticker-color': visual.sticker, '--scrap-tilt': '-6deg' }"
        >
          {{ field('sticker') }}
        </span>

        <svg
          class="journal-doodle absolute right-[4%] top-[34%] w-[9cqw] rotate-[10deg]"
          viewBox="0 0 100 100"
          fill="none"
          aria-hidden="true"
        >
          <path d="M50 8 58 42 92 50 58 58 50 92 42 58 8 50 42 42Z" stroke="currentColor" stroke-width="4" stroke-linejoin="round" />
        </svg>
      </div>
    </div>

    <!-- MILESTONE · STARTED BUILDING — text left, collage right -->
    <div v-else-if="visual?.layout === 'stack'" class="journal-collage flex flex-row gap-[5cqw] p-[7cqw]">
      <div class="relative z-10 w-[42%] shrink-0">
        <p class="font-hand text-[4.6cqw] leading-none text-emerald-soft">{{ field('kicker') }}</p>
        <p class="mt-[1.4cqw] font-mono text-[2.3cqw] tracking-[0.28em] text-ink-faint uppercase">{{ field('date') }}</p>
        <h3 class="mt-[2.2cqw] text-[6.4cqw] leading-[1.03] font-extrabold tracking-tight text-ink">
          {{ field('title') }}
        </h3>
        <p class="mt-[2.6cqw] text-[3.1cqw] leading-relaxed text-ink-soft">{{ field('text') }}</p>
        <div class="mt-[4cqw]">
          <span
            class="journal-sticker text-[2.5cqw]"
            :style="{ '--sticker-color': visual.sticker, '--scrap-tilt': '-7deg' }"
          >
            {{ field('sticker') }}
          </span>
        </div>
      </div>

      <div class="relative min-h-0 flex-1">
        <div class="absolute top-[1%] right-[4%] w-[74%]">
          <figure class="relative -rotate-[4deg]">
            <ThePaper color="white" class="journal-polaroid shadow-paper-lift">
              <span class="tape tape--top-center" style="--tape-tilt: 6deg" />
              <NuxtPicture
                :src="visual.image"
                :alt="visual.alt"
                class="block aspect-[3/4] w-full"
                width="320"
                height="426"
                fit="cover"
                format="avif,webp"
                legacy-format="webp"
                sizes="xs:140px sm:200px"
                loading="lazy"
                decoding="async"
                :img-attrs="{ class: 'h-full w-full object-cover', draggable: 'false' }"
              />
              <figcaption class="absolute inset-x-[3.4cqw] bottom-[2.4cqw] font-hand text-[4cqw] text-ink/80">
                {{ field('caption') }}
              </figcaption>
            </ThePaper>
          </figure>
        </div>

        <p class="absolute top-[52%] left-0 -rotate-6 font-hand text-[5cqw] text-emerald-soft" aria-hidden="true">
          →
        </p>

        <div class="absolute bottom-[1%] left-0 w-[86%]">
          <ThePaper :color="visual.note" rotation="-4deg" class="px-[4cqw] py-[3.5cqw]">
            <p class="font-hand text-[4.4cqw] leading-tight text-ink/85">{{ field('note') }}</p>
          </ThePaper>
        </div>
      </div>
    </div>

    <!-- MILESTONE · LKS CITY 2025 — collage top, text bottom -->
    <div v-else-if="visual?.layout === 'stage'" class="journal-collage flex flex-col p-[7cqw]">
      <div class="relative min-h-0 flex-1">
        <div class="absolute top-[3%] left-[4%] w-[84%]">
          <figure class="relative rotate-[2deg]">
            <ThePaper color="white" class="journal-polaroid shadow-paper-lift">
              <span class="tape tape--top-left" style="--tape-tilt: -12deg; --tape-color: rgba(249, 233, 168, 0.85)" />
              <span class="tape tape--top-right" style="--tape-tilt: 12deg; --tape-color: rgba(216, 230, 239, 0.85)" />
              <NuxtPicture
                :src="visual.image"
                :alt="visual.alt"
                class="block aspect-[4/3] w-full"
                width="480"
                height="360"
                fit="cover"
                format="avif,webp"
                legacy-format="webp"
                sizes="xs:220px sm:300px"
                loading="lazy"
                decoding="async"
                :img-attrs="{ class: 'h-full w-full object-cover', draggable: 'false' }"
              />
              <figcaption class="absolute inset-x-[3.4cqw] bottom-[2.4cqw] font-hand text-[3.8cqw] text-ink/80">
                {{ field('caption') }}
              </figcaption>
            </ThePaper>
          </figure>
        </div>

        <div
          class="journal-stamp absolute right-[1%] bottom-[6%] text-[2.6cqw]"
          style="--stamp-color: #b23a3a; --scrap-tilt: 9deg"
        >
          {{ field('sticker') }}
        </div>

        <svg
          class="journal-doodle absolute bottom-[10%] left-[1%] w-[9cqw] -rotate-6"
          viewBox="0 0 100 100"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="50" cy="38" r="22" stroke="currentColor" stroke-width="4.5" />
          <path d="M50 16v-9M38 26l-7-7M62 26l7-7" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" />
          <path d="M40 60 30 90l20-11 20 11-10-30" stroke="currentColor" stroke-width="4.5" stroke-linejoin="round" />
        </svg>

        <div class="absolute bottom-[4%] left-[2%] w-[48%]">
          <ThePaper :color="visual.note" rotation="3deg" class="px-[4.2cqw] py-[3.8cqw]">
            <p class="font-hand text-[4.4cqw] leading-tight text-ink/85">{{ field('note') }}</p>
          </ThePaper>
        </div>
      </div>

      <div class="relative z-10 mt-[5cqw] shrink-0">
        <p class="font-hand text-[5cqw] leading-none text-emerald-soft">{{ field('kicker') }}</p>
        <p class="mt-[1.4cqw] font-mono text-[2.3cqw] tracking-[0.28em] text-ink-faint uppercase">{{ field('date') }}</p>
        <h3 class="mt-[2.2cqw] text-[7.4cqw] leading-[1.02] font-extrabold tracking-tight text-ink">
          {{ field('title') }}
        </h3>
        <p class="mt-[2.4cqw] w-[88%] text-[3.2cqw] leading-relaxed text-ink-soft">{{ field('text') }}</p>
      </div>
    </div>

    <!-- MILESTONE · IoT — collage left, text right -->
    <div v-else-if="visual?.layout === 'circuit'" class="journal-collage flex flex-row-reverse gap-[5cqw] p-[7cqw]">
      <div class="relative z-10 w-[42%] shrink-0 text-right">
        <p class="font-hand text-[4.6cqw] leading-none text-emerald-soft">{{ field('kicker') }}</p>
        <p class="mt-[1.4cqw] font-mono text-[2.3cqw] tracking-[0.28em] text-ink-faint uppercase">{{ field('date') }}</p>
        <h3 class="mt-[2.2cqw] text-[6.4cqw] leading-[1.03] font-extrabold tracking-tight text-ink">
          {{ field('title') }}
        </h3>
        <p class="mt-[2.6cqw] text-[3.1cqw] leading-relaxed text-ink-soft">{{ field('text') }}</p>
        <div class="mt-[4cqw]">
          <span
            class="journal-sticker text-[2.5cqw]"
            :style="{ '--sticker-color': visual.sticker, '--scrap-tilt': '7deg' }"
          >
            {{ field('sticker') }}
          </span>
        </div>
      </div>

      <div class="relative min-h-0 flex-1">
        <div class="absolute top-[2%] left-[2%] w-[86%]">
          <ThePaper color="blue" rotation="-2deg" class="px-[4cqw] py-[4cqw] shadow-paper-lift">
            <span class="tape tape--top-right" style="--tape-tilt: 10deg; --tape-color: rgba(255, 255, 255, 0.6)" />
            <svg viewBox="0 0 140 120" class="w-full" fill="none" aria-hidden="true">
              <rect x="45" y="36" width="50" height="48" rx="4" stroke="#0a6e5c" stroke-width="3" />
              <path d="M60 36V20M80 36V20M60 84v16M80 84v16M45 50H26M45 70H26M95 50h19M95 70h19" stroke="#0a6e5c" stroke-width="3" stroke-linecap="round" />
              <circle cx="26" cy="50" r="4.5" fill="#c08a2e" />
              <circle cx="26" cy="70" r="4.5" fill="#c08a2e" />
              <circle cx="114" cy="50" r="4.5" fill="#b23a3a" />
              <circle cx="114" cy="70" r="4.5" fill="#b23a3a" />
              <path d="M58 52h24M58 62h16" stroke="#22271f" stroke-opacity="0.5" stroke-width="2.6" stroke-linecap="round" />
            </svg>
            <span class="absolute bottom-[2.4cqw] left-[4cqw] font-hand text-[4.2cqw] text-ink/75">
              {{ field('caption') }}
            </span>
          </ThePaper>
        </div>

        <div class="absolute bottom-[2%] left-[4%] w-[88%]">
          <ThePaper color="white" rotation="1.5deg" class="journal-ticket px-[5cqw] py-[4cqw] pl-[7cqw]">
            <p class="font-mono text-[2.2cqw] tracking-[0.28em] text-ink-faint uppercase">{{ pageNumber }}</p>
            <ul class="mt-[2cqw] space-y-[1.4cqw]">
              <li
                v-for="item in list"
                :key="item"
                class="flex gap-[1.6cqw] text-[2.7cqw] leading-snug text-ink-soft"
              >
                <span class="text-emerald-soft">✓</span>{{ item }}
              </li>
            </ul>
          </ThePaper>
        </div>

        <div class="absolute bottom-[18%] right-[-4%] w-[56%]">
          <ThePaper :color="visual.note" rotation="-3.5deg" class="px-[4cqw] py-[3.6cqw]">
            <p class="font-hand text-[4.4cqw] leading-tight text-ink/85">{{ field('note') }}</p>
          </ThePaper>
        </div>
      </div>
    </div>

    <!-- MILESTONE · LKS CITY 2026 — text top, collage below -->
    <div v-else-if="visual?.layout === 'trophy'" class="journal-collage flex flex-col p-[7cqw]">
      <div class="relative z-10 shrink-0">
        <p class="font-hand text-[5cqw] leading-none text-emerald-soft">{{ field('kicker') }}</p>
        <p class="mt-[1.4cqw] font-mono text-[2.3cqw] tracking-[0.28em] text-ink-faint uppercase">{{ field('date') }}</p>
        <h3 class="mt-[2.2cqw] text-[7.8cqw] leading-[1.02] font-extrabold tracking-tight text-ink">
          {{ field('title') }}
        </h3>
        <p class="mt-[2.6cqw] w-[94%] text-[3.3cqw] leading-relaxed text-ink-soft">{{ field('text') }}</p>
      </div>

      <div class="relative mt-[5cqw] min-h-0 flex-1">
        <div class="absolute top-[4%] right-[2%] w-[74%]">
          <figure class="relative rotate-[3deg]">
            <ThePaper color="white" class="journal-polaroid shadow-paper-lift">
              <span class="tape tape--top-left" style="--tape-tilt: -12deg; --tape-color: rgba(249, 233, 168, 0.85)" />
              <NuxtPicture
                :src="visual.image"
                :alt="visual.alt"
                class="block aspect-[4/3] w-full"
                width="480"
                height="360"
                fit="cover"
                format="avif,webp"
                legacy-format="webp"
                sizes="xs:200px sm:280px"
                loading="lazy"
                decoding="async"
                :img-attrs="{ class: 'h-full w-full object-cover', draggable: 'false' }"
              />
              <figcaption class="absolute inset-x-[3.4cqw] bottom-[2.4cqw] font-hand text-[3.8cqw] text-ink/80">
                {{ field('caption') }}
              </figcaption>
            </ThePaper>
          </figure>
        </div>

        <span
          class="journal-sticker journal-sticker--round absolute bottom-[8%] left-[2%] text-[3.2cqw]"
          :style="{ '--sticker-color': visual.sticker, '--scrap-tilt': '-8deg' }"
        >
          {{ field('sticker') }}
        </span>

        <svg
          class="journal-doodle absolute bottom-[6%] right-[4%] w-[8cqw] rotate-6"
          viewBox="0 0 100 100"
          fill="none"
          aria-hidden="true"
        >
          <path d="M20 30h14M62 18h12M30 74h12M74 66h10" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
          <circle cx="52" cy="50" r="5" fill="currentColor" />
        </svg>
      </div>
    </div>

    <!-- MILESTONE · PROVINCE — collage left, text right -->
    <div v-else-if="visual?.layout === 'map'" class="journal-collage flex flex-row-reverse gap-[5cqw] p-[7cqw]">
      <div class="relative z-10 w-[42%] shrink-0 text-right">
        <p class="font-hand text-[4.6cqw] leading-none text-emerald-soft">{{ field('kicker') }}</p>
        <p class="mt-[1.4cqw] font-mono text-[2.3cqw] tracking-[0.28em] text-ink-faint uppercase">{{ field('date') }}</p>
        <h3 class="mt-[2.2cqw] text-[6.4cqw] leading-[1.03] font-extrabold tracking-tight text-ink">
          {{ field('title') }}
        </h3>
        <p class="mt-[2.6cqw] text-[3.1cqw] leading-relaxed text-ink-soft">{{ field('text') }}</p>
        <div class="mt-[4cqw]">
          <span
            class="journal-sticker text-[2.5cqw]"
            :style="{ '--sticker-color': visual.sticker, '--scrap-tilt': '-9deg' }"
          >
            {{ field('sticker') }}
          </span>
        </div>
      </div>

      <div class="relative min-h-0 flex-1">
        <div class="absolute top-[2%] left-[0%] w-[92%]">
          <ThePaper color="white" rotation="-1.5deg" class="px-[4cqw] py-[4cqw] shadow-paper-lift">
            <svg viewBox="0 0 140 110" class="w-full" fill="none" aria-hidden="true">
              <path d="M12 30c18-14 30 10 46 2s26-20 42-12" stroke="#3f6b8a" stroke-width="2.6" stroke-linecap="round" stroke-dasharray="6 6" />
              <path d="M8 78c16-8 26 8 44 2s30-16 48-10" stroke="#3f6b8a" stroke-width="2.6" stroke-linecap="round" stroke-dasharray="6 6" />
              <path d="M70 72c-12 0-20-8-20-19 0-13 9-24 20-24s20 11 20 24c0 11-8 19-20 19Z" stroke="#b23a3a" stroke-width="3" />
              <circle cx="70" cy="52" r="6" fill="#b23a3a" />
              <path d="M70 72v22" stroke="#b23a3a" stroke-width="3" stroke-linecap="round" />
            </svg>
            <span class="absolute bottom-[2.4cqw] left-[4cqw] font-hand text-[4.2cqw] text-ink/75">
              {{ field('caption') }}
            </span>
          </ThePaper>
        </div>

        <div class="absolute bottom-[2%] left-[2%] w-[90%]">
          <ThePaper color="white" rotation="1.5deg" class="journal-ticket px-[5cqw] py-[4cqw] pl-[7cqw]">
            <p class="font-mono text-[2.2cqw] tracking-[0.28em] text-ink-faint uppercase">
              {{ field('date') }} · {{ pageNumber }}
            </p>
            <ul class="mt-[2cqw] space-y-[1.4cqw]">
              <li
                v-for="item in list"
                :key="item"
                class="flex gap-[1.6cqw] text-[2.7cqw] leading-snug text-ink-soft"
              >
                <span class="text-emerald-soft">✓</span>{{ item }}
              </li>
            </ul>
          </ThePaper>
        </div>

        <div class="absolute bottom-[26%] right-[-4%] w-[58%]">
          <ThePaper :color="visual.note" rotation="-4deg" class="px-[4cqw] py-[3.6cqw]">
            <p class="font-hand text-[4.4cqw] leading-tight text-ink/85">{{ field('note') }}</p>
          </ThePaper>
        </div>
      </div>
    </div>

  </article>
</template>
