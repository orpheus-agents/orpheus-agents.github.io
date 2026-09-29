<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useData } from 'vitepress'
import FlowScore from './FlowScore.vue'
import FlowThread from './FlowThread.vue'
import FlowConsole from './FlowConsole.vue'
import { flowCopy } from './flow'
import { useMotion, prefersReducedMotion } from './motion'
import { useTimeline } from './timeline'

const { lang } = useData()
const copy = computed(() => lang.value === 'ru' ? flowCopy.ru : flowCopy.en)
const section = ref<HTMLElement | null>(null)
const active = ref(0)
const scenario = computed(() => copy.value.list[active.value])
const length = computed(() => scenario.value.length)

// After the last beat the score waits and the next scenario starts.
const { time, playing, allow, play, seek } = useTimeline(length, 3.2, () => {
  active.value = (active.value + 1) % copy.value.list.length
  seek(0)
})
useMotion(section, allow)
// Without motion the score shows the finished task. Steps are still there to explore.
const still = ref(false)
onMounted(() => {
  still.value = prefersReducedMotion()
  if (!still.value) return
  play(false)
  seek(length.value)
})

const beats = computed(() => scenario.value.beats)
const index = computed(() => beats.value.findLastIndex(beat => beat.at <= time.value))
const posts = computed(() => beats.value.slice(0, index.value + 1).flatMap(beat => beat.post ?? []))
const lines = computed(() => beats.value.slice(0, index.value + 1).flatMap(beat => beat.lines ?? []))
const state = computed(() => beats.value.slice(0, index.value + 1).findLast(beat => beat.state)?.state)
const caption = computed(() => beats.value[index.value]?.caption ?? '')
const bar = computed(() => [copy.value.lanes.sandbox.toLowerCase(), scenario.value.template, state.value ? copy.value.states[state.value].toLowerCase() : ''].filter(Boolean).join(' · '))

function choose(next: number) {
  active.value = next
  seek(still.value ? length.value : 0)
  play(!still.value)
}

function go(step: number) {
  const target = beats.value[Math.max(0, Math.min(beats.value.length - 1, index.value + step))]
  play(false)
  seek(target.at)
}

function toggle() {
  if (!playing.value && time.value >= length.value) seek(0)
  play(!playing.value)
}

function pick(moment: number) {
  play(false)
  seek(moment)
}

// Dragging holds the score. It goes on from the new moment when released.
let resume = false
function hold(on: boolean) {
  if (on) resume = playing.value
  play(on ? false : resume)
}

function onKey(event: KeyboardEvent) {
  const order = ['ArrowLeft', 'ArrowRight'].indexOf(event.key)
  if (order < 0) return
  event.preventDefault()
  const next = (active.value + (order ? 1 : -1) + copy.value.list.length) % copy.value.list.length
  choose(next)
  ;(event.currentTarget as HTMLElement).querySelectorAll('button')[next]?.focus()
}
</script>

<template>
  <section id="flow" ref="section" class="home-section home-flow">
    <div class="home-wrap">
      <h2 class="home-title">{{ copy.title }}</h2>
      <p class="home-lead">{{ copy.sub }}</p>
      <div class="flow-head">
        <div class="home-tabs" role="tablist" :aria-label="copy.scenarios" @keydown="onKey">
          <button
            v-for="(item, order) in copy.list"
            :id="`flow-tab-${item.id}`"
            :key="item.id"
            type="button"
            role="tab"
            :aria-selected="order === active"
            aria-controls="flow-stage"
            :tabindex="order === active ? 0 : -1"
            @click="choose(order)"
          >{{ item.tab }}</button>
        </div>
        <p class="flow-access"><span>{{ copy.access }}</span> {{ scenario.access }}</p>
      </div>
      <div id="flow-stage" class="flow-stage" role="tabpanel" :aria-labelledby="`flow-tab-${scenario.id}`">
        <FlowScore :scenario="scenario" :copy="copy" :time="time" :index="index" @seek="pick" @scrub="seek" @hold="hold" />
        <div class="flow-now">
          <div class="flow-controls">
            <button type="button" class="flow-control" :class="playing ? 'pause' : 'play'" :aria-label="playing ? copy.pause : copy.play" @click="toggle"><i /></button>
            <button type="button" class="flow-control" :aria-label="copy.previous" :disabled="index <= 0" @click="go(-1)">←</button>
            <button type="button" class="flow-control" :aria-label="copy.next" :disabled="index >= beats.length - 1" @click="go(1)">→</button>
          </div>
          <p class="flow-step">{{ copy.step(Math.max(1, index + 1), beats.length) }}</p>
          <p class="flow-caption" aria-live="polite">{{ caption }}</p>
        </div>
        <div class="flow-panels">
          <FlowThread :place="scenario.place" :posts="posts" :idle="copy.idle" />
          <FlowConsole :caption="bar" :lines="lines" :idle="copy.waiting" :label="copy.console" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.flow-head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px 32px;
  margin-top: 48px;
}
.flow-access { font-size: 14px; color: var(--ink); }
.flow-access span { margin-right: 8px; color: var(--muted); }
.flow-stage { margin-top: 24px; }
.flow-now {
  display: grid;
  grid-template-columns: auto auto minmax(0, 1fr);
  align-items: center;
  gap: 24px;
  min-height: 72px;
  padding: 12px 20px;
  border: 1px solid var(--line);
  border-top: 0;
  background: var(--bg-raised);
}
.flow-controls { display: flex; }
.flow-control {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  margin-left: -1px;
  border: 1px solid var(--line);
  font-size: 16px;
  color: var(--ink);
  transition: border-color .18s ease, color .18s ease;
}
.flow-control:first-child { margin-left: 0; border-color: var(--ink); background: var(--ink); color: var(--bg); }
.flow-control:not(:first-child):hover:not(:disabled) { position: relative; border-color: var(--ink); }
.flow-control:disabled { color: var(--line); cursor: default; }
.flow-control:active:not(:disabled) { transform: translateY(1px); }
.flow-control.play i { width: 0; height: 0; margin-left: 3px; border: solid transparent; border-width: 6px 0 6px 10px; border-left-color: currentColor; }
.flow-control.pause i { width: 10px; height: 12px; border: solid currentColor; border-width: 0 3px; }
.flow-step { font-size: 13px; color: var(--muted); white-space: nowrap; font-variant-numeric: tabular-nums; }
.flow-caption { font-size: 17px; line-height: 1.4; font-weight: 500; }
.flow-panels {
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
  gap: 24px;
  height: 380px;
  margin-top: 24px;
}
@media (max-width: 959px) {
  .flow-panels { grid-template-columns: minmax(0, 1fr); height: auto; }
  .flow-panels > * { height: 340px; }
}
@media (max-width: 767px) {
  .flow-head { margin-top: 32px; }
  .flow-now { grid-template-columns: auto minmax(0, 1fr); gap: 12px 16px; padding: 12px; }
  .flow-step { justify-self: end; }
  .flow-caption { grid-column: 1 / -1; min-height: 72px; font-size: 16px; }
}
</style>
