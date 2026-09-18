<script setup lang="ts">
type PklPageKind = 'cover' | 'endpaper' | 'intro' | 'week' | 'outro'

interface PklWeek {
  label: string
  date: string
  title: string
  bullets: string[]
  learned: string
  challenge: string
  win: string
  note: string
  sticker: string
}

const props = withDefaults(
  defineProps<{
    kind: PklPageKind
    weeks?: string[]
    number?: number
    total?: number
    side?: 'left' | 'right'
  }>(),
  {
    weeks: () => [],
    number: 1,
    total: 8,
    side: 'right',
  },
)

const { t, tm, rt } = useI18n()

// Read scalars with `t()` (which invokes the compiled message) instead of
// `tm()`, which hands back the raw AST nodes. Arrays go through the same
// `tm()` + `rt()` pattern used by ProjectModal so each item resolves to text.
function asList(path: string): string[] {
  const raw = tm(path)
  if (!Array.isArray(raw)) {
    return []
  }
  return raw.map(item => rt(item))
}

// The cover page itself lives in PklCoverCollage; these are the few cover
// facts the inner pages still quote.
const cover = computed(() => ({
  motto: t('journey.pkl.cover.motto'),
  period: t('journey.pkl.cover.period'),
  company: t('journey.pkl.cover.company'),
}))

const endpaper = computed(() => ({
  owner: t('journey.pkl.endpaper.owner'),
  quote: t('journey.pkl.endpaper.quote'),
  motto: t('journey.pkl.endpaper.motto'),
  sticker: t('journey.pkl.endpaper.sticker'),
}))

const intro = computed(() => ({
  eyebrow: t('journey.pkl.intro.eyebrow'),
  title: t('journey.pkl.intro.title'),
  text: t('journey.pkl.intro.text'),
  caption: t('journey.pkl.intro.caption'),
  note: t('journey.pkl.intro.note'),
  sticker: t('journey.pkl.intro.sticker'),
  list: asList('journey.pkl.intro.list'),
}))

const outro = computed(() => ({
  eyebrow: t('journey.pkl.outro.eyebrow'),
  title: t('journey.pkl.outro.title'),
  text: t('journey.pkl.outro.text'),
  caption: t('journey.pkl.outro.caption'),
  note: t('journey.pkl.outro.note'),
  signature: t('journey.pkl.outro.signature'),
  sticker: t('journey.pkl.outro.sticker'),
  list: asList('journey.pkl.outro.list'),
}))

const eyebrow = computed(() => t('journey.pkl.eyebrow'))
const weekHead = computed(() => t('journey.pkl.weekHead'))

function weekOf(key: string): PklWeek {
  const base = `journey.pkl.weeks.${key}`
  return {
    label: t(`${base}.label`),
    date: t(`${base}.date`),
    title: t(`${base}.title`),
    bullets: asList(`${base}.bullets`),
    learned: t(`${base}.learned`),
    challenge: t(`${base}.challenge`),
    win: t(`${base}.win`),
    note: t(`${base}.note`),
    sticker: t(`${base}.sticker`),
  }
}

const weekEntries = computed<PklWeek[]>(() => props.weeks.map(weekOf))

const weekRange = computed(() => {
  const entries = weekEntries.value
  if (entries.length === 0) {
    return ''
  }
  const first = entries[0]!.label
  const last = entries[entries.length - 1]!.label
  return first === last ? first : `${first} — ${last}`
})

const pageNumber = computed(() => String(props.number).padStart(2, '0'))
const totalPages = computed(() => String(props.total).padStart(2, '0'))

const sheetClass = computed(() => ({
  'journal-sheet--cover': props.kind === 'cover',
  'journal-sheet--endpaper': props.kind === 'endpaper',
  'journal-sheet--pkl': props.kind !== 'endpaper',
  'journal-sheet--left': props.side === 'left',
}))

const weekNotes = ['white', 'cream', 'yellow', 'pink'] as const
</script>

<template>
  <article class="journal-sheet" :class="sheetClass">
    <span v-if="kind !== 'endpaper'" class="journal-sheet__margin" aria-hidden="true" />

    <!-- COVER -->
    <div v-if="kind === 'cover'" class="journal-collage">
      <PklCoverCollage />
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
        {{ eyebrow }}
      </p>
      <p class="absolute top-[15%] left-[10%] w-[76%] font-hand text-[6.2cqw] leading-tight text-cream/85">
        {{ endpaper.owner }} <span class="text-note-yellow">Keyza</span>
      </p>

      <div class="absolute top-[40%] left-[10%] w-[62%]">
        <ThePaper color="cream" rotation="-4deg" class="px-[4cqw] py-[3.6cqw]">
          <p class="font-mono text-[2cqw] tracking-[0.24em] text-ink/45 uppercase">
            {{ cover.company }}
          </p>
          <p class="mt-[1.6cqw] font-hand text-[4.4cqw] leading-tight text-ink/80">
            {{ endpaper.quote }}
          </p>
          <p class="mt-[2cqw] font-mono text-[1.9cqw] tracking-[0.18em] text-emerald-soft uppercase">
            {{ cover.motto }}
          </p>
        </ThePaper>
      </div>

      <div
        class="journal-stamp absolute right-[9%] bottom-[16%] text-[2.6cqw]"
        style="--stamp-color: #e9d9a6; --scrap-tilt: -8deg"
      >
        {{ endpaper.sticker }}
      </div>
    </div>

    <!-- INTRO / HOW IT STARTED -->
    <div v-else-if="kind === 'intro'" class="journal-collage flex flex-col p-[7cqw]">
      <div class="relative z-10 shrink-0">
        <p class="font-mono text-[2.3cqw] tracking-[0.3em] text-ink-faint uppercase">{{ intro.eyebrow }}</p>
        <h3 class="mt-[2.2cqw] text-[8cqw] leading-[1] font-extrabold tracking-tight text-ink">
          {{ intro.title }}
        </h3>
        <p class="mt-[2.6cqw] w-[92%] text-[3.2cqw] leading-relaxed text-ink-soft">{{ intro.text }}</p>
      </div>

      <div class="relative mt-[5cqw] min-h-0 flex-1">
        <div class="absolute top-[2%] left-0 w-[58%]">
          <ThePaper color="white" rotation="-2deg" class="journal-ticket px-[5cqw] py-[4cqw] pl-[7cqw]">
            <p class="font-mono text-[2cqw] tracking-[0.24em] text-ink/45 uppercase">
              {{ intro.caption }}
            </p>
            <ul class="mt-[2.4cqw] space-y-[1.6cqw]">
              <li
                v-for="item in intro.list"
                :key="item"
                class="flex gap-[1.6cqw] text-[2.7cqw] leading-snug text-ink-soft"
              >
                <span class="text-emerald-soft">✓</span>{{ item }}
              </li>
            </ul>
          </ThePaper>
        </div>

        <div class="absolute top-[6%] right-0 w-[36%]">
          <ThePaper color="green" rotation="4deg" class="px-[4cqw] py-[3.8cqw]">
            <span class="tape tape--top-center" style="--tape-tilt: -5deg" />
            <p class="font-hand text-[4.4cqw] leading-tight text-ink/85">{{ intro.note }}</p>
          </ThePaper>
        </div>

        <div class="absolute bottom-[2%] left-[6%] w-[54%]">
          <ThePaper color="blue" rotation="2.5deg" class="px-[4.2cqw] py-[3.8cqw]">
            <p class="font-mono text-[1.9cqw] tracking-[0.24em] text-ink/45 uppercase">
              {{ t('journey.pkl.periodLabel') }}
            </p>
            <p class="mt-[1.2cqw] font-hand text-[4.6cqw] leading-tight text-emerald-deep">
              {{ cover.period }}
            </p>
          </ThePaper>
        </div>

        <span
          class="journal-sticker absolute right-[2%] bottom-[4%] text-[2.5cqw]"
          style="--sticker-color: #075e4f; --scrap-tilt: -6deg"
        >
          {{ intro.sticker }}
        </span>
      </div>
    </div>

    <!-- WEEK SPREAD -->
    <div v-else-if="kind === 'week'" class="journal-collage flex flex-col p-[6cqw]">
      <div class="flex shrink-0 items-end justify-between gap-[3cqw]">
        <p class="font-mono text-[2.1cqw] font-semibold tracking-[0.3em] text-ink-faint uppercase">
          {{ weekHead }}
        </p>
        <p class="font-hand text-[3.4cqw] leading-none text-emerald-soft">{{ weekRange }}</p>
      </div>
      <span class="mt-[1.6cqw] block h-[0.5cqw] w-full shrink-0 bg-ink/10" aria-hidden="true" />

      <div class="mt-[3cqw] flex min-h-0 flex-1 flex-col gap-[3cqw]">
        <div
          v-for="(week, i) in weekEntries"
          :key="week.label"
          class="relative min-h-0 flex-1"
        >
          <div :class="i % 2 === 0 ? '-rotate-[1deg]' : 'rotate-[1deg]'" class="h-full">
            <ThePaper :color="weekNotes[i % weekNotes.length]" class="h-full px-[4.4cqw] py-[3.6cqw]">
              <span
                :class="i % 2 === 0 ? 'tape tape--top-left' : 'tape tape--top-right'"
                :style="i % 2 === 0 ? '--tape-tilt: -10deg' : '--tape-tilt: 10deg'"
              />
              <div class="flex items-baseline justify-between gap-[2cqw]">
                <p class="font-mono text-[2.1cqw] font-semibold tracking-[0.26em] text-emerald-soft uppercase">
                  {{ week.label }}
                </p>
                <p class="font-mono text-[1.8cqw] tracking-[0.2em] text-ink-faint uppercase">
                  {{ week.date }}
                </p>
              </div>
              <h4 class="mt-[1cqw] font-hand text-[4.8cqw] leading-tight text-ink">
                {{ week.title }}
              </h4>
              <ul class="mt-[1.4cqw] space-y-[0.7cqw]">
                <li
                  v-for="bullet in week.bullets"
                  :key="bullet"
                  class="flex gap-[1.3cqw] text-[2.4cqw] leading-snug text-ink-soft"
                >
                  <span class="text-emerald-soft">▪</span>{{ bullet }}
                </li>
              </ul>
              <div class="mt-[1.6cqw] space-y-[0.6cqw] border-t border-dashed border-ink/20 pt-[1.4cqw]">
                <p class="text-[2.1cqw] leading-snug text-ink-soft">
                  <span class="font-mono font-semibold tracking-[0.14em] text-emerald-soft uppercase">{{ t('journey.pkl.learned') }}</span>
                  {{ week.learned }}
                </p>
                <p class="text-[2.1cqw] leading-snug text-ink-soft">
                  <span class="font-mono font-semibold tracking-[0.14em] text-ink-faint uppercase">{{ t('journey.pkl.challenge') }}</span>
                  {{ week.challenge }}
                </p>
                <p class="text-[2.1cqw] leading-snug text-ink-soft">
                  <span class="font-mono font-semibold tracking-[0.14em] uppercase" style="color: #b8862b">{{ t('journey.pkl.win') }}</span>
                  {{ week.win }}
                </p>
              </div>
              <p class="mt-[1.4cqw] -rotate-1 font-hand text-[3.4cqw] leading-none text-emerald-soft">
                {{ week.note }}
              </p>
            </ThePaper>
          </div>

          <span
            class="journal-sticker absolute -top-[1.4cqw] right-[4%] text-[1.9cqw]"
            :style="{ '--sticker-color': i % 2 === 0 ? '#075e4f' : '#b8862b', '--scrap-tilt': i % 2 === 0 ? '-5deg' : '5deg' }"
          >
            {{ week.sticker }}
          </span>
        </div>
      </div>

      <div class="mt-[3cqw] flex shrink-0 items-center justify-between">
        <p class="font-mono text-[1.9cqw] tracking-[0.24em] text-ink-faint uppercase">
          {{ cover.company }} · {{ cover.period }}
        </p>
        <p class="font-mono text-[1.9cqw] tracking-[0.24em] text-ink-faint uppercase">
          {{ pageNumber }} / {{ totalPages }}
        </p>
      </div>
    </div>

    <!-- OUTRO -->
    <div v-else-if="kind === 'outro'" class="journal-collage flex flex-col p-[7cqw]">
      <div class="relative z-10 shrink-0">
        <p class="font-mono text-[2.3cqw] tracking-[0.3em] text-ink-faint uppercase">{{ outro.eyebrow }}</p>
        <h3 class="mt-[2.2cqw] text-[9cqw] leading-[0.98] font-extrabold tracking-tight text-emerald-deep">
          {{ outro.title }}
        </h3>
        <p class="mt-[2.6cqw] w-[92%] text-[3.2cqw] leading-relaxed text-ink-soft">{{ outro.text }}</p>
      </div>

      <div class="relative mt-[5cqw] min-h-0 flex-1">
        <div class="absolute top-[2%] left-0 w-[64%]">
          <ThePaper color="white" rotation="1.5deg" class="journal-ticket px-[5cqw] py-[4cqw] pl-[7cqw]">
            <p class="font-mono text-[2cqw] tracking-[0.24em] text-ink-faint uppercase">
              {{ outro.caption }}
            </p>
            <ul class="mt-[2.4cqw] space-y-[1.6cqw]">
              <li
                v-for="item in outro.list"
                :key="item"
                class="flex gap-[1.6cqw] text-[2.7cqw] leading-snug text-ink-soft"
              >
                <span class="text-emerald-soft">✓</span>{{ item }}
              </li>
            </ul>
          </ThePaper>
        </div>

        <div class="absolute top-[8%] right-0 w-[34%]">
          <ThePaper color="pink" rotation="-4deg" class="px-[4cqw] py-[3.6cqw]">
            <span class="tape tape--top-center" style="--tape-tilt: 6deg" />
            <p class="font-hand text-[4.4cqw] leading-tight text-ink/85">{{ outro.note }}</p>
          </ThePaper>
        </div>

        <span
          class="journal-sticker journal-sticker--round absolute left-[2%] bottom-[6%] text-[2.6cqw]"
          style="--sticker-color: #b23a3a; --scrap-tilt: -8deg"
        >
          {{ outro.sticker }}
        </span>
      </div>

      <div class="relative z-10 mt-[4cqw] shrink-0">
        <svg
          class="journal-doodle absolute -top-[6cqw] right-0 w-[12cqw] -rotate-6"
          viewBox="0 0 100 100"
          fill="none"
          aria-hidden="true"
        >
          <path d="M10 78c14-44 44-58 82-46" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-dasharray="8 7" />
          <path d="m82 24 12 8-11 9" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <p class="font-hand text-[4.6cqw] text-emerald-soft">— {{ outro.signature }}</p>
      </div>
    </div>
  </article>
</template>
