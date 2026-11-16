# Хранилища авторизации

```http
GET /api/v1/credential-stores
```

Список настроенных хранилищ авторизации

**operationId:** `get_credential_stores`

## Авторизация

HTTPBearer / BrowserSession

Условия браузерного доступа: [авторизация](../../operations/sso.md). Изменяющие данные запросы к сессиям требуют Bearer-ключ.

## Ответы

| Код | Описание | Содержимое |
| --- | --- | --- |
| 200 | Список настроенных хранилищ авторизации | `application/json`: [CredentialStores](schema-credentialstores.md) |
| default | Некорректные данные (422), нет авторизации (401), запрещённый Origin (403), запись не найдена (404), конфликт (409) или хранилище недоступно (503). | `application/json`: [ErrorResponse](schema-errorresponse.md) |

[HTTP API](index.md)
