# Space HTTP API

Справочник построен из OpenAPI Orpheus Space. Описания переведены на русский. В блоках JSON Schema сохранён исходный контракт.

[Правила API](conventions.md) · [Задания](../../space/schedules.md) · [Схемы данных](schemas.md)

[OpenAPI YAML](/space.openapi.yaml)

| Метод | Адрес | Операция |
| --- | --- | --- |
| `GET` | `/api/v1/schedules` | [Список заданий](list-schedules.md) |
| `POST` | `/api/v1/schedules` | [Создание задания](create-schedule.md) |
| `GET` | `/api/v1/schedules/{id}` | [Получение задания, включая удалённое](get-schedule.md) |
| `PATCH` | `/api/v1/schedules/{id}` | [Изменение полей задания](update-schedule.md) |
| `DELETE` | `/api/v1/schedules/{id}` | [Удаление задания с сохранением истории](delete-schedule.md) |
| `GET` | `/api/v1/profiles` | [Профили Orpheus и профиль по умолчанию для создания](get-profiles.md) |
| `GET` | `/api/v1/templates` | [Шаблоны Orpheus и шаблон по умолчанию для создания](get-templates.md) |
| `GET` | `/api/v1/services` | [Доступные сервисы Orpheus](get-services.md) |
| `GET` | `/api/v1/schedules/settings` | [Настройки интерфейса заданий](get-settings.md) |
| `POST` | `/api/v1/schedules/preview` | [Пять ближайших срабатываний](preview-schedule.md) |
| `GET` | `/api/v1/auth/session` | [Состояние браузерного доступа](get-auth-session.md) |
| `GET` | `/api/v1/schedules/{id}/occurrences` | [Сохранённая история запусков](list-occurrences.md) |
| `GET` | `/api/v1/schedules/{id}/occurrences/{occurrence_id}` | [Сохранённые сведения о запуске](get-occurrence.md) |
| `GET` | `/api/v1/schedules/{id}/occurrences/{occurrence_id}/result` | [Получение результата из ядра Orpheus](get-occurrence-result.md) |
| `POST` | `/api/v1/schedules/{id}/reset-session` | [Сброс контекста следующего запуска](reset-session.md) |
| `GET` | `/auth/login` | [Вход через SAML](browser-login.md) |
| `POST` | `/auth/callback` | [Обработка подписанного SAML-ответа](browser-callback.md) |
| `POST` | `/auth/logout` | [Выход из Space](browser-logout.md) |
| `GET` | `/saml/metadata` | [Метаданные SAML SP](saml-metadata.md) |
