import tailwindcss from "@tailwindcss/vite";

const SITE_URL = process.env.NUXT_PUBLIC_SITE_URL || "https://keyzar.my.id";
const SITE_NAME = "Keyza Zaki Arkana";
const SITE_DESCRIPTION =
  "Portfolio of Keyza Zaki Arkana — a web developer based in Tasikmalaya, Indonesia, specializing in modern and high-performance web applications.";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",

  // Keep DevTools (and its payload) out of the production bundle.
  devtools: { enabled: process.env.NODE_ENV !== "production" },

  css: ['~/assets/css/main.css'],

  modules: [
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxt/icon',
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
    families: [
      {
        name: 'Plus Jakarta Sans',
        provider: 'google',
        weights: [400, 500, 600, 700, 800],
        styles: ['normal'],
        subsets: ['latin'],
      },
      {
        name: 'Instrument Serif',
        provider: 'google',
        weights: [400],
        styles: ['normal', 'italic'],
        subsets: ['latin'],
      },
      {
        name: 'Caveat',
        provider: 'google',
        weights: [400],
        styles: ['normal'],
        subsets: ['latin'],
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
    detectBrowserLanguage: false,
  },

  sitemap: {
    autoLastmod: true,
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
      email: 'mailto:keyzazaki054@gmail.com',
      image: `${SITE_URL}/og-image.png`,
      sameAs: [
        'https://github.com/hikoo17',
        'https://www.linkedin.com/in/keyza-zaki-18324741b',
      ],
    },
  },

  runtimeConfig: {
    // Dipeta langsung agar otomatis membaca variabel lingkungan dari Cloudflare
    // (Misal: NUXT_SMTP_HOST -> smtpHost)
    smtpHost: process.env.NUXT_SMTP_HOST || '',
    smtpPort: process.env.NUXT_SMTP_PORT || '',
    smtpUser: process.env.NUXT_SMTP_USER || '',
    smtpPass: process.env.NUXT_SMTP_PASS || '',
    contactFrom: process.env.NUXT_CONTACT_FROM || '',
    contactTo: process.env.NUXT_CONTACT_TO || 'keyzazaki054@gmail.com',

    // Tetap sediakan struktur objek 'smtp' jika backend server/api/contact.ts memanggilnya seperti `config.smtp.host`
    smtp: {
      host: process.env.NUXT_SMTP_HOST || '',
      port: process.env.NUXT_SMTP_PORT || '',
      user: process.env.NUXT_SMTP_USER || '',
      pass: process.env.NUXT_SMTP_PASS || '',
      from: process.env.NUXT_CONTACT_FROM || '',
      to: process.env.NUXT_CONTACT_TO || 'keyzazaki054@gmail.com',
    },

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
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/favicon-192x192.png' },
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
        { rel: 'icon', type: 'image/png', sizes: '48x48', href: '/favicon-48x48.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
    },
  },

  routeRules: {
    '/': { prerender: true },
    '/_nuxt/**': {
      headers: { 'cache-control': 'public, max-age=31536000, immutable' },
    },
    '/images/**': {
      headers: { 'cache-control': 'public, max-age=31536000, immutable' },
    },
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
    '/favicon-48x48.png': {
      headers: { 'cache-control': 'public, max-age=604800' },
    },
    '/favicon-96x96.png': {
      headers: { 'cache-control': 'public, max-age=604800' },
    },
    '/favicon-192x192.png': {
      headers: { 'cache-control': 'public, max-age=604800' },
    },
    '/apple-touch-icon.png': {
      headers: { 'cache-control': 'public, max-age=604800' },
    },
    '/og-image.png': {
      headers: { 'cache-control': 'public, max-age=2592000' },
    },
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
    // Diberi preset cloudflare-pages agar Cloudflare Workers dapat membaca runtime env
    preset: 'cloudflare-pages',
    compressPublicAssets: { gzip: true, brotli: true },
    prerender: {
      crawlLinks: true,
      routes: ['/', '/sitemap.xml', '/robots.txt'],
    },
  },

  experimental: {
    payloadExtraction: true,
    renderJsonPayloads: true,
  },

  vite: {
    plugins: [
      tailwindcss(),
    ],
    build: {
      target: 'es2022',
      minify: 'esbuild',
      cssCodeSplit: true,
      reportCompressedSize: false,
    },
  },
});