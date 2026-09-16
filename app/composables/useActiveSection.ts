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
    // "current". Sections are tracked as a set rather than overwritten per
    // entry, so scrolling back up leaves no stale section highlighted and the
    // empty state (hero) can be used to mark "Home" active.
    const visible = new Set<string>()

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.add(entry.target.id)
          } else {
            visible.delete(entry.target.id)
          }
        }

        activeId.value = ids.find((id) => visible.has(id)) ?? ''
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
