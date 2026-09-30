# Конфигурация Mattermost

## ENV коннектора

| Переменная | По умолчанию | Назначение |
| --- | --- | --- |
| <span id="env-orpheus-base-url"></span>`ORPHEUS_BASE_URL` | `required` | Адрес API Orpheus без /api/v1 |
| <span id="env-orpheus-api-key"></span>`ORPHEUS_API_KEY` | `required` | Сервисный Bearer-ключ |
| <span id="env-workflows-dir"></span>`WORKFLOWS_DIR` | `workflows` | Каталог файлов .md, без вложенных каталогов |
| <span id="env-listen-addr"></span>`LISTEN_ADDR` | `:8080` | Адрес health и metrics |
| <span id="env-http-timeout"></span>`HTTP_TIMEOUT` | `30s` | Таймаут HTTP-запроса |
| <span id="env-max-request-bytes"></span>`MAX_REQUEST_BYTES` | `1048576` | Бюджет запроса, от 4096 до 1048576 байт |
| <span id="env-max-parallel-threads"></span>`MAX_PARALLEL_THREADS` | `8` | Параллельные сверки тредов, от 1 до 128 |
| <span id="env-agentbox-api-key"></span>`AGENTBOX_API_KEY` | `unset` | Доставка файлов в активный запуск |
| <span id="env-agentbox-api-url"></span>`AGENTBOX_API_URL` | `SDK default` | Необязательное переопределение SDK endpoint |

## YAML workflow

| Поле | По умолчанию | Назначение |
| --- | --- | --- |
| <span id="workflow-id"></span>`id` | `required` | Уникальное имя workflow |
| <span id="workflow-revision"></span>`revision` | `required` | Строка ревизии |
| <span id="workflow-reconcile-from"></span>`reconcile_from` | `required` | Фиксированная дата начала обработки UTC RFC3339 |
| <span id="workflow-profile"></span>`profile` | `required` | Имя профиля Orpheus |
| <span id="workflow-sandbox-template"></span>`sandbox_template` | `required` | Имя шаблона AgentBox |
| <span id="workflow-mattermost-base-url"></span>`mattermost.base_url` | `required` | Адрес Mattermost |
| <span id="workflow-mattermost-token-env"></span>`mattermost.token_env` | `required` | Имя ENV токена бота |
| <span id="workflow-env-from"></span>`env_from` | `[]` | Переменные worker для агента |
| <span id="workflow-include-ids"></span><span id="workflow-exclude-ids"></span>`include_ids / exclude_ids` | `[]` | ID включённых и исключённых каналов |
| <span id="workflow-direct-messages"></span>`direct_messages` | `false` | Обрабатывать личные сообщения |
| <span id="workflow-private-channels"></span>`private_channels` | `false` | Обрабатывать закрытые каналы |
| <span id="workflow-group-messages"></span>`group_messages` | `false` | Обрабатывать групповые сообщения |
| <span id="workflow-start-on-mention"></span>`start_on_mention` | `true` | Требовать упоминание для нового треда |
| <span id="workflow-trigger-bot-ids"></span>`trigger_bot_ids` | `[]` | Разрешённые внешние боты |
| <span id="workflow-send-commentary-messages"></span>`send_commentary_messages` | `true` | Публиковать промежуточные сообщения |
| <span id="workflow-draining"></span>`draining` | `false` | Доставлять принятые результаты без новых задач |
| <span id="workflow-message-batch-window"></span>`message_batch_window` | `0` | Окно сбора сообщений |
| <span id="workflow-poll-interval"></span>`poll_interval` | `30s` | Интервал сверки каналов |
| <span id="workflow-full-reconcile-interval"></span>`full_reconcile_interval` | `5m` | Интервал полной сверки сессий |
| <span id="workflow-max-concurrent-runs"></span>`max_concurrent_runs` | `10` | Параллельные запуски workflow |
| <span id="workflow-run-timeout-seconds"></span>`run_timeout_seconds` | `3600` | Таймаут исполнения агента |
| <span id="workflow-hook-timeout-seconds"></span>`hook_timeout_seconds` | `120` | Таймаут файловых хуков |
| <span id="workflow-max-session-tokens"></span>`max_session_tokens` | `100000000` | Бюджет токенов сессии |
| <span id="workflow-max-post-chars"></span>`max_post_chars` | `12000` | Символов в сообщении с учётом лимита сервера |
| <span id="workflow-initial-context-token-budget"></span>`initial_context_token_budget` | `100000` | Приблизительный бюджет начального контекста |
| <span id="workflow-files-max-per-post"></span>`files.max_per_post` | `5` | Файлов на входное сообщение, от 1 до 100 |
| <span id="workflow-files-max-file-bytes"></span>`files.max_file_bytes` | `10485760` | Байт в обычном входном файле |
| <span id="workflow-files-max-image-bytes"></span>`files.max_image_bytes` | `20971520` | Байт во входном изображении |
| <span id="workflow-files-max-batch-bytes"></span>`files.max_batch_bytes` | `104857600` | Байт во входном пакете, максимум 100 MiB |
| <span id="workflow-files-max-output-files"></span>`files.max_output_files` | `5` | Число файлов результата, от 1 до 100 с учётом лимита сервера Mattermost |
| <span id="workflow-files-max-output-bytes"></span>`files.max_output_bytes` | `31457280` | Байт в одном выходном файле |
| <span id="workflow-link-expansion-enabled"></span>`link_expansion.enabled` | `true` | Раскрывать ссылки на этот Mattermost |
| <span id="workflow-link-expansion-max-links"></span>`link_expansion.max_links` | `5` | Число раскрываемых ссылок |
| <span id="workflow-link-expansion-max-posts"></span>`link_expansion.max_posts` | `20` | Число сообщений по ссылкам |

Обязательные поля отмечены `required`. Неизвестные поля, дубли ключей, совпадающие ID и пересекающиеся специализированные маршруты отклоняются. `revision` заключайте в кавычки. После YAML запишите полные инструкции агенту.

Секреты не записываются в workflow. `token_env` и [`env_from`](../configuration/secrets.md) содержат имена переменных. [Примеры](../integrations/mattermost/workflow.md) · [Применение изменений](../integrations/mattermost/reload.md).
