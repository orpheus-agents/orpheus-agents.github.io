# Отмена запуска

```http
POST /api/v1/sessions/{sid}/runs/{rid}/cancel
```

Отменить запуск

**operationId:** `cancel_run`

## Авторизация

HTTPBearer

Условия браузерного доступа: [авторизация](../../operations/sso.md). Изменяющие данные запросы к сессиям требуют Bearer-ключ.

## Параметры

| Имя | Где | Обязательный | Тип | Описание и ограничения |
| --- | --- | --- | --- | --- |
| `sid` | path | Да | string |  format: <code>"uuid"</code> |
| `rid` | path | Да | string |  format: <code>"uuid"</code> |

## Ответы

| Код | Описание | Содержимое |
| --- | --- | --- |
| 200 | Успешно | `application/json`: [Cancelled](schema-cancelled.md) |
| 202 | Успешный ответ | `application/json`: [Cancelled](schema-cancelled.md) |
| 400 | Некорректный запрос | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 401 | Требуется авторизация | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 403 | Браузерная сессия предоставляет только чтение (read_only_access). | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 404 | Ресурс не найден | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 409 | Конфликт | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 413 | Превышен размер содержимого | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 415 | Неподдерживаемый тип содержимого | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 422 | Некорректные данные | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 503 | Сервис недоступен | `application/json`: [ErrorResponse](schema-errorresponse.md) |

[HTTP API](index.md)
