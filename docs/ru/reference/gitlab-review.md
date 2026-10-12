# Конфигурация ревью GitLab MR

Настройки относятся к [коннектору GitLab](../integrations/gitlab/connect.md). ENV процесса имеет приоритет над локальным `.env`.

## Подключение {#connections}

| Переменная | По умолчанию | Назначение |
| --- | --- | --- |
| <span id="env-gitlab-base-url"></span>`GITLAB_BASE_URL` | `required` | Базовый URL GitLab |
| <span id="env-gitlab-token"></span>`GITLAB_TOKEN` | `required` | API-токен бота для публикации и управления ревьюерами. Не передаётся в песочницу |
| <span id="env-orpheus-base-url"></span>`ORPHEUS_BASE_URL` | `required` | Базовый URL API Orpheus без `/api/v1` |
| <span id="env-orpheus-api-key"></span>`ORPHEUS_API_KEY` | `required` | Сервисный Bearer-ключ, разрешённый в Orpheus |
| <span id="env-orpheus-web-base-url"></span>`ORPHEUS_WEB_BASE_URL` | `ORPHEUS_BASE_URL` | Публичный базовый URL веб-интерфейса для ссылок на сессии |
| <span id="env-workflows-dir"></span>`WORKFLOWS_DIR` | `workflows` | Каталог файлов workflow. Относительный путь считается от рабочего каталога процесса |

## Процесс и лимиты {#process}

| Переменная | По умолчанию | Назначение |
| --- | --- | --- |
| <span id="env-app-mode"></span>`APP_MODE` | `prod` | `prod` или `dev` |
| <span id="env-log-level"></span>`LOG_LEVEL` | `error` | Подробность логов. Для диагностики работы используйте `info` |
| <span id="env-http-timeout-seconds"></span>`HTTP_TIMEOUT_SECONDS` | `30` | Таймаут отдельного HTTP-запроса |
| <span id="env-poll-interval-seconds"></span>`POLL_INTERVAL_SECONDS` | `30` | Интервал опроса GitLab |
| <span id="env-shutdown-timeout-seconds"></span>`SHUTDOWN_TIMEOUT_SECONDS` | `20` | Время на корректную остановку |
| <span id="env-run-timeout-seconds"></span>`RUN_TIMEOUT_SECONDS` | `3600` | Таймаут запуска агента |
| <span id="env-hook-timeout-seconds"></span>`HOOK_TIMEOUT_SECONDS` | `300` | Таймаут хуков сессии |
| <span id="env-max-session-request-bytes"></span>`MAX_SESSION_REQUEST_BYTES` | `1048576` | Максимальный размер файла workflow и собранного запроса создания сессии в байтах. Диапазон: 1–16777216 |
| <span id="env-reconcile-worker-count"></span>`RECONCILE_WORKER_COUNT` | `4` | Число одновременно обрабатываемых задач сверки состояния. Диапазон: 1–64 |
| <span id="env-reconcile-queue-capacity"></span>`RECONCILE_QUEUE_CAPACITY` | `128` | Размер очереди сверки состояния. Диапазон: 1–4096 |
| <span id="env-max-concurrent-reviews"></span>`MAX_CONCURRENT_REVIEWS` | `4` | Число одновременных ревью. Диапазон: 1–1024. Также ограничено ресурсами Orpheus |

Все интервалы `*_SECONDS` задаются положительным целым числом секунд. URL должны использовать HTTP или HTTPS и не содержать учётных данных, query-параметров или fragment. Для клонирования репозитория в песочнице требуется HTTPS.

## Поля workflow {#workflow}

| Поле | По умолчанию | Назначение |
| --- | --- | --- |
| <span id="workflow-id"></span>`id` | `required` | Стабильный уникальный ID workflow по шаблону `[a-z0-9][a-z0-9_-]{0,79}` |
| <span id="workflow-project-ids"></span>`project_ids` | `omitted` | Непустой список уникальных положительных ID проектов GitLab. Для общего workflow уберите поле |
| <span id="workflow-profile"></span>`profile` | `required` | Существующий [профиль Orpheus](../configuration/profiles.md) |
| <span id="workflow-model"></span>`model` | `profile` | Необязательное переопределение модели |
| <span id="workflow-sandbox-template"></span>`sandbox_template` | `required` | Существующий [шаблон песочницы](../configuration/templates.md) |
| <span id="workflow-services"></span>`services` | `required` | Явный список уникальных [кодов сервисов](../configuration/secrets.md#services). Допустим `[]` |
| <span id="workflow-language"></span>`language` | `omitted` | Тег языка текста агента, например `en`, `ru` или `pt-BR` |
| <span id="workflow-notes"></span>`notes.success / notes.fail` | `English defaults` | Markdown-шаблоны комментариев об успехе и ошибке. Каждое поле необязательно |

Под YAML обязателен непустой текст Markdown с правилами ревью. Он заменяет инструкции профиля. [Примеры и маршрутизация](../integrations/gitlab/workflows.md).

## Подстановки в комментариях {#note-placeholders}

| Подстановка | Значение |
| --- | --- |
| <code v-pre>{{ .FindingsCount }}</code> | Число подтверждённых замечаний при успехе, включая ноль |
| <code v-pre>{{ .Reason }}</code> | Безопасная формулировка причины ошибки на английском. Без исходного текста ошибки или вывода хука |
| <code v-pre>{{ .SessionURL }}</code> | Публичная ссылка на сессию при ошибке или пустая строка, если ссылки нет |

Функции, условия и другие выражения не поддерживаются. Явно пустое поле, неизвестная подстановка или шаблон, который может дать пустой комментарий, не допускаются. `language` не переводит шаблоны и причины ошибок.

## Проверка файлов {#validation}

Читаются обычные UTF-8-файлы `.md` в корне каталога. Подкаталоги, скрытые файлы, файлы с начальным `#` и другие расширения пропускаются. ID уникальны, маршруты проектов не пересекаются, общий workflow может быть только один. Неизвестные поля, некорректный YAML, пустой каталог и превышение лимита размера файла останавливают весь запуск.

Workflows загружаются при старте. [Как применить изменения](../integrations/gitlab/workflows.md).
