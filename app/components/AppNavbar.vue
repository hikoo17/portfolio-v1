<script setup lang="ts">
const open = ref(false)

const { t, locale, setLocale } = useI18n()
const localeCookie = useCookie('locale', { maxAge: 31536000 })

async function switchLocale(code: string) {
  await setLocale(code)
  localeCookie.value = code
}

const localeOptions = [
  { code: 'en', label: 'EN' },
  { code: 'id', label: 'ID' },
]

const links = computed(() => [
  { id: 'top', label: t('nav.home'), href: '#top' },
  { id: 'work', label: t('nav.work'), href: '#work' },
  { id: 'about', label: t('nav.about'), href: '#about' },
  { id: 'journey', label: t('nav.journey'), href: '#journey' },
  { id: 'blog', label: t('nav.blog'), href: '#blog' },
  { id: 'contact', label: t('nav.contact'), href: '#contact' },
])

// The "top" wrapper spans the whole page, so it is never observed: Home counts
// as active whenever no section sits in the reading band.
const activeSection = useActiveSection(['work', 'about', 'journey', 'blog', 'contact'])

const isActive = (id: string) =>
  id === 'top' ? activeSection.value === '' : activeSection.value === id
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
    <nav
      class="animate-rise-in relative grid w-full max-w-3xl grid-cols-[1fr_auto_1fr] items-center gap-4 rounded-full bg-cream/95 py-2.5 pr-2.5 pl-5 shadow-paper backdrop-blur-sm"
      aria-label="Main navigation"
    >
      <a
        href="#top"
        class="col-start-1 flex items-center gap-0.5 justify-self-start leading-none"
        aria-label="Keyzar"
      >
        <svg
          class="block size-6 shrink-0"
          viewBox="0 0 64 64"
          aria-hidden="true"
        >
          <rect width="64" height="64" rx="14" fill="#06453a" />
          <g
            transform="rotate(-4 32 32)"
            stroke="#f9e9a8"
            stroke-width="5.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            fill="none"
          >
            <path d="M24.5 16.5v31" />
            <path d="M24.5 33.5 42.5 16.5" />
            <path d="M24.5 33.5 43.5 47.5" />
          </g>
        </svg>
        <span class="font-hand text-2xl leading-none text-ink" aria-hidden="true">
          eyzar
        </span>
      </a>

      <ul class="col-start-2 hidden items-center gap-6 justify-self-center md:flex">
        <li v-for="link in links" :key="link.id">
          <a
            :href="link.href"
            class="flex items-center gap-1.5 text-sm leading-none font-medium transition-colors duration-300 ease-out"
            :class="isActive(link.id)
              ? 'font-semibold text-emerald-deep'
              : 'text-ink-soft hover:text-emerald-deep'"
            :aria-current="isActive(link.id) ? 'true' : undefined"
          >
            <span
              class="size-1.5 rotate-45 bg-emerald-base transition-all duration-300"
              :class="isActive(link.id) ? 'scale-100 opacity-100' : 'scale-0 opacity-0'"
              aria-hidden="true"
            />
            {{ link.label }}
          </a>
        </li>
      </ul>

      <div class="col-start-3 flex items-center gap-2 justify-self-end">
        <div
          class="flex items-center rounded-full border border-ink/15 p-0.5"
          role="group"
          :aria-label="t('nav.language')"
        >
          <button
            v-for="l in localeOptions"
            :key="l.code"
            type="button"
            class="cursor-pointer rounded-full px-2 py-0.5 text-[11px] font-bold tracking-wide transition-colors"
            :class="locale === l.code ? 'bg-emerald-base text-cream' : 'text-ink-soft hover:text-emerald-deep'"
            :aria-pressed="locale === l.code"
            @click="switchLocale(l.code)"
          >
            {{ l.label }}
          </button>
        </div>

        <button
          type="button"
          class="rounded-full p-2 text-ink transition-colors hover:bg-ink/5 md:hidden"
          :aria-expanded="open"
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
          @click="open = !open"
        >
          <Icon
            :name="open ? 'ph:x' : 'ph:list'"
            class="block size-[18px]"
            aria-hidden="true"
          />
        </button>
      </div>

      <div
        v-auto-animate
        class="absolute top-full right-0 mt-3 w-44 md:hidden"
      >
        <ul
          v-if="open"
          id="mobile-menu"
          class="rotate-1 rounded-md bg-cream p-2 shadow-paper-lift"
        >
          <li v-for="link in links" :key="link.id">
            <a
              :href="link.href"
              class="block rounded-sm px-3 py-2 text-sm font-medium transition-colors duration-300 ease-out"
              :class="isActive(link.id)
                ? 'bg-emerald-base/10 font-semibold text-emerald-deep'
                : 'text-ink hover:bg-emerald-base/10'"
              :aria-current="isActive(link.id) ? 'true' : undefined"
              @click="open = false"
            >
              {{ link.label }}
            </a>
          </li>
          <li class="mt-1 border-t border-ink/10 pt-1">
            <a
              href="#contact"
              class="block rounded-sm px-3 py-2 text-sm font-semibold text-emerald-deep"
              @click="open = false"
            >
              {{ t('nav.letsTalk') }} →
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>
