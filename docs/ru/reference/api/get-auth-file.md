# Файл авторизации аккаунта

```http
GET /api/v1/llm-accounts/{id}/auth-file
```

Чтение файла авторизации аккаунта

**operationId:** `get_auth_file`

## Авторизация

HTTPBearer / BrowserSession

Условия браузерного доступа: [авторизация](../../operations/sso.md). Изменяющие данные запросы к сессиям требуют Bearer-ключ.

## Параметры

| Имя | Где | Обязательный | Тип | Описание и ограничения |
| --- | --- | --- | --- | --- |
| `id` | path | Да | string |  format: <code>"uuid"</code> |

## Ответы

| Код | Описание | Содержимое |
| --- | --- | --- |
| 200 | Чтение файла авторизации аккаунта | `application/json`: [AuthFile](schema-authfile.md) |
| default | Некорректные данные (422), нет авторизации (401), запрещённый Origin (403), запись не найдена (404), конфликт (409) или хранилище недоступно (503). | `application/json`: [ErrorResponse](schema-errorresponse.md) |

### Заголовки ответа 200

- `ETag`:  string
- `Cache-Control`:  string

[HTTP API](index.md)
