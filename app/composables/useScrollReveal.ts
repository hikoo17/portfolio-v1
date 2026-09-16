export function useScrollReveal(selector = '.reveal') {
  let observer: IntersectionObserver | null = null

  function reveal(el: HTMLElement) {
    el.classList.add('is-visible')

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
      elements.forEach((el) => el.classList.add('is-visible'))
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
