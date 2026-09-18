<script setup lang="ts">
import { journeyPhotos } from '~/utils/journeyVisuals'

type PageKind = 'endpaper' | 'milestone' | 'continued'

interface PageDef {
  kind: PageKind
  key?: string
}

type PklPageKind = 'endpaper' | 'intro' | 'week' | 'outro'

interface PklPageDef {
  kind: PklPageKind
  key?: string
}

type BookId = 'journey' | 'pkl'

const { t } = useI18n()

const milestoneKeys = ['first', 'serious', 'lks2025', 'iot', 'lks2026', 'province'] as const

const pklWeekKeys = [
  'w01', 'w02', 'w03', 'w04', 'w05', 'w06', 'w07',
  'w08', 'w09', 'w10', 'w11', 'w12', 'w13',
] as const

// Two weeks per spread: chronological by week, but never one page per week.
const pklChapters = computed(() => {
  const chapters: string[][] = []
  for (let i = 0; i < pklWeekKeys.length; i += 2) {
    chapters.push([...pklWeekKeys.slice(i, i + 2)])
  }
  return chapters
})

const journeyPages: PageDef[] = [
  ...milestoneKeys.map(key => ({ kind: 'milestone' as const, key })),
  { kind: 'continued' },
]

const pklPages = computed<PklPageDef[]>(() => [
  { kind: 'intro' },
  ...pklChapters.value.map((_, i) => ({ kind: 'week' as const, key: String(i) })),
  { kind: 'outro' },
])

/* ---------- Book selection ---------- */

const view = ref<'select' | BookId>('select')
const lastBook = ref<BookId>('journey')

const bookOrder: BookId[] = ['journey', 'pkl']
const activeBook = ref(0)

const activeIndex = computed(() => String(activeBook.value + 1).padStart(2, '0'))
const totalBooks = String(bookOrder.length).padStart(2, '0')

const activeBookId = computed(() => bookOrder[activeBook.value] ?? 'journey')
const activeBookTitle = computed(() =>
  activeBookId.value === 'pkl'
    ? t('journey.books.pkl.title')
    : t('journey.books.myJourney.title'),
)

const backRef = ref<HTMLButtonElement | null>(null)
const journeyBookRef = ref<HTMLButtonElement | null>(null)
const pklBookRef = ref<HTMLButtonElement | null>(null)

function selectBook(index: number) {
  activeBook.value = (index + bookOrder.length) % bookOrder.length
}

function openBook(book: BookId) {
  lastBook.value = book
  activeBook.value = bookOrder.indexOf(book)
  view.value = book
  nextTick(() => backRef.value?.focus())
}

function closeBook() {
  view.value = 'select'
  nextTick(() => {
    const target = lastBook.value === 'pkl' ? pklBookRef.value : journeyBookRef.value
    target?.focus()
  })
}

function pklWeeksFor(key?: string) {
  if (key === undefined) {
    return []
  }
  return pklChapters.value[Number(key)] ?? []
}
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
            {{ t('journey.books.titleA') }} <span class="font-serif font-normal italic text-note-yellow">{{ t('journey.books.titleB') }}</span>
          </h2>
        </div>
        <p class="max-w-xs font-hand text-xl leading-tight text-cream/50">
          {{ t('journey.books.hint') }}
        </p>
      </div>

      <Transition name="stage" mode="out-in">
        <!-- BOOK SELECTION -->
        <div v-if="view === 'select'" key="select" class="stage-panel">
          <div class="journal-shelf mt-10">
            <!-- 01 · MY JOURNEY -->
            <button
              ref="journeyBookRef"
              type="button"
              class="journal-pick"
              :class="{ 'is-active': activeBook === 0 }"
              :aria-label="t('journey.books.open', { title: t('journey.books.myJourney.title') })"
              @click="openBook('journey')"
            >
              <span class="journal-pick__cover journal-pick__cover--journey">
                <span class="journal-pick__spine" aria-hidden="true" />
                <JourneyCoverCollage />
                <img
                  src="/images/scrapbook/pen.svg"
                  alt=""
                  width="529"
                  height="120"
                  class="journal-cover-pen"
                  draggable="false"
                  loading="lazy"
                  decoding="async"
                  aria-hidden="true"
                >
              </span>

              <span class="journal-pick__label">
                <span class="text-note-yellow">{{ t('journey.books.myJourney.index') }}</span>
                <span class="h-px w-6 bg-cream/30" aria-hidden="true" />
                <span>{{ t('journey.books.myJourney.title') }}</span>
              </span>
            </button>

            <!-- 02 · PKL JOURNAL -->
            <button
              ref="pklBookRef"
              type="button"
              class="journal-pick"
              :class="{ 'is-active': activeBook === 1 }"
              :aria-label="t('journey.books.open', { title: t('journey.books.pkl.title') })"
              @click="openBook('pkl')"
            >
              <span class="journal-pick__cover journal-pick__cover--pkl">
                <span class="journal-pick__spine" aria-hidden="true" />
                <PklCoverCollage />
              </span>

              <span class="journal-pick__label">
                <span class="text-note-yellow">{{ t('journey.books.pkl.index') }}</span>
                <span class="h-px w-6 bg-cream/30" aria-hidden="true" />
                <span>{{ t('journey.books.pkl.title') }}</span>
              </span>
            </button>

            <!-- Mobile only: turn between the covers instead of swiping. -->
            <button
              type="button"
              class="journal-pick-nav journal-pick-nav--prev"
              :aria-label="t('journey.books.prev')"
              @click="selectBook(activeBook - 1)"
            >
              <Icon name="ph:caret-left" class="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              class="journal-pick-nav journal-pick-nav--next"
              :aria-label="t('journey.books.next')"
              @click="selectBook(activeBook + 1)"
            >
              <Icon name="ph:caret-right" class="size-5" aria-hidden="true" />
            </button>
          </div>

          <p class="sr-only" aria-live="polite">
            {{ activeIndex }} / {{ totalBooks }} — {{ activeBookTitle }}
          </p>
        </div>

        <!-- 01 · MY JOURNEY BOOK -->
        <div
          v-else-if="view === 'journey'"
          key="journey"
          class="stage-panel relative mx-auto mt-10 max-w-[21rem] sm:max-w-3xl"
        >
          <div class="mb-5 flex flex-wrap items-center gap-3">
            <button ref="backRef" type="button" class="journal-back" @click="closeBook">
              <Icon name="ph:arrow-left" class="size-4" aria-hidden="true" />
              {{ t('journey.books.back') }}
            </button>
          </div>

          <JournalFlipbook :pages="journeyPages" :label="t('journey.books.myJourney.title')">
            <template #page="{ page, side, number, total }">
              <JourneyPage
                :kind="(page.kind as PageKind)"
                :milestone-key="page.key"
                :number="number"
                :total="total"
                :side="side"
              />
            </template>
          </JournalFlipbook>
        </div>

        <!-- 02 · PKL JOURNAL BOOK -->
        <div
          v-else
          key="pkl"
          class="stage-panel relative mx-auto mt-10 max-w-[21rem] sm:max-w-3xl"
        >
          <div class="mb-5 flex flex-wrap items-center gap-3">
            <button type="button" class="journal-back" @click="closeBook">
              <Icon name="ph:arrow-left" class="size-4" aria-hidden="true" />
              {{ t('journey.books.back') }}
            </button>
          </div>

          <JournalFlipbook
            :pages="pklPages"
            :label="t('journey.pkl.cover.title')"
            :endpaper="{ kind: 'endpaper' }"
          >
            <template #page="{ page, side, number, total }">
              <PklJournalPage
                :kind="(page.kind as PklPageKind)"
                :weeks="pklWeeksFor(page.key)"
                :number="number"
                :total="total"
                :side="side"
              />
            </template>
          </JournalFlipbook>
        </div>
      </Transition>

      <!-- The flipbook only mounts its pages in the browser, so the milestone
           photographs never appear in the prerendered HTML. With the static
           `ipxStatic` provider that means their optimized `/_ipx/` variants are
           never generated and 404 once deployed. Render the same photos once
           here, hidden, so Nuxt Image registers every variant the flipbook
           later requests. Hidden images are not fetched, and even if a browser
           did, they share the exact URLs the flipbook uses. -->
      <div hidden aria-hidden="true">
        <JourneyPhoto
          v-for="photo in journeyPhotos"
          :key="photo.src"
          v-bind="photo"
        />
      </div>

      <div class="sr-only">
        <h3>{{ t('journey.books.titleA') }} {{ t('journey.books.titleB') }}</h3>
        <ul>
          <li v-for="key in milestoneKeys" :key="key">
            {{ t(`journey.milestones.${key}.title`) }} — {{ t(`journey.milestones.${key}.text`) }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
