<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import HomeField from './HomeField.vue'
import type { StringsOptions } from './strings'
import { lanes, type Beat, type FlowCopy, type Lane, type Scenario } from './flow'

const props = defineProps<{ scenario: Scenario, copy: FlowCopy, time: number, index: number }>()
const emit = defineEmits<{ seek: [time: number], scrub: [time: number], hold: [on: boolean] }>()

const field = ref<HTMLElement | null>(null)
const head = ref<HTMLElement | null>(null)
const clock = ref<HTMLElement | null>(null)
const strings = ref<InstanceType<typeof HomeField> | null>(null)
/** Space before the first moment and after the last one, px. */
const PAD = 24

// Lanes are strings. A beat plucks the lanes it touches.
const options: StringsOptions = {
  levels: (_, height) => lanes.map((_, index) => (index + 0.5) * height / lanes.length),
  traffic: 0,
}

const names = computed(() => lanes.map(lane => lane === 'source' ? props.scenario.source : props.copy.lanes[lane]))
const share = (time: number) => time / props.scenario.length
const left = (time: number) => `calc(${PAD}px + (100% - ${PAD * 2}px) * ${share(time)})`
const level = (lane: Lane) => `${(lanes.indexOf(lane) + 0.5) * 100 / lanes.length}%`

const busy = computed(() => {
  const beat = props.scenario.beats[props.index]
  return beat ? [beat.lane, beat.to] : []
})

const stages = computed(() => {
  const marks = props.scenario.beats.filter(beat => beat.state)
  return marks.slice(0, -1).map((beat, index) => ({
    state: beat.state!,
    from: share(beat.at),
    to: share(marks[index + 1].at),
  }))
})
const finish = computed(() => props.scenario.beats.find(beat => beat.state === 'completed'))
const started = computed(() => props.scenario.beats.find(beat => beat.state)?.at ?? 0)

function span(beat: Beat) {
  const from = lanes.indexOf(beat.lane)
  const to = lanes.indexOf(beat.to!)
  return {
    left: left(beat.at),
    top: `${(Math.min(from, to) + 0.5) * 100 / lanes.length}%`,
    height: `${Math.abs(to - from) * 100 / lanes.length}%`,
  }
}

function position(time: number) {
  const width = field.value?.clientWidth ?? 0
  return PAD + (width - PAD * 2) * share(time)
}

function draw() {
  if (!field.value || !head.value || !clock.value) return
  head.value.style.transform = `translateX(${position(props.time)}px)`
  field.value.style.setProperty('--now', String(share(props.time)))
  const seconds = Math.round(Math.max(0, Math.min(props.time, finish.value?.at ?? props.scenario.length) - started.value) * props.scenario.pace)
  clock.value.textContent = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`
}

watch(() => [props.time, props.scenario], draw)
onMounted(() => {
  draw()
  if (field.value) new ResizeObserver(draw).observe(field.value)
})

// A new beat plucks its lane. The lane that receives the handoff answers a moment later.
watch(() => props.index, (index, previous) => {
  const beat = props.scenario.beats[index]
  if (!beat || index <= previous) return
  const x = position(beat.at)
  strings.value?.pluck(lanes.indexOf(beat.lane), x, -260)
  if (beat.to) {
    const target = lanes.indexOf(beat.to)
    setTimeout(() => strings.value?.pluck(target, x, target > lanes.indexOf(beat.lane) ? 200 : -200), 180)
  }
})

function moment(event: PointerEvent) {
  const bounds = field.value!.getBoundingClientRect()
  return (event.clientX - bounds.left - PAD) / (bounds.width - PAD * 2) * props.scenario.length
}

function onDown(event: PointerEvent) {
  if (event.button !== 0 || (event.target as HTMLElement).closest('button')) return
  field.value!.setPointerCapture(event.pointerId)
  emit('hold', true)
  emit('scrub', moment(event))
}

function onMove(event: PointerEvent) {
  if (field.value?.hasPointerCapture(event.pointerId)) emit('scrub', moment(event))
}

function onUp(event: PointerEvent) {
  if (!field.value?.hasPointerCapture(event.pointerId)) return
  field.value.releasePointerCapture(event.pointerId)
  emit('hold', false)
}
</script>

<template>
  <div class="score">
    <div class="score-names" aria-hidden="true">
      <div v-for="(name, index) in names" :key="index" class="score-name" :class="{ busy: busy.includes(lanes[index]) }">{{ name }}</div>
    </div>
    <div
      ref="field"
      class="score-field"
      role="group"
      :aria-label="copy.score"
      @pointerdown="onDown"
      @pointermove="onMove"
      @pointerup="onUp"
      @pointercancel="onUp"
    >
      <HomeField ref="strings" :options="options" />
      <div
        v-for="stage in stages"
        :key="stage.state"
        class="score-stage"
        :class="stage.state"
        :style="{ left: left(stage.from * scenario.length), width: `calc((100% - ${PAD * 2}px) * ${stage.to - stage.from})`, top: level('orpheus'), '--from': stage.from, '--to': stage.to }"
      >
        <i />
        <span>{{ copy.states[stage.state] }}</span>
      </div>
      <div v-if="finish" class="score-stage completed" :class="{ reached: time >= finish.at }" :style="{ left: left(finish.at), top: level('orpheus') }">
        <span>{{ copy.states.completed }}</span>
      </div>
      <template v-for="(beat, index) in scenario.beats" :key="beat.at">
        <div v-if="beat.to" class="score-link" :class="{ done: index <= props.index, now: index === props.index, up: lanes.indexOf(beat.to) < lanes.indexOf(beat.lane) }" :style="span(beat)"><i /></div>
        <i v-if="beat.to" class="score-end" :class="{ done: index <= props.index, now: index === props.index }" :style="{ left: left(beat.at), top: level(beat.to) }" />
        <button
          type="button"
          class="score-beat"
          :class="{ done: index <= props.index, now: index === props.index }"
          :style="{ left: left(beat.at), top: level(beat.lane) }"
          :aria-label="beat.caption"
          :aria-current="index === props.index ? 'step' : undefined"
          @click="emit('seek', beat.at)"
        />
      </template>
      <div ref="head" class="score-head" aria-hidden="true"><span ref="clock">00:00</span></div>
    </div>
  </div>
</template>

<style scoped>
.score {
  --lane: 52px;
  display: grid;
  grid-template-columns: 200px minmax(0, 1fr);
  border: 1px solid var(--line);
  background: var(--bg-raised);
}
.score-names { border-right: 1px solid var(--line); padding-top: 28px; }
.score-name {
  display: flex;
  align-items: center;
  height: var(--lane);
  padding: 0 20px;
  font-size: 14px;
  color: var(--muted);
  transition: color .3s ease;
}
.score-name.busy { color: var(--ink); font-weight: 600; }
.score-field {
  /* Lanes are a little stronger than the rules of the page. */
  --line: #cdc7bc;
  position: relative;
  height: calc(var(--lane) * 5);
  margin-top: 28px;
  cursor: ew-resize;
  touch-action: pan-y;
}
:global(.dark) .score-field { --line: #3e3e44; }
.score-beat, .score-end {
  position: absolute;
  width: 9px;
  height: 9px;
  margin: -4.5px 0 0 -4.5px;
  border: 1px solid var(--muted);
  background: var(--bg-raised);
  transition: background-color .25s ease, border-color .25s ease, transform .25s ease;
}
.score-beat { cursor: pointer; }
.score-beat::before { content: ''; position: absolute; inset: -12px; }
.score-end { width: 5px; height: 5px; margin: -2.5px 0 0 -2.5px; }
.score-beat.done, .score-end.done { border-color: var(--ink); background: var(--ink); }
.score-beat.now, .score-end.now { border-color: var(--accent); background: var(--accent); }
.score-beat.now { transform: scale(1.45); }
.score-beat:hover { border-color: var(--accent-ink); }
.score-link { position: absolute; width: 1px; margin-left: -0.5px; background: var(--line); transition: background-color .25s ease; }
.score-link.done { background: color-mix(in srgb, var(--ink) 45%, transparent); }
.score-link.now { background: var(--accent); }
.score-link i { position: absolute; left: -2px; top: 0; width: 5px; height: 5px; background: var(--accent); opacity: 0; }
.score-link.now i { animation: score-pass .7s cubic-bezier(.3, 0, .2, 1) both; }
.score-link.now.up i { animation-name: score-pass-up; }
@keyframes score-pass {
  from { top: 0; opacity: 1; }
  to { top: calc(100% - 5px); opacity: 0; }
}
@keyframes score-pass-up {
  from { top: calc(100% - 5px); opacity: 1; }
  to { top: 0; opacity: 0; }
}
.score-stage { position: absolute; height: 0; }
.score-stage i {
  position: absolute;
  left: 0;
  top: -3px;
  height: 6px;
  width: calc(clamp(0, (var(--now) - var(--from)) / (var(--to) - var(--from)), 1) * 100%);
  background: var(--muted);
}
.score-stage.running i { background: var(--accent); }
.score-stage.finalizing i { background: var(--ink); }
.score-stage span {
  position: absolute;
  left: 8px;
  top: 9px;
  font-size: 12px;
  line-height: 1;
  white-space: nowrap;
  color: var(--muted);
}
.score-stage.completed span { opacity: 0; transition: opacity .3s ease; }
.score-stage.completed.reached span { opacity: 1; color: var(--ink); }
.score-head {
  position: absolute;
  top: -28px;
  left: 0;
  bottom: 0;
  width: 1px;
  margin-left: -0.5px;
  background: var(--accent);
  pointer-events: none;
}
.score-head span {
  position: absolute;
  top: 0;
  left: 0;
  padding: 4px 7px;
  background: var(--accent);
  color: #0e0e10;
  font: 500 11px/1 var(--font-mono);
  transform: translateX(-50%);
}
.score-beat:focus-visible { outline-offset: 5px; }
@media (max-width: 767px) {
  .score { --lane: 44px; grid-template-columns: 88px minmax(0, 1fr); }
  .score-name { padding: 0 8px 0 12px; font-size: 11px; line-height: 1.2; }
  .score-stage span { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .score-link.now i { animation: none; }
}
</style>
