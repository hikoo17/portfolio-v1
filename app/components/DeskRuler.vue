<template>
  <!-- A premium brushed stainless-steel ruler. Drawn lying horizontally and
       tilted with CSS so it can lean against the scrapbook on the desk. -->
  <svg viewBox="0 0 480 76" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="sr-metal" x1="0" y1="8" x2="0" y2="68" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#f8fafb" />
        <stop offset="0.05" stop-color="#e6eaec" />
        <stop offset="0.19" stop-color="#c8cfd4" />
        <stop offset="0.44" stop-color="#adb6bb" />
        <stop offset="0.66" stop-color="#98a1a7" />
        <stop offset="0.86" stop-color="#848d93" />
        <stop offset="0.95" stop-color="#9aa3a9" />
        <stop offset="1" stop-color="#b8c0c5" />
      </linearGradient>

      <linearGradient id="sr-sheen" x1="0" y1="8" x2="0" y2="68" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#ffffff" stop-opacity="0.8" />
        <stop offset="0.12" stop-color="#ffffff" stop-opacity="0.1" />
        <stop offset="0.42" stop-color="#ffffff" stop-opacity="0" />
        <stop offset="0.72" stop-color="#ffffff" stop-opacity="0.06" />
        <stop offset="1" stop-color="#ffffff" stop-opacity="0.4" />
      </linearGradient>

      <!-- brushed streaks running along the ruler's length -->
      <pattern id="sr-brush" width="6" height="2" patternUnits="userSpaceOnUse">
        <rect x="0" y="0" width="6" height="1" fill="#ffffff" opacity="0.24" />
        <rect x="0" y="1" width="6" height="1" fill="#0a0d0f" opacity="0.1" />
      </pattern>

      <filter id="sr-grain" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" result="n" />
        <feColorMatrix in="n" type="saturate" values="0" />
      </filter>

      <mask id="sr-hole">
        <rect x="0" y="0" width="480" height="76" fill="white" />
        <circle cx="24" cy="38" r="6.5" fill="black" />
      </mask>
    </defs>

    <g mask="url(#sr-hole)">
      <rect x="3" y="8" width="474" height="60" rx="4" fill="url(#sr-metal)" stroke="#5c646a" stroke-width="1.3" />
      <rect x="3" y="8" width="474" height="60" rx="4" fill="url(#sr-sheen)" />
      <rect x="3" y="8" width="474" height="60" rx="4" fill="url(#sr-brush)" opacity="0.55" />
      <rect x="3" y="8" width="474" height="60" rx="4" filter="url(#sr-grain)" opacity="0.09" />

      <!-- bevels: bright top edge, shaded bottom edge -->
      <rect x="3.8" y="8.8" width="472.4" height="58.4" rx="3.4" fill="none" stroke="#ffffff" stroke-opacity="0.5" stroke-width="0.9" />
      <rect x="3.8" y="66" width="472.4" height="1.4" rx="0.7" fill="#4d555a" opacity="0.55" />
      <rect x="3.8" y="8.6" width="472.4" height="1.2" rx="0.6" fill="#ffffff" opacity="0.6" />

      <!-- a faint scratch for imperfection -->
      <line x1="300" y1="24" x2="392" y2="26.4" stroke="#ffffff" stroke-opacity="0.35" stroke-width="0.8" />
      <line x1="146" y1="56" x2="214" y2="55.2" stroke="#3f464a" stroke-opacity="0.18" stroke-width="0.9" />
    </g>

    <!-- engraved ticks (dark groove + light lower lip) -->
    <g stroke-linecap="round">
      <g stroke="#ffffff" stroke-opacity="0.5" stroke-width="1.3">
        <line
          v-for="n in 43"
          :key="`tick-lip-${n}`"
          :x1="40 + (n - 1) * 10"
          :y1="9.6"
          :x2="40 + (n - 1) * 10"
          :y2="9 + (n % 5 === 1 ? 30 : n % 5 === 3 ? 20 : 13)"
        />
      </g>
      <g stroke="#383f44" stroke-opacity="0.92" stroke-width="1.25">
        <line
          v-for="n in 43"
          :key="`tick-${n}`"
          :x1="40 + (n - 1) * 10"
          y1="8.4"
          :x2="40 + (n - 1) * 10"
          :y2="8.5 + (n % 5 === 1 ? 30 : n % 5 === 3 ? 20 : 13)"
        />
      </g>
    </g>

    <!-- engraved numbers -->
    <g font-family="ui-monospace, monospace" font-size="14" font-weight="700">
      <g fill="#ffffff" fill-opacity="0.5">
        <text v-for="n in 9" :key="`num-lip-${n}`" :x="42.6" :y="56" :transform="`translate(${(n - 1) * 50} 0)`">0</text>
      </g>
      <g fill="#33393c">
        <text v-for="n in 9" :key="`num-${n}`" :x="42 + (n - 1) * 50" y="55">{{ n }}</text>
      </g>
    </g>

    <!-- punched hanging hole with a soft inner bevel -->
    <circle cx="24" cy="38" r="7.6" fill="none" stroke="#ffffff" stroke-opacity="0.55" stroke-width="1.1" />
    <circle cx="24" cy="38" r="7.6" fill="none" stroke="#3c4348" stroke-opacity="0.5" stroke-width="0.9" stroke-dasharray="0 18 26" />
  </svg>
</template>
