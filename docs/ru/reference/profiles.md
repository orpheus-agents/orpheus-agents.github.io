# Справочник профилей и аккаунтов

[Профили](../configuration/profiles.md) и [LLM-аккаунты](../configuration/authentication.md) хранятся в БД. Управляйте ими в Настройках или через API [профилей](api/get-profiles.md) и [аккаунтов](api/get-llm-accounts.md).

| Поле профиля | Значение |
| --- | --- |
| `name` | Обязательное уникальное название. Не меняется после создания |
| <span id="profile-harness"></span>`harness` | Наследуется от аккаунта. `codex` или `opencode` |
| `account_id` | UUID аккаунта. Можно выбрать другой аккаунт того же харнеса |
| <span id="profile-model"></span>`model` | Обязательный ID модели. В сессии можно переопределить через [`agent.model`](api/create-session.md) |
| `description` | Необязательное описание |
| `active` | Разрешает новые сессии, если аккаунт тоже активен |
| <span id="profile-instructions"></span>`instructions` | Общие инструкции. Заменяются через [`agent.instructions`](api/create-session.md) |
| <span id="profile-opencode-variant"></span>`opencode.variant` | ID варианта OpenCode для выбранной модели. Пустое значение в форме оставляет режим модели по умолчанию. |
| <span id="profile-codex-effort"></span>`codex.effort` | `none`, `minimal`, `low`, `medium`, `high`, `xhigh`, `max`, `ultra` |
| <span id="profile-codex-summary"></span>`codex.summary` | `auto`, `concise`, `detailed`, `none` |
| <span id="profile-codex-personality"></span>`codex.personality` | `none`, `friendly`, `pragmatic` |
| <span id="profile-codex-service-tier"></span>`codex.service_tier` | Необязательное непустое название уровня обслуживания провайдера |

| Поле аккаунта | Значение |
| --- | --- |
| <span id="profile-auth-account-id"></span>`id` | Сгенерированный UUID. Определяет аккаунт в сессиях и наблюдениях лимитов |
| `name` | Изменяемое название |
| `harness` | Не меняется. `codex` или `opencode` |
| <span id="account-provider"></span>`provider` | Не меняется. Для Codex — `openai`. Для ключа OpenCode укажите ID интеграции. Для OpenCode Console значение `opencode` берётся из файла авторизации |
| <span id="profile-auth-mode"></span>`auth_mode` | Не меняется. `api_key` или `account` |
| `active` | Разрешает новые сессии через активные профили |
| <span id="profile-auth-store"></span>`credential_store` | Неизменяемое название хранилища для файловой авторизации |
| `api_key` | Ключ провайдера только для записи. В ответах доступна лишь маска `api_key_mask` |
| `auth_file` | JSON авторизации при создании аккаунта с файловой авторизацией. Изменяется через [API файла авторизации](api/replace-auth-file.md) |

API-ключи шифруются в БД. Файлы авторизации хранятся в S3. Рабочий TOML содержит инфраструктурные настройки: хранилища авторизации и [сервисы](../configuration/secrets.md#services).

## Доступ к хранилищу авторизации {#store-access}

Передайте API и worker учётные данные S3 через `AWS_ACCESS_KEY_ID` и `AWS_SECRET_ACCESS_KEY`. Порядок подготовки хранилища и файла авторизации описан в [настройке аккаунта](../configuration/authentication.md#account).

| Поле credential store | Значение |
| --- | --- |
| <span id="store-type"></span>`type` | `s3` |
| <span id="store-bucket"></span>`bucket` | Имя бакета |
| <span id="store-region"></span>`region` | Регион, по умолчанию `us-east-1` |
| <span id="store-endpoint-url"></span>`endpoint_url` | Адрес своего S3-совместимого сервиса, необязательно |

Поддержка параметров Codex зависит от выбранной модели и авторизации. Orpheus сохраняет настройки при создании сессии. Через публичный API нельзя переопределить `codex.effort` и остальные параметры секции `codex`: выберите нужный профиль.

[Примеры профилей](../configuration/profiles.md) · [Авторизация](../configuration/authentication.md)
