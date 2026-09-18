<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <!--
    The PKL JOURNAL scrapbook cover, shared by the closed journal on the shelf
    and the cover page inside the flipbook so both read exactly the same. It is
    built from the same scraps-and-tape kit as MY JOURNEY — torn paper, washi
    tape, stitching, photo corners and doodles — so the two journals look like
    siblings pulled from one scrapbook box. Only phrasing content
    (span/svg/picture) is used, because one instance lives inside a <button>.
    Sizing is in `cqw`, so it stays proportional in both containers.
  -->
  <span class="absolute inset-0 z-[2] block">
    <span class="scrap-stitch pointer-events-none absolute inset-[4%]" aria-hidden="true" />

    <svg
      class="journal-doodle absolute top-[5%] right-[8%] w-[8cqw] rotate-6"
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
    >
      <rect x="18" y="24" width="64" height="52" rx="5" stroke="currentColor" stroke-width="4.5" />
      <path d="M18 40h64M34 24V14M66 24V14" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" />
      <path d="M32 54h20M32 64h32" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" />
    </svg>
    <svg
      class="journal-doodle absolute top-[38%] left-[4%] w-[7cqw] -rotate-12"
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
    >
      <path d="M50 12v28M50 60v28M12 50h28M60 50h28" stroke="currentColor" stroke-width="7" stroke-linecap="round" />
    </svg>

    <span class="scrap-shadow absolute top-[11%] left-[6%] block w-[88%] -rotate-[1.6deg]">
      <span class="tape tape--top-left" style="--tape-tilt: -10deg; --tape-color: rgba(249, 233, 168, 0.85)" aria-hidden="true" />
      <span class="tape tape--top-right" style="--tape-tilt: 10deg; --tape-color: rgba(216, 230, 239, 0.85)" aria-hidden="true" />
      <span class="scrap scrap--torn scrap-stitch relative block px-[5cqw] pt-[5.5cqw] pb-[5cqw]">
        <span class="block font-mono text-[2.4cqw] font-semibold tracking-[0.34em] text-ink-faint uppercase">
          {{ t('journey.pkl.cover.label') }}
        </span>
        <span class="mt-[2.4cqw] block font-hand text-[12.5cqw] leading-[0.9] font-bold text-emerald-deep">
          {{ t('journey.pkl.cover.title') }}
        </span>
        <span class="mt-[1.8cqw] block font-hand text-[4.6cqw] leading-tight text-ink-soft">
          {{ t('journey.pkl.cover.subtitle') }}
        </span>
        <span class="mt-[3cqw] block h-[0.7cqw] w-[32cqw] -rotate-1 bg-note-yellow" aria-hidden="true" />
      </span>
    </span>

    <span class="absolute top-[52%] left-[6%] flex flex-col items-start gap-[1.4cqw]">
      <span class="journal-stamp text-[2.3cqw]" style="--stamp-color: #075e4f; --scrap-tilt: -6deg">
        {{ t('journey.pkl.cover.field') }}
      </span>
      <span class="journal-stamp text-[2.3cqw]" style="--stamp-color: #b8862b; --scrap-tilt: 4deg">
        {{ t('journey.pkl.cover.notes') }}
      </span>
      <span class="journal-stamp text-[2.3cqw]" style="--stamp-color: #b23a3a; --scrap-tilt: -3deg">
        {{ t('journey.pkl.cover.est') }}
      </span>
    </span>

    <span
      class="journal-sticker journal-sticker--round absolute top-[47%] right-[7%] text-[2.3cqw]"
      style="--sticker-color: #3f6b8a; --scrap-tilt: -7deg"
    >
      {{ t('journey.pkl.intro.sticker') }}
    </span>

    <span class="absolute bottom-[8%] right-[5%] block w-[46%]">
      <span class="relative block rotate-[4deg]">
        <span class="paper journal-polaroid shadow-paper-lift block">
          <span class="tape tape--top-center" style="--tape-tilt: -4deg" aria-hidden="true" />
          <NuxtPicture
            src="/images/logo-accessmedia.png"
            :alt="t('journey.pkl.coverAlt')"
            class="block aspect-[4/3] w-full"
            width="480"
            height="360"
            fit="cover"
            format="avif,webp"
            legacy-format="webp"
            sizes="xs:150px sm:220px"
            loading="lazy"
            decoding="async"
            :img-attrs="{ class: 'h-full w-full object-cover', draggable: 'false' }"
          />
          <span class="absolute inset-x-[3.4cqw] bottom-[2.4cqw] block font-hand text-[3.6cqw] text-ink/80">
            {{ t('journey.pkl.cover.company') }}
          </span>
        </span>
        <span class="photo-corner photo-corner--tl" aria-hidden="true" />
        <span class="photo-corner photo-corner--tr" aria-hidden="true" />
        <span class="photo-corner photo-corner--bl" aria-hidden="true" />
        <span class="photo-corner photo-corner--br" aria-hidden="true" />
      </span>
    </span>

    <span class="scrap-shadow absolute bottom-[8%] left-[6%] block w-[44%] rotate-[3deg]">
      <span class="scrap scrap--torn scrap-stitch relative block px-[4.2cqw] py-[3.8cqw]" style="--scrap-color: var(--color-note-yellow)">
        <span class="block font-mono text-[1.9cqw] font-semibold tracking-[0.18em] text-ink/60 uppercase">
          {{ t('journey.pkl.cover.motto') }}
        </span>
        <span class="mt-[1.4cqw] block font-hand text-[4.4cqw] leading-tight text-ink/85">
          {{ t('journey.pkl.cover.note') }}
        </span>
      </span>
    </span>
  </span>
</template>
