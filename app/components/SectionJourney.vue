<script setup lang="ts">
type PageKind = 'cover' | 'endpaper' | 'milestone' | 'continued'

interface PageDef {
  kind: PageKind
  key?: string
}

const { t } = useI18n()

const milestoneKeys = ['first', 'serious', 'lks2025', 'iot', 'lks2026', 'province', 'pklStart', 'pklGrow'] as const

type MonthKey = 'june' | 'july' | 'august' | 'september'

const logbookMonths: { key: MonthKey; color: 'blue' | 'green' | 'yellow' | 'pink'; rotation: string }[] = [
  { key: 'june', color: 'blue', rotation: '-1.5deg' },
  { key: 'july', color: 'green', rotation: '1.5deg' },
  { key: 'august', color: 'yellow', rotation: '-1deg' },
  { key: 'september', color: 'pink', rotation: '1.5deg' },
]

// Each week is stored as "range|item;item" so the logbook can stay a plain
// i18n string array while still rendering a labelled bullet list.
function weeksOf(month: MonthKey) {
  const value = t(`journey.logbook.months.${month}.weeks`)
  const entries = Array.isArray(value) ? (value as unknown as string[]) : []
  return entries.map((entry) => {
    const [range = '', rawItems = ''] = entry.split('|')
    return {
      range,
      items: rawItems.split(';').map(item => item.trim()).filter(Boolean),
    }
  })
}

// Flat list of faces. The right page shows `pages[current]`, the left page the
// one before it, and the leaf turning between them is what makes it a journal.
const pages: PageDef[] = [
  { kind: 'cover' },
  ...milestoneKeys.map(key => ({ kind: 'milestone' as const, key })),
  { kind: 'continued' },
]

const endpaper: PageDef = { kind: 'endpaper' }

const current = ref(0)
const dir = ref<'next' | 'prev' | null>(null)
const progress = ref(0)
const dragging = ref(false)
const settle = ref<'commit' | 'cancel' | null>(null)

const pageTotal = pages.length

const leftDef = computed<PageDef | null>(() => {
  const i = dir.value === 'prev' ? current.value - 2 : current.value - 1
  return i < 0 ? endpaper : (pages[i] ?? null)
})

const rightDef = computed<PageDef>(() => {
  const i = dir.value === 'next' ? current.value + 1 : current.value
  return pages[i] ?? pages[current.value]!
})

const flipDef = computed<PageDef | null>(() => {
  if (!dir.value) {
    return null
  }
  return pages[dir.value === 'prev' ? current.value - 1 : current.value] ?? null
})

// Forward: 0deg → -180deg. Backward plays the same turn in reverse, which is
// why the previous page starts already flipped to -180deg.
const flipAngle = computed(() =>
  dir.value === 'prev' ? -180 * (1 - progress.value) : -180 * progress.value,
)

const flipShade = computed(() => 0.26 * Math.sin(progress.value * Math.PI))
const castShade = computed(() => 0.3 * Math.sin(progress.value * Math.PI))

function pageNumberOf(def: PageDef | null) {
  if (!def) {
    return 0
  }
  const i = pages.indexOf(def)
  return i < 0 ? 0 : i + 1
}

function canGo(direction: 'next' | 'prev') {
  return direction === 'next' ? current.value < pageTotal - 1 : current.value > 0
}

function prefersReducedMotion() {
  return typeof window !== 'undefined'
    && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}

let settleTimer: ReturnType<typeof setTimeout> | undefined

function clearSettleTimer() {
  if (settleTimer) {
    clearTimeout(settleTimer)
    settleTimer = undefined
  }
}

function commit() {
  const direction = dir.value
  if (!direction) {
    return
  }
  current.value = direction === 'next' ? current.value + 1 : current.value - 1
  dir.value = null
  progress.value = 0
  settle.value = null
  clearSettleTimer()
}

function finishSettle() {
  clearSettleTimer()
  if (settle.value === 'commit') {
    commit()
    return
  }
  if (settle.value === 'cancel') {
    dir.value = null
    progress.value = 0
    settle.value = null
  }
}

function onFlipEnd(event: TransitionEvent) {
  if (event.target !== event.currentTarget || event.propertyName !== 'transform' || !settle.value) {
    return
  }
  finishSettle()
}

function turn(direction: 'next' | 'prev') {
  if (dir.value || !canGo(direction)) {
    return
  }

  dir.value = direction
  progress.value = 0
  settle.value = 'commit'

  if (prefersReducedMotion()) {
    progress.value = 1
    finishSettle()
    return
  }

  nextTick(() => {
    requestAnimationFrame(() => {
      progress.value = 1
    })
  })
  clearSettleTimer()
  // Safety net in case `transitionend` never arrives (hidden tab, etc.).
  settleTimer = setTimeout(finishSettle, 950)
}

function goTo(index: number) {
  if (dir.value || index === current.value) {
    return
  }
  dir.value = null
  progress.value = 0
  settle.value = null
  current.value = index
}

function settleTo(target: 0 | 1, action: 'commit' | 'cancel') {
  settle.value = action
  dragging.value = false
  progress.value = target

  if (prefersReducedMotion()) {
    finishSettle()
    return
  }

  clearSettleTimer()
  settleTimer = setTimeout(finishSettle, 950)
}

/* ---------- Corner dragging ---------- */

const deskRef = ref<HTMLElement | null>(null)
let pointerId = -1
let startX = 0
let startY = 0
let decided = false

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

function onPointerDown(event: PointerEvent) {
  if (dir.value || pointerId !== -1) {
    return
  }
  if (event.pointerType === 'mouse' && event.button !== 0) {
    return
  }
  if ((event.target as HTMLElement | null)?.closest('button, a')) {
    return
  }

  pointerId = event.pointerId
  startX = event.clientX
  startY = event.clientY
  decided = false
  deskRef.value?.setPointerCapture?.(pointerId)
}

function onPointerMove(event: PointerEvent) {
  if (event.pointerId !== pointerId || dir.value) {
    return
  }

  const dx = event.clientX - startX
  const dy = event.clientY - startY

  if (!decided) {
    if (Math.abs(dx) < 8) {
      return
    }
    // Let vertical scrolling win when the gesture is not clearly horizontal.
    if (Math.abs(dx) < Math.abs(dy) * 1.2) {
      return
    }
    const intended: 'next' | 'prev' = dx < 0 ? 'next' : 'prev'
    if (!canGo(intended)) {
      releasePointer()
      return
    }
    decided = true
    dir.value = intended
    dragging.value = true
    progress.value = 0
  }

  const width = deskRef.value?.getBoundingClientRect().width ?? 0
  progress.value = clamp(Math.abs(dx) / (width * 0.55 || 1), 0, 1)
}

function onPointerUp(event: PointerEvent) {
  if (event.pointerId !== pointerId) {
    return
  }
  releasePointer()
  if (!dragging.value) {
    return
  }
  settleTo(progress.value >= 0.42 ? 1 : 0, progress.value >= 0.42 ? 'commit' : 'cancel')
}

function onPointerCancel(event: PointerEvent) {
  if (event.pointerId !== pointerId) {
    return
  }
  releasePointer()
  if (dragging.value) {
    settleTo(0, 'cancel')
  }
}

function releasePointer() {
  if (pointerId !== -1) {
    deskRef.value?.releasePointerCapture?.(pointerId)
    pointerId = -1
  }
  decided = false
}

onBeforeUnmount(clearSettleTimer)
</script>

<template>
  <section
    id="journey"
    class="grid-paper grid-paper--fine scroll-mt-24 overflow-hidden bg-emerald-deep py-24 text-cream sm:py-32"
  >
    <PaperPlane
      variant="curl"
      class="pointer-events-none absolute top-12 left-2 -z-10 w-20 rotate-6 text-cream/15 sm:left-4 sm:w-28 lg:left-8 lg:w-32"
    />
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_58%_46%_at_50%_42%,rgba(122,201,175,0.14),transparent_72%)]"
      aria-hidden="true"
    />

    <div class="relative mx-auto max-w-6xl px-6 lg:px-8">
      <div class="reveal flex flex-wrap items-end justify-between gap-6">
        <div>
          <p class="font-mono text-[11px] font-semibold tracking-[0.3em] text-cream/40 uppercase">
            {{ t('journey.eyebrow') }}
          </p>
          <h2 class="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
            {{ t('journey.titleA') }} <span class="font-serif font-normal italic text-note-yellow">{{ t('journey.titleB') }}</span>
          </h2>
        </div>
        <p class="font-hand text-xl leading-tight text-cream/45">
          {{ t('journey.handNote') }}
        </p>
      </div>

      <div class="reveal relative mx-auto mt-14 max-w-[21rem] sm:max-w-3xl" :style="{ '--reveal-delay': '120ms' }">
        <div
          ref="deskRef"
          class="journal-desk touch-pan-y cursor-grab select-none active:cursor-grabbing"
          role="group"
          :aria-label="t('journey.eyebrow')"
          tabindex="0"
          @pointerdown="onPointerDown"
          @pointermove="onPointerMove"
          @pointerup="onPointerUp"
          @pointercancel="onPointerCancel"
          @keydown.left.prevent="turn('prev')"
          @keydown.right.prevent="turn('next')"
        >
          <div class="journal-book">
            <span class="journal-stack-edge journal-stack-edge--spine" aria-hidden="true" />

            <div class="journal-half journal-half--left" aria-hidden="true">
              <JourneyPage
                v-if="leftDef"
                :kind="leftDef.kind"
                :milestone-key="leftDef.key"
                :number="pageNumberOf(leftDef)"
                :total="pageTotal"
                side="left"
              />
              <span
                v-if="current > 0 && dir !== 'prev'"
                class="journal-fold journal-fold--left"
                aria-hidden="true"
              />
            </div>

            <div class="journal-half journal-half--right">
              <JourneyPage
                :kind="rightDef.kind"
                :milestone-key="rightDef.key"
                :number="pageNumberOf(rightDef)"
                :total="pageTotal"
                side="right"
              />
              <span class="journal-cast" :style="{ '--cast-shade': castShade }" aria-hidden="true" />
              <span
                v-if="current < pageTotal - 1 && dir !== 'next'"
                class="journal-fold"
                aria-hidden="true"
              />
            </div>

            <span class="journal-stack-edge journal-stack-edge--outer" aria-hidden="true" />

            <div
              class="journal-spine"
              aria-hidden="true"
            >
              <span v-for="coil in 14" :key="coil" class="journal-coil" />
            </div>

            <div
              v-if="flipDef"
              class="journal-flip"
              :class="{ 'is-dragging': dragging }"
              :style="{ '--flip': `${flipAngle}deg`, '--flip-shade': flipShade }"
              aria-hidden="true"
              @transitionend="onFlipEnd"
            >
              <div class="journal-flip__face journal-flip__front">
                <JourneyPage
                  :kind="flipDef.kind"
                  :milestone-key="flipDef.key"
                  :number="pageNumberOf(flipDef)"
                  :total="pageTotal"
                  side="right"
                />
              </div>
              <!-- The reverse of the leaf carries the same page. It is rotated
                   back into reading position by the face itself (rotateY(180deg)),
                   so the sheet stays legible across the whole turn instead of
                   flashing blank paper. -->
              <div class="journal-flip__face journal-flip__back">
                <JourneyPage
                  :kind="flipDef.kind"
                  :milestone-key="flipDef.key"
                  :number="pageNumberOf(flipDef)"
                  :total="pageTotal"
                  side="right"
                />
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          class="absolute top-1/2 -left-3 z-50 inline-flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-cream text-emerald-deep shadow-paper-lift transition-all duration-300 hover:-translate-y-1/2 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:scale-100 sm:-left-16 sm:size-12"
          :disabled="current === 0"
          :aria-label="t('journey.controls.prev')"
          @click="turn('prev')"
        >
          <Icon name="ph:caret-left" class="size-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          class="absolute top-1/2 -right-3 z-50 inline-flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-cream text-emerald-deep shadow-paper-lift transition-all duration-300 hover:-translate-y-1/2 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:scale-100 sm:-right-16 sm:size-12"
          :disabled="current === pageTotal - 1"
          :aria-label="t('journey.controls.next')"
          @click="turn('next')"
        >
          <Icon name="ph:caret-right" class="size-5" aria-hidden="true" />
        </button>

        <div class="mt-9 flex flex-wrap items-center justify-center gap-2.5">
          <button
            v-for="(_, i) in pages"
            :key="i"
            type="button"
            class="size-2.5 rotate-45 cursor-pointer rounded-[1px] border border-cream/40 transition-all duration-300 hover:bg-note-yellow"
            :class="i === current ? 'scale-125 border-note-yellow bg-note-yellow' : 'bg-transparent'"
            :aria-label="t('journey.controls.pageOf', { current: i + 1, total: pageTotal })"
            :aria-current="i === current ? 'true' : undefined"
            @click="goTo(i)"
          />
        </div>

        <p class="mt-5 text-center font-hand text-lg text-cream/45">
          {{ t('journey.controls.drag') }} <span class="text-cream/25">·</span> {{ t('journey.controls.keyboard') }}
        </p>

        <p class="sr-only" aria-live="polite">
          {{ t('journey.controls.pageOf', { current: current + 1, total: pageTotal }) }}
        </p>
      </div>

      <div class="reveal mt-20" :style="{ '--reveal-delay': '160ms' }">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p class="font-mono text-[11px] font-semibold tracking-[0.3em] text-cream/40 uppercase">
              {{ t('journey.logbook.eyebrow') }}
            </p>
            <h3 class="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              {{ t('journey.logbook.titleA') }}
              <span class="font-serif font-normal italic text-note-yellow">{{ t('journey.logbook.titleB') }}</span>
            </h3>
          </div>
          <p class="font-hand text-xl leading-tight text-cream/45">
            {{ t('journey.logbook.note') }}
          </p>
        </div>

        <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="(month, i) in logbookMonths"
            :key="month.key"
            class="reveal reveal--drop"
            :style="{
              '--reveal-delay': `${120 + i * 90}ms`,
              '--drop-tilt': i % 2 === 0 ? '-2deg' : '2deg',
            }"
          >
            <ThePaper :color="month.color" :rotation="month.rotation" class="h-full px-5 py-5 sm:px-6 sm:py-6">
              <p class="font-mono text-[10px] font-semibold tracking-[0.28em] text-ink/45 uppercase">
                {{ String(i + 1).padStart(2, '0') }} / {{ String(logbookMonths.length).padStart(2, '0') }}
              </p>
              <p class="mt-1 text-lg font-extrabold tracking-tight text-ink">
                {{ t(`journey.logbook.months.${month.key}.name`) }}
              </p>
              <ul class="mt-4 space-y-4">
                <li v-for="week in weeksOf(month.key)" :key="week.range">
                  <p class="font-mono text-[10px] font-semibold tracking-[0.2em] text-emerald-soft uppercase">
                    {{ week.range }}
                  </p>
                  <ul class="mt-1.5 space-y-1">
                    <li
                      v-for="item in week.items"
                      :key="item"
                      class="flex gap-1.5 text-[11px] leading-snug text-ink-soft"
                    >
                      <span class="text-emerald-soft">·</span>{{ item }}
                    </li>
                  </ul>
                </li>
              </ul>
            </ThePaper>
          </div>
        </div>
      </div>

      <div class="sr-only">
        <h3>{{ t('journey.titleA') }} {{ t('journey.titleB') }}</h3>
        <ul>
          <li v-for="key in milestoneKeys" :key="key">
            {{ t(`journey.milestones.${key}.title`) }} — {{ t(`journey.milestones.${key}.text`) }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
