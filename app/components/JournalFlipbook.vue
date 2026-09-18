<script setup lang="ts">
export interface JournalPageDef {
  kind: string
  key?: string
}

const props = withDefaults(
  defineProps<{
    pages: JournalPageDef[]
    label: string
    endpaper?: JournalPageDef
  }>(),
  {
    endpaper: () => ({ kind: 'endpaper' }),
  },
)

const { t } = useI18n()

const current = ref(0)
const dir = ref<'next' | 'prev' | null>(null)
const progress = ref(0)
const dragging = ref(false)
const settle = ref<'commit' | 'cancel' | null>(null)

const pageTotal = computed(() => props.pages.length)

const leftDef = computed<JournalPageDef | null>(() => {
  const i = dir.value === 'prev' ? current.value - 2 : current.value - 1
  return i < 0 ? props.endpaper : (props.pages[i] ?? null)
})

const rightDef = computed<JournalPageDef>(() => {
  const i = dir.value === 'next' ? current.value + 1 : current.value
  return props.pages[i] ?? props.pages[current.value]!
})

const flipDef = computed<JournalPageDef | null>(() => {
  if (!dir.value) {
    return null
  }
  return props.pages[dir.value === 'prev' ? current.value - 1 : current.value] ?? null
})

// Forward: 0deg → -180deg. Backward plays the same turn in reverse, which is
// why the previous page starts already flipped to -180deg.
const flipAngle = computed(() =>
  dir.value === 'prev' ? -180 * (1 - progress.value) : -180 * progress.value,
)

const flipShade = computed(() => 0.26 * Math.sin(progress.value * Math.PI))
const castShade = computed(() => 0.3 * Math.sin(progress.value * Math.PI))

function pageNumberOf(def: JournalPageDef | null) {
  if (!def) {
    return 0
  }
  const i = props.pages.indexOf(def)
  return i < 0 ? 0 : i + 1
}

function canGo(direction: 'next' | 'prev') {
  return direction === 'next' ? current.value < pageTotal.value - 1 : current.value > 0
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
  <div class="relative">
    <div
      ref="deskRef"
      class="journal-desk touch-pan-y cursor-grab select-none active:cursor-grabbing"
      role="group"
      :aria-label="label"
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
          <slot
            v-if="leftDef"
            name="page"
            :page="leftDef"
            :side="'left'"
            :number="pageNumberOf(leftDef)"
            :total="pageTotal"
          />
          <span
            v-if="current > 0 && dir !== 'prev'"
            class="journal-fold journal-fold--left"
            aria-hidden="true"
          />
        </div>

        <div class="journal-half journal-half--right">
          <slot
            name="page"
            :page="rightDef"
            :side="'right'"
            :number="pageNumberOf(rightDef)"
            :total="pageTotal"
          />
          <span class="journal-cast" :style="{ '--cast-shade': castShade }" aria-hidden="true" />
          <span
            v-if="current < pageTotal - 1 && dir !== 'next'"
            class="journal-fold"
            aria-hidden="true"
          />
        </div>

        <span class="journal-stack-edge journal-stack-edge--outer" aria-hidden="true" />

        <div class="journal-spine" aria-hidden="true">
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
            <slot
              name="page"
              :page="flipDef"
              :side="'right'"
              :number="pageNumberOf(flipDef)"
              :total="pageTotal"
            />
          </div>
          <!-- The reverse of the leaf carries the same page. It is rotated
               back into reading position by the face itself (rotateY(180deg)),
               so the sheet stays legible across the whole turn instead of
               flashing blank paper. -->
          <div class="journal-flip__face journal-flip__back">
            <slot
              name="page"
              :page="flipDef"
              :side="'right'"
              :number="pageNumberOf(flipDef)"
              :total="pageTotal"
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
</template>
