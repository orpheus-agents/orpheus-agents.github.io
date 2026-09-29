<script setup lang="ts">
import { useData } from 'vitepress'
import VPFlyout from 'vitepress/dist/client/theme-default/components/VPFlyout.vue'
import LanguageOptions from './LanguageOptions.vue'

const { theme } = useData()
</script>

<template>
  <VPFlyout class="VPNavBarTranslations" icon="vpi-languages" :label="theme.langMenuLabel">
    <LanguageOptions />
  </VPFlyout>
</template>

<style scoped>
.VPNavBarTranslations { display: none; }
@media (min-width: 1280px) {
  .VPNavBarTranslations { display: flex; align-items: center; }
}
</style>
