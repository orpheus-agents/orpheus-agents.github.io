<script setup lang="ts">
import type { Line } from './flow'

defineProps<{ caption: string, lines: Line[], idle: string, label: string }>()
</script>

<template>
  <div class="home-console flow-console" role="img" :aria-label="label">
    <p class="home-console-bar">{{ caption }}</p>
    <div class="flow-console-lines">
      <p v-if="!lines.length" class="flow-console-idle">{{ idle }}</p>
      <p v-for="line in lines" :key="line.text" class="flow-console-line" :class="line.kind">{{ line.text }}</p>
    </div>
  </div>
</template>

<style scoped>
.flow-console { display: flex; flex-direction: column; height: 100%; }
.flow-console-lines {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 0;
  padding: 16px 20px 20px;
  overflow: hidden;
}
.flow-console-idle { margin: auto; color: var(--term-dim); }
.flow-console-line {
  position: relative;
  padding-left: 20px;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  animation: console-in .3s ease both;
}
@keyframes console-in {
  from { opacity: 0; }
}
.flow-console-line::before { position: absolute; left: 0; }
.flow-console-line.command { margin-top: 10px; color: var(--term-fg); }
.flow-console-line.command::before { content: '$'; color: var(--term-ok); }
.flow-console-line.output { color: var(--term-dim); }
.flow-console-line.agent { margin-top: 10px; color: var(--term-fg); }
.flow-console-line.agent::before { content: '>'; color: var(--term-dim); }
.flow-console-line.hook { margin-top: 10px; color: var(--term-ok); }
.flow-console-line.hook::before { content: '#'; color: var(--term-dim); }
@media (prefers-reduced-motion: reduce) {
  .flow-console-line { animation: none; }
}
</style>
