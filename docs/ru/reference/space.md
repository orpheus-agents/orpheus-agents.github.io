# Конфигурация Space

Space читает окружение процесса и TOML-файл доступа и исполнения при старте. Сам бинарник не загружает `.env`. В [примере запуска](../space/setup.md) его читает Compose. После изменения настроек перезапустите соответствующие процессы.

## Сервис и БД {#service}

| Переменная | По умолчанию | Назначение |
| --- | --- | --- |
| `DATABASE_URL` | Обязательна | DSN отдельной PostgreSQL БД Space. Одинаковый у API, worker и миграций |
| `ORPHEUS_CONFIG_FILE` | `orpheus-space.toml` | Путь к TOML доступа и исполнения у API и worker |
| `ORPHEUS_MIGRATIONS_DIR` | `migrations` | Каталог миграций из образа |
| `ORPHEUS_HOST`, `ORPHEUS_PORT` | `0.0.0.0`, `8000` | Адрес публичного API |
| `ORPHEUS_SYSTEM_HOST`, `ORPHEUS_SYSTEM_PORT` | `0.0.0.0`, `9100` | Системный адрес каждого процесса |
| `WORKER_POLL_SECONDS` | `1` | Положительный интервал опроса worker в секундах, допускает дробные значения |
| `MAX_REQUEST_BYTES` | `1048576` | Максимум тела запроса, от 4096 до 1048576 байт |

Все [сервисы каталога Orpheus](../configuration/secrets.md#services) доступны пользователю с правом редактирования задания. Значения секретов передаются worker Orpheus. Space хранит только выбранные коды сервисов.

## Подключение Orpheus {#core}

| Переменная | Назначение |
| --- | --- |
| `ORPHEUS_BASE_URL` | HTTP(S)-origin Orpheus, доступный из Space, без `/api/v1` |
| `ORPHEUS_API_KEY` | Bearer-ключ Orpheus для запуска, опроса статусов и чтения результатов |

Обе переменные обязательны у worker. API использует их для каталогов профилей, шаблонов и сервисов, создания задания, проверки выбора и получения результата. Если Orpheus недоступен, эти операции возвращают `503`. Сохранение прежнего выбора сервисов и очистка всего списка не требуют этого каталога. Выдайте Space отдельный ключ из [`PUBLIC_API_KEYS` Orpheus](environment.md#env-public-api-keys). Он отличается от ключа, которым CLI обращается к Space.

## Доступ к Space {#access}

| Переменная | По умолчанию | Назначение |
| --- | --- | --- |
| `PUBLIC_API_KEYS` | `[]` | JSON-массив Bearer-ключей Space. Непустой в режиме `api_only` |
| `ORPHEUS_BROWSER_AUTH` | `api_only` | `api_only`, `anonymous` или `saml` |
| `ORPHEUS_PUBLIC_URL` | Нет | Точный внешний origin браузера без завершающего слеша. Обязателен в `anonymous` и `saml`, в SAML только HTTPS |

API использует `ORPHEUS_PUBLIC_URL` также для [поля `url` задания](space-api/schema-schedule.md) — ссылки на его карточку в Space Web. Если адрес не задан, `url` равен `null`. Ссылка вычисляется при ответе, поэтому изменение адреса не требует редактирования заданий. Адрес запроса и заголовки прокси для неё не используются.

Поле TOML `access.admin_emails` содержит email администраторов SAML:

```toml
[access]
admin_emails = ["admin@example.com"]
```

По умолчанию `[]`: администраторов SAML нет. Пробелы по краям удаляются, регистр приводится к нижнему. Неверные адреса и дубликаты после нормализации запрещают запуск. После изменения списка перезапустите API. Действующие сессии получают новую роль на следующем запросе. API-ключи и режим anonymous сохраняют полный доступ.

[Права, Origin и CSRF](../space/access.md). Worker проверяет название режима, но не использует браузерные настройки и SAML-файлы.

## SAML на API {#saml}

| Переменная | Назначение |
| --- | --- |
| `SAML_SP_ENTITY_ID` | Entity ID отдельного клиента Space |
| `SAML_IDP_METADATA_FILE` | Путь к XML метаданных IdP |
| `SAML_SP_CERT_FILE` | Путь к сертификату SP |
| `SAML_SP_KEY_FILE` | Путь к приватному ключу SP |
| `BROWSER_SESSION_TTL_SECONDS` | Срок браузерной сессии. По умолчанию 43200 секунд, диапазон 300–86400 |

Первые четыре настройки обязательны в режиме `saml`. Файлы считываются при старте API. [Инструкция по SSO](../space/access.md).

## Базовое исполнение TOML {#execution}

```toml
[execution.agent]
profile = "default"
instructions_file = "/etc/orpheus-space/instructions.md"

[execution.sandbox]
template = "codex"

[execution.limits]
run_timeout_seconds = 3600
max_session_tokens = 1000000
```

| Поле | Назначение |
| --- | --- |
| `execution.agent.profile` | Обязательный [профиль Orpheus](../configuration/profiles.md) по умолчанию для новых заданий |
| `execution.agent.instructions` | Необязательные инструкции строкой. Пустая строка очищает инструкции профиля |
| `execution.agent.instructions_file` | Альтернатива строке: UTF-8 файл инструкций, смонтированный в API и worker |
| `execution.sandbox.template` | Обязательный [шаблон AgentBox](../configuration/templates.md) по умолчанию для новых заданий |
| `execution.limits.run_timeout_seconds` | Положительный таймаут запуска. По умолчанию 3600 секунд |
| `execution.limits.max_session_tokens` | Необязательный положительный лимит токенов сессии |

`instructions` и `instructions_file` взаимоисключающие. Если оба отсутствуют, сохраняются инструкции профиля Orpheus. Space принимает только перечисленные поля TOML.

Изменение эффективной базовой конфигурации начинает новый контекст при следующем исполнении задания с повторным использованием сессии.

## Выбор сервисов {#environment}

1. Опишите [сервис](../configuration/secrets.md#services) в каталоге Orpheus.
2. Передайте значения его ENV **worker Orpheus**.
3. Выберите код в поле [`services`](space-api/schema-createschedule.md) задания.

В конфигурации Space нет сервисов по умолчанию или списков ENV. Пропущенный выбор при создании равен `[]`. Пустой список удаляет все выбранные сервисы. Неизвестный код возвращает `422`. Недоступный каталог возвращает `503`, когда требуется проверка выбора. Прежний выбор и очистку сервисов можно сохранить без каталога. Возобновление задания с паузы проверяет весь выбор.

Корневые методы [сервисов](space-api/get-services.md), [профилей](space-api/get-profiles.md) и [шаблонов](space-api/get-templates.md) возвращают `{items: [...]}`. [Настройки интерфейса заданий](space-api/get-settings.md) возвращают только `browser_auth`.

## Веб-интерфейс {#web}

`ORPHEUS_SPACE_UPSTREAM` в образе Space Web задаёт внутренний origin API Space, например `http://space-api:8000`. По нему nginx проксирует API и маршруты авторизации. Публичный браузерный origin задаётся на API через `ORPHEUS_PUBLIC_URL`.

## CLI {#cli}

| Переменная | Назначение |
| --- | --- |
| `ORPHEUS_SPACE_HOST` | Публичный origin Space без `/api/v1` |
| `ORPHEUS_SPACE_API_KEY` | Ключ из `PUBLIC_API_KEYS` Space |

Флаг `--host` заменяет только адрес. Ключ принимается только из окружения. [Установка и команды](../space/cli.md).
