// Systems of a company that connect to Orpheus. A label names the ready way to connect.
// Mattermost has a connector of Orpheus. A command line tool or an MCP server gives
// an agent access to a system. Messengers offer a Bot API for a connector of your own.
// Any other system connects through the HTTP API. Logos are files in /brand/systems.

/** Ready way to connect. `community` means MCP servers made by the community. */
export type Way = 'connector' | 'cli' | 'mcp' | 'both' | 'community' | 'bot'

export interface System {
  name: string
  logo: string
  way: Way
}

export interface Group {
  title: string
  systems: System[]
}

export interface SystemsCopy {
  title: string
  lead: string
  ways: Record<Way, string>
  groups: Group[]
  notes: { title: string, text: string }[]
  api: { title: string, text: string, action: string }
}

interface Names {
  messengers: string
  business: string
  trackers: string
  engineering: string
  yandexMessenger: string
  bitrix: string
  one: string
  yandexTracker: string
}

const groups = (names: Names): Group[] => [
  {
    title: names.messengers,
    systems: [
      { name: 'Mattermost', logo: 'mattermost', way: 'connector' },
      { name: 'Telegram', logo: 'telegram', way: 'bot' },
      { name: names.yandexMessenger, logo: 'yandex-messenger', way: 'bot' },
      { name: 'MAX', logo: 'max', way: 'bot' },
    ],
  },
  {
    title: names.business,
    systems: [
      { name: 'RetailCRM', logo: 'retailcrm', way: 'community' },
      { name: names.bitrix, logo: 'bitrix24', way: 'mcp' },
      { name: 'amoCRM', logo: 'amocrm', way: 'community' },
      { name: names.one, logo: '1c', way: 'community' },
      { name: 'YCLIENTS', logo: 'yclients', way: 'community' },
    ],
  },
  {
    title: names.trackers,
    systems: [
      { name: 'Redmine', logo: 'redmine', way: 'cli' },
      { name: names.yandexTracker, logo: 'yandex-tracker', way: 'mcp' },
      { name: names.bitrix, logo: 'bitrix24', way: 'mcp' },
    ],
  },
  {
    title: names.engineering,
    systems: [
      { name: 'GitLab', logo: 'gitlab', way: 'both' },
      { name: 'GitHub', logo: 'github', way: 'both' },
      { name: 'Sentry', logo: 'sentry', way: 'both' },
      { name: 'Grafana', logo: 'grafana', way: 'mcp' },
    ],
  },
]

const ru: SystemsCopy = {
  title: 'Подключайте свои системы',
  lead: 'Запускайте задачи прямо из мессенджеров и рабочих систем. Давайте агентам доступ к их данным.',
  ways: {
    connector: 'готовый коннектор',
    cli: 'CLI',
    mcp: 'MCP',
    both: 'CLI и MCP',
    community: 'MCP от сообщества',
    bot: 'Bot API',
  },
  groups: groups({
    messengers: 'Мессенджеры',
    business: 'CRM и учёт',
    trackers: 'Таск-трекеры',
    engineering: 'Разработка и мониторинг',
    yandexMessenger: 'Яндекс Мессенджер',
    bitrix: 'Битрикс24',
    one: '1С',
    yandexTracker: 'Яндекс Трекер',
  }),
  notes: [
    { title: 'Система запускает задачу', text: 'Новый тикет, заказ или сообщение создаёт задачу для агента.' },
    { title: 'Агент работает с системой', text: 'Через CLI или MCP агент читает данные и выполняет действия.' },
  ],
  api: {
    title: 'Есть API для любой вашей системы',
    text: 'Системы нет в списке? Небольшой коннектор переводит её события в задачи для Orpheus.',
    action: 'Подключить свою систему',
  },
}

const en: SystemsCopy = {
  title: 'Connect your systems',
  lead: 'Start tasks directly from messengers and business systems. Give agents access to their data.',
  ways: {
    connector: 'ready-made connector',
    cli: 'CLI',
    mcp: 'MCP',
    both: 'CLI and MCP',
    community: 'community MCP',
    bot: 'Bot API',
  },
  groups: groups({
    messengers: 'Messengers',
    business: 'CRM and accounting',
    trackers: 'Task trackers',
    engineering: 'Engineering and monitoring',
    yandexMessenger: 'Yandex Messenger',
    bitrix: 'Bitrix24',
    one: '1C',
    yandexTracker: 'Yandex Tracker',
  }),
  notes: [
    { title: 'A system starts a task', text: 'A new ticket, order or message creates a task for an agent.' },
    { title: 'An agent works with a system', text: 'Through a CLI or MCP the agent reads data and performs actions.' },
  ],
  api: {
    title: 'An API for any of your systems',
    text: 'Is your system missing from the list? A small connector turns its events into tasks for Orpheus.',
    action: 'Connect your system',
  },
}

export const systemsCopy = { ru, en }
