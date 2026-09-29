# Новый запуск

```http
POST /api/v1/sessions/{sid}/runs
```

Создать следующий запуск. При allow_multiple_runs=false операция отклоняется с 409 multiple_runs_not_allowed независимо от состояния первого запуска и песочницы. Идемпотентный повтор принятого запроса возвращает исходное подтверждение.

**operationId:** `create_run`

## Авторизация

HTTPBearer

Условия браузерного доступа: [авторизация](../../operations/sso.md). Изменяющие данные запросы к сессиям требуют Bearer-ключ.

## Параметры

| Имя | Где | Обязательный | Тип | Описание и ограничения |
| --- | --- | --- | --- | --- |
| `sid` | path | Да | string |  format: <code>"uuid"</code> |
| `Idempotency-Key` | header | Нет | string / null |   |

## Тело запроса

`application/json`: [CreateRun](schema-createrun.md)

```json
{
  "$ref": "#/components/schemas/CreateRun"
}
```

## Ответы

| Код | Описание | Содержимое |
| --- | --- | --- |
| 202 | Успешный ответ | `application/json`: [Accepted](schema-accepted.md) |
| 400 | Некорректный запрос | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 401 | Требуется авторизация | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 403 | Браузерная сессия предоставляет только чтение (read_only_access). | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 404 | Ресурс не найден | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 409 | Конфликт | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 413 | Превышен размер содержимого | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 415 | Неподдерживаемый тип содержимого | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 422 | Некорректные данные | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 503 | Сервис недоступен | `application/json`: [ErrorResponse](schema-errorresponse.md) |

### Заголовки ответа 202

- `Location`: Адрес принятого запуска. string

[HTTP API](index.md)
