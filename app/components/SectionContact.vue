<script setup lang="ts">
const { t } = useI18n()

const form = reactive({ name: '', email: '', message: '' })
const errors = reactive({ name: '', email: '', message: '' })
const status = ref<'idle' | 'sending' | 'success' | 'error'>('idle')

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const fieldBase
  = 'mt-2 w-full border-0 border-b bg-transparent px-0.5 py-2 text-base text-ink outline-none transition-colors placeholder:text-ink/35'

function validate() {
  errors.name = form.name.trim() ? '' : t('contact.form.errName')
  errors.email = !form.email.trim()
    ? t('contact.form.errEmail')
    : EMAIL_RE.test(form.email.trim()) ? '' : t('contact.form.errEmailFormat')
  errors.message = form.message.trim() ? '' : t('contact.form.errMessage')
  return !errors.name && !errors.email && !errors.message
}

async function submit() {
  if (status.value === 'sending') {
    return
  }
  status.value = 'idle'
  if (!validate()) {
    return
  }

  status.value = 'sending'
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      },
    })
    status.value = 'success'
    form.name = ''
    form.email = ''
    form.message = ''
    errors.name = ''
    errors.email = ''
    errors.message = ''
  }
  catch {
    status.value = 'error'
  }
}
</script>

<template>
  <section
    id="contact"
    class="grid-paper grid-paper--fine grid-paper--light scroll-mt-24 bg-cream-warm py-24 text-ink sm:py-32"
  >
    <PaperPlane
      variant="arc"
      class="pointer-events-none absolute top-8 left-2 -z-10 w-24 rotate-6 text-emerald-deep/15 sm:left-4 sm:w-32 lg:left-8 lg:w-36"
    />
    <div class="mx-auto max-w-4xl px-6 text-center lg:px-8">
      <p class="reveal font-mono text-[11px] font-semibold tracking-[0.3em] text-ink-faint uppercase">
        {{ t('contact.eyebrow') }}
      </p>

      <h2
        class="reveal mt-4 text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl"
        :style="{ '--reveal-delay': '80ms' }"
      >
        {{ t('contact.title') }}
      </h2>
      <p
        class="reveal mt-4 font-serif text-2xl italic text-ink-soft sm:text-3xl"
        :style="{ '--reveal-delay': '160ms' }"
      >
        {{ t('contact.subtitle') }}
      </p>

      <ThePaper
        color="cream"
        rotation="-0.6deg"
        tape="top-center"
        tape-tilt="2deg"
        class="reveal mx-auto mt-12 max-w-xl px-6 py-7 text-left sm:px-8 sm:py-9"
        :style="{ '--reveal-delay': '240ms', '--tilt-hover': '-1.8deg' }"
      >
        <form class="space-y-5" novalidate @submit.prevent="submit">
          <div>
            <label
              for="contact-name"
              class="font-mono text-[10px] font-semibold tracking-[0.25em] text-ink/50 uppercase"
            >
              {{ t('contact.form.name') }}
            </label>
            <input
              id="contact-name"
              v-model="form.name"
              type="text"
              name="name"
              autocomplete="name"
              :placeholder="t('contact.form.namePlaceholder')"
              :class="[fieldBase, errors.name ? 'border-red-700/60 focus:border-red-700' : 'border-ink/25 focus:border-emerald-deep']"
              :aria-invalid="errors.name ? 'true' : undefined"
              :aria-describedby="errors.name ? 'contact-name-error' : undefined"
            >
            <p v-if="errors.name" id="contact-name-error" class="mt-1.5 text-xs font-medium text-red-700/90">
              {{ errors.name }}
            </p>
          </div>

          <div>
            <label
              for="contact-email"
              class="font-mono text-[10px] font-semibold tracking-[0.25em] text-ink/50 uppercase"
            >
              {{ t('contact.form.email') }}
            </label>
            <input
              id="contact-email"
              v-model="form.email"
              type="email"
              name="email"
              autocomplete="email"
              inputmode="email"
              :placeholder="t('contact.form.emailPlaceholder')"
              :class="[fieldBase, errors.email ? 'border-red-700/60 focus:border-red-700' : 'border-ink/25 focus:border-emerald-deep']"
              :aria-invalid="errors.email ? 'true' : undefined"
              :aria-describedby="errors.email ? 'contact-email-error' : undefined"
            >
            <p v-if="errors.email" id="contact-email-error" class="mt-1.5 text-xs font-medium text-red-700/90">
              {{ errors.email }}
            </p>
          </div>

          <div>
            <label
              for="contact-message"
              class="font-mono text-[10px] font-semibold tracking-[0.25em] text-ink/50 uppercase"
            >
              {{ t('contact.form.message') }}
            </label>
            <textarea
              id="contact-message"
              v-model="form.message"
              name="message"
              rows="4"
              :placeholder="t('contact.form.messagePlaceholder')"
              :class="[fieldBase, 'min-h-28 resize-y', errors.message ? 'border-red-700/60 focus:border-red-700' : 'border-ink/25 focus:border-emerald-deep']"
              :aria-invalid="errors.message ? 'true' : undefined"
              :aria-describedby="errors.message ? 'contact-message-error' : undefined"
            />
            <p v-if="errors.message" id="contact-message-error" class="mt-1.5 text-xs font-medium text-red-700/90">
              {{ errors.message }}
            </p>
          </div>

          <div class="flex flex-wrap items-center gap-4 pt-1">
            <button
              type="submit"
              class="group inline-flex -rotate-1 items-center gap-2 rounded-sm bg-emerald-base px-6 py-3 text-sm font-bold text-cream shadow-paper transition-all duration-300 hover:translate-y-[-3px] hover:rotate-0 hover:shadow-paper-lift disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:rotate-[-1deg]"
              :disabled="status === 'sending'"
            >
              {{ status === 'sending' ? t('contact.form.sending') : t('contact.form.send') }}
              <span
                class="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </button>
          </div>

          <p
            v-if="status === 'success'"
            role="status"
            class="font-hand text-lg text-emerald-deep"
          >
            {{ t('contact.form.success') }}
          </p>
          <p
            v-else-if="status === 'error'"
            role="alert"
            class="font-hand text-lg text-red-700/90"
          >
            {{ t('contact.form.error') }}
          </p>
        </form>
      </ThePaper>
    </div>
  </section>
</template>
