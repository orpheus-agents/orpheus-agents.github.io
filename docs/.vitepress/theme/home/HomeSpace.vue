<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useData } from 'vitepress'
import { spaceCopy, today } from './space'
import { useHome } from './copy'
import { prefersReducedMotion } from './motion'

const { lang } = useData()
const { link } = useHome()
const copy = computed(() => lang.value === 'ru' ? spaceCopy.ru : spaceCopy.en)
const initials = computed(() => copy.value.request.name.split(' ').map(part => part[0]).join('').toUpperCase())

// The week fills in day by day, once, when the board comes into view. Until then the runs
// of the past days stay hidden. Without scripts or motion the board shows the whole week.
const board = ref<HTMLElement | null>(null)
const armed = ref(false)
const live = ref(false)
let observer: IntersectionObserver | undefined

onMounted(() => {
  if (!board.value || prefersReducedMotion()) return
  armed.value = true
  observer = new IntersectionObserver(entries => {
    if (!entries.some(entry => entry.isIntersecting)) return
    live.value = true
    observer?.disconnect()
  }, { threshold: 0.4 })
  observer.observe(board.value)
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <section id="space" class="home-section home-space">
    <div class="home-wrap">
      <h2 class="home-title">{{ copy.title }}</h2>
      <p class="home-lead">{{ copy.lead }}</p>
      <div ref="board" class="space-board" :class="{ armed, live }">
        <header class="space-top">
          <p class="space-lockup">
            <img class="logo-light" src="/brand/orpheus-logo-light.svg" alt="Orpheus" width="128" height="20">
            <img class="logo-dark" src="/brand/orpheus-logo.svg" alt="Orpheus" width="128" height="20">
            <span>Space</span>
          </p>
          <p class="space-example">{{ copy.example }}</p>
        </header>
        <div class="space-request">
          <article class="thread-post person">
            <span class="thread-face" aria-hidden="true">{{ initials }}</span>
            <div>
              <p class="thread-name">{{ copy.request.name }} <span>{{ copy.request.mark }}</span></p>
              <p class="thread-text">{{ copy.request.text }}</p>
            </div>
          </article>
          <p class="space-note">{{ copy.request.note }}</p>
        </div>
        <div class="space-head" aria-hidden="true">
          <div class="space-days">
            <span v-for="(day, index) in copy.days" :key="day" class="space-day" :class="{ today: index === today }">
              {{ day }}<small v-if="index === today">{{ copy.today }}</small>
            </span>
          </div>
        </div>
        <article v-for="task in copy.tasks" :key="task.name" class="space-task">
          <div class="space-name">
            <h3>{{ task.name }}</h3>
            <p>{{ task.when }}</p>
          </div>
          <div class="space-days space-runs" role="img" :aria-label="task.summary">
            <span
              v-for="(day, index) in task.week"
              :key="index"
              class="space-day"
              :class="[day, { today: index === today }]"
              :style="{ '--day': index }"
              :data-day="copy.days[index]"
            ><i /></span>
          </div>
          <div class="space-latest" :class="{ ahead: task.ahead }">
            <p class="space-time">{{ task.time }}</p>
            <p class="space-text">{{ task.text }}</p>
          </div>
        </article>
      </div>
      <p class="space-foot"><span>{{ copy.access }}</span> <a :href="link('/space/overview')">{{ copy.action }} <span aria-hidden="true">→</span></a></p>
    </div>
  </section>
</template>

<style scoped>
.space-board { margin-top: 56px; border: 1px solid var(--line); background: var(--bg-raised); }
.space-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: 60px;
  padding: 0 24px;
  border-bottom: 1px solid var(--line);
}
/* The word sits on the baseline of the logo and has its cap height: 80 of 112 units,
   with 16 units below the baseline. Besley capitals are 0.75 em tall. */
.space-lockup { font: italic 500 calc(20px * 80 / 112 / 0.75)/1 'Besley', Georgia, serif; white-space: nowrap; }
.space-lockup img { height: 20px; width: auto; vertical-align: calc(20px * -16 / 112); }
.space-lockup span { margin-left: 9px; }
.space-example { font-size: 13px; color: var(--muted); }

.space-request, .space-head, .space-task {
  display: grid;
  grid-template-columns: minmax(0, 4fr) minmax(0, 5fr) minmax(0, 4fr);
  column-gap: 40px;
  padding: 0 24px;
}
/* The message spans the name and the week. The note stands over the answers. */
.space-request { align-items: center; padding-top: 22px; padding-bottom: 22px; border-bottom: 1px solid var(--line); background: var(--bg); }
.space-request .thread-post { grid-column: 1 / 3; }
.space-request .thread-text { font-size: 16px; }
.space-note { font-size: 15px; line-height: 1.5; color: var(--muted); }
.space-days { position: relative; display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); }
.space-head .space-days { grid-column: 2; }
.space-day { position: relative; display: grid; place-items: center; }
.space-day.today { background: var(--bg-subtle); }
.space-head .space-day { align-content: center; min-height: 58px; font-size: 13px; line-height: 1.3; color: var(--muted); }
.space-head .space-day.today { font-weight: 600; color: var(--ink); }
.space-head small { font-size: 11px; font-weight: 400; white-space: nowrap; color: var(--muted); }

.space-task { border-top: 1px solid var(--line); }
.space-name, .space-latest { padding: 24px 0; }
.space-name h3 { font-size: 18px; font-weight: 600; line-height: 1.3; }
.space-name p { margin-top: 4px; font-size: 15px; line-height: 1.5; color: var(--muted); }
/* A schedule is a string. Its runs are beats on the days of the week. */
.space-runs::before { content: ''; position: absolute; top: 50%; left: 0; right: 0; height: 1px; background: var(--string); }
.space-day i { position: relative; width: 12px; height: 12px; }
.space-day.done i { background: var(--ink); }
.space-day.latest i { background: var(--accent); }
.space-day.next i { border: 1px solid var(--muted); background: var(--bg-raised); }
.space-day.off i { display: none; }
.space-latest { align-self: center; }
.space-time { font-size: 13px; line-height: 1.5; color: var(--muted); }
.space-text { margin-top: 2px; font-size: 15px; line-height: 1.5; }
.space-latest.ahead .space-text { color: var(--muted); }

.space-board.armed:not(.live) .space-day:is(.done, .latest) i,
.space-board.armed:not(.live) .space-latest:not(.ahead) { opacity: 0; }
.space-board.live .space-day:is(.done, .latest) i {
  animation: space-beat .36s cubic-bezier(.2, .7, .2, 1) both;
  animation-delay: calc(var(--day) * 130ms + 120ms);
}
.space-board.live .space-latest:not(.ahead) { animation: home-appear .5s ease both; animation-delay: .8s; }
@keyframes space-beat {
  from { opacity: 0; transform: scale(.2); }
}

.space-foot { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px 24px; margin-top: 16px; font-size: 14px; color: var(--muted); }
.space-foot a { font-weight: 600; color: var(--ink); }
.space-foot a span { color: var(--accent-ink); }
.space-foot a:hover { color: var(--accent-ink); }

@media (max-width: 959px) {
  .space-request, .space-head, .space-task { column-gap: 24px; }
  /* The days are too narrow for the word under the name of today. */
  .space-head small { display: none; }
}
@media (max-width: 767px) {
  .space-board { margin: 40px calc(var(--gutter) * -1) 0; border-left: 0; border-right: 0; }
  .space-top { padding: 0 var(--gutter); }
  .space-head { display: none; }
  .space-request { display: block; padding: 20px var(--gutter); }
  .space-note { margin-top: 14px; }
  .space-task { display: block; padding: 24px var(--gutter); }
  .space-name, .space-latest { padding: 0; }
  .space-runs { height: 64px; margin-top: 18px; }
  .space-runs::before { top: 20px; }
  .space-runs .space-day { align-content: start; padding-top: 14px; }
  /* The header of days is hidden. Every beat carries the name of its day. */
  .space-runs .space-day::after {
    content: attr(data-day);
    position: absolute;
    top: 36px;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 11px;
    line-height: 1.3;
    color: var(--muted);
  }
  .space-runs .space-day.today::after { font-weight: 600; color: var(--ink); }
  .space-latest { margin-top: 18px; }
}
@media (prefers-reduced-motion: reduce) {
  .space-board.live .space-day i, .space-board.live .space-latest { animation: none; }
}
</style>
