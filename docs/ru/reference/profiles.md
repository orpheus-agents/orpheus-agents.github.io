# Справочник профилей

Профили задаются в файле конфигурации Orpheus — [`orpheus.toml`](../configuration/profiles.md). В комплекте [быстрого старта](../getting-started/launch.md) он находится в каталоге `examples/quickstart/` рядом с [`compose.yaml`](../getting-started/launch.md).

В этом файле каждый профиль описывается в таблице `[profiles.<name>]`. Настройки хранилищ авторизации при необходимости добавляются в `[credential_stores.<name>]`.

| Поле профиля | Значение |
| --- | --- |
| <span id="profile-harness"></span>`harness` | `codex` |
| <span id="profile-model"></span>`model` | Идентификатор модели. Можно передать через API [`agent.model`](api/create-session.md) |
| <span id="profile-instructions"></span>`instructions` | Общие инструкции. [`agent.instructions`](api/create-session.md) заменяет их |
| <span id="profile-codex-effort"></span>`codex.effort` | `none`, `minimal`, `low`, `medium`, `high`, `xhigh`, `max`, `ultra` |
| <span id="profile-codex-summary"></span>`codex.summary` | `auto`, `concise`, `detailed`, `none` |
| <span id="profile-codex-personality"></span>`codex.personality` | `none`, `friendly`, `pragmatic` |
| <span id="profile-codex-service-tier"></span>`codex.service_tier` | Непустое имя уровня обслуживания провайдера |
| <span id="profile-auth-mode"></span>`auth.mode` | `api_key` или `account` |
| <span id="profile-auth-api-key-env"></span>`auth.api_key_env` | Имя ENV с ключом. Только для `api_key` |
| <span id="profile-auth-account-id"></span>`auth.account_id` | Стабильный ID аккаунта. Только для `account` |
| <span id="profile-auth-store"></span>`auth.store` | Имя credential store. Только для `account` |
| <span id="profile-auth-key"></span>`auth.key` | Ключ объекта [`auth.json`](../configuration/authentication.md#аккаунт) в хранилище. Только для `account` |

## Доступ к хранилищу авторизации {#store-access}

Передайте worker учётные данные S3 через `AWS_ACCESS_KEY_ID` и `AWS_SECRET_ACCESS_KEY`. Порядок подготовки хранилища и файла авторизации описан в [настройке аккаунта](../configuration/authentication.md#аккаунт).

| Поле credential store | Значение |
| --- | --- |
| <span id="store-type"></span>`type` | `s3` |
| <span id="store-bucket"></span>`bucket` | Имя бакета |
| <span id="store-region"></span>`region` | Регион, по умолчанию `us-east-1` |
| <span id="store-endpoint-url"></span>`endpoint_url` | Адрес своего S3-совместимого сервиса, необязательно |

Поддержка параметров Codex зависит от выбранной модели и авторизации. Orpheus сохраняет настройки при создании сессии. Через публичный API нельзя переопределить `codex.effort` и остальные параметры секции `codex`: выберите нужный профиль.

[Примеры профилей](../configuration/profiles.md) · [Авторизация](../configuration/authentication.md)
