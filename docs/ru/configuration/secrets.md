# Доступы и секреты

## Настройте сервисы {#services}

Сервис описывает адрес системы и данные, которые получит клиент в песочнице. Укажите один и тот же каталог в [`orpheus.toml`](profiles.md) на API и worker.

```toml
[services.helpdesk]
name = "Хелпдеск"
description = "Чтение обращений поддержки и публикация ответов."
delivery = "direct"
endpoint = "https://helpdesk.example.com"

[services.helpdesk.credentials]
key = { env = "SUPPORT_READ_TOKEN", as = "HELPDESK_TOKEN" }

[services.helpdesk.environment]
HELPDESK_URL = { from = "endpoint" }
```

Код сервиса должен соответствовать `[a-z][a-z0-9_-]{0,63}`. Укажите название, описание, `delivery = "direct"`, HTTP(S)-адрес и хотя бы одну запись в `environment`. Для адреса с путём используйте `from = "endpoint"`, для хоста с портом — `from = "endpoint.host"`. Обычное значение можно записать строкой. В `credentials` укажите имя ENV worker. Поле `as` задаёт имя в песочнице, по умолчанию оно совпадает с именем на worker.

Задайте `SUPPORT_READ_TOKEN` на **worker Orpheus**. Клиент получит его значение в `HELPDESK_TOKEN` и адрес из TOML в `HELPDESK_URL`. При создании сессии выберите сервис в [`configuration.sandbox.services`](../reference/api/create-session.md):

```json
{
  "template": "codex",
  "services": ["helpdesk"]
}
```

JSON показывает значение [`configuration.sandbox`](../reference/api/create-session.md). Агент и хуки сессии получают выбранные переменные. Само добавление сервиса в каталог не даёт доступ к нему каждой сессии.

[`GET /api/v1/services`](../reference/api/get-services.md) возвращает коды, названия, описания и имена ENV у клиента в `env_names` с сортировкой по коду. В списке выбора коды не повторяются. Неизвестный код отклоняет запрос целиком с `422 unknown_service`.

[Workflows Mattermost](../reference/mattermost.md#workflow-services) выбирают коды через `services`. [Workflows ревью GitLab](../reference/gitlab-review.md#workflow-services) также выбирают сервисы явно. В [Space](../space/schedules.md#environment) сервисы явно задаются в каждом задании. Пользователю с правом редактирования задания доступен весь каталог, в том числе сервис с API-ключом Space. Права внешнего токена при этом сохраняются.

## Отдельные переменные {#individual-variables}

Через [`env_from`](../reference/api/create-session.md) можно дополнительно запросить ENV worker по имени. Разрешены имена источников `credentials.*.env` всех сервисов и имена из [`HARNESS_ENV_ALLOWLIST`](../reference/environment.md#env-harness-env-allowlist). Настройте список одинаково на API и worker.

Если сервисы или явные настройки одного уровня задают одну ENV клиента, worker объединяет равные значения. Разные значения останавливают запуск процесса. Настройка уровня запуска перекрывает одноимённую переменную сессии для хуков запуска.

## Секреты только для хуков {#hook-secrets}

Поля [`services`, `env` и `env_from`](../reference/api/create-session.md) на верхнем уровне запросов создания сессии и [нового запуска](../reference/api/create-run.md) доступны только [`before_run`](hooks.md#hook-before-run) и [`after_run`](hooks.md#hook-after-run) этого запуска. Агент и `after_create` их не получают. Например, `"services": ["helpdesk"]` на верхнем уровне запроса даёт доступ к хелпдеску хукам публикации. Не записывайте эти секреты в доступные агенту файлы или вывод хука.

Эта область действия относится к текущему запросу, а не к сервису в целом. Сервисы каталога можно выбрать для агентов в других сессиях, включая задания Space. Чтобы токен не появлялся в выборе сервисов, оставьте его имя вне каталога, разрешите через [`HARNESS_ENV_ALLOWLIST`](../reference/environment.md#env-harness-env-allowlist) и передавайте через верхнеуровневый `env_from`. Это не ограничивает доверенные API-клиенты, которые могут явно выбирать разрешённые имена ENV.

## Примените изменения каталога {#changes}

После изменения каталога перезапустите API и worker. Сессия и запуск хранят выбранные коды. При старте каждого нового процесса worker читает текущие определения и значения ENV. Уже запущенный агент продолжает работу с окружением своего процесса.

Чтобы запустить агента с новым окружением, создайте новую сессию. В Mattermost увеличьте [`revision`](../integrations/mattermost/reload.md) workflow. В Space [сбросьте контекст](../space/schedules.md) задания, которое продолжает одну сессию. Смена выбранных кодов сервисов также начинает новый контекст при следующем подходящем выполнении.

Явные значения [`sandbox.env`](../reference/api/create-session.md) шифруются при хранении в БД ключом [`ENV_ENCRYPTION_KEY`](../reference/environment.md#env-env-encryption-key). Сохраняйте этот ключ между перезапусками и резервируйте отдельно от БД. Системные имена, включая [`OPENAI_API_KEY`](authentication.md#api-key), [`AGENTBOX_API_KEY`](../reference/environment.md#env-agentbox-api-key) и [`ORPHEUS_*`](../reference/environment.md) из зарезервированного списка, нельзя использовать как произвольные секреты.

[Пример публикации через хук](../integrations/custom/helpdesk-hook.md)
