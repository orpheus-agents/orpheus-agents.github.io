// The score of a task: who takes part and when. Four scenarios follow the use cases
// of the guide. Helpdesk, log and knowledge base tools are examples of company tools.

export type Lane = 'source' | 'orpheus' | 'sandbox' | 'model' | 'systems'
export type RunState = 'accepted' | 'starting' | 'running' | 'finalizing' | 'completed'

export const lanes: Lane[] = ['source', 'orpheus', 'sandbox', 'model', 'systems']
export const states: RunState[] = ['accepted', 'starting', 'running', 'finalizing', 'completed']

export interface Post {
  /** A person, the agent or a service record of the connector. */
  from: 'person' | 'agent' | 'service'
  name: string
  text: string
  /** A short mark next to the name. */
  mark?: string
  file?: string
}

export interface Line {
  kind: 'command' | 'output' | 'agent' | 'hook'
  text: string
}

export interface Beat {
  /** Seconds from the start of the score. */
  at: number
  lane: Lane
  /** The lane that receives the handoff. */
  to?: Lane
  caption: string
  state?: RunState
  post?: Post
  lines?: Line[]
}

export interface Scenario {
  id: string
  tab: string
  /** Name of the first lane and of the panel on the left. */
  source: string
  place: string
  /** What to connect for the scenario. */
  access: string
  template: string
  /** Length of the score, seconds. */
  length: number
  /** Seconds of the run in one second of the score. */
  pace: number
  beats: Beat[]
}

export interface FlowCopy {
  title: string
  sub: string
  scenarios: string
  access: string
  lanes: Record<Exclude<Lane, 'source'>, string>
  states: Record<RunState, string>
  play: string
  pause: string
  previous: string
  next: string
  step: (index: number, total: number) => string
  score: string
  console: string
  waiting: string
  idle: string
  list: Scenario[]
}

const ru: FlowCopy = {
  title: 'Как проходит задача',
  sub: 'Сотрудник пишет в чат или событие приходит из вашей системы. Агент собирает контекст, выполняет действия и возвращает результат.',
  scenarios: 'Сценарии',
  access: 'Что подключить',
  lanes: { orpheus: 'Orpheus', sandbox: 'Песочница', model: 'AI-модель', systems: 'Системы компании' },
  states: { accepted: 'Принят', starting: 'Запускается', running: 'Выполняется', finalizing: 'Финализация', completed: 'Завершён' },
  play: 'Запустить',
  pause: 'Остановить',
  previous: 'Предыдущий шаг',
  next: 'Следующий шаг',
  step: (index, total) => `Шаг ${index} из ${total}`,
  score: 'Партитура задачи. Выберите шаг, чтобы перейти к нему.',
  console: 'Консоль агента',
  waiting: 'Песочница ещё не создана',
  idle: 'Сообщений пока нет',
  list: [
    {
      id: 'ticket',
      tab: 'Ответ по тикету',
      source: 'Хелпдеск',
      place: 'Хелпдеск · тикет 4821',
      access: 'API хелпдеска и база знаний',
      template: 'support',
      length: 20,
      pace: 5,
      beats: [
        {
          at: 0.6, lane: 'source',
          caption: 'Клиент пишет в поддержку. В хелпдеске появляется тикет.',
          post: { from: 'person', name: 'Ольга Рябова', mark: 'клиент', text: 'Не могу выгрузить отчёт по заказам. Система пишет: permission denied.' },
        },
        {
          at: 2.4, lane: 'source', to: 'orpheus', state: 'accepted',
          caption: 'Ваш коннектор создаёт сессию одним запросом к API.',
          post: { from: 'service', name: 'Коннектор', text: 'POST /api/v1/sessions · 202 Accepted' },
        },
        {
          at: 4.2, lane: 'orpheus', to: 'sandbox', state: 'starting',
          caption: 'Orpheus создаёт песочницу из шаблона с инструментами компании.',
          lines: [{ kind: 'hook', text: 'песочница готова · шаблон support' }],
        },
        {
          at: 5.8, lane: 'sandbox',
          caption: 'Хук before_run готовит файл для ответа.',
          lines: [{ kind: 'hook', text: 'before_run · replies/8a61a76c.md' }],
        },
        {
          at: 7.4, lane: 'sandbox', to: 'model', state: 'running',
          caption: 'Агент получает задачу и инструкции.',
          lines: [{ kind: 'agent', text: 'Читаю тикет и ищу похожие случаи в базе знаний.' }],
        },
        {
          at: 9.2, lane: 'sandbox', to: 'systems',
          caption: 'Агент читает тикет через CLI хелпдеска.',
          lines: [
            { kind: 'command', text: 'helpdesk tickets show 4821' },
            { kind: 'output', text: 'Экспорт отчёта: permission denied\nРоль сотрудника клиента: Менеджер' },
          ],
        },
        {
          at: 11.6, lane: 'sandbox', to: 'systems',
          caption: 'Ищет причину в базе знаний.',
          lines: [
            { kind: 'command', text: 'kb search "экспорт отчёта права"' },
            { kind: 'output', text: 'kb/reports/export-permissions.md' },
          ],
        },
        {
          at: 14, lane: 'sandbox', to: 'model',
          caption: 'Готовит внутренний комментарий: причина, проверка, проект ответа.',
          lines: [{ kind: 'agent', text: 'У роли «Менеджер» нет права на экспорт. Записываю ответ в файл.' }],
        },
        {
          at: 16.2, lane: 'sandbox', to: 'source', state: 'finalizing',
          caption: 'Хук after_run публикует комментарий в тикете. Токен публикации агенту не выдан.',
          lines: [{ kind: 'hook', text: 'after_run · Comment published: HTTP 201' }],
          post: { from: 'agent', name: 'Orpheus', mark: 'внутренний комментарий', text: 'Вероятная причина: у роли «Менеджер» нет права «Экспорт отчётов».\nПроверить: Настройки → Роли → Менеджер.\nПроект ответа клиенту приложен ниже.' },
        },
        {
          at: 18.2, lane: 'orpheus', state: 'completed',
          caption: 'Запуск завершён. Оператор проверяет проект ответа. Клиенту ничего не отправлено.',
        },
      ],
    },
    {
      id: 'report',
      tab: 'Отчёт по данным',
      source: 'Mattermost',
      place: 'Mattermost · Аналитика',
      access: 'Вложение или API источника',
      template: 'analytics',
      length: 20,
      pace: 7,
      beats: [
        {
          at: 0.6, lane: 'source',
          caption: 'Сотрудник упоминает бота в канале и прикладывает таблицу.',
          post: { from: 'person', name: 'Дарья Семёнова', text: '@orpheus Посчитай выручку по менеджерам за сентябрь. Таблица во вложении.', file: 'sales-2026-09.csv' },
        },
        {
          at: 2.4, lane: 'source', to: 'orpheus', state: 'accepted',
          caption: 'Коннектор Mattermost создаёт сессию для треда.',
        },
        {
          at: 4.2, lane: 'orpheus', to: 'sandbox', state: 'starting',
          caption: 'Orpheus создаёт песочницу. Коннектор кладёт вложение в рабочий каталог.',
          lines: [{ kind: 'hook', text: 'before_run · attachments/sales-2026-09.csv' }],
        },
        {
          at: 6, lane: 'sandbox', to: 'model', state: 'running',
          caption: 'Агент получает задачу и путь к файлу.',
          lines: [{ kind: 'agent', text: 'Смотрю структуру таблицы.' }],
        },
        {
          at: 7.6, lane: 'sandbox',
          caption: 'Агент изучает файл.',
          lines: [
            { kind: 'command', text: 'head -3 attachments/sales-2026-09.csv' },
            { kind: 'output', text: 'manager,date,amount\nВершинина,2026-09-01,18400\nКасымов,2026-09-01,9900' },
          ],
        },
        {
          at: 10, lane: 'sandbox', to: 'source',
          caption: 'Промежуточное сообщение появляется в треде.',
          post: { from: 'agent', name: 'orpheus', mark: 'бот', text: 'В таблице 1 284 строки. Считаю выручку по менеджерам.' },
        },
        {
          at: 12, lane: 'sandbox', to: 'model',
          caption: 'Считает показатели и собирает файл отчёта.',
          lines: [
            { kind: 'command', text: 'python3 report.py attachments/sales-2026-09.csv' },
            { kind: 'output', text: 'report-2026-09.xlsx · 6 менеджеров' },
          ],
        },
        {
          at: 14.4, lane: 'sandbox',
          caption: 'Кладёт готовый файл в каталог исходящих файлов запуска.',
          lines: [{ kind: 'command', text: 'mv report-2026-09.xlsx "$OUTBOX"/' }],
        },
        {
          at: 16.2, lane: 'sandbox', to: 'source', state: 'finalizing',
          caption: 'После работы агента файл уходит в Mattermost.',
          lines: [{ kind: 'hook', text: 'after_run · report-2026-09.xlsx отправлен' }],
        },
        {
          at: 18.2, lane: 'orpheus', to: 'source', state: 'completed',
          caption: 'Ответ и файл приходят в исходный тред.',
          post: { from: 'agent', name: 'orpheus', mark: 'бот', text: 'Выручка за сентябрь: 4,82 млн ₽. Больше всех у Вершининой: 1,31 млн ₽. Отчёт во вложении.', file: 'report-2026-09.xlsx' },
        },
      ],
    },
    {
      id: 'incident',
      tab: 'Разбор ошибки',
      source: 'Mattermost',
      place: 'Mattermost · Дежурство',
      access: 'Инструмент чтения логов и документация',
      template: 'oncall',
      length: 20,
      pace: 9,
      beats: [
        {
          at: 0.6, lane: 'source',
          caption: 'Сотрудник описывает проблему и упоминает бота.',
          post: { from: 'person', name: 'Игорь Шаталов', text: '@orpheus После релиза клиенты получают 502 на /api/orders. Найди причину.' },
        },
        {
          at: 2.2, lane: 'source', to: 'orpheus', state: 'accepted',
          caption: 'Коннектор передаёт задачу и контекст треда.',
        },
        {
          at: 3.8, lane: 'orpheus', to: 'sandbox', state: 'starting',
          caption: 'Orpheus создаёт песочницу с доступом к логам.',
          lines: [{ kind: 'hook', text: 'песочница готова · шаблон oncall' }],
        },
        {
          at: 5.4, lane: 'sandbox', to: 'model', state: 'running',
          caption: 'Агент начинает с логов шлюза.',
          lines: [{ kind: 'agent', text: 'Смотрю логи шлюза за последний час.' }],
        },
        {
          at: 7, lane: 'sandbox', to: 'systems',
          caption: 'Запрашивает логи через CLI.',
          lines: [
            { kind: 'command', text: 'logs query \'status:502 path:/api/orders\' --since 1h' },
            { kind: 'output', text: '1 942 записи\nupstream orders-api: connect timeout' },
          ],
        },
        {
          at: 9.6, lane: 'source', to: 'sandbox',
          caption: 'Сотрудник уточняет задачу. Работающий агент получает сообщение сразу.',
          post: { from: 'person', name: 'Игорь Шаталов', mark: 'уточнение', text: '@orpheus Учти, что ошибка только у клиентов региона ru.' },
          lines: [{ kind: 'agent', text: 'Принял уточнение. Сужаю поиск до региона ru.' }],
        },
        {
          at: 12, lane: 'sandbox', to: 'systems',
          caption: 'Находит узел, который отдаёт ошибки.',
          lines: [
            { kind: 'command', text: 'logs query \'status:502 region:ru\' --since 1h --group upstream' },
            { kind: 'output', text: 'orders-api-ru-2 · 97% ошибок' },
          ],
        },
        {
          at: 14.4, lane: 'sandbox', to: 'systems',
          caption: 'Сверяет находку с регламентом.',
          lines: [
            { kind: 'command', text: 'rg -n "orders-api-ru" runbooks/' },
            { kind: 'output', text: 'runbooks/orders.md:42: пул соединений 50 → 20, релиз 4.18' },
          ],
        },
        {
          at: 16.4, lane: 'sandbox', to: 'orpheus', state: 'finalizing',
          caption: 'Агент закончил. Orpheus завершает запуск и сохраняет историю.',
        },
        {
          at: 18.2, lane: 'orpheus', to: 'source', state: 'completed',
          caption: 'Ответ с причиной и действиями приходит в тред.',
          post: { from: 'agent', name: 'orpheus', mark: 'бот', text: 'Причина: в релизе 4.18 пул соединений orders-api-ru-2 уменьшен с 50 до 20. Узел упирается в лимит и отвечает таймаутом.\nЧто сделать: вернуть значение 50 или снять узел с балансировки.' },
        },
      ],
    },
    {
      id: 'code',
      tab: 'Помощь разработчику',
      source: 'Mattermost',
      place: 'Mattermost · Разработка',
      access: 'Git, доступ к репозиторию и инструкции',
      template: 'backend',
      length: 20,
      pace: 14,
      beats: [
        {
          at: 0.6, lane: 'source',
          caption: 'Разработчик ставит задачу в канале команды.',
          post: { from: 'person', name: 'Тимур Галеев', text: '@orpheus В issue 482 ломается пагинация списка заказов. Найди причину и подготовь исправление.' },
        },
        {
          at: 2.2, lane: 'source', to: 'orpheus', state: 'accepted',
          caption: 'Коннектор создаёт сессию для треда.',
        },
        {
          at: 3.8, lane: 'orpheus', to: 'sandbox', state: 'starting',
          caption: 'Orpheus создаёт песочницу с Git и окружением проекта.',
          lines: [{ kind: 'hook', text: 'песочница готова · шаблон backend' }],
        },
        {
          at: 5.4, lane: 'sandbox', to: 'model', state: 'running',
          caption: 'Агент планирует работу.',
          lines: [{ kind: 'agent', text: 'Клонирую репозиторий и ищу расчёт страницы.' }],
        },
        {
          at: 7, lane: 'sandbox', to: 'systems',
          caption: 'Получает код из репозитория компании.',
          lines: [
            { kind: 'command', text: 'git clone --depth 1 git@git.example.com:shop/backend.git' },
            { kind: 'output', text: 'Cloning into \'backend\'... done.' },
          ],
        },
        {
          at: 9.4, lane: 'sandbox',
          caption: 'Находит строку с ошибкой.',
          lines: [
            { kind: 'command', text: 'rg -n "page_size" backend/src/orders/' },
            { kind: 'output', text: 'list.py:87:    offset = page * page_size' },
          ],
        },
        {
          at: 11.6, lane: 'sandbox', to: 'source',
          caption: 'Сообщает в тред, что нашёл.',
          post: { from: 'agent', name: 'orpheus', mark: 'бот', text: 'Нашёл причину: смещение считается от единицы. Исправляю и добавляю тест.' },
        },
        {
          at: 13.6, lane: 'sandbox',
          caption: 'Исправляет код и запускает тесты.',
          lines: [
            { kind: 'command', text: 'pytest tests/orders -q' },
            { kind: 'output', text: '41 passed in 3.82s' },
          ],
        },
        {
          at: 15.4, lane: 'sandbox', to: 'systems',
          caption: 'Отправляет ветку в репозиторий.',
          lines: [
            { kind: 'command', text: 'git push origin fix/pagination-482' },
            { kind: 'output', text: 'fix/pagination-482 -> origin' },
          ],
        },
        {
          at: 17, lane: 'sandbox', to: 'orpheus', state: 'finalizing',
          caption: 'Агент закончил. Песочница засыпает до следующего запроса в треде.',
        },
        {
          at: 18.4, lane: 'orpheus', to: 'source', state: 'completed',
          caption: 'Объяснение результата приходит в тред.',
          post: { from: 'agent', name: 'orpheus', mark: 'бот', text: 'Первая страница пропускала записи: смещение считалось как page × page_size. Исправление и регрессионный тест в ветке fix/pagination-482. Тесты проходят: 41 из 41.' },
        },
      ],
    },
  ],
}

const en: FlowCopy = {
  title: 'The path of a task',
  sub: 'A colleague asks in chat, or an event arrives from your system. An agent gathers context, performs actions and returns a result.',
  scenarios: 'Scenarios',
  access: 'Required access',
  lanes: { orpheus: 'Orpheus', sandbox: 'Sandbox', model: 'AI model', systems: 'Company systems' },
  states: { accepted: 'Accepted', starting: 'Starting', running: 'Running', finalizing: 'Finalizing', completed: 'Completed' },
  play: 'Play',
  pause: 'Pause',
  previous: 'Previous step',
  next: 'Next step',
  step: (index, total) => `Step ${index} of ${total}`,
  score: 'The score of a task. Choose a step to move to it.',
  console: 'Agent console',
  waiting: 'The sandbox is not created yet',
  idle: 'No messages yet',
  list: [
    {
      id: 'ticket',
      tab: 'Ticket reply',
      source: 'Helpdesk',
      place: 'Helpdesk · ticket 4821',
      access: 'Helpdesk API and knowledge base',
      template: 'support',
      length: 20,
      pace: 5,
      beats: [
        {
          at: 0.6, lane: 'source',
          caption: 'A customer writes to support. The helpdesk opens a ticket.',
          post: { from: 'person', name: 'Hannah Weiss', mark: 'customer', text: 'I cannot export the orders report. The system says: permission denied.' },
        },
        {
          at: 2.4, lane: 'source', to: 'orpheus', state: 'accepted',
          caption: 'Your connector creates a session with one API request.',
          post: { from: 'service', name: 'Connector', text: 'POST /api/v1/sessions · 202 Accepted' },
        },
        {
          at: 4.2, lane: 'orpheus', to: 'sandbox', state: 'starting',
          caption: 'Orpheus creates a sandbox from a template with company tools.',
          lines: [{ kind: 'hook', text: 'sandbox ready · template support' }],
        },
        {
          at: 5.8, lane: 'sandbox',
          caption: 'The before_run hook prepares a file for the reply.',
          lines: [{ kind: 'hook', text: 'before_run · replies/8a61a76c.md' }],
        },
        {
          at: 7.4, lane: 'sandbox', to: 'model', state: 'running',
          caption: 'The agent receives the task and its instructions.',
          lines: [{ kind: 'agent', text: 'Reading the ticket and looking for similar cases in the knowledge base.' }],
        },
        {
          at: 9.2, lane: 'sandbox', to: 'systems',
          caption: 'The agent reads the ticket through the helpdesk CLI.',
          lines: [
            { kind: 'command', text: 'helpdesk tickets show 4821' },
            { kind: 'output', text: 'Report export: permission denied\nCustomer staff role: Manager' },
          ],
        },
        {
          at: 11.6, lane: 'sandbox', to: 'systems',
          caption: 'It looks for the cause in the knowledge base.',
          lines: [
            { kind: 'command', text: 'kb search "report export permissions"' },
            { kind: 'output', text: 'kb/reports/export-permissions.md' },
          ],
        },
        {
          at: 14, lane: 'sandbox', to: 'model',
          caption: 'It prepares an internal comment: cause, checks and a draft reply.',
          lines: [{ kind: 'agent', text: 'The Manager role has no export permission. Writing the reply to the file.' }],
        },
        {
          at: 16.2, lane: 'sandbox', to: 'source', state: 'finalizing',
          caption: 'The after_run hook publishes the comment. The agent never gets the publishing token.',
          lines: [{ kind: 'hook', text: 'after_run · Comment published: HTTP 201' }],
          post: { from: 'agent', name: 'Orpheus', mark: 'internal comment', text: 'Likely cause: the Manager role lacks the “Export reports” permission.\nCheck: Settings → Roles → Manager.\nA draft reply to the customer follows.' },
        },
        {
          at: 18.2, lane: 'orpheus', state: 'completed',
          caption: 'The run is complete. An operator reviews the draft. Nothing is sent to the customer.',
        },
      ],
    },
    {
      id: 'report',
      tab: 'Data report',
      source: 'Mattermost',
      place: 'Mattermost · Analytics',
      access: 'Attachment or source API',
      template: 'analytics',
      length: 20,
      pace: 7,
      beats: [
        {
          at: 0.6, lane: 'source',
          caption: 'A colleague mentions the bot in a channel and attaches a spreadsheet.',
          post: { from: 'person', name: 'Priya Raman', text: '@orpheus Calculate September revenue by manager. The spreadsheet is attached.', file: 'sales-2026-09.csv' },
        },
        {
          at: 2.4, lane: 'source', to: 'orpheus', state: 'accepted',
          caption: 'The Mattermost connector creates a session for the thread.',
        },
        {
          at: 4.2, lane: 'orpheus', to: 'sandbox', state: 'starting',
          caption: 'Orpheus creates a sandbox. The connector places the attachment in the workspace.',
          lines: [{ kind: 'hook', text: 'before_run · attachments/sales-2026-09.csv' }],
        },
        {
          at: 6, lane: 'sandbox', to: 'model', state: 'running',
          caption: 'The agent receives the task and the file path.',
          lines: [{ kind: 'agent', text: 'Checking the structure of the spreadsheet.' }],
        },
        {
          at: 7.6, lane: 'sandbox',
          caption: 'The agent inspects the file.',
          lines: [
            { kind: 'command', text: 'head -3 attachments/sales-2026-09.csv' },
            { kind: 'output', text: 'manager,date,amount\nVershinina,2026-09-01,18400\nKasymov,2026-09-01,9900' },
          ],
        },
        {
          at: 10, lane: 'sandbox', to: 'source',
          caption: 'A progress message appears in the thread.',
          post: { from: 'agent', name: 'orpheus', mark: 'bot', text: 'The spreadsheet has 1,284 rows. Calculating revenue by manager.' },
        },
        {
          at: 12, lane: 'sandbox', to: 'model',
          caption: 'It calculates the metrics and builds the report file.',
          lines: [
            { kind: 'command', text: 'python3 report.py attachments/sales-2026-09.csv' },
            { kind: 'output', text: 'report-2026-09.xlsx · 6 managers' },
          ],
        },
        {
          at: 14.4, lane: 'sandbox',
          caption: 'It moves the finished file to the outbox of the run.',
          lines: [{ kind: 'command', text: 'mv report-2026-09.xlsx "$OUTBOX"/' }],
        },
        {
          at: 16.2, lane: 'sandbox', to: 'source', state: 'finalizing',
          caption: 'After the agent finishes, the file goes to Mattermost.',
          lines: [{ kind: 'hook', text: 'after_run · report-2026-09.xlsx sent' }],
        },
        {
          at: 18.2, lane: 'orpheus', to: 'source', state: 'completed',
          caption: 'The answer and the file arrive in the original thread.',
          post: { from: 'agent', name: 'orpheus', mark: 'bot', text: 'September revenue: 4.82M ₽. Vershinina leads with 1.31M ₽. The report is attached.', file: 'report-2026-09.xlsx' },
        },
      ],
    },
    {
      id: 'incident',
      tab: 'Error investigation',
      source: 'Mattermost',
      place: 'Mattermost · On-call',
      access: 'Log-reading tool and documentation',
      template: 'oncall',
      length: 20,
      pace: 9,
      beats: [
        {
          at: 0.6, lane: 'source',
          caption: 'A colleague describes the problem and mentions the bot.',
          post: { from: 'person', name: 'Daniel Okafor', text: '@orpheus After the release customers get 502 on /api/orders. Find the cause.' },
        },
        {
          at: 2.2, lane: 'source', to: 'orpheus', state: 'accepted',
          caption: 'The connector passes the task and the thread context.',
        },
        {
          at: 3.8, lane: 'orpheus', to: 'sandbox', state: 'starting',
          caption: 'Orpheus creates a sandbox with access to logs.',
          lines: [{ kind: 'hook', text: 'sandbox ready · template oncall' }],
        },
        {
          at: 5.4, lane: 'sandbox', to: 'model', state: 'running',
          caption: 'The agent starts with the gateway logs.',
          lines: [{ kind: 'agent', text: 'Checking gateway logs for the last hour.' }],
        },
        {
          at: 7, lane: 'sandbox', to: 'systems',
          caption: 'It queries the logs through a CLI.',
          lines: [
            { kind: 'command', text: 'logs query \'status:502 path:/api/orders\' --since 1h' },
            { kind: 'output', text: '1,942 records\nupstream orders-api: connect timeout' },
          ],
        },
        {
          at: 9.6, lane: 'source', to: 'sandbox',
          caption: 'The colleague adds a clarification. The running agent receives it at once.',
          post: { from: 'person', name: 'Daniel Okafor', mark: 'clarification', text: '@orpheus Note that only customers in the ru region are affected.' },
          lines: [{ kind: 'agent', text: 'Clarification received. Narrowing the search to the ru region.' }],
        },
        {
          at: 12, lane: 'sandbox', to: 'systems',
          caption: 'It finds the node that returns the errors.',
          lines: [
            { kind: 'command', text: 'logs query \'status:502 region:ru\' --since 1h --group upstream' },
            { kind: 'output', text: 'orders-api-ru-2 · 97% of errors' },
          ],
        },
        {
          at: 14.4, lane: 'sandbox', to: 'systems',
          caption: 'It checks the finding against the runbook.',
          lines: [
            { kind: 'command', text: 'rg -n "orders-api-ru" runbooks/' },
            { kind: 'output', text: 'runbooks/orders.md:42: connection pool 50 → 20, release 4.18' },
          ],
        },
        {
          at: 16.4, lane: 'sandbox', to: 'orpheus', state: 'finalizing',
          caption: 'The agent is done. Orpheus finishes the run and keeps its history.',
        },
        {
          at: 18.2, lane: 'orpheus', to: 'source', state: 'completed',
          caption: 'The answer with the cause and next actions arrives in the thread.',
          post: { from: 'agent', name: 'orpheus', mark: 'bot', text: 'Cause: release 4.18 reduced the orders-api-ru-2 connection pool from 50 to 20. The node hits the limit and times out.\nNext: restore the value of 50 or take the node out of rotation.' },
        },
      ],
    },
    {
      id: 'code',
      tab: 'Developer help',
      source: 'Mattermost',
      place: 'Mattermost · Engineering',
      access: 'Git, repository access and instructions',
      template: 'backend',
      length: 20,
      pace: 14,
      beats: [
        {
          at: 0.6, lane: 'source',
          caption: 'A developer posts a task in the team channel.',
          post: { from: 'person', name: 'Lena Fischer', text: '@orpheus Issue 482: pagination of the order list is broken. Find the cause and prepare a fix.' },
        },
        {
          at: 2.2, lane: 'source', to: 'orpheus', state: 'accepted',
          caption: 'The connector creates a session for the thread.',
        },
        {
          at: 3.8, lane: 'orpheus', to: 'sandbox', state: 'starting',
          caption: 'Orpheus creates a sandbox with Git and the project environment.',
          lines: [{ kind: 'hook', text: 'sandbox ready · template backend' }],
        },
        {
          at: 5.4, lane: 'sandbox', to: 'model', state: 'running',
          caption: 'The agent plans the work.',
          lines: [{ kind: 'agent', text: 'Cloning the repository and looking for the page calculation.' }],
        },
        {
          at: 7, lane: 'sandbox', to: 'systems',
          caption: 'It gets the code from the company repository.',
          lines: [
            { kind: 'command', text: 'git clone --depth 1 git@git.example.com:shop/backend.git' },
            { kind: 'output', text: 'Cloning into \'backend\'... done.' },
          ],
        },
        {
          at: 9.4, lane: 'sandbox',
          caption: 'It finds the faulty line.',
          lines: [
            { kind: 'command', text: 'rg -n "page_size" backend/src/orders/' },
            { kind: 'output', text: 'list.py:87:    offset = page * page_size' },
          ],
        },
        {
          at: 11.6, lane: 'sandbox', to: 'source',
          caption: 'It reports the finding to the thread.',
          post: { from: 'agent', name: 'orpheus', mark: 'bot', text: 'Found the cause: the offset is counted from one. Fixing it and adding a test.' },
        },
        {
          at: 13.6, lane: 'sandbox',
          caption: 'It fixes the code and runs the tests.',
          lines: [
            { kind: 'command', text: 'pytest tests/orders -q' },
            { kind: 'output', text: '41 passed in 3.82s' },
          ],
        },
        {
          at: 15.4, lane: 'sandbox', to: 'systems',
          caption: 'It pushes the branch to the repository.',
          lines: [
            { kind: 'command', text: 'git push origin fix/pagination-482' },
            { kind: 'output', text: 'fix/pagination-482 -> origin' },
          ],
        },
        {
          at: 17, lane: 'sandbox', to: 'orpheus', state: 'finalizing',
          caption: 'The agent is done. The sandbox pauses until the next request in the thread.',
        },
        {
          at: 18.4, lane: 'orpheus', to: 'source', state: 'completed',
          caption: 'The explanation of the result arrives in the thread.',
          post: { from: 'agent', name: 'orpheus', mark: 'bot', text: 'The first page skipped records: the offset was page × page_size. The fix and a regression test are in the fix/pagination-482 branch. Tests pass: 41 of 41.' },
        },
      ],
    },
  ],
}

export const flowCopy = { ru, en }
