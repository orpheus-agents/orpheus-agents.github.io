<script setup lang="ts">
import { computed, ref } from 'vue'
import { useData } from 'vitepress'
import { averages, border, caseCopy, weeks, type Series } from './case'

const { lang } = useData()
const copy = computed(() => lang.value === 'ru' ? caseCopy.ru : caseCopy.en)
const series = ref<Series>('requests')
const names: Series[] = ['requests', 'hours']
const values = computed(() => weeks[series.value])
const top = computed(() => Math.max(...values.value))

// Average lines span their periods. The week between the periods belongs to neither.
const lines = computed(() => averages[series.value].map((value, index) => ({
  left: `${(index ? border + 1 : 0) / values.value.length * 100}%`,
  width: `${border / values.value.length * 100}%`,
  bottom: `${value / top.value * 100}%`,
})))

function onKey(event: KeyboardEvent) {
  if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
  event.preventDefault()
  series.value = series.value === 'requests' ? 'hours' : 'requests'
  ;(event.currentTarget as HTMLElement).querySelector<HTMLElement>(`#case-tab-${series.value}`)?.focus()
}
</script>

<template>
  <section id="case" class="home-section home-case">
    <div class="home-wrap">
      <h2 class="home-title">{{ copy.title }}</h2>
      <p class="home-lead">{{ copy.lead }}</p>
      <ul class="case-metrics">
        <li v-for="metric in copy.metrics" :key="metric.label">
          <b>{{ metric.value }}</b>
          <span>{{ metric.label }}</span>
          <small>{{ metric.detail }}</small>
        </li>
      </ul>
      <div class="case-body">
        <figure class="case-chart">
          <figcaption>{{ copy.chart }}</figcaption>
          <div class="home-tabs case-tabs" role="tablist" :aria-label="copy.chart" @keydown="onKey">
            <button
              v-for="name in names"
              :id="`case-tab-${name}`"
              :key="name"
              type="button"
              role="tab"
              :aria-selected="series === name"
              aria-controls="case-bars"
              :tabindex="series === name ? 0 : -1"
              @click="series = name"
            >{{ copy.series[name] }}</button>
          </div>
          <ul class="case-legend">
            <li class="before"><i aria-hidden="true" />{{ copy.before }}</li>
            <li><i aria-hidden="true" />{{ copy.after }}</li>
          </ul>
          <div id="case-bars" class="case-bars" role="img" :aria-label="`${copy.chart}. ${copy.series[series]}`">
            <div v-for="(value, index) in values" :key="index" class="case-week" :class="{ before: index < border, between: index === border }">
              <i :style="{ height: `${value / top * 100}%` }" />
            </div>
            <i v-for="(line, index) in lines" :key="index" class="case-average" :style="line" />
          </div>
        </figure>
        <figure class="case-quote">
          <blockquote>«{{ copy.quote }}»</blockquote>
          <figcaption>
            <img src="/brand/people/ilyas-salikhov.jpg" :alt="copy.author" width="64" height="64" loading="lazy">
            <span><b>{{ copy.author }}</b>{{ copy.role }}</span>
          </figcaption>
          <a href="https://t.me/dev_salikhov/52" target="_blank" rel="noopener">{{ copy.post }} <span aria-hidden="true">→</span></a>
        </figure>
      </div>
    </div>
  </section>
</template>

<style scoped>
.case-metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-top: 56px;
  border-top: 1px solid var(--ink);
}
.case-metrics li { display: grid; gap: 6px; padding: 28px 32px 32px; border-left: 1px solid var(--line); }
.case-metrics li:first-child { padding-left: 0; border-left: 0; }
.case-metrics b { font: 800 clamp(3rem, 6.4vw, 5.75rem)/1 var(--font-display); letter-spacing: -0.045em; }
.case-metrics span { font-size: 18px; font-weight: 600; line-height: 1.35; }
.case-metrics small { font-size: 15px; line-height: 1.5; color: var(--muted); }
.case-body {
  display: grid;
  grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
  align-items: stretch;
  gap: 24px;
  margin-top: 8px;
}
.case-chart, .case-quote { padding: 28px; border: 1px solid var(--line); background: var(--bg-raised); }
.case-chart { display: flex; flex-direction: column; }
.case-chart figcaption { font-size: 18px; font-weight: 600; line-height: 1.3; }
.case-tabs { margin-top: 16px; }
.case-tabs button { min-height: 38px; padding: 0 14px; font-size: 13px; }
.case-legend { display: flex; flex-wrap: wrap; gap: 6px 28px; margin-top: 20px; font-size: 14px; color: var(--muted); }
.case-legend li { display: flex; align-items: center; gap: 8px; }
.case-legend i { width: 8px; height: 8px; background: var(--accent); }
.case-legend .before i { background: color-mix(in srgb, var(--ink) 30%, var(--bg-raised)); }
.case-bars { position: relative; display: flex; flex: 1; align-items: flex-end; gap: 3px; min-height: 220px; margin-top: 20px; border-bottom: 1px solid var(--line); }
.case-week { display: flex; flex: 1; align-items: flex-end; min-width: 0; height: 100%; }
.case-week i { display: block; width: 100%; background: var(--accent); transition: height .5s cubic-bezier(.2, .7, .2, 1); }
.case-week.before i { background: color-mix(in srgb, var(--ink) 30%, var(--bg-raised)); }
.case-week.between i { background: repeating-linear-gradient(135deg, var(--muted) 0 1px, transparent 1px 5px); }
.case-average { position: absolute; height: 0; border-top: 1px dashed var(--ink); transition: bottom .5s cubic-bezier(.2, .7, .2, 1); }
.case-quote { display: flex; flex-direction: column; justify-content: space-between; gap: 32px; }
.case-quote blockquote { margin: 0; padding: 0; border: 0; font-size: clamp(1.3rem, 1.9vw, 1.65rem); font-weight: 500; line-height: 1.4; letter-spacing: -0.01em; text-wrap: pretty; }
.case-quote figcaption { display: flex; align-items: center; gap: 16px; }
.case-quote figcaption img { flex: none; width: 64px; height: 64px; object-fit: cover; }
.case-quote figcaption span { display: grid; gap: 2px; font-size: 15px; color: var(--muted); }
.case-quote figcaption b { font-size: 17px; font-weight: 600; color: var(--ink); }
.case-quote a { font-size: 15px; font-weight: 600; color: var(--ink); transition: color .18s ease; }
.case-quote a span { color: var(--accent-ink); }
.case-quote a:hover { color: var(--accent-ink); }
@media (max-width: 959px) {
  .case-body { grid-template-columns: minmax(0, 1fr); }
}
@media (max-width: 767px) {
  .case-metrics { grid-template-columns: minmax(0, 1fr); margin-top: 40px; }
  .case-metrics li, .case-metrics li:first-child { padding: 24px 0; border-left: 0; border-top: 1px solid var(--line); }
  .case-metrics li:first-child { border-top: 0; }
  .case-chart, .case-quote { padding: 20px; }
  .case-bars { min-height: 170px; gap: 2px; }
}
@media (prefers-reduced-motion: reduce) {
  .case-week i, .case-average { transition: none; }
}
</style>
