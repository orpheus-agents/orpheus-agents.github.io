// Deployment: what a pilot needs and where the guide continues.

export interface DeployCopy {
  title: string
  lead: string
  needs: string
  columns: [string, string, string]
  parts: [string, string, string][]
  operations: string
  links: { text: string, link: string }[]
}

const ru: DeployCopy = {
  title: 'Работает в вашей инфраструктуре',
  lead: 'Orpheus, база данных и веб-интерфейс запускаются на вашем сервере. Агенты исполняются в песочницах AgentBox.',
  needs: 'Что потребуется для пилота',
  columns: ['Компонент', 'Зачем нужен', 'Кто управляет'],
  parts: [
    ['Orpheus, PostgreSQL, веб-интерфейс', 'Запуск задач, история и просмотр результатов', 'Ваша команда'],
    ['Mattermost и коннектор', 'Общение с агентом', 'Ваша команда'],
    ['Orpheus Space', 'Регулярные задания сотрудников, если нужны расписания', 'Ваша команда'],
    ['AgentBox', 'Окружение исполнения агентов', 'Ваш проект AgentBox'],
    ['Доступ к AI-модели', 'Выполнение задач агентом', 'Владелец ключа или аккаунта'],
    ['Корпоративные инструменты', 'Работа с источниками данных', 'Владельцы систем'],
  ],
  operations: 'Развёртывание и эксплуатация',
  links: [
    { text: 'Быстрый старт', link: '/getting-started/requirements' },
    { text: 'Развёртывание на сервере', link: '/operations/deployment' },
    { text: 'Запуск Space', link: '/space/setup' },
    { text: 'Вход через SSO', link: '/operations/sso' },
    { text: 'Домен и HTTPS', link: '/operations/network' },
    { text: 'Резервное копирование', link: '/operations/backup' },
    { text: 'Логи и проверка готовности', link: '/operations/monitoring' },
    { text: 'Таймауты и бюджет токенов', link: '/configuration/limits' },
  ],
}

const en: DeployCopy = {
  title: 'Runs in your infrastructure',
  lead: 'Orpheus, its database and the web interface run on your server. Agents work inside AgentBox sandboxes.',
  needs: 'What a pilot needs',
  columns: ['Component', 'Purpose', 'Managed by'],
  parts: [
    ['Orpheus, PostgreSQL and web interface', 'Run tasks, keep history and inspect results', 'Your team'],
    ['Mattermost and its connector', 'Converse with agents', 'Your team'],
    ['Orpheus Space', 'Recurring tasks for colleagues, when scheduling is needed', 'Your team'],
    ['AgentBox', 'Execute agents in sandboxes', 'Your AgentBox project'],
    ['AI model access', 'Power the agent', 'API key or account owner'],
    ['Company tools', 'Access business data', 'Owners of those systems'],
  ],
  operations: 'Deployment and operations',
  links: [
    { text: 'Quick start', link: '/getting-started/requirements' },
    { text: 'Server deployment', link: '/operations/deployment' },
    { text: 'Start Space', link: '/space/setup' },
    { text: 'Single sign-on', link: '/operations/sso' },
    { text: 'Domain and HTTPS', link: '/operations/network' },
    { text: 'Backup', link: '/operations/backup' },
    { text: 'Logs and readiness checks', link: '/operations/monitoring' },
    { text: 'Timeouts and token budget', link: '/configuration/limits' },
  ],
}

export const deployCopy = { ru, en }
