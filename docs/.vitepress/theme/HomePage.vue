<script setup lang="ts">
import HomeHero from './home/HomeHero.vue'
import HomeFlow from './home/HomeFlow.vue'
import HomeSystems from './home/HomeSystems.vue'
import HomeObserve from './home/HomeObserve.vue'
import HomeDeploy from './home/HomeDeploy.vue'
import HomeCase from './home/HomeCase.vue'
import HomeStart from './home/HomeStart.vue'
import './home/home.css'

defineProps<{ languageChoice?: boolean }>()
</script>

<template>
  <div class="docs-home">
    <HomeHero :language-choice="languageChoice" />
    <HomeFlow />
    <HomeSystems />
    <HomeObserve />
    <HomeDeploy />
    <HomeCase />
    <HomeStart />
  </div>
</template>
