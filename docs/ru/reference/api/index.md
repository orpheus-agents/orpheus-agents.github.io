# HTTP API

Справочник построен из OpenAPI Orpheus. Описания переведены на русский. В блоках JSON Schema сохранён исходный контракт.

[Авторизация, ошибки и повторы](conventions.md) · [Пример интеграции](../../integrations/custom/first-session.md) · [Схемы данных](schemas.md)

[OpenAPI YAML](/openapi.yaml)

| Метод | Адрес | Операция |
| --- | --- | --- |
| `GET` | `/api/v1/profiles` | [Каталог профилей](get-profiles.md) |
| `POST` | `/api/v1/profiles` | [Создание профиля](create-profile.md) |
| `GET` | `/api/v1/profiles/{id}` | [Получение профиля](get-profile.md) |
| `PATCH` | `/api/v1/profiles/{id}` | [Изменение профиля](update-profile.md) |
| `DELETE` | `/api/v1/profiles/{id}` | [Удаление профиля](delete-profile.md) |
| `GET` | `/api/v1/llm-accounts` | [Каталог LLM-аккаунтов](get-llm-accounts.md) |
| `POST` | `/api/v1/llm-accounts` | [Создание LLM-аккаунта](create-llm-account.md) |
| `GET` | `/api/v1/llm-accounts/{id}` | [Получение LLM-аккаунта](get-llm-account.md) |
| `PATCH` | `/api/v1/llm-accounts/{id}` | [Изменение LLM-аккаунта](update-llm-account.md) |
| `DELETE` | `/api/v1/llm-accounts/{id}` | [Удаление LLM-аккаунта](delete-llm-account.md) |
| `GET` | `/api/v1/credential-stores` | [Хранилища авторизации](get-credential-stores.md) |
| `PUT` | `/api/v1/llm-accounts/{id}/api-key` | [Замена API-ключа аккаунта](replace-api-key.md) |
| `GET` | `/api/v1/llm-accounts/{id}/auth-file` | [Файл авторизации аккаунта](get-auth-file.md) |
| `PUT` | `/api/v1/llm-accounts/{id}/auth-file` | [Замена файла авторизации аккаунта](replace-auth-file.md) |
| `GET` | `/api/v1/templates` | [Каталог шаблонов](get-templates.md) |
| `POST` | `/api/v1/templates` | [Регистрация шаблона](create-template.md) |
| `GET` | `/api/v1/templates/{id}` | [Получение шаблона](get-template.md) |
| `PATCH` | `/api/v1/templates/{id}` | [Изменение шаблона](update-template.md) |
| `DELETE` | `/api/v1/templates/{id}` | [Удаление шаблона](delete-template.md) |
| `GET` | `/api/v1/services` | [Каталог сервисов](get-services.md) |
| `GET` | `/api/v1/accounts/limits` | [Лимиты аккаунтов](get-account-limits.md) |
| `GET` | `/api/v1/analytics/overview` | [Обзор аналитики](get-analytics-overview.md) |
| `GET` | `/api/v1/auth/session` | [Браузерная сессия](auth-session.md) |
| `GET` | `/auth/login` | [Вход через SSO](browser-login.md) |
| `POST` | `/auth/callback` | [Ответ SAML](browser-callback.md) |
| `POST` | `/auth/logout` | [Выход](browser-logout.md) |
| `GET` | `/saml/metadata` | [Метаданные SAML](saml-metadata.md) |
| `GET` | `/api/v1/runs` | [Все запуски](list-all-runs.md) |
| `GET` | `/api/v1/sessions` | [Список сессий](list-sessions.md) |
| `POST` | `/api/v1/sessions` | [Создание сессии](create-session.md) |
| `GET` | `/api/v1/sessions/{sid}` | [Получение сессии](get-session.md) |
| `GET` | `/api/v1/sessions/{sid}/events` | [События сессии](get-events.md) |
| `GET` | `/api/v1/sessions/{sid}/events/stream` | [Поток событий SSE](stream-events.md) |
| `GET` | `/api/v1/sessions/{sid}/history` | [История сессии](get-history.md) |
| `GET` | `/api/v1/sessions/{sid}/runs` | [Запуски сессии](list-runs.md) |
| `POST` | `/api/v1/sessions/{sid}/runs` | [Новый запуск](create-run.md) |
| `GET` | `/api/v1/sessions/{sid}/runs/{rid}` | [Получение запуска](get-run.md) |
| `POST` | `/api/v1/sessions/{sid}/runs/{rid}/cancel` | [Отмена запуска](cancel-run.md) |
| `POST` | `/api/v1/sessions/{sid}/runs/{rid}/messages` | [Уточнение работающему агенту](send-message.md) |
