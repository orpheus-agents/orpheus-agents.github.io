<script setup lang="ts">
import { computed, ref } from 'vue'
import { useData } from 'vitepress'
import ObserveBar from './ObserveBar.vue'
import { observeCopy, type View } from './observe'
import { useHome } from './copy'

const { lang } = useData()
const { link } = useHome()
const copy = computed(() => lang.value === 'ru' ? observeCopy.ru : observeCopy.en)
const views: View[] = ['session', 'analytics', 'limits']
const view = ref<View>('session')

const hours = computed(() => copy.value.analytics.hours)
const top = computed(() => Math.max(...hours.value.map(([done, failed, running]) => done + failed + running)))
const hour = ref(9)
// The chart shows the last 24 hours and ends with the current one.
const first = 9
const interval = computed(() => copy.value.analytics.interval(first + hour.value, hours.value[hour.value]))

function onKey(event: KeyboardEvent) {
  const step = { ArrowLeft: -1, ArrowRight: 1 }[event.key]
  if (!step) return
  event.preventDefault()
  view.value = views[(views.indexOf(view.value) + step + views.length) % views.length]
  ;(event.currentTarget as HTMLElement).querySelector<HTMLElement>(`#observe-tab-${view.value}`)?.focus()
}

function onChartKey(event: KeyboardEvent) {
  const step = { ArrowLeft: -1, ArrowRight: 1 }[event.key]
  if (!step) return
  event.preventDefault()
  hour.value = Math.max(0, Math.min(hours.value.length - 1, hour.value + step))
}
</script>

<template>
  <section id="observe" class="home-section home-observe">
    <div class="home-wrap">
      <h2 class="home-title">{{ copy.title }}</h2>
      <p class="home-lead">{{ copy.lead }}</p>
      <div class="observe-app">
        <header class="observe-top">
          <div class="observe-nav" role="tablist" :aria-label="copy.label" @keydown="onKey">
            <button
              v-for="name in views"
              :id="`observe-tab-${name}`"
              :key="name"
              type="button"
              role="tab"
              :aria-selected="view === name"
              aria-controls="observe-view"
              :tabindex="view === name ? 0 : -1"
              @click="view = name"
            >{{ copy.views[name] }}</button>
          </div>
          <p class="observe-state"><i aria-hidden="true" />{{ copy.updated }}</p>
        </header>
        <div id="observe-view" class="observe-view" role="tabpanel" :aria-labelledby="`observe-tab-${view}`">
          <div v-if="view === 'session'" class="observe-session">
            <div class="observe-main">
              <p class="observe-data">{{ copy.session.namespace }}</p>
              <h3 class="observe-name">{{ copy.session.key }}</h3>
              <p class="observe-status"><span><i aria-hidden="true" />{{ copy.session.status }}</span> {{ copy.session.tokens }}</p>
              <ObserveBar class="observe-total" :segments="copy.session.usage" />
              <div class="observe-panel observe-history">
                <h4>{{ copy.session.history }}</h4>
                <article v-for="row in copy.session.rows" :key="row.text" :class="row.kind">
                  <p class="observe-row">
                    <i aria-hidden="true" /><b>{{ row.name }}</b>
                    <span v-if="row.kind === 'tool' || row.kind === 'hook'"><i aria-hidden="true" />{{ copy.session.done }}</span>
                    <time>{{ row.time }}</time>
                  </p>
                  <template v-if="row.kind === 'tool'">
                    <p class="home-console observe-command"><span aria-hidden="true">$</span> {{ row.text }}</p>
                    <details>
                      <summary>{{ copy.session.output }}</summary>
                      <pre class="home-console">{{ row.output }}</pre>
                    </details>
                  </template>
                  <p v-else-if="row.kind === 'hook'" class="observe-data">{{ row.text }}</p>
                  <p v-else class="observe-text">{{ row.text }}</p>
                </article>
              </div>
            </div>
            <aside class="observe-side">
              <div class="observe-panel">
                <h4>{{ copy.session.run }} <span><i aria-hidden="true" />{{ copy.session.status }}</span></h4>
                <dl>
                  <div v-for="[name, value] in copy.session.facts" :key="name"><dt>{{ name }}</dt><dd>{{ value }}</dd></div>
                </dl>
              </div>
              <div class="observe-panel">
                <h4>{{ copy.session.configuration }}</h4>
                <dl>
                  <div v-for="[name, value] in copy.session.settings" :key="name"><dt>{{ name }}</dt><dd>{{ value }}</dd></div>
                </dl>
                <h4 class="observe-next">{{ copy.session.sandbox }} <span><i aria-hidden="true" />{{ copy.session.sandboxState }}</span></h4>
                <dl>
                  <div v-for="[name, value] in copy.session.environment" :key="name"><dt>{{ name }}</dt><dd>{{ value }}</dd></div>
                </dl>
              </div>
            </aside>
          </div>
          <div v-else-if="view === 'analytics'" class="observe-analytics">
            <div class="observe-metrics">
              <div v-for="metric in copy.analytics.metrics" :key="metric.label" class="observe-panel">
                <p class="observe-caps">{{ metric.label }}</p>
                <p class="observe-number">{{ metric.value }}</p>
                <ObserveBar v-if="metric.usage" :segments="metric.usage" />
                <p v-if="metric.hint" class="observe-hint">{{ metric.hint }}</p>
              </div>
            </div>
            <div class="observe-panel observe-chart">
              <div class="observe-chart-head">
                <div>
                  <h4>{{ copy.analytics.chart }}</h4>
                  <p class="observe-data">{{ copy.analytics.chartHint }}</p>
                </div>
                <ul>
                  <li v-for="item in copy.analytics.legend" :key="item.label"><i :class="item.tone" aria-hidden="true" />{{ item.label }}</li>
                </ul>
              </div>
              <div class="observe-bars" role="slider" tabindex="0" :aria-label="copy.analytics.chart" aria-valuemin="0" :aria-valuemax="hours.length - 1" :aria-valuenow="hour" :aria-valuetext="interval" @keydown="onChartKey">
                <div v-for="(runs, index) in hours" :key="index" class="observe-hour" :class="{ chosen: index === hour }" @pointerenter="hour = index" @click="hour = index">
                  <i class="accent" :style="{ height: `${runs[2] / top * 100}%` }" />
                  <i class="danger" :style="{ height: `${runs[1] / top * 100}%` }" />
                  <i class="ink" :style="{ height: `${runs[0] / top * 100}%` }" />
                </div>
              </div>
              <p class="observe-interval" aria-live="polite">{{ interval }}</p>
            </div>
            <div class="observe-panel observe-ranks">
              <p class="observe-caps">{{ copy.analytics.namespaces }}</p>
              <div v-for="rank in copy.analytics.ranks" :key="rank.name">
                <p><span>{{ rank.name }}</span><b>{{ rank.value }}</b></p>
                <i :style="{ width: `${rank.share}%` }" aria-hidden="true" />
              </div>
            </div>
          </div>
          <div v-else class="observe-limits">
            <p class="observe-hint">{{ copy.limits.hint }}</p>
            <div class="observe-panel">
              <div class="observe-account">
                <div>
                  <h4>{{ copy.limits.account }}</h4>
                  <p class="observe-data">{{ copy.limits.profiles }}</p>
                </div>
                <p class="observe-state"><i aria-hidden="true" />{{ copy.limits.fresh }}</p>
              </div>
              <div class="observe-windows">
                <div v-for="item in copy.limits.windows" :key="item.name">
                  <p class="observe-window"><b>{{ item.name }}</b><span>{{ item.reset }}</span></p>
                  <p class="observe-number">{{ item.left }} % <small>{{ item.word }}</small></p>
                  <div class="observe-left" aria-hidden="true"><i :style="{ width: `${item.left}%` }" /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p class="observe-foot"><span>{{ copy.example }}</span> <a :href="link('/web/overview')">{{ copy.action }} <span aria-hidden="true">→</span></a></p>
    </div>
  </section>
</template>

<style scoped>
.observe-app { margin-top: 56px; border: 1px solid var(--line); background: var(--bg); }
.observe-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 0 24px;
  border-bottom: 1px solid var(--line);
  background: var(--bg-raised);
}
.observe-nav { display: flex; gap: 28px; }
.observe-nav button {
  height: 52px;
  border-bottom: 2px solid transparent;
  font: 400 12px/1 var(--font-mono);
  letter-spacing: .08em;
  text-transform: uppercase;
  color: var(--muted);
  transition: color .18s ease, border-color .18s ease;
}
.observe-nav button:hover { color: var(--ink); }
.observe-nav button[aria-selected='true'] { border-color: var(--accent); font-weight: 600; color: var(--ink); }
.observe-state, .observe-data, .observe-caps, .observe-interval { font: 400 12px/1.5 var(--font-mono); color: var(--muted); }
.observe-state { display: flex; align-items: center; gap: 8px; white-space: nowrap; }
.observe-state i, .observe-status i, .observe-panel h4 span i, .observe-row span i { width: 8px; height: 8px; background: var(--accent); }
.observe-caps { font-size: 11px; letter-spacing: .08em; text-transform: uppercase; }
.observe-view { padding: 28px 24px 24px; animation: home-appear .3s ease both; }
.observe-panel { border: 1px solid var(--line); background: var(--bg-raised); }
.observe-panel h4 { display: flex; align-items: center; justify-content: space-between; gap: 12px; font: 700 19px/1.2 'Martian Grotesk', var(--vp-font-family-base); letter-spacing: -0.025em; }
.observe-panel h4 span, .observe-status span, .observe-row span { display: inline-flex; align-items: center; gap: 8px; font: 600 12px/1 var(--font-mono); letter-spacing: 0; color: var(--ink); }
.observe-session { display: grid; grid-template-columns: minmax(0, 1fr) 340px; align-items: start; gap: 24px; }
.observe-name { margin-top: 4px; font: 800 30px/1.1 var(--font-display); letter-spacing: -0.035em; }
.observe-status { display: flex; flex-wrap: wrap; gap: 6px 16px; margin-top: 14px; font: 400 12px/1.5 var(--font-mono); color: var(--muted); }
.observe-total { max-width: 400px; margin-top: 12px; }
.observe-history { margin-top: 24px; }
.observe-history h4 { padding: 20px 24px; border-bottom: 1px solid var(--line); }
.observe-history article { padding: 18px 24px; border-bottom: 1px solid var(--line); }
.observe-history article:last-child { border-bottom: 0; }
.observe-row { display: flex; align-items: center; gap: 8px; font: 400 12px/1.5 var(--font-mono); color: var(--muted); }
.observe-row > i { width: 8px; height: 8px; background: var(--accent); }
.user .observe-row > i { background: var(--ink); }
.tool .observe-row > i, .hook .observe-row > i { display: none; }
.observe-row b { font-weight: 600; letter-spacing: .08em; text-transform: uppercase; color: var(--ink); }
.tool .observe-row b, .hook .observe-row b { letter-spacing: 0; text-transform: none; }
.observe-row span i { background: var(--ink); }
.observe-row time { margin-left: auto; }
.observe-text { margin-top: 10px; font-size: 14px; line-height: 1.6; }
.observe-history .observe-data { margin-top: 10px; color: var(--ink); }
.observe-command { margin-top: 12px; padding: 12px 16px; font-size: 12px; overflow-wrap: anywhere; }
.observe-command span { color: var(--term-ok); }
.observe-history details { margin-top: 8px; }
.observe-history summary { font: 400 11px/1.5 var(--font-mono); letter-spacing: .08em; text-transform: uppercase; color: var(--muted); cursor: pointer; }
.observe-history summary:hover { color: var(--ink); }
.observe-history pre { margin-top: 8px; padding: 12px 16px; font-size: 12px; white-space: pre-wrap; color: var(--term-dim); }
.observe-side { display: grid; gap: 24px; }
.observe-side .observe-panel { padding: 20px; }
.observe-side dl { margin-top: 14px; }
.observe-side dl div { display: flex; justify-content: space-between; gap: 16px; padding: 5px 0; font-size: 13px; }
.observe-side dt { font: 400 12px/1.6 var(--font-mono); color: var(--muted); }
.observe-side dd { text-align: right; font-variant-numeric: tabular-nums; }
.observe-next { margin-top: 18px; padding-top: 18px; border-top: 1px solid var(--line); }
.observe-metrics { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; }
.observe-metrics .observe-panel { padding: 20px; }
.observe-number { margin: 10px 0 12px; font: 800 34px/1 var(--font-display); letter-spacing: -0.035em; }
.observe-number small { font: 400 12px/1 var(--font-mono); letter-spacing: 0; color: var(--muted); }
.observe-hint { font-size: 13px; line-height: 1.5; color: var(--muted); }
.observe-chart { margin-top: 16px; padding: 24px 24px 0; }
.observe-chart-head { display: flex; flex-wrap: wrap; align-items: start; justify-content: space-between; gap: 12px 24px; }
.observe-chart-head ul { display: flex; flex-wrap: wrap; gap: 4px 16px; font: 400 12px/1.5 var(--font-mono); }
.observe-chart-head li { display: flex; align-items: center; gap: 6px; }
.observe-chart-head li i { width: 8px; height: 8px; }
.ink { background: var(--ink); }
.accent { background: var(--accent); }
.danger { background: var(--danger); }
.observe-bars { display: flex; align-items: flex-end; gap: 2px; height: 190px; margin-top: 24px; border-bottom: 1px solid var(--line); }
.observe-hour { display: flex; flex: 1; flex-direction: column; justify-content: flex-end; min-width: 0; height: 100%; cursor: pointer; transition: background-color .15s ease; }
.observe-hour.chosen { background: var(--bg-subtle); }
.observe-hour i { display: block; width: 76%; margin: 0 auto; }
.observe-interval { margin: 0 -24px; padding: 14px 24px; background: var(--bg-subtle); color: var(--ink); }
.observe-ranks { margin-top: 16px; padding: 20px; }
.observe-ranks div { margin-top: 14px; }
.observe-ranks p:not(.observe-caps) { display: flex; justify-content: space-between; font: 400 13px/1.5 var(--font-mono); }
.observe-ranks span { color: var(--accent-ink); }
.observe-ranks div i { display: block; height: 8px; margin-top: 4px; background: var(--ink); }
.observe-limits .observe-panel { margin-top: 20px; padding: 24px; }
.observe-account { display: flex; align-items: start; justify-content: space-between; gap: 16px; }
.observe-account h4 { font: 600 17px/1.3 var(--font-mono); letter-spacing: 0; }
.observe-account .observe-state { color: var(--accent-ink); }
.observe-windows { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; margin-top: 20px; }
.observe-windows > div { padding: 16px; border: 1px solid var(--line); background: var(--bg); }
.observe-window { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 4px 12px; font-size: 14px; }
.observe-window b { font-weight: 500; }
.observe-window span { font: 400 12px/1.6 var(--font-mono); color: var(--muted); }
.observe-left { height: 6px; background: var(--line); }
.observe-left i { display: block; height: 100%; background: var(--ink); }
.observe-foot { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px 24px; margin-top: 16px; font-size: 14px; color: var(--muted); }
.observe-foot a { font-weight: 600; color: var(--ink); }
.observe-foot a span { color: var(--accent-ink); }
.observe-foot a:hover { color: var(--accent-ink); }
@media (max-width: 1099px) {
  .observe-session { grid-template-columns: minmax(0, 1fr); }
  .observe-side { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .observe-metrics { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 767px) {
  .observe-app { margin: 40px calc(var(--gutter) * -1) 0; border-left: 0; border-right: 0; }
  .observe-top { padding: 0 var(--gutter); }
  .observe-nav { gap: 20px; }
  .observe-state:not(.observe-account .observe-state) { display: none; }
  .observe-view { padding: 24px var(--gutter); }
  .observe-history h4, .observe-history article { padding-left: 16px; padding-right: 16px; }
  .observe-side, .observe-windows { grid-template-columns: minmax(0, 1fr); }
  .observe-metrics { gap: 12px; }
  .observe-metrics .observe-panel { padding: 16px; }
  .observe-number { font-size: 26px; }
  .observe-bars { height: 140px; gap: 1px; }
  .observe-account { flex-direction: column; }
}
@media (prefers-reduced-motion: reduce) {
  .observe-view { animation: none; }
}
</style>
