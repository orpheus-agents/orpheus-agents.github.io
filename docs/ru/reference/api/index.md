# HTTP API

Справочник построен из OpenAPI Orpheus. Описания переведены на русский. В блоках JSON Schema сохранён исходный контракт.

[Авторизация, ошибки и повторы](conventions.md) · [Пример интеграции](../../integrations/custom/first-session.md) · [Схемы данных](schemas.md)

[OpenAPI YAML](/openapi.yaml)

| Метод | Адрес | Операция |
| --- | --- | --- |
| `GET` | `/api/v1/profiles` | [Каталог профилей](get-profiles.md) |
| `GET` | `/api/v1/templates` | [Каталог шаблонов](get-templates.md) |
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
