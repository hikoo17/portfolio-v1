<script setup lang="ts">
import type { ProjectDetail } from './ProjectModal.vue'

const projects: (ProjectDetail & { rotation: string; span: string; short: string })[] = [
  {
    number: '01',
    title: 'Kirana',
    description:
      'Inventory and point-of-sale platform for small neighborhood shops — stock, sales, and insights in one place.',
    short:
      'Inventory and point-of-sale platform for small neighborhood shops — stock, sales, and insights in one place.',
    tagline: 'small shops, serious software',
    highlights: [
      'Offline-first stock syncing',
      'Daily sales reports',
      'Receipt printing',
    ],
    tags: ['Laravel', 'Vue', 'Inertia', 'MySQL'],
    role: 'Full-stack Developer',
    year: '2026',
    variant: 'pos' as const,
    rotation: '-1.4deg',
    span: 'lg:col-span-7',
    liveUrl: '#',
    codeUrl: '#',
  },
  {
    number: '02',
    title: 'Tandur',
    description:
      'A plant-care journal PWA with watering reminders and growth photos you actually enjoy keeping.',
    short:
      'A plant-care journal PWA with watering reminders and growth photos you actually enjoy keeping.',
    tagline: 'for plants that deserve better',
    highlights: [
      'Smart watering reminders',
      'Growth photo timeline',
      'Installable PWA',
    ],
    tags: ['Nuxt', 'TypeScript', 'PostgreSQL'],
    role: 'Solo Builder',
    year: '2025',
    variant: 'plant' as const,
    rotation: '1.8deg',
    span: 'lg:col-span-5 lg:mt-16',
    liveUrl: '#',
    codeUrl: '#',
  },
  {
    number: '03',
    title: 'Ketuk',
    description:
      'Realtime quiz arena for classrooms — live leaderboards, instant scoring, and loud celebrations.',
    short:
      'Realtime quiz arena for classrooms — live leaderboards, instant scoring, and loud celebrations.',
    tagline: 'learning, but make it loud',
    highlights: [
      'Realtime WebSocket scoring',
      'Live leaderboard screen',
      'Room codes, zero logins',
    ],
    tags: ['Laravel', 'WebSocket', 'Redis'],
    role: 'Backend & Realtime',
    year: '2025',
    variant: 'quiz' as const,
    rotation: '1.2deg',
    span: 'lg:col-span-5',
    liveUrl: '#',
    codeUrl: '#',
  },
  {
    number: '04',
    title: 'Rupa',
    description:
      'A generative art playground where code paints pictures — patterns, palettes, and happy accidents.',
    short:
      'A generative art playground where code paints pictures — patterns, palettes, and happy accidents.',
    tagline: 'code that paints',
    highlights: [
      'Seeded pattern generator',
      'Palette mixer',
      'One-click PNG export',
    ],
    tags: ['Canvas API', 'TypeScript'],
    role: 'Creative Developer',
    year: '2024',
    variant: 'art' as const,
    rotation: '-1.6deg',
    span: 'lg:col-span-7 lg:mt-16',
    liveUrl: '#',
    codeUrl: '#',
  },
]

const activeProject = ref<ProjectDetail | null>(null)
const lastTrigger = ref<HTMLElement | null>(null)

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
            02 — Digital Works
          </p>
          <h2 class="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Selected <span class="font-serif font-normal italic">Works</span>
          </h2>
        </div>
        <p class="max-w-xs font-hand text-xl leading-tight text-ink-faint">
          four favorites, picked with love<br />& a little bias
        </p>
      </div>

      <div class="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-x-12">
        <article
          v-for="(project, i) in projects"
          :key="project.title"
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
                Project {{ project.number }}
              </p>
              <p class="font-hand text-xl leading-none text-emerald-deep/70">
                {{ project.year }}
              </p>
            </div>

            <ProjectVisual :variant="project.variant" :label="project.title" class="mt-4" />

            <h3 class="mt-5 text-2xl font-bold tracking-tight">
              {{ project.title }}
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-ink-soft">
              {{ project.short }}
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
              :aria-label="`View details of ${project.title}`"
              @click="openProject(project, $event)"
            >
              View Project
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

    <ProjectModal :project="activeProject" @close="activeProject = null" />
  </section>
</template>
