<script setup lang="ts">
import { useData } from 'vitepress'
import VPFlyout from 'vitepress/dist/client/theme-default/components/VPFlyout.vue'
import VPSwitchAppearance from 'vitepress/dist/client/theme-default/components/VPSwitchAppearance.vue'
import VPSocialLinks from 'vitepress/dist/client/theme-default/components/VPSocialLinks.vue'
import LanguageOptions from './LanguageOptions.vue'

const { site, theme } = useData()
</script>

<template>
  <VPFlyout class="VPNavBarExtra" :label="site.lang === 'ru' ? 'Дополнительная навигация' : 'Extra navigation'">
    <div class="group translations"><LanguageOptions /></div>
    <div v-if="site.appearance && site.appearance !== 'force-dark' && site.appearance !== 'force-auto'" class="group">
      <div class="item appearance">
        <p class="label">{{ theme.darkModeSwitchLabel || 'Appearance' }}</p>
        <VPSwitchAppearance class="appearance-action" />
      </div>
    </div>
    <div v-if="theme.socialLinks" class="group">
      <div class="item social-links">
        <VPSocialLinks class="social-links-list" :links="theme.socialLinks" />
      </div>
    </div>
  </VPFlyout>
</template>

<style scoped>
.VPNavBarExtra { display: none; margin-right: -12px; }
@media (min-width: 768px) and (max-width: 1279px) {
  .VPNavBarExtra { display: block; }
}
.item.appearance, .item.social-links { display: flex; align-items: center; padding: 0 12px; }
.item.appearance { min-width: 176px; }
.appearance-action { margin-right: -2px; }
.social-links-list { margin: -4px -8px; }
</style>
