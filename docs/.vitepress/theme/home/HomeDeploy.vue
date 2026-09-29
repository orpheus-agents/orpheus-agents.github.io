<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { deployCopy } from './deploy'
import { useHome } from './copy'

const { lang } = useData()
const { link } = useHome()
const copy = computed(() => lang.value === 'ru' ? deployCopy.ru : deployCopy.en)
</script>

<template>
  <section id="deploy" class="home-section home-deploy">
    <div class="home-wrap">
      <h2 class="home-title">{{ copy.title }}</h2>
      <p class="home-lead">{{ copy.lead }}</p>
      <div class="deploy-needs">
        <h3>{{ copy.needs }}</h3>
        <table>
          <thead>
            <tr><th v-for="column in copy.columns" :key="column" scope="col">{{ column }}</th></tr>
          </thead>
          <tbody>
            <tr v-for="part in copy.parts" :key="part[0]">
              <th scope="row">{{ part[0] }}</th>
              <td>{{ part[1] }}</td>
              <td>{{ part[2] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <ul class="home-links" :aria-label="copy.operations">
        <li v-for="item in copy.links" :key="item.link"><a :href="link(item.link)">{{ item.text }} <span aria-hidden="true">→</span></a></li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.deploy-needs h3 { font: 700 clamp(1.4rem, 2.2vw, 1.85rem)/1.2 'Martian Grotesk', var(--vp-font-family-base); letter-spacing: -0.025em; }
.deploy-needs { margin-top: 64px; }
.deploy-needs table { width: 100%; margin-top: 24px; border-collapse: collapse; border-top: 1px solid var(--ink); text-align: left; }
.deploy-needs thead th { padding: 14px 24px 14px 0; font-size: 14px; font-weight: 400; color: var(--muted); }
.deploy-needs tbody th, .deploy-needs td { padding: 18px 24px 18px 0; border-top: 1px solid var(--line); font-size: 16px; line-height: 1.45; vertical-align: top; }
.deploy-needs tbody th { width: 34%; font-weight: 600; }
.deploy-needs td { color: var(--muted); }
.deploy-needs td:last-child { width: 26%; padding-right: 0; color: var(--ink); }
@media (max-width: 767px) {
  .deploy-needs { margin-top: 48px; }
  .deploy-needs thead { display: none; }
  .deploy-needs tr { display: block; padding: 16px 0; border-top: 1px solid var(--line); }
  .deploy-needs tbody th, .deploy-needs td, .deploy-needs td:last-child { display: block; width: auto; padding: 0; border: 0; }
  .deploy-needs td { margin-top: 4px; font-size: 15px; }
}
</style>
