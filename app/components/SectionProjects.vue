<script setup lang="ts">
import type { ProjectDetail } from './ProjectModal.vue'

const { t } = useI18n()

interface ProjectCard extends ProjectDetail {
  rotation: string
  span: string
}

const projects: ProjectCard[] = [
  {
    key: 'nihon',
    number: '01',
    title: 'NihonAccess',
    year: '2026',
    rotation: '-1.4deg',
    span: 'lg:col-span-7',
    tags: ['JavaScript', 'CSS3', 'PHP'],
    images: {
      front: '/images/nihon-accessmedia-id-front.png',
      left: '/images/nihon-accessmedia-id-left.png',
      right: '/images/nihon-accessmedia-id-right.png',
    },
    liveUrl: 'https://nihon.accessmedia.id',
    codeUrl: 'https://github.com/hikoo17',
  },
  {
    key: 'karoto',
    number: '02',
    title: 'Karoto',
    year: '2026',
    rotation: '1.8deg',
    span: 'lg:col-span-5 lg:mt-16',
    tags: ['JavaScript', 'CSS3', 'PHP'],
    images: {
      front: '/images/karoto-accessmedia-id-front.png',
      left: '/images/karoto-accessmedia-id-left.png',
      right: '/images/karoto-accessmedia-id-right.png',
    },
    liveUrl: 'https://karoto.accessmedia.id',
    codeUrl: 'https://github.com/hikoo17',
  },
  {
    key: 'pointku',
    number: '03',
    title: 'Pointku',
    year: '2026',
    rotation: '1.2deg',
    span: 'lg:col-span-5',
    tags: ['Vue.js', 'TypeScript', 'Tailwind CSS'],
    images: {
      front: '/images/pointku-kezadev-my-id-front.png',
      left: '/images/pointku-kezadev-my-id-left.png',
      right: '/images/pointku-kezadev-my-id-right.png',
    },
    liveUrl: 'https://pointku.kezadev.my.id',
    codeUrl: 'https://github.com/hikoo17',
  },
  {
    key: 'sipiket',
    number: '04',
    title: 'SI-Piket',
    year: '2026',
    rotation: '-1.6deg',
    span: 'lg:col-span-7 lg:mt-16',
    tags: ['Laravel', 'MySQL', 'Tailwind CSS'],
    images: {
      front: '/images/si-piket-kezadev-my-id-front.png',
      left: '/images/si-piket-kezadev-my-id-left.png',
      right: '/images/si-piket-kezadev-my-id-right.png',
    },
    liveUrl: 'https://si-piket.kezadev.my.id',
    codeUrl: 'https://github.com/hikoo17',
  },
]

const activeProject = ref<ProjectDetail | null>(null)
const lastTrigger = ref<HTMLElement | null>(null)

// The project modal is client-only, so its screenshots are never part of the
// initial render. Rendering them here (hidden + lazy) lets the static image
// provider emit every optimized variant at build time, while costing the
// browser no layout, paint or network work.
const modalImages = projects.flatMap((project) => [
  project.images.front,
  project.images.left,
  project.images.right,
])

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
    class="grid-paper grid-paper--fine grid-paper--light scroll-mt-24 bg-cream-warm py-24 text-ink sm:py-32"
  >
    <div class="mx-auto max-w-6xl px-6 lg:px-8">
      <div class="reveal flex flex-wrap items-end justify-between gap-6">
        <div>
          <p class="font-mono text-[11px] font-semibold tracking-[0.3em] text-ink-faint uppercase">
            {{ t('projects.eyebrow') }}
          </p>
          <h2 class="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
            {{ t('projects.titleA') }} <span class="font-serif font-normal italic">{{ t('projects.titleB') }}</span>
          </h2>
        </div>
        <p class="max-w-xs font-hand text-xl leading-tight text-ink-faint">
          {{ t('projects.note1') }}<br />{{ t('projects.note2') }}
        </p>
      </div>

      <div class="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-x-12">
        <article
          v-for="(project, i) in projects"
          :key="project.key"
          class="reveal group"
          :class="project.span"
          :style="{ '--reveal-delay': `${(i % 2) * 120}ms` }"
        >
          <ThePaper
            :rotation="project.rotation"
            hover
            :tape="i % 2 === 0 ? 'top-left' : false"
            :tape-color="i === 0 ? 'rgba(216,230,239,0.8)' : undefined"
            class="p-5 sm:p-6"
          >
            <div class="flex items-center justify-between">
              <p
                class="font-mono text-[10px] font-semibold tracking-[0.3em] text-ink-faint uppercase"
              >
                {{ t('projects.projectLabel', { number: project.number }) }}
              </p>
              <p class="font-hand text-xl leading-none text-emerald-deep/70">
                {{ project.year }}
              </p>
            </div>

            <ProjectVisual :label="project.title" :image="project.images.front" class="mt-4" />

            <h3 class="mt-5 text-2xl font-bold tracking-tight">
              {{ project.title }}
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-ink-soft">
              {{ t(`projects.items.${project.key}.short`) }}
            </p>

            <div class="mt-4 flex flex-wrap gap-2">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="border border-ink/15 bg-white/60 px-2 py-0.5 text-[11px] font-semibold tracking-wider text-ink-soft uppercase"
              >
                {{ tag }}
              </span>
            </div>

            <button
              type="button"
              class="mt-5 inline-flex cursor-pointer items-center gap-1.5 text-sm font-bold text-emerald-deep transition-colors hover:text-emerald-soft"
              :aria-label="t('projects.viewProjectAria', { title: project.title })"
              @click="openProject(project, $event)"
            >
              {{ t('projects.viewProject') }}
              <span
                class="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </button>
          </ThePaper>
        </article>
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
        sizes="xs:100vw lg:640px"
        loading="lazy"
        decoding="async"
        alt=""
      />
    </div>

    <LazyProjectModal :project="activeProject" @close="activeProject = null" />
  </section>
</template>
