# Профили Orpheus и профиль по умолчанию для создания

```http
GET /api/v1/schedules/profiles
```

Профили Orpheus и профиль по умолчанию для создания

**operationId:** `GetProfiles`

## Авторизация

bearerAuth / browserSession / Без авторизации в режиме anonymous

Условия доступа, браузерной записи и SAML callback: [авторизация Space](../../space/access.md).

## Ответы

| Код | Описание | Содержимое |
| --- | --- | --- |
| 200 | Успешный ответ | `application/json`: [Profiles](schema-profiles.md) |
| default | Структурированная ошибка. 401 — авторизация, 403 — CSRF или schedule_forbidden, 404 — не найдено, 409 — конфликт, 422 — валидация, 503 — сервис недоступен. | `application/json`: [Problem](schema-problem.md) |

[HTTP API](index.md)
