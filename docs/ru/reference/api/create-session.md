# Создание сессии

```http
POST /api/v1/sessions
```

Создать сессию

**operationId:** `create_session`

## Авторизация

HTTPBearer

Условия браузерного доступа: [авторизация](../../operations/sso.md). Изменяющие данные запросы к сессиям требуют Bearer-ключ.

## Параметры

| Имя | Где | Обязательный | Тип | Описание и ограничения |
| --- | --- | --- | --- | --- |
| `Idempotency-Key` | header | Нет | string / null |   |

## Тело запроса

`application/json`: [CreateSession](schema-createsession.md)

```json
{
  "$ref": "#/components/schemas/CreateSession"
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
