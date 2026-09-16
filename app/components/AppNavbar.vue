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
  { label: t('nav.work'), href: '#work' },
  { label: t('nav.about'), href: '#about' },
  { label: t('nav.journey'), href: '#journey' },
  { label: t('nav.blog'), href: '#blog' },
  { label: t('nav.contact'), href: '#contact' },
])
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
    <nav
      class="animate-rise-in relative flex w-full max-w-3xl items-center justify-between gap-4 rounded-full bg-cream/95 py-2.5 pr-2.5 pl-5 shadow-paper backdrop-blur-sm"
      aria-label="Main navigation"
    >
      <a href="#top" class="font-serif text-xl italic text-ink">
        Keyza
      </a>

      <ul class="hidden items-center gap-6 md:flex">
        <li v-for="link in links" :key="link.href">
          <a
            :href="link.href"
            class="text-sm font-medium text-ink-soft transition-colors hover:text-emerald-deep"
          >
            {{ link.label }}
          </a>
        </li>
      </ul>

      <div class="flex items-center gap-2">
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
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path
              v-if="!open"
              d="M2 4.5h14M2 9h14M2 13.5h9"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
            />
            <path
              v-else
              d="M4 4l10 10M14 4L4 14"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
            />
          </svg>
        </button>
      </div>

      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-1"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-1"
      >
        <ul
          v-if="open"
          id="mobile-menu"
          class="absolute top-full right-0 mt-3 w-44 rotate-1 rounded-md bg-cream p-2 shadow-paper-lift md:hidden"
        >
          <li v-for="link in links" :key="link.href">
            <a
              :href="link.href"
              class="block rounded-sm px-3 py-2 text-sm font-medium text-ink transition-colors hover:bg-emerald-base/10"
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
      </transition>
    </nav>
  </header>
</template>
