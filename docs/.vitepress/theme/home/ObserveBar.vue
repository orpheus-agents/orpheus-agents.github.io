<script setup lang="ts">
import { computed } from 'vue'
import type { Segment } from './observe'

const props = defineProps<{ segments: Segment[] }>()
// A nested share belongs to the segment before it and is drawn hatched inside it.
const parts = computed(() => props.segments.flatMap((segment, index) => segment.nested
  ? []
  : [{ ...segment, inside: props.segments[index + 1]?.nested ? props.segments[index + 1].share / segment.share * 100 : 0 }]))
</script>

<template>
  <div class="observe-usage">
    <div class="observe-bar" aria-hidden="true">
      <i v-for="part in parts" :key="part.label" :class="part.tone" :style="{ width: `${part.share}%` }"><b v-if="part.inside" :style="{ width: `${part.inside}%` }" /></i>
    </div>
    <dl>
      <div v-for="segment in segments" :key="segment.label">
        <dt><i :class="[segment.tone, { hatched: segment.nested }]" aria-hidden="true" />{{ segment.label }}</dt>
        <dd>{{ segment.value }}</dd>
      </div>
    </dl>
  </div>
</template>

<style scoped>
.observe-bar { display: flex; height: 8px; background: var(--bg-subtle); }
.observe-bar i { position: relative; height: 100%; }
.observe-bar b { position: absolute; inset: 0 auto 0 0; }
.ink { --tone: var(--ink); }
.accent { --tone: var(--accent); }
.muted { --tone: var(--muted); }
.danger { --tone: var(--danger); }
.observe-bar i { background: var(--tone); }
.observe-bar b, .hatched { background: repeating-linear-gradient(135deg, var(--tone) 0 2px, var(--bg-raised) 2px 5px) !important; }
dl { display: flex; flex-wrap: wrap; gap: 4px 16px; margin-top: 8px; font: 400 12px/1.4 var(--font-mono); }
dl div { display: flex; align-items: center; gap: 6px; }
dt { display: flex; align-items: center; gap: 6px; color: var(--muted); }
dt i { width: 8px; height: 8px; background: var(--tone); }
dd { font-variant-numeric: tabular-nums; }
</style>
