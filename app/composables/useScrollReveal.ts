export function useScrollReveal(selector = '.reveal') {
  let observer: IntersectionObserver | null = null

  function reveal(el: HTMLElement) {
    // A data attribute (not a class) marks the element as revealed: sections
    // are lazily hydrated, and Vue rewrites `class` when it hydrates an
    // element, which would otherwise wipe a class added here before hydration.
    el.setAttribute('data-reveal', 'shown')

    // Release the compositor layer once the reveal animation is done so the
    // browser does not keep a layer alive for every revealed element.
    const release = () => {
      el.style.willChange = 'auto'
    }
    el.addEventListener('transitionend', release, { once: true })
    window.setTimeout(release, 1200)
  }

  onMounted(() => {
    const elements = document.querySelectorAll<HTMLElement>(selector)
    if (!elements.length) {
      return
    }

    if (typeof IntersectionObserver === 'undefined') {
      elements.forEach((el) => el.setAttribute('data-reveal', 'shown'))
      return
    }

    observer = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue
          }
          reveal(entry.target as HTMLElement)
          obs.unobserve(entry.target)
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' },
    )

    elements.forEach((el) => observer!.observe(el))
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    observer = null
  })
}
