# Конфигурация Orpheus

Настройки процесса передаются через ENV. Само приложение не загружает [`.env`](../getting-started/launch.md#заполните-настроики): это делает Compose. Флаги команды `serve` имеют приоритет для адресов прослушивания.

| Переменная | По умолчанию | Назначение |
| --- | --- | --- |
| <span id="env-database-url"></span>`DATABASE_URL` | `required` | PostgreSQL для API, worker и миграций |
| <span id="env-orpheus-config-file"></span>`ORPHEUS_CONFIG_FILE` | [`orpheus.toml`](../configuration/profiles.md) | Путь к TOML-профилям |
| <span id="env-orpheus-migrations-dir"></span>`ORPHEUS_MIGRATIONS_DIR` | `migrations` | Каталог миграций. Флаг --dir имеет приоритет |
| <span id="env-public-api-keys"></span>`PUBLIC_API_KEYS` | `[]` | JSON-массив Bearer-ключей с одинаковым доступом |
| <span id="env-env-encryption-key"></span>`ENV_ENCRYPTION_KEY` | `required` | 32 байта в base64url для шифрования ENV |
| <span id="env-harness-env-allowlist"></span>`HARNESS_ENV_ALLOWLIST` | `[]` | JSON-массив дополнительных разрешённых имён ENV worker. Объединяется с ENV всех [сервисов](../configuration/secrets.md#services) |
| <span id="env-agentbox-api-key"></span>`AGENTBOX_API_KEY` | `required on worker` | Доступ worker к AgentBox |
| <span id="env-openai-api-key"></span>`OPENAI_API_KEY` | `profile-dependent` | Ключ модели для стандартного API-key профиля |
| <span id="env-sandbox-proxy-url"></span>`SANDBOX_PROXY_URL` | `https://sandbox-proxy.agentbox.ru:65181` | HTTP(S) proxy для агента. Пустое значение отключает |
| <span id="env-max-concurrent-sessions"></span>`MAX_CONCURRENT_SESSIONS` | `50` | Занятые слоты исполнения, включая подготовку и завершение |
| <span id="env-default-max-session-tokens"></span>`DEFAULT_MAX_SESSION_TOKENS` | `100000000` | Бюджет токенов новой сессии |
| <span id="env-max-tool-result-bytes"></span>`MAX_TOOL_RESULT_BYTES` | `524288` | Объём сохраняемого вывода инструмента |
| <span id="env-max-hook-output-bytes"></span>`MAX_HOOK_OUTPUT_BYTES` | `524288` | Объём сохраняемого stdout/stderr хука |
| <span id="env-max-request-bytes"></span>`MAX_REQUEST_BYTES` | `1048576` | Предельный размер запроса API в байтах |
| <span id="env-database-ping-timeout"></span>`DATABASE_PING_TIMEOUT` | `2` | Таймаут проверки БД, секунды |
| <span id="env-cancel-grace-seconds"></span>`CANCEL_GRACE_SECONDS` | `30` | Ожидание мягкой отмены |
| <span id="env-worker-poll-seconds"></span>`WORKER_POLL_SECONDS` | `1` | Интервал опроса worker |
| <span id="env-rpc-timeout-seconds"></span>`RPC_TIMEOUT_SECONDS` | `30` | Таймаут отдельного RPC агента |
| <span id="env-orpheus-host"></span><span id="env-orpheus-port"></span>`ORPHEUS_HOST / ORPHEUS_PORT` | `0.0.0.0 / 8000` | Адрес API |
| <span id="env-orpheus-system-host"></span><span id="env-orpheus-system-port"></span>`ORPHEUS_SYSTEM_HOST / ORPHEUS_SYSTEM_PORT` | `0.0.0.0 / 9100` | Проверки процесса и [сервисные метрики](../operations/monitoring.md#service-metrics). Доступ только из доверенной сети |
| <span id="env-orpheus-browser-auth"></span>`ORPHEUS_BROWSER_AUTH` | `api_only` | api_only, anonymous или saml |
| <span id="env-orpheus-public-url"></span>`ORPHEUS_PUBLIC_URL` | `unset` | Внешний origin. HTTPS обязателен для SAML |
| <span id="env-saml-sp-entity-id"></span>`SAML_SP_ENTITY_ID` | `unset` | Идентификатор SP |
| <span id="env-saml-idp-metadata-file"></span>`SAML_IDP_METADATA_FILE` | `unset` | Путь к XML метаданных IdP |
| <span id="env-saml-sp-cert-file"></span>`SAML_SP_CERT_FILE` | `unset` | Путь к сертификату SP |
| <span id="env-saml-sp-key-file"></span>`SAML_SP_KEY_FILE` | `unset` | Путь к приватному ключу SP |
| <span id="env-browser-session-ttl-seconds"></span>`BROWSER_SESSION_TTL_SECONDS` | `43200` | Время браузерной сессии, 300-86400 секунд |

`required` означает обязательное значение, `unset` означает отсутствие значения. SAML-поля обязательны в режиме `saml`. Передайте значения переменных интеграций, например [`HELPDESK_TOKEN`](../configuration/secrets.md), worker. Опишите их имена в [сервисе](../configuration/secrets.md#services), а для имён вне каталога используйте `HARNESS_ENV_ALLOWLIST`.

API и worker должны использовать одинаковую конфигурацию профилей, список разрешённых переменных и ключ шифрования. После изменения ENV пересоздайте контейнеры. [Практическая настройка](../configuration/secrets.md).
