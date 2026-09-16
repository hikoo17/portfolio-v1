export function useActiveSection(ids: string[]) {
  const activeId = ref('')

  let observer: IntersectionObserver | null = null

  onMounted(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (!sections.length) {
      return
    }

    if (typeof IntersectionObserver === 'undefined') {
      activeId.value = sections[0]!.id
      return
    }

    // A thin band around the middle of the viewport decides which section is
    // "current", so the indicator flips as soon as a section reaches reading
    // position instead of waiting for it to fill most of the screen.
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            activeId.value = entry.target.id
          }
        }
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )

    sections.forEach((section) => observer!.observe(section))
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    observer = null
  })

  return activeId
}
