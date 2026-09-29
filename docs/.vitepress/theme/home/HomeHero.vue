<script setup lang="ts">
import HomeField from './HomeField.vue'
import type { StringsOptions } from './strings'
import { useHome } from './copy'

defineProps<{ languageChoice?: boolean }>()
const { copy, link } = useHome()

// The ring stands to the right of the text. On narrow screens it moves under the buttons.
const strings: StringsOptions = {
  relief: (width, height) => width < 768
    ? { x: width / 2, y: height - 190, size: Math.min(width * 0.36, 150) }
    : { x: width * 0.74, y: height * 0.5, size: Math.min(width * 0.17, height * 0.31) },
  fade: width => width < 768
    ? { vertical: true, stops: [[0, 0.35], [0.55, 0.45], [0.7, 1]] }
    : { stops: [[0, 0.3], [0.42, 0.42], [0.56, 1]] },
}
</script>

<template>
  <section class="home-hero">
    <HomeField :options="strings" />
    <div class="home-wrap hero-inner">
      <h1>
        <template v-for="part in copy.hero.title" :key="part">
          <span class="hero-line">{{ part }}</span>{{ ' ' }}
        </template>
      </h1>
      <p class="hero-sub">{{ copy.hero.sub }}</p>
      <div class="hero-actions">
        <a class="home-button home-primary" :href="link('/getting-started/requirements')">{{ copy.start }} <span aria-hidden="true">→</span></a>
        <a v-if="languageChoice" class="home-button home-secondary" href="/ru/" lang="ru" hreflang="ru">Читать на русском</a>
        <a v-else class="home-button home-secondary" href="#flow">{{ copy.hero.demo }}</a>
      </div>
    </div>
  </section>
</template>
