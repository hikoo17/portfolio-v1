<script setup lang="ts">
import type { ProjectDetail } from './ProjectModal.vue'

const { t } = useI18n()

// The projects pinned to the board. NihonAccess and Karoto carry screenshots;
// STM Smart and Si Catat fall back to the built-in placeholder visual until
// real shots are added (see the hidden preload block below the board).
const projects: ProjectDetail[] = [
  {
    key: 'nihon',
    number: '01',
    title: 'NihonAccess',
    year: '2026',
    tags: ['Vue JS', 'Laravel', 'TailwindCSS', 'MySQL', 'Payment Gateway', 'Email Gateway', 'REST API'],
    images: [
      '/images/nihonaccess-1.jpg',
      '/images/nihonaccess-2.jpg',
      '/images/nihonaccess-3.jpg',
    ],
    liveUrl: 'https://nihon.accessmedia.id',
    codeUrl: 'https://github.com/hikoo17',
  },
  {
    key: 'karoto',
    number: '02',
    title: 'Karoto',
    year: '2026',
    tags: ['Laravel', 'Vue JS', 'Inertia', 'TailwindCSS', 'SQL Server'],
    images: ['/images/karoto-1.jpg'],
    liveUrl: 'https://karoto.accessmedia.id',
    codeUrl: 'https://github.com/hikoo17',
  },
  {
    key: 'stmsmart',
    number: '03',
    title: 'STM Smart',
    year: '2026',
    tags: ['Laravel', 'Vue JS', 'TailwindCSS', 'MySQL', 'REST API'],
    images: [],
    liveUrl: '',
    codeUrl: '',
  },
  {
    key: 'sicatat',
    number: '04',
    title: 'Si Catat',
    year: '2026',
    tags: ['Vue JS', 'TailwindCSS', 'Laravel', 'MySQL', 'REST API'],
    images: [],
    liveUrl: '',
    codeUrl: '',
  },
]

const activeProject = ref<ProjectDetail | null>(null)
const lastTrigger = ref<HTMLElement | null>(null)

// The project modal is client-only, so its screenshots are never part of the
// initial render. Rendering them here (hidden + lazy) lets the static image
// provider emit every optimized variant at build time, while costing the
// browser no layout, paint or network work.
const modalImages = projects.flatMap(project => project.images ?? [])

function openProject(p: ProjectDetail, e: Event) {
  lastTrigger.value = e.currentTarget as HTMLElement
  activeProject.value = p
}

watch(activeProject, (open) => {
  if (!open) nextTick(() => lastTrigger.value?.focus())
})
</script>

<template>
  <section
    id="work"
    class="grid-paper grid-paper--fine grid-paper--light scroll-mt-24 overflow-x-clip bg-cream-warm py-24 text-ink sm:py-32"
  >
    <div class="mx-auto max-w-6xl px-6 lg:px-8">
      <!-- Section heading stays outside the board, clean and editorial. -->
      <div class="reveal relative flex flex-wrap items-end justify-between gap-6">
        <PaperPlane
          variant="arc"
          class="pointer-events-none absolute top-1/2 right-0 -z-10 w-24 -translate-y-1/2 -scale-x-100 -rotate-6 text-ink/10 sm:w-32 lg:w-36"
        />
        <div>
          <p class="font-mono text-[11px] font-semibold tracking-[0.3em] text-ink-faint uppercase">
            {{ t('projects.eyebrow') }}
          </p>
          <h2 class="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
            {{ t('projects.titleA') }} <span class="font-serif font-normal italic">{{ t('projects.titleB') }}</span>
          </h2>
        </div>
      </div>

      <!-- The board itself: a physical object resting on the cream page. -->
      <div class="corkboard-scene reveal mt-14 sm:mt-16" :style="{ '--reveal-delay': '60ms' }">
        <div class="corkboard">
          <div class="corkboard__surface">
            <p class="corkboard__label font-mono">{{ t('projects.boardLabel') }}</p>

            <div class="corkboard__papers">
              <div
                v-for="(project, i) in projects"
                :key="project.key"
                class="pin-slot reveal"
                :style="{ '--reveal-delay': `${120 + i * 90}ms` }"
              >
                <ProjectPin :project="project" @open="openProject" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div hidden aria-hidden="true">
      <NuxtPicture
        v-for="src in modalImages"
        :key="src"
        :src="src"
        width="640"
        height="440"
        fit="inside"
        format="avif,webp"
        legacy-format="webp"
        sizes="xs:332px sm:592px"
        loading="lazy"
        decoding="async"
        alt=""
      />
    </div>

    <LazyProjectModal :project="activeProject" @close="activeProject = null" />
  </section>
</template>
