<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <!--
    The MY JOURNEY scrapbook cover, shared by the closed journal on the shelf
    and the cover page inside the flipbook so both read exactly the same.
    Only phrasing content (span/svg/picture) is used, because one instance
    lives inside a <button>. Sizing is in `cqw`, so it stays proportional in
    both containers (the shelf cover and the journal sheet).
  -->
  <span class="absolute inset-0 z-[2] block">
    <span class="scrap-stitch pointer-events-none absolute inset-[4%]" aria-hidden="true" />

    <svg
      class="journal-doodle absolute top-[5%] right-[7%] w-[9cqw]"
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M50 8 58 40 90 50 58 60 50 92 42 60 10 50 42 40Z"
        stroke="currentColor"
        stroke-width="4"
        stroke-linejoin="round"
      />
    </svg>
    <svg
      class="journal-doodle absolute bottom-[6%] left-[4%] w-[7cqw] rotate-12"
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
    >
      <path d="M50 12v28M50 60v28M12 50h28M60 50h28" stroke="currentColor" stroke-width="7" stroke-linecap="round" />
    </svg>

    <span class="scrap-shadow absolute top-[11%] left-[7%] block w-[86%] -rotate-[2deg]">
      <span class="tape tape--top-left" style="--tape-tilt: -10deg; --tape-color: rgba(216, 230, 239, 0.85)" aria-hidden="true" />
      <span class="tape tape--top-right" style="--tape-tilt: 10deg; --tape-color: rgba(249, 233, 168, 0.85)" aria-hidden="true" />
      <span class="scrap scrap--torn scrap-stitch relative block px-[5cqw] pt-[5.5cqw] pb-[5cqw]">
        <span class="block font-mono text-[2.4cqw] font-semibold tracking-[0.34em] text-ink-faint uppercase">
          {{ t('journey.cover.label') }}
        </span>
        <span class="mt-[2.4cqw] block font-hand text-[15cqw] leading-[0.9] font-bold text-emerald-deep">
          {{ t('journey.cover.title') }}
        </span>
        <span class="mt-[1.8cqw] block font-hand text-[4.8cqw] leading-tight text-ink-soft">
          {{ t('journey.cover.subtitle') }}
        </span>
        <span class="mt-[3cqw] block h-[0.7cqw] w-[32cqw] -rotate-1 bg-note-yellow" aria-hidden="true" />
      </span>
    </span>

    <span class="absolute top-[55%] left-[7%] block w-[44%]">
      <span class="relative block -rotate-[5deg]">
        <span class="paper journal-polaroid shadow-paper-lift block">
          <span class="tape tape--top-center" style="--tape-tilt: -4deg" aria-hidden="true" />
          <NuxtPicture
            src="/images/keyza.webp"
            alt="Portrait photograph of Keyza"
            class="block aspect-square w-full"
            width="320"
            height="320"
            fit="cover"
            format="avif,webp"
            legacy-format="webp"
            sizes="xs:120px sm:170px"
            loading="lazy"
            decoding="async"
            :img-attrs="{ class: 'h-full w-full object-cover', draggable: 'false' }"
          />
          <span class="absolute inset-x-[3.4cqw] bottom-[2.4cqw] block font-hand text-[4cqw] text-ink/80">
            {{ t('journey.cover.started') }}
          </span>
        </span>
        <span class="photo-corner photo-corner--tl" aria-hidden="true" />
        <span class="photo-corner photo-corner--tr" aria-hidden="true" />
        <span class="photo-corner photo-corner--bl" aria-hidden="true" />
        <span class="photo-corner photo-corner--br" aria-hidden="true" />
      </span>
    </span>

    <span
      class="journal-stamp absolute top-[52%] right-[7%] text-[2.7cqw]"
      style="--stamp-color: #b8862b; --scrap-tilt: 9deg"
    >
      {{ t('journey.cover.started') }}
    </span>

    <span
      class="journal-sticker journal-sticker--round absolute top-[47%] left-[8%] text-[2.4cqw]"
      style="--sticker-color: #3f6b8a; --scrap-tilt: -7deg"
    >
      {{ t('journey.cover.scrapbook') }}
    </span>

    <span class="scrap-shadow absolute right-[5%] bottom-[7%] block w-[50%] rotate-[4deg]">
      <span class="scrap scrap--torn scrap-stitch relative block px-[4.6cqw] py-[4cqw]" style="--scrap-color: var(--color-note-yellow)">
        <span class="block font-hand text-[5cqw] leading-tight text-ink/85">
          {{ t('journey.cover.note') }}
        </span>
      </span>
    </span>
  </span>
</template>
