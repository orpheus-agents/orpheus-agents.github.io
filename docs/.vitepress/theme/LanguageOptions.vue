<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { useLangs } from 'vitepress/dist/client/theme-default/composables/langs'
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue'

const { site, localeIndex } = useData()
const { localeLinks } = useLangs({ correspondingLink: true })
// Keep configuration order, including the current locale in its original position.
const languages = computed(() => Object.entries(site.value.locales)
  .filter(([, locale]) => locale.label)
  .map(([key, locale]) => ({
    key,
    label: locale.label,
    lang: locale.lang,
    active: key === localeIndex.value,
    link: localeLinks.value.find(link => link.text === locale.label)?.link,
  })))
</script>

<template>
  <ul class="language-options">
    <li v-for="language in languages" :key="language.key">
      <VPLink
        class="language-option"
        :href="language.active ? undefined : language.link"
        :lang="language.lang"
        :aria-current="language.active ? 'true' : undefined"
      >{{ language.label }}</VPLink>
    </li>
  </ul>
</template>

<style scoped>
.language-option { display: block; border-radius: 6px; padding: 0 12px; line-height: 32px; font-size: 14px; color: var(--vp-c-text-1); }
.language-option[aria-current] { font-weight: 700; }
a.language-option:hover { color: var(--vp-c-brand-1); background: var(--vp-c-default-soft); }
</style>
