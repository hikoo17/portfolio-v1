// Browser-language detection is disabled, so the only locale that can override
// the English default is a choice the visitor made with the navbar toggle,
// persisted in the `locale` cookie.
//
// The page is prerendered in English, so the switch has to wait for
// `app:mounted`: setting it during plugin setup runs before the router exists
// (`NUXT_E1005`) and desyncs the prerendered HTML from the client render.
export default defineNuxtPlugin({
  name: 'i18n-locale-cookie',
  dependsOn: ['i18n:plugin'],
  setup(nuxt) {
    const saved = useCookie<string>('locale', { maxAge: 31536000 })

    if (!saved.value) {
      return
    }

    nuxt.hook('app:mounted', () => {
      const i18n = nuxt.$i18n
      const locale = saved.value

      if (locale && locale !== i18n.locale.value && (i18n.locales.value as string[]).includes(locale)) {
        i18n.setLocale(locale)
      }
    })
  },
})
