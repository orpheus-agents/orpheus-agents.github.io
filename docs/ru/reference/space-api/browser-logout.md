# Выход из Space

```http
POST /auth/logout
```

Требует настроенный Origin и X-Orpheus-CSRF: 1. Повторный вызов безопасен. Очищает cookie Space, сохраняя сессию IdP.

**operationId:** `BrowserLogout`

## Авторизация

Без авторизации API-ключом.

Условия доступа, браузерной записи и SAML callback: [авторизация Space](../../space/access.md).

## Ответы

| Код | Описание | Содержимое |
| --- | --- | --- |
| 204 | Выход из Space |  |
| default | Некорректный Origin или CSRF-заголовок (403), либо недоступность хранилища (503). | `application/json`: [Problem](schema-problem.md) |

[HTTP API](index.md)
