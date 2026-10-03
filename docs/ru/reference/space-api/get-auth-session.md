# Состояние браузерного доступа

```http
GET /api/v1/auth/session
```

Состояние браузерного доступа

**operationId:** `GetAuthSession`

## Авторизация

Без авторизации API-ключом.

Условия доступа, браузерной записи и SAML callback: [авторизация Space](../../space/access.md).

## Ответы

| Код | Описание | Содержимое |
| --- | --- | --- |
| 200 | Успешный ответ | `application/json`: [AuthSession](schema-authsession.md) |
| default | Структурированная ошибка. 401 — авторизация, 403 — CSRF или schedule_forbidden, 404 — не найдено, 409 — конфликт, 422 — валидация, 503 — сервис недоступен. | `application/json`: [Problem](schema-problem.md) |

[HTTP API](index.md)
