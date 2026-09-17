<script setup lang="ts">
const { t } = useI18n()

const channels = [
  { label: 'Email', value: 'thespikekeyza@gmail.com', href: 'mailto:thespikekeyza@gmail.com', color: 'white' as const, rotation: '-2deg' },
  { label: 'GitHub', value: '@hikoo17', href: 'https://github.com/hikoo17', color: 'blue' as const, rotation: '1.5deg' },
  { label: 'LinkedIn', value: 'in/keyza-zaki', href: 'https://www.linkedin.com/in/keyza-zaki-18324741b', color: 'green' as const, rotation: '-1.2deg' },
]
</script>

<template>
  <section
    id="contact"
    class="grid-paper grid-paper--fine grid-paper--light scroll-mt-24 bg-cream-warm py-24 text-ink sm:py-32"
  >
    <PaperPlane
      variant="arc"
      class="pointer-events-none absolute top-8 left-2 -z-10 w-24 rotate-6 text-emerald-deep/15 sm:left-4 sm:w-32 lg:left-8 lg:w-36"
    />
    <div class="mx-auto max-w-4xl px-6 text-center lg:px-8">
      <p class="reveal font-mono text-[11px] font-semibold tracking-[0.3em] text-ink-faint uppercase">
        {{ t('contact.eyebrow') }}
      </p>

      <h2
        class="reveal mt-4 text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl"
        :style="{ '--reveal-delay': '80ms' }"
      >
        {{ t('contact.title') }}
      </h2>
      <p
        class="reveal mt-4 font-serif text-2xl italic text-ink-soft sm:text-3xl"
        :style="{ '--reveal-delay': '160ms' }"
      >
        {{ t('contact.subtitle') }}
      </p>

      <div class="reveal mt-10" :style="{ '--reveal-delay': '240ms' }">
        <a
          href="mailto:thespikekeyza@gmail.com"
          class="group inline-flex -rotate-1 items-center gap-2 rounded-sm bg-emerald-base px-8 py-4 text-base font-bold text-cream shadow-paper transition-all duration-300 hover:translate-y-[-3px] hover:rotate-0 hover:shadow-paper-lift"
        >
          {{ t('contact.startConversation') }}
          <span
            class="transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          >
            →
          </span>
        </a>
        <p class="mt-4 font-hand text-xl text-ink-faint" aria-hidden="true">
          {{ t('contact.note') }}
        </p>
      </div>

      <ul
        class="reveal reveal--drop mt-16 flex flex-wrap items-stretch justify-center gap-5 sm:gap-7"
        :style="{ '--reveal-delay': '320ms', '--drop-tilt': '2deg' }"
      >
        <li v-for="channel in channels" :key="channel.label">
          <a :href="channel.href" class="group block" :aria-label="`${channel.label}: ${channel.value}`">
            <ThePaper :color="channel.color" :rotation="channel.rotation" hover class="px-5 py-3 text-left">
              <p class="font-mono text-[10px] font-semibold tracking-[0.25em] text-ink/50 uppercase">
                {{ channel.label }}
              </p>
              <p
                class="mt-0.5 flex items-center gap-1 text-sm font-bold text-ink transition-colors group-hover:text-emerald-deep"
              >
                {{ channel.value }}
                <span
                  class="opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                  aria-hidden="true"
                >
                  →
                </span>
              </p>
            </ThePaper>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>
