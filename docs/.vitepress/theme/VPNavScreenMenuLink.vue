<script setup lang="ts">
import { computed, inject } from 'vue'
import { useData, type DefaultTheme } from 'vitepress'
import { isActive } from 'vitepress/dist/client/shared'
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue'

const props = defineProps<{ item: DefaultTheme.NavItemWithLink }>()
const { page } = useData()
const closeScreen = inject<() => void>('close-screen')
const active = computed(() => isActive(page.value.relativePath, props.item.activeMatch || props.item.link, !!props.item.activeMatch))
</script>

<template>
  <VPLink
    class="VPNavScreenMenuLink"
    :class="{ active }"
    :aria-current="active ? 'true' : undefined"
    :href="item.link"
    :target="item.target"
    :rel="item.rel"
    :no-icon="item.noIcon"
    @click="closeScreen?.()"
  >{{ item.text }}</VPLink>
</template>

<style scoped>
.VPNavScreenMenuLink { display: block; border-bottom: 1px solid var(--vp-c-divider); padding: 12px 0 11px; line-height: 24px; font-size: 14px; font-weight: 500; color: var(--vp-c-text-1); }
.VPNavScreenMenuLink.active, .VPNavScreenMenuLink:hover { color: var(--vp-c-brand-1); }
</style>
