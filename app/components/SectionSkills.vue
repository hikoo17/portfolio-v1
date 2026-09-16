<script setup lang="ts">
const { t } = useI18n()

const groups = [
  {
    titleKey: 'skills.frontend',
    items: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'Nuxt.js', 'Vue.js', 'Tailwind CSS'],
  },
  {
    titleKey: 'skills.backend',
    items: ['PHP', 'Laravel', 'CodeIgniter', 'Node.js', 'REST API'],
  },
  {
    titleKey: 'skills.database',
    items: ['MySQL', 'SQL Server'],
  },
  {
    titleKey: 'skills.learning',
    items: ['Linux', 'Docker', 'CI/CD', 'AWS'],
  },
]

const stickerColors = ['white', 'blue', 'white', 'yellow', 'white', 'green', 'white', 'pink', 'white', 'orange', 'white', 'blue', 'white', 'green'] as const

const tilts = ['-2deg', '1.5deg', '-1deg', '2deg']
</script>

<template>
  <section
    class="grid-paper grid-paper--fine grid-paper--light bg-cream py-24 text-ink sm:py-32"
  >
    <div class="mx-auto max-w-6xl px-6 lg:px-8">
      <div class="reveal flex flex-wrap items-end justify-between gap-6">
        <div>
          <p class="font-mono text-[11px] font-semibold tracking-[0.3em] text-ink-faint uppercase">
            {{ t('skills.eyebrow') }}
          </p>
          <h2 class="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
            {{ t('skills.titleA') }} <span class="font-serif font-normal italic">{{ t('skills.titleB') }}</span>
          </h2>
        </div>
        <p class="font-hand text-xl leading-tight text-ink-faint">
          {{ t('skills.note1') }}<br />{{ t('skills.note2') }}
        </p>
      </div>

      <div class="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="(group, gi) in groups"
          :key="group.titleKey"
          class="reveal"
          :style="{ '--reveal-delay': `${gi * 110}ms` }"
        >
          <h3
            class="ink-underline inline-block font-mono text-[11px] font-bold tracking-[0.3em] text-ink-soft uppercase"
          >
            {{ t(group.titleKey) }}
          </h3>
          <ul class="mt-5 flex flex-wrap gap-3">
            <li v-for="(item, ii) in group.items" :key="item">
              <ThePaper
                :color="stickerColors[(gi * 3 + ii) % stickerColors.length]"
                :rotation="tilts[(gi + ii) % tilts.length]"
                hover
                class="px-3.5 py-1.5 text-sm font-semibold text-ink/85"
              >
                {{ item }}
              </ThePaper>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
