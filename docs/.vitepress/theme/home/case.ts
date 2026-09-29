// The RetailCRM case. Numbers come from the post https://t.me/dev_salikhov/52:
// support requests escalated to developers, by week. Two periods of twelve full weeks
// are compared. The week of 25 May crosses the border between them and stays out.

export type Series = 'requests' | 'hours'

/** Index of the week between the periods. Weeks start on Monday, 2 March 2026. */
export const border = 12

export const weeks: Record<Series, number[]> = {
  requests: [64, 68, 60, 57, 68, 72, 69, 77, 55, 61, 58, 52, 50, 48, 34, 43, 41, 37, 43, 37, 46, 27, 56, 37, 32],
  hours: [47.4, 52.4, 36.5, 35.6, 32.4, 32, 43.5, 56.9, 80.9, 30.5, 110.8, 22.9, 23.8, 60.6, 56.6, 27.7, 31.8, 32.9, 20.2, 26.6, 20.8, 18.2, 20.4, 10.6, 8.9],
}

/** Averages of the periods before and after. */
export const averages: Record<Series, [number, number]> = {
  requests: [63.4, 40.1],
  hours: [48.4, 28.5],
}

export interface CaseCopy {
  title: string
  lead: string
  metrics: { value: string, label: string, detail: string }[]
  chart: string
  series: Record<Series, string>
  before: string
  after: string
  quote: string
  author: string
  role: string
  post: string
}

const ru: CaseCopy = {
  title: 'RetailCRM: на 37% меньше обращений в разработку',
  lead: 'Orpheus с июня помогает техподдержке и дежурным разработчикам. Он подключён к коду, логам, задачам и релизам.',
  metrics: [
    { value: '−37%', label: 'обращений доходит до разработки', detail: 'Было 761, стало 481' },
    { value: '−27%', label: 'медиана времени решения', detail: 'Было 9,6 рабочего часа, стало 7,0' },
    { value: '−41%', label: 'среднее время решения', detail: 'Было 48,4 рабочего часа, стало 28,5' },
  ],
  chart: 'Обращения поддержки в разработку по неделям',
  series: { requests: 'Обращений в неделю', hours: 'Среднее время решения' },
  before: 'До Orpheus',
  after: 'С Orpheus',
  quote: 'Раньше посмотреть в код, релизы и логи могли только инженеры. Сейчас такой анализ делает даже первая линия поддержки вместе с Orpheus.',
  author: 'Ильяс Салихов',
  role: 'CTO RetailCRM',
  post: 'Читать пост в Telegram',
}

const en: CaseCopy = {
  title: 'RetailCRM: 37% fewer requests reach developers',
  lead: 'Since June Orpheus has been helping technical support and on-duty developers. It is connected to code, logs, tasks and releases.',
  metrics: [
    { value: '−37%', label: 'requests reach developers', detail: 'From 761 to 481' },
    { value: '−27%', label: 'median time to resolve', detail: 'From 9.6 to 7.0 working hours' },
    { value: '−41%', label: 'average time to resolve', detail: 'From 48.4 to 28.5 working hours' },
  ],
  chart: 'Support requests escalated to developers, by week',
  series: { requests: 'Requests a week', hours: 'Average time to resolve' },
  before: 'Before Orpheus',
  after: 'With Orpheus',
  quote: 'Only engineers could look into code, releases and logs before. Now even the first line of support does this analysis together with Orpheus.',
  author: 'Ilyas Salikhov',
  role: 'CTO of RetailCRM',
  post: 'Read the post on Telegram, in Russian',
}

export const caseCopy = { ru, en }
