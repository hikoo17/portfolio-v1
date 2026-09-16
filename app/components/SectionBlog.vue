<script setup lang="ts">
const { t } = useI18n()

const articles = [
  {
    key: 'tasikzone',
    title: 'LKS PPLG Kota Tasikmalaya Digelar, Kompetisikan Web Teknologi dan IT Software',
    publisher: 'Tasik Zone',
    date: '26 Apr 2025',
    url: 'https://tasikzone.com/lks-pplg-kota-tasikmalaya-digelar-kompetisikan-web-teknologi-dan-it-software/',
    image: '/images/lks-pplg-2025-tasikzone.jpg',
    color: 'yellow' as const,
    rotation: '-1.2deg',
  },
  {
    key: 'radartasik',
    title: 'LKS PPLG 2025 Kota Tasikmalaya: Cari Bibit Unggul di Bidang Web dan IT Software',
    publisher: 'Radartasik.id',
    date: '27 Apr 2025',
    url: 'https://radartasik.id/2025/04/27/lks-pplg-2025-kota-tasikmalaya-cari-bibit-unggul-di-bidang-web-dan-it-software/',
    image: '/images/lks-pplg-2025-radartasik.webp',
    color: 'blue' as const,
    rotation: '1.4deg',
  },
]
</script>

<template>
  <section
    id="blog"
    class="grid-paper grid-paper--fine grid-paper--light scroll-mt-24 bg-paper-white py-24 text-ink sm:py-32"
  >
    <div class="mx-auto max-w-5xl px-6 lg:px-8">
      <div class="reveal flex flex-wrap items-end justify-between gap-6">
        <div>
          <p class="font-mono text-[11px] font-semibold tracking-[0.3em] text-ink-faint uppercase">
            {{ t('blog.eyebrow') }}
          </p>
          <h2 class="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
            {{ t('blog.titleA') }} <span class="font-serif font-normal italic text-emerald-base">{{ t('blog.titleB') }}</span>
          </h2>
        </div>
        <p class="max-w-xs font-hand text-xl leading-tight text-ink-faint">
          {{ t('blog.note1') }}<br />{{ t('blog.note2') }}
        </p>
      </div>

      <ul class="mt-16 grid gap-8 sm:grid-cols-2">
        <li
          v-for="(article, i) in articles"
          :key="article.key"
          class="reveal"
          :style="{ '--reveal-delay': `${i * 120}ms` }"
        >
          <a
            :href="article.url"
            target="_blank"
            rel="noopener noreferrer"
            class="group block"
          >
            <ThePaper
              :color="article.color"
              :rotation="article.rotation"
              hover
              class="flex h-full flex-col px-6 py-6"
            >
              <div class="flex items-center justify-between gap-3">
                <p class="font-mono text-[10px] font-semibold tracking-[0.28em] text-ink/50 uppercase">
                  {{ article.publisher }}
                </p>
                <p class="shrink-0 font-mono text-[10px] font-semibold tracking-[0.18em] text-ink/40 uppercase">
                  {{ article.date }}
                </p>
              </div>

              <div class="mt-4 overflow-hidden border border-ink/15">
                <NuxtImg
                  :src="article.image"
                  :alt="t(`blog.items.${article.key}.imageAlt`)"
                  width="480"
                  height="270"
                  fit="cover"
                  loading="lazy"
                  decoding="async"
                  class="block aspect-[16/9] w-full object-cover"
                />
              </div>
              <p class="mt-1.5 text-right font-mono text-[9px] tracking-[0.18em] text-ink/40 uppercase">
                {{ t(`blog.items.${article.key}.imageCredit`) }}
              </p>

              <h3 class="mt-3 text-xl leading-snug font-bold tracking-tight text-ink">
                {{ article.title }}
              </h3>

              <p class="mt-3 text-sm leading-relaxed text-ink-soft">
                {{ t(`blog.items.${article.key}.excerpt`) }}
              </p>

              <p
                class="mt-auto flex items-center gap-1.5 pt-6 text-sm font-bold text-emerald-deep transition-colors group-hover:text-emerald-soft"
              >
                {{ t('blog.readMore') }}
                <span
                  class="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </p>

              <span class="sr-only">{{ t('blog.opensInNewTab') }}</span>
            </ThePaper>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>
