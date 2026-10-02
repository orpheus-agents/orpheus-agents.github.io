// Recurring work in Orpheus Space: a week of three example schedules. A schedule is
// a string, and its runs are beats on the days of the week. Today is Thursday.
// The first schedule comes from a chat message to the agent.

/** A run on a day: finished, the latest one, still ahead, or no run that day. */
export type Day = 'done' | 'latest' | 'next' | 'off'

/** Index of today in the week. Weeks start on Monday. */
export const today = 3

export interface Task {
  name: string
  /** The repeat rule in words. */
  when: string
  week: Day[]
  /** Summary of the week for screen readers. */
  summary: string
  /** Time of the latest run, or of the next one when the schedule has not run this week. */
  time: string
  /** The answer of the agent, or a note about the next run. */
  text: string
  ahead?: boolean
}

export interface SpaceCopy {
  title: string
  lead: string
  example: string
  days: string[]
  today: string
  /** The chat message that set the first schedule, and a note about the other way. */
  request: { name: string, mark: string, text: string, note: string }
  tasks: Task[]
  /** Who signs in to Space. */
  access: string
  action: string
}

const weekdays: Day[] = ['done', 'done', 'done', 'latest', 'next', 'off', 'off']
const daily: Day[] = ['done', 'done', 'done', 'latest', 'next', 'next', 'next']
const fridays: Day[] = ['off', 'off', 'off', 'off', 'next', 'off', 'off']

const ru: SpaceCopy = {
  title: 'Поручайте регулярную работу',
  lead: 'В Orpheus Space сотрудники задают агенту расписание: утренняя сводка, проверка остатков, итоги недели. Агент выполняет работу в назначенное время.',
  example: 'Пример недели',
  days: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
  today: 'сегодня',
  request: {
    name: 'Марина Ковалёва',
    mark: 'сообщение агенту',
    text: '@orpheus По будням в 10:00 готовь сводку по обращениям.',
    note: 'Задание ставят сообщением в чате или в интерфейсе Space.',
  },
  tasks: [
    {
      name: 'Сводка по обращениям',
      when: 'по будням в 10:00',
      week: weekdays,
      summary: 'Выполнено с понедельника по четверг. Следующий запуск в пятницу.',
      time: 'Сегодня, 10:02',
      text: 'Открыто 14 обращений, 5 новых за сутки. Три ждут ответа больше суток.',
    },
    {
      name: 'Остатки на складе',
      when: 'каждый день в 08:00',
      week: daily,
      summary: 'Выполнено с понедельника по четверг. Следующие запуски с пятницы по воскресенье.',
      time: 'Сегодня, 08:01',
      text: 'Шесть позиций закончатся в течение недели. Список для закупки готов.',
    },
    {
      name: 'Итоги недели для руководителя',
      when: 'по пятницам в 17:00',
      week: fridays,
      summary: 'Запуск в пятницу.',
      time: 'Завтра, 17:00',
      text: 'Ближайший запуск',
      ahead: true,
    },
  ],
  access: 'Сотрудники входят в Space через SSO, отдельно от веб-интерфейса администраторов.',
  action: 'Orpheus Space в документации',
}

const en: SpaceCopy = {
  title: 'Delegate recurring work',
  lead: 'In Orpheus Space, colleagues give an agent a schedule: a morning summary, a stock check, a weekly report. The agent does the work at the scheduled time.',
  example: 'An example week',
  days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  today: 'today',
  request: {
    name: 'Maya Collins',
    mark: 'message to the agent',
    text: '@orpheus Prepare a support ticket summary at 10:00 on weekdays.',
    note: 'Set a schedule with a chat message or in the Space interface.',
  },
  tasks: [
    {
      name: 'Support ticket summary',
      when: 'weekdays at 10:00',
      week: weekdays,
      summary: 'Completed from Monday to Thursday. The next run is on Friday.',
      time: 'Today, 10:02',
      text: '14 open tickets, 5 new in the last day. Three have waited over a day for a reply.',
    },
    {
      name: 'Stock levels',
      when: 'every day at 08:00',
      week: daily,
      summary: 'Completed from Monday to Thursday. The next runs are from Friday to Sunday.',
      time: 'Today, 08:01',
      text: 'Six items will run out within a week. The purchase list is ready.',
    },
    {
      name: 'Weekly summary for the manager',
      when: 'Fridays at 17:00',
      week: fridays,
      summary: 'A run on Friday.',
      time: 'Tomorrow, 17:00',
      text: 'Next run',
      ahead: true,
    },
  ],
  access: 'Colleagues sign in to Space through SSO, separately from the administrators’ web interface.',
  action: 'Orpheus Space in the guide',
}

export const spaceCopy = { ru, en }
