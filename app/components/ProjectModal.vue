<script setup lang="ts">
import { vAutoAnimate } from '@formkit/auto-animate/vue'

export interface ProjectDetail {
  key: string
  number: string
  title: string
  year: string
  tags: string[]
  images?: { front: string; left: string; right: string }
  liveUrl: string
  codeUrl: string
}

const { t, tm, rt } = useI18n()

const props = defineProps<{
  project: ProjectDetail | null
}>()

const emit = defineEmits<{
  close: []
}>()

const highlights = computed(() => {
  if (!props.project) return []
  const raw = tm(`projects.items.${props.project.key}.highlights`)
  if (!Array.isArray(raw)) return []
  return raw.map(highlight => rt(highlight))
})

const panel = ref<HTMLElement | null>(null)
const closeButton = ref<HTMLButtonElement | null>(null)

function onKeyDown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    e.preventDefault()
    emit('close')
    return
  }
  if (e.key === 'Tab' && panel.value) {
    const focusables = panel.value.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])',
    )
    if (focusables.length === 0) return
    const first = focusables[0]!
    const last = focusables[focusables.length - 1]!
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }
}

watch(
  () => props.project,
  (project) => {
    if (project) {
      document.addEventListener('keydown', onKeyDown)
      document.documentElement.style.overflow = 'hidden'
      nextTick(() => closeButton.value?.focus())
    } else {
      document.removeEventListener('keydown', onKeyDown)
      document.documentElement.style.overflow = ''
    }
  },
)

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeyDown)
  document.documentElement.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-250 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="project"
        class="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-emerald-deep/80 p-4 backdrop-blur-[3px] sm:p-8"
        role="presentation"
        @click.self="emit('close')"
      >
        <Transition
          appear
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 translate-y-6"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 translate-y-6"
        >
          <div
            ref="panel"
            role="dialog"
            aria-modal="true"
            :aria-label="t('projects.detailsAria', { title: project.title })"
            class="relative my-auto w-full max-w-2xl"
          >
            <ThePaper
              color="cream"
              rotation="-0.6deg"
              tape="top-center"
              tape-tilt="2deg"
              class="px-6 py-8 sm:px-10 sm:py-10"
            >
              <button
                ref="closeButton"
                type="button"
                class="absolute top-4 right-4 rounded-full p-2 text-ink/60 transition-colors hover:bg-ink/10 hover:text-ink"
                :aria-label="t('projects.closeAria')"
                @click="emit('close')"
              >
                <Icon name="ph:x-bold" class="block size-3.5" aria-hidden="true" />
              </button>

              <div class="flex items-center justify-between pr-10">
                <p class="font-mono text-[10px] font-semibold tracking-[0.3em] text-ink-faint uppercase">
                  {{ t('projects.projectMeta', { number: project.number, year: project.year }) }}
                </p>
              </div>

              <h3 class="mt-3 font-serif text-4xl italic text-ink sm:text-5xl">
                {{ project.title }}
              </h3>
              <p class="mt-1 font-hand text-2xl text-emerald-deep/75">
                {{ t(`projects.items.${project.key}.tagline`) }}
              </p>

              <LazyProjectGallery
                v-if="project.images"
                :images="[project.images.front, project.images.left, project.images.right]"
                :label="project.title"
                class="mt-6"
              />

              <div class="mt-6 grid gap-6 sm:grid-cols-5">
                <div class="sm:col-span-3">
                  <h4 class="font-mono text-[10px] font-bold tracking-[0.3em] text-ink-faint uppercase">
                    {{ t('projects.story') }}
                  </h4>
                  <p class="mt-2 text-sm leading-relaxed text-ink-soft">
                    {{ t(`projects.items.${project.key}.description`) }}
                  </p>
                </div>
                <div class="sm:col-span-2">
                  <h4 class="font-mono text-[10px] font-bold tracking-[0.3em] text-ink-faint uppercase">
                    {{ t('projects.highlights') }}
                  </h4>
                  <ul v-auto-animate class="mt-2 space-y-1.5">
                    <li
                      v-for="h in highlights"
                      :key="h"
                      class="flex gap-2 text-sm text-ink-soft"
                    >
                      <span class="text-emerald-base" aria-hidden="true">✳</span>
                      {{ h }}
                    </li>
                  </ul>
                  <h4 class="mt-5 font-mono text-[10px] font-bold tracking-[0.3em] text-ink-faint uppercase">
                    {{ t('projects.role') }}
                  </h4>
                  <p class="mt-1 text-sm font-semibold text-ink">
                    {{ t(`projects.items.${project.key}.role`) }}
                  </p>
                </div>
              </div>

              <div v-auto-animate class="mt-6 flex flex-wrap gap-2">
                <span
                  v-for="tag in project.tags"
                  :key="tag"
                  class="border border-ink/15 bg-white/60 px-2 py-0.5 text-[11px] font-semibold tracking-wider text-ink-soft uppercase"
                >
                  {{ tag }}
                </span>
              </div>

              <div class="mt-8 flex flex-wrap items-center gap-4">
                <a
                  :href="project.liveUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="group inline-flex -rotate-1 items-center gap-2 rounded-sm bg-emerald-base px-5 py-2.5 text-sm font-bold text-cream shadow-paper transition-all duration-300 hover:-translate-y-0.5 hover:rotate-0 hover:shadow-paper-lift"
                >
                  {{ t('projects.visitLive') }}
                  <span class="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
                </a>
                <a
                  :href="project.codeUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-sm font-semibold text-ink underline decoration-ink/30 underline-offset-8 transition-colors hover:text-emerald-deep hover:decoration-emerald-deep"
                >
                  {{ t('projects.viewCode') }}
                </a>
              </div>
            </ThePaper>

            <p
              class="mt-4 text-center font-hand text-lg text-cream/70"
              aria-hidden="true"
            >
              {{ t('projects.pressEsc') }}
            </p>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
@media (prefers-reduced-motion: reduce) {
  * {
    transition: none !important;
  }
}
</style>
