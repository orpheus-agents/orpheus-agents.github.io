# Доступные сервисы Orpheus

```http
GET /api/v1/services
```

Все сервисы доступны каждому пользователю с правом чтения. Возвращаются имена ENV без значений.

**operationId:** `GetServices`

## Авторизация

bearerAuth / browserSession / Без авторизации в режиме anonymous

Условия доступа, браузерной записи и SAML callback: [авторизация Space](../../space/access.md).

## Ответы

| Код | Описание | Содержимое |
| --- | --- | --- |
| 200 | Успешный ответ | `application/json`: [Services](schema-services.md) |
| default | Структурированная ошибка. 401 — авторизация, 403 — CSRF или schedule_forbidden, 404 — не найдено, 409 — конфликт, 422 — валидация, 503 — сервис недоступен. | `application/json`: [Problem](schema-problem.md) |

[HTTP API](index.md)
