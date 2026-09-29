# Все запуски

```http
GET /api/v1/runs
```

Список всех запусков

**operationId:** `list_all_runs`

## Авторизация

HTTPBearer / BrowserSession

Условия браузерного доступа: [авторизация](../../operations/sso.md). Изменяющие данные запросы к сессиям требуют Bearer-ключ.

## Параметры

| Имя | Где | Обязательный | Тип | Описание и ограничения |
| --- | --- | --- | --- | --- |
| `namespace` | query | Нет | string | Точное совпадение. От 1 до 128 байт UTF-8. NUL и строки только из пробелов запрещены. minLength: <code>1</code><br>maxLength: <code>128</code> |
| `external_key` | query | Нет | string | Точное совпадение. От 1 до 512 байт UTF-8. NUL и строки только из пробелов запрещены. minLength: <code>1</code><br>maxLength: <code>512</code> |
| `input_fingerprint` | query | Нет | string | Точное совпадение. От 1 до 256 байт UTF-8. NUL и строки только из пробелов запрещены. minLength: <code>1</code><br>maxLength: <code>256</code> |
| `status` | query | Нет | [RunStatus](schema-runstatus.md) |   |
| `order` | query | Нет | string |  enum: <code>["asc","desc"]</code><br>default: <code>"asc"</code> |
| `limit` | query | Нет | integer |  default: <code>50</code><br>minimum: <code>1</code><br>maximum: <code>200</code> |
| `cursor` | query | Нет | string / null |   |

## Ответы

| Код | Описание | Содержимое |
| --- | --- | --- |
| 200 | Успешный ответ | `application/json`: [RunPage](schema-runpage.md) |
| 400 | Некорректный запрос | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 401 | Требуется авторизация | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 404 | Ресурс не найден | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 409 | Конфликт | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 413 | Превышен размер содержимого | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 415 | Неподдерживаемый тип содержимого | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 422 | Некорректные данные | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 503 | Сервис недоступен | `application/json`: [ErrorResponse](schema-errorresponse.md) |

[HTTP API](index.md)
