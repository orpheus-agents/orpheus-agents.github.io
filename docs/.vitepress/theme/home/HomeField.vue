<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useData } from 'vitepress'
import { createStrings, type Strings, type StringsOptions } from './strings'
import { useMotion } from './motion'

const props = defineProps<{ options: StringsOptions }>()
const { isDark } = useData()
const canvas = ref<HTMLCanvasElement | null>(null)
let strings: Strings | undefined

onMounted(() => {
  const host = canvas.value?.parentElement
  if (canvas.value && host) strings = createStrings(canvas.value, host, props.options)
})
useMotion(canvas, on => strings?.play(on))
// Colours come from the theme tokens. Wait for the class change to reach the DOM.
watch(isDark, () => requestAnimationFrame(() => strings?.theme()))
onBeforeUnmount(() => strings?.destroy())
defineExpose({ pluck: (string: number, x: number, push: number) => strings?.pluck(string, x, push) })
</script>

<template>
  <canvas ref="canvas" class="home-field" aria-hidden="true" />
</template>
