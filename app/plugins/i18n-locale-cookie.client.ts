// Browser-language detection is disabled, so the only locale that can override
// the English default is a choice the visitor actually made with the navbar
// toggle, which is persisted in the `locale` cookie.
export default defineNuxtPlugin({
  name: 'i18n-locale-cookie',
  enforce: 'post',
  async setup() {
    const { locale, locales, setLocale } = useI18n()
    const saved = useCookie<string>('locale', { maxAge: 31536000 })

    if (
      saved.value
      && saved.value !== locale.value
      && (locales.value as string[]).includes(saved.value)
    ) {
      await setLocale(saved.value)
    }
  },
})
