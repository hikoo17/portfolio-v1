<script setup lang="ts">
import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL } from '~/utils/site'

const socials = [
  { label: 'Email', icon: 'ph:envelope-simple', href: `mailto:${CONTACT_EMAIL}`, external: false },
  { label: 'GitHub', icon: 'ph:github-logo', href: GITHUB_URL, external: true },
  { label: 'LinkedIn', icon: 'ph:linkedin-logo', href: LINKEDIN_URL, external: true },
]
</script>

<template>
  <footer class="border-t border-cream/10 bg-emerald-deep py-10 text-cream">
    <div
      class="mx-auto flex max-w-6xl items-center justify-center px-6 lg:px-8"
    >
      <ul class="flex items-center gap-3.5">
        <li v-for="social in socials" :key="social.label">
          <a
            :href="social.href"
            :aria-label="social.label"
            :target="social.external ? '_blank' : undefined"
            :rel="social.external ? 'noopener noreferrer' : undefined"
            class="inline-flex size-9 items-center justify-center rounded-full border border-cream/20 text-cream/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-note-yellow/60 hover:text-note-yellow"
          >
            <Icon :name="social.icon" class="size-4" aria-hidden="true" />
          </a>
        </li>
      </ul>
    </div>
  </footer>
</template>
