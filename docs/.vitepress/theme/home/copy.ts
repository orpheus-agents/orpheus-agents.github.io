import { computed } from 'vue'
import { useData } from 'vitepress'

export interface HomeCopy {
  start: string
  /** The title is set in lines. */
  hero: { title: string[], sub: string, demo: string }
  finish: {
    title: string
    lead: string
    docs: string
    help: string
    /** Draft of the first message in Telegram. */
    message: string
    routes: string
    list: { title: string, text: string, link: string }[]
    more: string
  }
}

const ru: HomeCopy = {
  start: 'Начать работу',
  hero: {
    title: ['Платформа', 'AI-агентов', 'компании'],
    sub: 'Соедините данные и инструменты компании. Помогайте сотрудникам и автоматизируйте рабочие процессы.',
    demo: 'Как проходит задача',
  },
  finish: {
    title: 'Начните с одного процесса',
    lead: 'Выберите процесс с понятным входом и результатом. Поможем развернуть Orpheus и подключить ваши системы.',
    docs: 'Документация',
    help: 'Помочь с внедрением',
    message: 'Здравствуйте! Хочу внедрить Orpheus в компании. С чего начать?',
    routes: 'Маршруты по документации',
    list: [
      { title: 'Оценить возможности', text: 'Сценарии применения, требования и путь от пилота к рабочему процессу.', link: '/guide/use-cases' },
      { title: 'Развернуть Orpheus', text: 'От подготовки доступов до бота Mattermost и первой задачи в веб-интерфейсе.', link: '/getting-started/requirements' },
      { title: 'Подключить свою систему', text: 'Сессии, контекст и доставка результата. Пример обработки тикетов на Python.', link: '/integrations/custom/overview' },
    ],
    more: 'Ссылки',
  },
}

const en: HomeCopy = {
  start: 'Get started',
  hero: {
    title: ['AI agents', 'for your', 'company'],
    sub: 'Connect company data and tools. Help your colleagues and automate business processes.',
    demo: 'The path of a task',
  },
  finish: {
    title: 'Start with one process',
    lead: 'Choose a process with clear inputs and a defined result. We help deploy Orpheus and connect your systems.',
    docs: 'Documentation',
    help: 'Get help with deployment',
    message: 'Hello! I would like to deploy Orpheus in my company. Where do we start?',
    routes: 'Documentation paths',
    list: [
      { title: 'Explore the platform', text: 'Use cases, requirements and the path from a pilot to a working process.', link: '/guide/use-cases' },
      { title: 'Deploy Orpheus', text: 'From credentials to a Mattermost bot and your first task in the web interface.', link: '/getting-started/requirements' },
      { title: 'Connect your system', text: 'Sessions, context and result delivery. A helpdesk example in Python.', link: '/integrations/custom/overview' },
    ],
    more: 'Links',
  },
}

export function useHome() {
  const { lang } = useData()
  const isRu = computed(() => lang.value === 'ru')
  const copy = computed(() => isRu.value ? ru : en)
  const prefix = computed(() => isRu.value ? '/ru' : '/en')
  /** Link to a guide page in the current language. */
  const link = (path: string) => `${prefix.value}${path}${path.endsWith('/') ? '' : '.html'}`
  return { copy, isRu, prefix, link }
}
