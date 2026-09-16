<script setup lang="ts">
const { t, locale } = useI18n()
const { siteUrl } = useRuntimeConfig().public

useScrollReveal()

useHead({
  htmlAttrs: { lang: () => locale.value },
  link: [
    { rel: 'canonical', href: siteUrl },
  ],
})

useSeoMeta({
  title: () => t('seo.title'),
  description: () => t('seo.description'),
  ogType: 'website',
  ogSiteName: 'Keyza Zaki Arkana',
  ogUrl: siteUrl,
  ogTitle: () => t('seo.title'),
  ogDescription: () => t('seo.description'),
  ogImage: () => `${siteUrl}/og-image.png`,
  ogImageAlt: () => t('seo.ogImageAlt'),
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageType: 'image/png',
  ogLocale: () => (locale.value === 'id' ? 'id_ID' : 'en_US'),
  twitterCard: 'summary_large_image',
  twitterTitle: () => t('seo.title'),
  twitterDescription: () => t('seo.description'),
  twitterImage: () => `${siteUrl}/og-image.png`,
  twitterImageAlt: () => t('seo.ogImageAlt'),
})
</script>

<template>
  <div id="top" class="bg-emerald-deep">
    <NuxtRouteAnnouncer />
    <ClientOnly>
      <ScrollProgress />
    </ClientOnly>
    <AppNavbar />
    <main>
      <AppHero />
      <SectionProjects />
      <SectionAbout />
      <SectionSkills />
      <SectionJourney />
      <SectionBlog />
      <SectionContact />
    </main>
    <AppFooter />
  </div>
</template>
