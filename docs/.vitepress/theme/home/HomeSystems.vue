<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { systemsCopy } from './systems'
import { useHome } from './copy'

const { lang } = useData()
const { link } = useHome()
const copy = computed(() => lang.value === 'ru' ? systemsCopy.ru : systemsCopy.en)
</script>

<template>
  <section id="systems" class="home-section home-systems">
    <div class="home-wrap">
      <h2 class="home-title">{{ copy.title }}</h2>
      <p class="home-lead">{{ copy.lead }}</p>
      <div class="systems-groups">
        <div v-for="group in copy.groups" :key="group.title" class="systems-group">
          <h3>{{ group.title }}</h3>
          <ul>
            <li v-for="system in group.systems" :key="system.name" :class="system.way">
              <img class="home-logo" :src="`/brand/systems/${system.logo}.svg`" alt="" width="32" height="28" loading="lazy">
              <span>{{ system.name }}<small>{{ copy.ways[system.way] }}</small></span>
            </li>
          </ul>
        </div>
      </div>
      <div class="systems-more">
        <div v-for="note in copy.notes" :key="note.title">
          <h3>{{ note.title }}</h3>
          <p>{{ note.text }}</p>
        </div>
        <div class="systems-api">
          <h3>{{ copy.api.title }}</h3>
          <p>{{ copy.api.text }}</p>
          <a :href="link('/integrations/custom/overview')">{{ copy.api.action }} <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.systems-groups {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin-top: 56px;
  border-top: 1px solid var(--ink);
}
.systems-group { padding: 0 24px 8px; border-left: 1px solid var(--line); }
.systems-group:first-child { padding-left: 0; border-left: 0; }
.systems-group:last-child { padding-right: 0; }
.systems-group h3 { padding: 18px 0 14px; font-size: 15px; font-weight: 400; color: var(--muted); }
.systems-group li {
  display: flex;
  align-items: center;
  gap: 14px;
  min-height: 68px;
  border-top: 1px solid var(--line);
  font-size: 17px;
  font-weight: 600;
  line-height: 1.25;
}
.systems-group img { flex: none; width: 32px; height: 28px; object-fit: contain; }
.systems-group small { display: flex; align-items: center; gap: 6px; margin-top: 3px; font-size: 12px; font-weight: 400; color: var(--muted); }
.systems-group .connector small { color: var(--accent-ink); }
.systems-group .connector small::before { content: ''; width: 6px; height: 6px; background: var(--accent); }
.systems-more {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 32px 48px;
  margin-top: 48px;
}
.systems-more h3 { font-size: 18px; font-weight: 600; line-height: 1.3; }
.systems-more p { max-width: 420px; margin-top: 6px; font-size: 16px; line-height: 1.6; color: var(--muted); }
.systems-api a { display: inline-block; margin-top: 12px; font-size: 15px; font-weight: 600; color: var(--ink); transition: color .18s ease; }
.systems-api a span { color: var(--accent-ink); }
.systems-api a:hover { color: var(--accent-ink); }
@media (max-width: 1099px) {
  .systems-groups { grid-template-columns: repeat(2, minmax(0, 1fr)); border-top: 0; }
  .systems-group { padding: 0 24px 32px 0; border-left: 0; border-top: 1px solid var(--ink); }
  .systems-group:last-child { padding-right: 24px; }
}
@media (max-width: 767px) {
  .systems-groups { margin-top: 40px; column-gap: 20px; }
  .systems-group, .systems-group:last-child { padding: 0 0 28px; }
  .systems-group li { min-height: 64px; gap: 10px; font-size: 15px; }
  .systems-group img { width: 26px; height: 22px; }
  .systems-more { grid-template-columns: minmax(0, 1fr); gap: 24px; margin-top: 16px; }
}
</style>
