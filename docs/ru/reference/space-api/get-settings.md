# Разрешённые имена переменных окружения

```http
GET /api/v1/schedules/settings
```

Разрешённые имена переменных окружения

**operationId:** `GetSettings`

## Авторизация

bearerAuth / browserSession / Без авторизации в режиме anonymous

Условия доступа, браузерной записи и SAML callback: [авторизация Space](../../space/access.md).

## Ответы

| Код | Описание | Содержимое |
| --- | --- | --- |
| 200 | Успешный ответ | `application/json`: [Settings](schema-settings.md) |
| default | Структурированная ошибка. 401 — авторизация, 403 — CSRF, 404 — не найдено, 409 — конфликт, 422 — валидация, 503 — сервис недоступен. | `application/json`: [Problem](schema-problem.md) |

[HTTP API](index.md)
