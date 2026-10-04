# Доступы и секреты

## Настройте сервисы {#services}

Сервис объединяет переменные окружения worker для доступа к системе. Опишите каталог в [`orpheus.toml`](profiles.md), одинаково на API и worker:

```toml
[services.helpdesk]
name = "Хелпдеск"
description = "Чтение обращений поддержки и публикация ответов."
env_from = ["HELPDESK_URL", "HELPDESK_TOKEN"]
```

Ключ секции — код сервиса. Он должен соответствовать `[a-z][a-z0-9_-]{0,63}`. Название и описание обязательны. В каждом сервисе нужен хотя бы один допустимый, незарезервированный ENV без повторов. Разные сервисы могут включать одинаковые имена. В каталоге хранятся имена, а не значения секретов.

Передайте значения `HELPDESK_URL` и `HELPDESK_TOKEN` **worker Orpheus**. При создании сессии выберите сервис в [`configuration.sandbox.services`](../reference/api/create-session.md):

```json
{
  "template": "codex",
  "services": ["helpdesk"]
}
```

JSON показывает значение [`configuration.sandbox`](../reference/api/create-session.md). Агент и хуки сессии получают выбранные переменные. Само добавление сервиса в каталог не даёт доступ к нему каждой сессии.

[`GET /api/v1/services`](../reference/api/get-services.md) возвращает коды, названия, описания и имена ENV с сортировкой по коду. В списке выбора коды не повторяются. Неизвестный код отклоняет запрос целиком с `422 unknown_service`.

[Workflows Mattermost](../reference/mattermost.md#workflow-services) выбирают коды через `services`. В [Space](../space/schedules.md#environment) сервисы явно задаются в каждом задании. Пользователю с правом редактирования задания доступен весь каталог, в том числе сервис с API-ключом Space. Права внешнего токена при этом сохраняются.

## Отдельные переменные {#individual-variables}

Сервисы можно сочетать с [`env_from`](../reference/api/create-session.md). Разрешённые имена — объединение [`HARNESS_ENV_ALLOWLIST`](../reference/environment.md#env-harness-env-allowlist) и ENV всех сервисов. Конфигурация API и worker должна совпадать. Отдельные имена вне каталога добавьте в `HARNESS_ENV_ALLOWLIST`.

ENV выбранных сервисов объединяются с явным `env_from` без повторов. Значение в [`env`](../reference/api/create-session.md) не может использовать имя переменной выбранного сервиса в той же области действия.

## Секреты только для хуков {#hook-secrets}

Поля [`services`, `env` и `env_from`](../reference/api/create-session.md) на верхнем уровне запросов создания сессии и [нового запуска](../reference/api/create-run.md) доступны только [`before_run`](hooks.md#hook-before-run) и [`after_run`](hooks.md#hook-after-run) этого запуска. Агент и `after_create` их не получают. Например, `"services": ["helpdesk"]` на верхнем уровне запроса даёт доступ к хелпдеску хукам публикации. Не записывайте эти секреты в доступные агенту файлы или вывод хука.

Эта область действия относится к текущему запросу, а не к сервису в целом. Сервисы каталога можно выбрать для агентов в других сессиях, включая задания Space. Чтобы токен не появлялся в выборе сервисов, оставьте его имя вне каталога, разрешите через [`HARNESS_ENV_ALLOWLIST`](../reference/environment.md#env-harness-env-allowlist) и передавайте через верхнеуровневый `env_from`. Это не ограничивает доверенные API-клиенты, которые могут явно выбирать разрешённые имена ENV.

## Примените изменения каталога {#changes}

После редактирования каталога перезапустите API и worker. Принятые сессии и запуски сохраняют снимок названия, описания и ENV выбранных сервисов. Изменение каталога не меняет их конфигурацию. При подготовке исполнения worker берёт текущие значения из своего окружения и проверяет актуальный список разрешённых имён.

Чтобы применить новый состав сервиса, создайте новую сессию. В Mattermost увеличьте [`revision`](../integrations/mattermost/reload.md) workflow. В Space [сбросьте контекст](../space/schedules.md) задания, которое продолжает одну сессию. Смена выбранных кодов сервисов также начинает новый контекст при следующем подходящем выполнении.

Явные значения [`sandbox.env`](../reference/api/create-session.md) шифруются при хранении в БД ключом [`ENV_ENCRYPTION_KEY`](../reference/environment.md#env-env-encryption-key). Сохраняйте этот ключ между перезапусками и резервируйте отдельно от БД. Системные имена, включая [`OPENAI_API_KEY`](../reference/environment.md#env-openai-api-key), [`AGENTBOX_API_KEY`](../reference/environment.md#env-agentbox-api-key) и [`ORPHEUS_*`](../reference/environment.md) из зарезервированного списка, нельзя использовать как произвольные секреты.

[Пример публикации через хук](../integrations/custom/helpdesk-hook.md)
