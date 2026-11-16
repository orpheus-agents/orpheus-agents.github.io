# Замена API-ключа аккаунта

```http
PUT /api/v1/llm-accounts/{id}/api-key
```

Замена API-ключа аккаунта

**operationId:** `replace_api_key`

## Авторизация

HTTPBearer / BrowserSession

Условия браузерного доступа: [авторизация](../../operations/sso.md). Изменяющие данные запросы к сессиям требуют Bearer-ключ.

## Параметры

| Имя | Где | Обязательный | Тип | Описание и ограничения |
| --- | --- | --- | --- | --- |
| `id` | path | Да | string |  format: <code>"uuid"</code> |

## Тело запроса

`application/json`: [ReplaceAPIKey](schema-replaceapikey.md)

```json
{
  "$ref": "#/components/schemas/ReplaceAPIKey"
}
```

## Ответы

| Код | Описание | Содержимое |
| --- | --- | --- |
| 204 | Замена API-ключа аккаунта |  |
| default | Некорректные данные (422), нет авторизации (401), запрещённый Origin (403), запись не найдена (404), конфликт (409) или хранилище недоступно (503). | `application/json`: [ErrorResponse](schema-errorresponse.md) |

[HTTP API](index.md)
