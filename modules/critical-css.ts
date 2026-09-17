import { defineNuxtModule } from '@nuxt/kit'
import { join } from 'pathe'
import Beasties from 'beasties'

// Inline the critical CSS of the prerendered HTML so the global Tailwind
// stylesheet stops being a render-blocking request. This runs in the Nuxt
// build process, so `beasties` stays a build-time dependency and never reaches
// the runtime bundle.
//
// `pruneSource` and `reduceInlineStyles` stay off on purpose: this is a single
// page with client-only content (the project modal is mounted lazily after
// hydration), and pruning rules that did not match the initial HTML would strip
// the utilities those client-only components rely on.
export default defineNuxtModule({
  meta: {
    name: 'critical-css',
    configKey: 'criticalCss',
  },
  setup(_options, nuxt) {
    if (nuxt.options.dev) {
      return
    }

    nuxt.hook('nitro:init', (nitro) => {
      const beasties = new Beasties({
        // Read from the Vite client build output, which is written before the
        // prerenderer runs (the copied public dir is populated later, which
        // makes the stylesheet look missing during `prerender:generate`).
        path: join(nuxt.options.buildDir, 'dist/client'),
        publicPath: nitro.options.baseURL || '/',
        preload: 'swap',
        pruneSource: false,
        reduceInlineStyles: false,
        compress: true,
        inlineFonts: true,
        logLevel: 'warn',
      })

      nitro.hooks.hook('prerender:generate', async (route) => {
        if (!route.contents || !route.fileName?.endsWith('.html')) {
          return
        }

        route.contents = await beasties.process(route.contents)
      })
    })
  },
})
