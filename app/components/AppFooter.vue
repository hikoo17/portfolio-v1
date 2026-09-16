<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <footer class="border-t border-cream/10 bg-emerald-deep py-10 text-cream">
    <div
      class="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 text-center lg:px-8"
    >
      <p class="text-sm text-cream/70">
        {{ t('footer.credit', { name: 'Keyza' }) }}
      </p>
      <p class="font-hand text-xl text-note-yellow/90">{{ t('footer.thanks') }}</p>
      <p
        class="mt-2 font-mono text-[10px] tracking-[0.3em] text-cream/25 uppercase"
        aria-hidden="true"
      >
        {{ t('footer.endOfPage') }}
      </p>
    </div>
  </footer>
</template>
