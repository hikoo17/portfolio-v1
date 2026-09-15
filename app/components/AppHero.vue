<template>
  <section
    class="grid-paper grid-paper--fine relative min-h-screen overflow-hidden bg-emerald-deep text-cream"
  >
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-10%,rgba(122,201,175,0.16),transparent_65%)]"
      aria-hidden="true"
    />

    <span
      class="pointer-events-none absolute top-6 right-8 hidden font-mono text-[10px] tracking-[0.3em] text-cream/30 lg:block"
      aria-hidden="true"
    >
      6.9°S — 107.6°E
    </span>
    <span
      class="pointer-events-none absolute top-1/2 left-4 hidden -translate-y-1/2 -rotate-90 font-mono text-[10px] tracking-[0.35em] text-cream/25 xl:block"
      aria-hidden="true"
    >
      FIG. 01 — THE WORKSPACE
    </span>
    <span
      class="pointer-events-none absolute bottom-6 right-8 hidden font-mono text-[10px] tracking-[0.3em] text-cream/30 lg:block"
      aria-hidden="true"
    >
      EST. 2024 / 01·06
    </span>

    <div
      class="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl items-stretch gap-6 px-6 pt-36 pb-28 lg:px-8"
    >
      <!-- Left paper rail -->
      <div
        class="hidden w-36 shrink-0 flex-col justify-between py-14 lg:flex"
        aria-hidden="true"
      >
        <ThePaper
          color="yellow"
          rotation="-4deg"
          tape="top-center"
          tape-tilt="-3deg"
          class="paper-drift ml-1 mt-6 px-4 py-3.5"
          style="--rise-delay: 480ms"
        >
          <p class="font-hand text-xl leading-snug text-ink">
            currently building<br />something new...
          </p>
        </ThePaper>

        <ThePaper
          color="white"
          rotation="-2deg"
          variant="torn"
          class="paper-drift mr-3 mb-10 px-4 py-3"
          style="--rise-delay: 720ms; --drift-duration: 10s"
        >
          <p class="font-mono text-[10px] font-semibold tracking-[0.25em] text-ink/70 uppercase">
            01 — Selected Work ↓
          </p>
        </ThePaper>
      </div>

      <!-- Center content -->
      <div class="flex min-w-0 flex-1 flex-col justify-center">
        <p
          class="animate-rise-in text-xs font-semibold tracking-[0.3em] text-cream/60 uppercase"
          style="animation-delay: 80ms"
        >
          Creative Developer / Digital Maker
        </p>

        <h1
          class="animate-rise-in mt-6 text-5xl leading-[1.04] font-extrabold tracking-tight sm:text-6xl lg:text-6xl xl:text-7xl"
          style="animation-delay: 160ms"
        >
          Hi, I'm Keyza.
          <span class="mt-2 block font-serif text-[1.06em] font-normal italic text-note-yellow">
            I turn ideas into
            <span class="ink-underline">digital experiences</span>.
          </span>
        </h1>

        <p
          class="animate-rise-in mt-7 max-w-xl text-base leading-relaxed text-cream/75 sm:text-lg"
          style="animation-delay: 260ms"
        >
          Developer focused on building thoughtful web experiences, experimenting
          with technology, and turning late-night ideas into useful products.
        </p>

        <div
          class="animate-rise-in mt-10 flex flex-wrap items-center gap-x-5 gap-y-4"
          style="animation-delay: 340ms"
        >
          <a
            href="#work"
            class="group inline-flex -rotate-1 items-center gap-2 rounded-sm bg-cream px-6 py-3 text-sm font-bold text-emerald-deep shadow-paper transition-all duration-300 hover:translate-y-[-3px] hover:rotate-0 hover:shadow-paper-lift"
          >
            View My Work
            <span
              class="transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </a>
          <a
            href="#contact"
            class="text-sm font-semibold text-cream/90 underline decoration-cream/40 underline-offset-8 transition-colors hover:text-note-yellow hover:decoration-note-yellow"
          >
            Let's Talk
          </a>
          <p
            class="hand-arrow hidden rotate-[-4deg] xl:block"
            aria-hidden="true"
          >
            start here!
          </p>
        </div>

        <div class="mt-14 flex flex-wrap items-center gap-4 lg:hidden">
          <ThePaper
            color="yellow"
            rotation="-2deg"
            tape="top-left"
            tape-color="rgba(255,255,255,0.5)"
            class="animate-rise-in px-4 py-3"
            style="animation-delay: 420ms"
          >
            <p class="font-hand text-lg leading-tight text-ink">
              currently building<br />something new...
            </p>
          </ThePaper>
          <ThePaper
            color="blue"
            rotation="2deg"
            class="animate-rise-in px-4 py-3"
            style="animation-delay: 500ms"
          >
            <p class="text-[11px] font-bold tracking-[0.2em] text-ink/80 uppercase">
              available for<br />creative projects
            </p>
          </ThePaper>
        </div>
      </div>

      <!-- Right paper rail -->
      <div
        class="hidden w-44 shrink-0 flex-col items-end justify-between py-10 lg:flex"
        aria-hidden="true"
      >
        <ThePaper
          color="cream"
          rotation="2deg"
          tape="top-right"
          tape-color="rgba(216,230,239,0.8)"
          class="paper-drift mr-2 mt-4 w-40 px-5 pt-8 pb-5"
          style="--rise-delay: 560ms; --drift-duration: 8s"
        >
          <ul class="space-y-2 text-sm font-bold tracking-[0.25em] text-ink/85 uppercase">
            <li class="flex items-center gap-2">
              <span class="inline-block size-2 bg-emerald-base" /> Code
            </li>
            <li class="flex items-center gap-2">
              <span class="inline-block size-2 border-2 border-ink/40" /> Design
            </li>
            <li class="flex items-center gap-2">
              <span class="inline-block size-2 border-2 border-ink/40" /> Experiment
            </li>
          </ul>
        </ThePaper>

        <svg
          class="paper-drift mr-8 size-9 text-note-yellow"
          style="--rise-delay: 800ms; --drift-duration: 6s; --tilt: 12deg"
          viewBox="0 0 40 40"
          fill="currentColor"
        >
          <path
            d="M20 2c1.6 8.2 3.2 12.6 18 18-14.8 5.4-16.4 9.8-18 18-1.6-8.2-3.2-12.6-18-18 14.8-5.4 16.4-9.8 18-18Z"
          />
        </svg>

        <ThePaper
          color="pink"
          rotation="3deg"
          class="paper-drift mb-2 w-44 px-5 py-4"
          style="--rise-delay: 640ms; --drift-duration: 9s"
        >
          <p class="text-[11px] font-bold tracking-[0.2em] text-ink/80 uppercase">
            available for<br />creative projects
          </p>
          <p class="mt-2 font-hand text-lg leading-none text-emerald-deep/80">
            say hello →
          </p>
        </ThePaper>
      </div>
    </div>

    <svg
      class="paper-drift pointer-events-none absolute bottom-[14%] left-[30%] hidden size-5 text-note-pink xl:block"
      style="--rise-delay: 880ms; --drift-duration: 8s; --tilt: -6deg"
      viewBox="0 0 40 40"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        d="M20 2c1.6 8.2 3.2 12.6 18 18-14.8 5.4-16.4 9.8-18 18-1.6-8.2-3.2-12.6-18-18 14.8-5.4 16.4-9.8 18-18Z"
      />
    </svg>

    <a
      href="#work"
      class="absolute bottom-7 left-1/2 hidden -translate-x-1/2 font-hand text-lg text-cream/50 transition-colors hover:text-note-yellow [@media(min-height:780px)]:block"
    >
      keep exploring ↓
    </a>
  </section>
</template>
