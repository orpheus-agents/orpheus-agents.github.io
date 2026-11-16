# Замена файла авторизации аккаунта

```http
PUT /api/v1/llm-accounts/{id}/auth-file
```

Условная замена файла авторизации аккаунта

**operationId:** `replace_auth_file`

## Авторизация

HTTPBearer / BrowserSession

Условия браузерного доступа: [авторизация](../../operations/sso.md). Изменяющие данные запросы к сессиям требуют Bearer-ключ.

## Параметры

| Имя | Где | Обязательный | Тип | Описание и ограничения |
| --- | --- | --- | --- | --- |
| `id` | path | Да | string |  format: <code>"uuid"</code> |
| `If-Match` | header | Да | string |  minLength: <code>1</code> |

## Тело запроса

`application/json`: [AuthFile](schema-authfile.md)

```json
{
  "$ref": "#/components/schemas/AuthFile"
}
```

## Ответы

| Код | Описание | Содержимое |
| --- | --- | --- |
| 204 | Условная замена файла авторизации аккаунта |  |
| default | Некорректные данные (422), нет авторизации (401), запрещённый Origin (403), запись не найдена (404), конфликт (409) или хранилище недоступно (503). | `application/json`: [ErrorResponse](schema-errorresponse.md) |

### Заголовки ответа 204

- `ETag`:  string

[HTTP API](index.md)
