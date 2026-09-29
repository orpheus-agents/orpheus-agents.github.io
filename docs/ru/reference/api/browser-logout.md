# Выход

```http
POST /auth/logout
```

Требует настроенный Origin и заголовок X-Orpheus-CSRF со значением 1. Идемпотентно удаляет cookie. Не завершает сессию IdP.

**operationId:** `browser_logout`

## Авторизация

Без авторизации API-ключом.

Условия браузерного доступа: [авторизация](../../operations/sso.md). Изменяющие данные запросы к сессиям требуют Bearer-ключ.

## Ответы

| Код | Описание | Содержимое |
| --- | --- | --- |
| 204 | Завершить локальную браузерную сессию |  |
| default | Неверный Origin или заголовок CSRF (403), либо недоступность хранилища (503). | `application/json`: [ErrorResponse](schema-errorresponse.md) |

[HTTP API](index.md)
