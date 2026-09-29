# Браузерная сессия

```http
GET /api/v1/auth/session
```

Публичное состояние браузерного доступа. Authorization игнорируется. Неверные cookie удаляются. Cache-Control: no-store.

**operationId:** `auth_session`

## Авторизация

Без авторизации API-ключом.

Условия браузерного доступа: [авторизация](../../operations/sso.md). Изменяющие данные запросы к сессиям требуют Bearer-ключ.

## Ответы

| Код | Описание | Содержимое |
| --- | --- | --- |
| 200 | Получить состояние браузерной авторизации | `application/json`: [BrowserAuthSession](schema-browserauthsession.md) |
| default | Хранилище недоступно (503). | `application/json`: [ErrorResponse](schema-errorresponse.md) |

[HTTP API](index.md)
