<script setup lang="ts">
import { ref } from 'vue'
import { useData } from 'vitepress'
import LanguageOptions from './LanguageOptions.vue'

const { theme } = useData()
const open = ref(false)
</script>

<template>
  <div class="VPNavScreenTranslations">
    <button class="title" :aria-expanded="open" aria-controls="mobile-languages" @click="open = !open">
      <span class="vpi-languages" aria-hidden="true" />
      {{ theme.langMenuLabel }}
      <span class="vpi-chevron-down" aria-hidden="true" />
    </button>
    <LanguageOptions v-show="open" id="mobile-languages" />
  </div>
</template>

<style scoped>
.title { display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 500; color: var(--vp-c-text-1); }
.title span { font-size: 16px; }
.language-options { padding: 4px 0 0 12px; }
</style>
