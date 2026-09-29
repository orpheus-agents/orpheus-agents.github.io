# Ответ SAML

```http
POST /auth/callback
```

Только SAML. Тело application/x-www-form-urlencoded содержит ровно по одному SAMLResponse и RelayState, до 1 MiB. Нужны одноразовый запрос и browser nonce. Незапрошенные ответы отклоняются.

**operationId:** `browser_callback`

## Авторизация

Без авторизации API-ключом.

Условия браузерного доступа: [авторизация](../../operations/sso.md). Изменяющие данные запросы к сессиям требуют Bearer-ключ.

## Ответы

| Код | Описание | Содержимое |
| --- | --- | --- |
| 303 | Принять подписанный ответ SAML через HTTP-POST |  |
| default | Неверное состояние входа (400), неверный SAML-ответ (401), авторизация отключена (404), превышен размер формы (413) или недоступность авторизации/хранилища (503). | `application/json`: [ErrorResponse](schema-errorresponse.md) |

### Заголовки ответа 303

- `Location`: Проверенный локальный путь возврата. string

[HTTP API](index.md)
