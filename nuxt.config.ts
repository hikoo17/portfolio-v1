import tailwindcss from "@tailwindcss/vite";

const SITE_URL = process.env.NUXT_PUBLIC_SITE_URL || "https://kezadev.my.id";
const SITE_NAME = "Keyza Zaki Arkana";
const SITE_DESCRIPTION =
  "Portfolio of Keyza Zaki Arkana — a web developer from Tasikmalaya, Indonesia, currently interning at CV Access Media.";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",

  // Keep DevTools (and its payload) out of the production bundle.
  devtools: { enabled: process.env.NODE_ENV !== "production" },

  css: ['~/assets/css/main.css'],

  modules: [
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@formkit/auto-animate/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    'nuxt-schema-org',
  ],

  // Icons are bundled from a local Iconify collection at build time, so no
  // request ever leaves the browser for an icon.
  icon: {
    serverBundle: {
      collections: ['ph'],
    },
    clientBundle: {
      scan: true,
      sizeLimitKb: 256,
    },
  },

  // Canonical site metadata consumed by sitemap, robots and schema.org.
  site: {
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    defaultLocale: 'en',
  },

  image: {
    // Pre-generate optimized variants at build time so production can be
    // served entirely from a CDN/static host with zero image CPU cost.
    // `ipxStatic` has no route handler in dev, which makes every `NuxtImg`
    // request fall through to SSR as HTML, so use the runtime `ipx` provider
    // while developing and ship the static variants in production builds.
    provider: process.env.NODE_ENV === 'production' ? 'ipxStatic' : 'ipx',
    format: ['webp'],
    quality: 72,
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  },

  fonts: {
    // Self-host, subset and preload the webfonts instead of blocking the
    // first paint on a third-party Google Fonts request.
    families: [
      {
        name: 'Plus Jakarta Sans',
        provider: 'google',
        weights: [400, 500, 600, 700, 800],
        styles: ['normal', 'italic'],
      },
      {
        name: 'Instrument Serif',
        provider: 'google',
        weights: [400],
        styles: ['normal', 'italic'],
      },
      {
        name: 'Caveat',
        provider: 'google',
        weights: [400, 500, 600],
        styles: ['normal'],
      },
    ],
  },

  i18n: {
    baseUrl: SITE_URL,
    locales: [
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
      { code: 'id', language: 'id-ID', name: 'Bahasa Indonesia', file: 'id.json' },
    ],
    defaultLocale: 'en',
    strategy: 'no_prefix',
    // Always boot in English. Browser-language detection runs on the client
    // only, so a phone with `id-ID` re-rendered the prerendered English page
    // into Indonesian after hydration and desynced the language toggle.
    // An explicit choice is persisted in the `locale` cookie instead.
    detectBrowserLanguage: false,
  },

  sitemap: {
    autoLastmod: true,
    // The site is a single prerendered page, so emit a fully static sitemap.
    zeroRuntime: true,
  },

  robots: {
    disallow: [],
  },

  schemaOrg: {
    identity: {
      type: 'Person',
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      jobTitle: 'Web Developer',
      email: 'mailto:thespikekeyza@gmail.com',
      image: `${SITE_URL}/og-image.png`,
      sameAs: [
        'https://github.com/hikoo17',
        'https://www.linkedin.com/in/keyza-zaki-18324741b',
      ],
    },
  },

  runtimeConfig: {
    public: {
      siteUrl: SITE_URL,
    },
  },

  app: {
    head: {
      title: `${SITE_NAME} — Portfolio`,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#06453a' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      ],
    },
  },

  routeRules: {
    // Prerender the single page so it can be served statically behind a CDN.
    '/': { prerender: true },
    // Content-hashed build output and media never change in place.
    '/_nuxt/**': {
      headers: { 'cache-control': 'public, max-age=31536000, immutable' },
    },
    '/images/**': {
      headers: { 'cache-control': 'public, max-age=31536000, immutable' },
    },
    // Optimized image URLs encode every transform, so they are immutable.
    '/_ipx/**': {
      headers: { 'cache-control': 'public, max-age=31536000, immutable' },
    },
    '/_fonts/**': {
      headers: { 'cache-control': 'public, max-age=31536000, immutable' },
    },
    '/favicon.svg': {
      headers: { 'cache-control': 'public, max-age=604800' },
    },
    '/favicon.ico': {
      headers: { 'cache-control': 'public, max-age=604800' },
    },
    '/favicon-16x16.png': {
      headers: { 'cache-control': 'public, max-age=604800' },
    },
    '/favicon-32x32.png': {
      headers: { 'cache-control': 'public, max-age=604800' },
    },
    '/apple-touch-icon.png': {
      headers: { 'cache-control': 'public, max-age=604800' },
    },
    '/og-image.png': {
      headers: { 'cache-control': 'public, max-age=2592000' },
    },
    // Google Search Console verification file — cheap to revalidate.
    '/googlec17b4e7fe98cd36f.html': {
      headers: { 'cache-control': 'public, max-age=300' },
    },
    '/sitemap.xml': {
      headers: { 'cache-control': 'public, max-age=3600' },
    },
    '/**': {
      headers: {
        'x-content-type-options': 'nosniff',
        'referrer-policy': 'strict-origin-when-cross-origin',
      },
    },
  },

  nitro: {
    // Serve pre-compressed public assets (Brotli + gzip) without runtime CPU.
    compressPublicAssets: { gzip: true, brotli: true },
    prerender: {
      crawlLinks: true,
      routes: ['/', '/sitemap.xml', '/robots.txt'],
    },
  },

  experimental: {
    // Ship the prerendered payload as JSON to shrink the hydration payload.
    payloadExtraction: true,
    renderJsonPayloads: true,
  },

  vite: {
    plugins: [
      tailwindcss(),
    ],
    build: {
      // Ship modern ESM only: downlevelling here is what makes Lighthouse
      // report "Legacy JavaScript".
      target: 'es2022',
      minify: 'esbuild',
      cssCodeSplit: true,
      reportCompressedSize: false,
    },
  },
});
