<script setup lang="ts">
onMounted(() => {
  const elements = document.querySelectorAll('.reveal')
  if (!('IntersectionObserver' in window)) {
    elements.forEach((el) => el.classList.add('is-visible'))
    return
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -48px 0px' },
  )

  elements.forEach((el) => observer.observe(el))
  onBeforeUnmount(() => observer.disconnect())
})
</script>

<template>
  <div id="top" class="bg-emerald-deep">
    <NuxtRouteAnnouncer />
    <AppNavbar />
    <main>
      <AppHero />
      <SectionProjects />
      <SectionAbout />
      <SectionSkills />
      <SectionJourney />
      <SectionContact />
    </main>
    <AppFooter />
  </div>
</template>
