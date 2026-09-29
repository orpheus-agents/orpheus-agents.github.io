// A small copy of the web interface with example data. It follows the real screens:
// the session with its history, analytics and provider limits.

export type View = 'session' | 'analytics' | 'limits'

export interface Row {
  kind: 'user' | 'progress' | 'answer' | 'tool' | 'hook'
  /** Role of a message or name of a tool or a hook. */
  name: string
  time: string
  text: string
  /** Output of a tool call, hidden until opened. */
  output?: string
}

export interface Segment {
  label: string
  value: string
  /** Share of the bar, percent. */
  share: number
  tone: 'ink' | 'accent' | 'muted' | 'danger'
  /** A share nested in the previous segment is drawn hatched. */
  nested?: boolean
}

export interface ObserveCopy {
  title: string
  lead: string
  views: Record<View, string>
  label: string
  updated: string
  example: string
  action: string
  session: {
    namespace: string
    key: string
    status: string
    tokens: string
    usage: Segment[]
    history: string
    rows: Row[]
    done: string
    output: string
    run: string
    facts: [string, string][]
    configuration: string
    settings: [string, string][]
    sandbox: string
    sandboxState: string
    environment: [string, string][]
  }
  analytics: {
    metrics: { label: string, value: string, hint?: string, usage?: Segment[] }[]
    chart: string
    chartHint: string
    legend: { label: string, tone: Segment['tone'] }[]
    /** Runs by hour: completed, failed, in progress. */
    hours: [number, number, number][]
    interval: (hour: number, runs: [number, number, number]) => string
    namespaces: string
    ranks: { name: string, value: string, share: number }[]
  }
  limits: {
    hint: string
    account: string
    profiles: string
    fresh: string
    windows: { name: string, reset: string, left: number, word: string }[]
  }
}

const hours: [number, number, number][] = [
  [2, 1, 0], [1, 0, 0], [0, 0, 0], [1, 0, 0], [3, 0, 0], [6, 1, 0], [8, 0, 0], [12, 0, 0],
  [15, 0, 0], [19, 0, 0], [16, 1, 0], [11, 0, 0], [7, 0, 0], [9, 0, 0], [14, 0, 0], [17, 1, 0],
  [10, 0, 0], [8, 0, 0], [13, 0, 0], [16, 0, 0], [7, 1, 0], [9, 0, 0], [12, 0, 0], [5, 0, 3],
]

const usage = (labels: [string, string, string, string], values: [string, string, string, string]): Segment[] => [
  { label: labels[0], value: values[0], share: 82, tone: 'ink' },
  { label: labels[1], value: values[1], share: 44, tone: 'ink', nested: true },
  { label: labels[2], value: values[2], share: 18, tone: 'accent' },
  { label: labels[3], value: values[3], share: 6, tone: 'accent', nested: true },
]

const runs = (labels: [string, string, string, string]): Segment[] => [
  { label: labels[0], value: '224', share: 90.3, tone: 'ink' },
  { label: labels[1], value: '9', share: 3.6, tone: 'danger' },
  { label: labels[2], value: '3', share: 1.2, tone: 'muted' },
  { label: labels[3], value: '12', share: 4.9, tone: 'accent' },
]

const pad = (hour: number) => String(hour % 24).padStart(2, '0')

const ru: ObserveCopy = {
  title: 'Каждый шаг агента на виду',
  lead: 'Веб-интерфейс показывает историю работы, вызовы инструментов, ошибки и расход токенов.',
  views: { session: 'Сессия', analytics: 'Аналитика', limits: 'Лимиты' },
  label: 'Разделы веб-интерфейса',
  updated: 'Обновлено сейчас',
  example: 'Данные для примера',
  action: 'Веб-интерфейс в документации',
  session: {
    namespace: 'helpdesk',
    key: 'ticket:4821',
    status: 'Завершён',
    tokens: 'Токены сессии: 48,2 тыс.',
    usage: usage(['Ввод', 'Из кеша', 'Вывод', 'Рассуждение'], ['39,6 тыс.', '21 тыс.', '8,6 тыс.', '3,1 тыс.']),
    history: 'Диалог',
    rows: [
      { kind: 'user', name: 'Пользователь', time: '12:04', text: 'Клиент не может выгрузить отчёт. Пишет: permission denied.' },
      { kind: 'progress', name: 'Ассистент · ход работы', time: '12:04', text: 'Читаю тикет и ищу похожие случаи в базе знаний.' },
      { kind: 'tool', name: 'exec_command', time: '12:04', text: 'helpdesk tickets show 4821', output: 'Экспорт отчёта: permission denied\nРоль сотрудника клиента: Менеджер' },
      { kind: 'tool', name: 'exec_command', time: '12:05', text: 'kb search "экспорт отчёта права"', output: 'kb/reports/export-permissions.md' },
      { kind: 'answer', name: 'Ассистент · ответ', time: '12:05', text: 'У роли «Менеджер» нет права «Экспорт отчётов». Проверить: Настройки → Роли → Менеджер.' },
      { kind: 'hook', name: 'after_run', time: '12:05', text: 'Comment published: HTTP 201' },
    ],
    done: 'Завершён',
    output: 'Результат · код завершения: 0',
    run: 'Запуск №1',
    facts: [['Принят', '12:04:10'], ['Агент запущен', '12:04:31'], ['Завершён', '12:05:50'], ['Длительность', '1 мин 40 с'], ['Токены', '48 200']],
    configuration: 'Конфигурация',
    settings: [['Профиль', 'default'], ['Бюджет токенов сессии', '500 000'], ['Таймаут запуска', '15 мин']],
    sandbox: 'Песочница',
    sandboxState: 'Удалена',
    environment: [['Шаблон', 'support'], ['Рабочая директория', '/workspace']],
  },
  analytics: {
    metrics: [
      { label: 'Активны сейчас', value: '12', hint: 'Незавершённые сессии за всё время' },
      { label: 'Запуски', value: '248', usage: runs(['Завершён', 'С ошибкой', 'Отменён', 'Выполняются']) },
      { label: 'Токены запусков', value: '14,8 млн', usage: usage(['Ввод', 'Из кеша', 'Вывод', 'Рассуждение'], ['12,8 млн', '4,1 млн', '1,9 млн', '760 тыс.']) },
      { label: 'Суммарное время запусков', value: '2 дн. 1 ч', hint: 'Полная длительность выбранных запусков' },
    ],
    chart: 'Динамика запусков',
    chartHint: 'Принятые запуски за каждый час',
    legend: [{ label: 'Завершён', tone: 'ink' }, { label: 'С ошибкой', tone: 'danger' }, { label: 'Выполняются', tone: 'accent' }],
    hours,
    interval: (hour, [done, failed, running]) => `С ${pad(hour)}:00 до ${pad(hour + 1)}:00. Запусков: ${done + failed + running}. Завершён: ${done}. С ошибкой: ${failed}. Выполняются: ${running}.`,
    namespaces: 'Запуски по пространствам имён',
    ranks: [
      { name: 'mattermost/assistant', value: '136', share: 100 },
      { name: 'helpdesk', value: '84', share: 62 },
      { name: 'mattermost/analysis', value: '28', share: 21 },
    ],
  },
  limits: {
    hint: 'Общие квоты каждой учётки, включая использование вне Orpheus.',
    account: 'support-team',
    profiles: 'Профили: default, deep-analysis',
    fresh: '3 минуты назад',
    windows: [
      { name: 'Основное окно', reset: 'Сброс через 2 ч 9 мин', left: 66, word: 'осталось' },
      { name: 'Дополнительное окно', reset: 'Сброс через 5 дн. 9 ч', left: 38, word: 'осталось' },
    ],
  },
}

const en: ObserveCopy = {
  title: 'Every step of the agent in view',
  lead: 'The web interface shows execution history, tool calls, errors and token usage.',
  views: { session: 'Session', analytics: 'Analytics', limits: 'Limits' },
  label: 'Sections of the web interface',
  updated: 'Updated now',
  example: 'Example data',
  action: 'Web interface in the guide',
  session: {
    namespace: 'helpdesk',
    key: 'ticket:4821',
    status: 'Completed',
    tokens: '48.2K session tokens',
    usage: usage(['Input', 'Cached', 'Output', 'Reasoning'], ['39.6K', '21K', '8.6K', '3.1K']),
    history: 'Conversation',
    rows: [
      { kind: 'user', name: 'User', time: '12:04', text: 'The customer cannot export a report. It says: permission denied.' },
      { kind: 'progress', name: 'Assistant · progress', time: '12:04', text: 'Reading the ticket and looking for similar cases in the knowledge base.' },
      { kind: 'tool', name: 'exec_command', time: '12:04', text: 'helpdesk tickets show 4821', output: 'Report export: permission denied\nCustomer staff role: Manager' },
      { kind: 'tool', name: 'exec_command', time: '12:05', text: 'kb search "report export permissions"', output: 'kb/reports/export-permissions.md' },
      { kind: 'answer', name: 'Assistant · answer', time: '12:05', text: 'The Manager role lacks the “Export reports” permission. Check: Settings → Roles → Manager.' },
      { kind: 'hook', name: 'after_run', time: '12:05', text: 'Comment published: HTTP 201' },
    ],
    done: 'Completed',
    output: 'Output · exit code: 0',
    run: 'Run #1',
    facts: [['Accepted', '12:04:10'], ['Agent started', '12:04:31'], ['Finished', '12:05:50'], ['Duration', '1 min 40 s'], ['Tokens', '48,200']],
    configuration: 'Configuration',
    settings: [['Profile', 'default'], ['Session token budget', '500,000'], ['Run timeout', '15 min']],
    sandbox: 'Sandbox',
    sandboxState: 'Deleted',
    environment: [['Template', 'support'], ['Workspace', '/workspace']],
  },
  analytics: {
    metrics: [
      { label: 'Active now', value: '12', hint: 'Unfinished sessions, across all periods' },
      { label: 'Runs', value: '248', usage: runs(['Completed', 'Failed', 'Cancelled', 'In progress']) },
      { label: 'Run tokens', value: '14.8M', usage: usage(['Input', 'Cached', 'Output', 'Reasoning'], ['12.8M', '4.1M', '1.9M', '760K']) },
      { label: 'Combined run time', value: '2 d 1 h', hint: 'Full duration of selected runs' },
    ],
    chart: 'Run activity',
    chartHint: 'Runs accepted in each hour',
    legend: [{ label: 'Completed', tone: 'ink' }, { label: 'Failed', tone: 'danger' }, { label: 'In progress', tone: 'accent' }],
    hours,
    interval: (hour, [done, failed, running]) => `From ${pad(hour)}:00 to ${pad(hour + 1)}:00. Runs: ${done + failed + running}. Completed: ${done}. Failed: ${failed}. In progress: ${running}.`,
    namespaces: 'Runs by namespace',
    ranks: [
      { name: 'mattermost/assistant', value: '136', share: 100 },
      { name: 'helpdesk', value: '84', share: 62 },
      { name: 'mattermost/analysis', value: '28', share: 21 },
    ],
  },
  limits: {
    hint: 'Shared quotas for each account, including usage outside Orpheus.',
    account: 'support-team',
    profiles: 'Profiles: default, deep-analysis',
    fresh: '3 minutes ago',
    windows: [
      { name: 'Primary window', reset: 'Resets in 2 h 9 min', left: 66, word: 'left' },
      { name: 'Secondary window', reset: 'Resets in 5 d 9 h', left: 38, word: 'left' },
    ],
  },
}

export const observeCopy = { ru, en }
