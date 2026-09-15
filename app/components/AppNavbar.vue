<script setup lang="ts">
const open = ref(false)

const links = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
]
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
    <nav
      class="animate-rise-in relative flex w-full max-w-3xl items-center justify-between gap-4 rounded-full bg-cream/95 py-2.5 pr-2.5 pl-5 shadow-paper backdrop-blur-sm"
      aria-label="Main navigation"
    >
      <a href="#top" class="flex items-baseline gap-1 font-serif text-xl italic text-ink">
        Keyza<span class="font-sans text-sm font-bold not-italic text-emerald-base">.dev</span>
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
        <a
          href="#contact"
          class="hidden rounded-full bg-emerald-base px-4 py-1.5 text-sm font-semibold text-cream shadow-sm transition-colors hover:bg-emerald-deep sm:inline-block"
        >
          Let's Talk
        </a>

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
              Let's Talk →
            </a>
          </li>
        </ul>
      </transition>
    </nav>
  </header>
</template>
