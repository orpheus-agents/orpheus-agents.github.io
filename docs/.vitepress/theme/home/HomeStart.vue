<script setup lang="ts">
import { computed } from 'vue'
import HomeField from './HomeField.vue'
import type { StringsOptions } from './strings'
import { useHome } from './copy'

const { copy, link, prefix } = useHome()
// Strings stay quiet behind the text in the middle of the screen.
const strings: StringsOptions = {
  fade: () => ({ stops: [[0, 1], [0.22, 0.3], [0.78, 0.3], [1, 1]] }),
  traffic: 9,
}
const help = computed(() => `https://t.me/orymatom?text=${encodeURIComponent(copy.value.finish.message)}`)
</script>

<template>
  <section id="start" class="home-start">
    <HomeField :options="strings" />
    <div class="home-wrap">
      <h2 class="home-title">{{ copy.finish.title }}</h2>
      <p class="home-lead">{{ copy.finish.lead }}</p>
      <div class="start-actions">
        <a class="home-button home-primary" :href="link('/guide/overview')">{{ copy.finish.docs }} <span aria-hidden="true">→</span></a>
        <a class="home-button home-secondary" :href="help" target="_blank" rel="noopener">{{ copy.finish.help }}</a>
      </div>
    </div>
  </section>
  <section class="home-routes" :aria-label="copy.finish.routes">
    <div class="home-wrap">
      <a v-for="route in copy.finish.list" :key="route.link" :href="link(route.link)" class="home-route">
        <h3>{{ route.title }} <span aria-hidden="true">→</span></h3>
        <p>{{ route.text }}</p>
      </a>
    </div>
  </section>
  <footer class="home-footer">
    <div class="home-wrap">
      <p><img class="home-logo-own" src="/brand/orpheus-mark.svg" alt="" width="22" height="24"> Orpheus <span>{{ copy.finish.license }}</span></p>
      <nav :aria-label="copy.finish.more">
        <a :href="link('/guide/overview')">{{ copy.finish.docs }}</a>
        <a :href="`${prefix}/reference/api/`">HTTP API</a>
        <a href="https://github.com/orpheus-agents">GitHub</a>
        <a :href="`https://docs.agentbox.ru${prefix}/`">AgentBox</a>
      </nav>
    </div>
  </footer>
</template>

<style scoped>
.home-start { position: relative; overflow: hidden; border-bottom: 1px solid var(--line); }
.home-start .home-wrap { position: relative; display: flex; flex-direction: column; align-items: center; padding-top: 144px; padding-bottom: 144px; text-align: center; }
.home-start .home-title { max-width: 900px; font-size: clamp(2.25rem, 5vw, 4.25rem); }
.home-start .home-lead { max-width: 600px; }
.start-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-top: 40px; }
.home-routes .home-wrap { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); }
.home-route { padding: 40px 32px 48px; border-left: 1px solid var(--line); transition: background-color .2s ease; }
.home-route:first-child { padding-left: 0; border-left: 0; }
.home-route:last-child { padding-right: 0; }
.home-route h3 { font-size: 20px; font-weight: 600; line-height: 1.3; transition: color .2s ease; }
.home-route h3 span { margin-left: 6px; color: var(--accent-ink); }
.home-route p { max-width: 360px; margin-top: 10px; font-size: 16px; line-height: 1.6; color: var(--muted); }
.home-route:hover h3 { color: var(--accent-ink); }
.home-footer { border-top: 1px solid var(--line); }
.home-footer .home-wrap { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px 32px; padding-top: 28px; padding-bottom: 28px; }
.home-footer p { display: flex; align-items: center; gap: 10px; font-size: 14px; font-weight: 600; }
.home-footer p span { margin-left: 6px; font-weight: 400; color: var(--muted); }
.home-footer nav { display: flex; flex-wrap: wrap; gap: 8px 28px; }
.home-footer a { font-size: 14px; color: var(--muted); transition: color .18s ease; }
.home-footer a:hover { color: var(--ink); }
@media (max-width: 767px) {
  .home-start .home-wrap { align-items: stretch; padding-top: 96px; padding-bottom: 96px; text-align: left; }
  .start-actions { display: grid; }
  .home-routes .home-wrap { grid-template-columns: minmax(0, 1fr); }
  .home-route, .home-route:first-child, .home-route:last-child { padding: 28px 0; border-left: 0; border-top: 1px solid var(--line); }
  .home-route:first-child { border-top: 0; }
}
</style>
