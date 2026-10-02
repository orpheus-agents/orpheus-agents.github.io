# Метаданные SAML SP

```http
GET /saml/metadata
```

Метаданные SAML SP

**operationId:** `SamlMetadata`

## Авторизация

Без авторизации API-ключом.

Условия доступа, браузерной записи и SAML callback: [авторизация Space](../../space/access.md).

## Ответы

| Код | Описание | Содержимое |
| --- | --- | --- |
| 200 | Метаданные SAML SP | `application/samlmetadata+xml`: string |
| default | Авторизация отключена (404) или метаданные недоступны (503). | `application/json`: [Problem](schema-problem.md) |

[HTTP API](index.md)
