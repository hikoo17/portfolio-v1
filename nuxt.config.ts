import tailwindcss from "@tailwindcss/vite";

const SITE_URL = process.env.NUXT_PUBLIC_SITE_URL || "https://kezadev.my.id";
const SITE_NAME = "Keyza Zaki Arkana";
const SITE_DESCRIPTION =
  "Portfolio of Keyza Zaki Arkana — a junior web developer from Tasikmalaya, Indonesia, currently interning at CV Access Media.";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",

  // Keep DevTools (and its payload) out of the production bundle.
  devtools: { enabled: process.env.NODE_ENV !== "production" },

  css: ['~/assets/css/main.css'],

  modules: [
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxtjs/i18n',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    'nuxt-schema-org',
  ],

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
    quality: 78,
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
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'locale',
      redirectOn: 'root',
    },
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
      jobTitle: 'Junior Web Developer',
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
      title: `${SITE_NAME} — Junior Web Developer`,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#06453a' },
        { name: 'format-detection', content: 'telephone=no' },
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
    '/og-image.png': {
      headers: { 'cache-control': 'public, max-age=604800' },
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
  },
});
