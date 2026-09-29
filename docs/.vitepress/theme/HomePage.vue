<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
defineProps<{ languageChoice?: boolean }>()
const { lang } = useData()
const ru = computed(() => lang.value === 'ru')
const prefix = computed(() => ru.value ? '/ru' : '/en')
const routes = computed(() => ru.value ? [
  { title: 'Оценить возможности', text: 'Сценарии применения, требования и путь от пилота к рабочему процессу.', link: '/guide/overview' },
  { title: 'Развернуть Orpheus', text: 'От подготовки доступов до бота Mattermost и первой задачи в веб-интерфейсе.', link: '/getting-started/requirements' },
  { title: 'Подключить свою систему', text: 'Сессии, контекст и доставка результата. Пример обработки тикетов на Python.', link: '/integrations/custom/overview' },
] : [
  { title: 'Explore the platform', text: 'Use cases, requirements and the path from a pilot to a working process.', link: '/guide/overview' },
  { title: 'Deploy Orpheus', text: 'From credentials to a Mattermost bot and your first task in the web interface.', link: '/getting-started/requirements' },
  { title: 'Connect your system', text: 'Sessions, context and result delivery. A helpdesk example in Python.', link: '/integrations/custom/overview' },
])
</script>

<template>
  <main class="docs-home">
    <section class="home-intro">
      <div>
        <h1>{{ ru ? 'Платформа AI-агентов компании' : 'AI agents for your company' }}</h1>
        <p>{{ ru ? 'Соедините данные и инструменты компании. Помогайте сотрудникам и автоматизируйте рабочие процессы.' : 'Connect company data and tools. Help your colleagues and automate business processes.' }}</p>
        <nav v-if="languageChoice" class="home-actions" aria-label="Documentation language">
          <a class="home-primary" href="/en/" lang="en" hreflang="en">Read in English <span aria-hidden="true">→</span></a>
          <a class="home-secondary" href="/ru/" lang="ru" hreflang="ru">Читать на русском <span aria-hidden="true">→</span></a>
        </nav>
        <a v-else class="home-primary" :href="`${prefix}/getting-started/requirements.html`">{{ ru ? 'Начать работу' : 'Get started' }} <span aria-hidden="true">→</span></a>
      </div>
      <img class="home-mark" src="/brand/orpheus-mark.svg" alt="" width="176" height="176">
    </section>
    <section class="home-routes" :aria-label="ru ? 'Маршруты по документации' : 'Documentation paths'">
      <a v-for="route in routes" :key="route.link" :href="`${prefix}${route.link}.html`" class="home-route">
        <h2>{{ route.title }} <span aria-hidden="true">↗</span></h2>
        <p>{{ route.text }}</p>
      </a>
    </section>
    <section class="home-resources">
      <h2>{{ ru ? 'Рабочие инструменты' : 'Working with Orpheus' }}</h2>
      <div>
        <a :href="`${prefix}/integrations/mattermost/workflow.html`">Mattermost workflows</a>
        <a :href="`${prefix}/configuration/profiles.html`">{{ ru ? 'Профили агентов' : 'Agent profiles' }}</a>
        <a :href="`${prefix}/reference/api/`">HTTP API <span aria-hidden="true">↗</span></a>
        <a :href="`https://docs.agentbox.ru/${ru ? 'ru' : 'en'}/`">AgentBox <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  </main>
</template>
