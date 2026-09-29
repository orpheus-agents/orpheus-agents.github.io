# Метаданные SAML

```http
GET /saml/metadata
```

Получить метаданные SP

**operationId:** `saml_metadata`

## Авторизация

Без авторизации API-ключом.

Условия браузерного доступа: [авторизация](../../operations/sso.md). Изменяющие данные запросы к сессиям требуют Bearer-ключ.

## Ответы

| Код | Описание | Содержимое |
| --- | --- | --- |
| 200 | Получить метаданные SP | `application/samlmetadata+xml`: string |
| default | Авторизация отключена (404) или метаданные недоступны (503). | `application/json`: [ErrorResponse](schema-errorresponse.md) |

[HTTP API](index.md)
