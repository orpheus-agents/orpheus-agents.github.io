# Каталог сервисов

```http
GET /api/v1/services
```

Возвращает полный каталог из локальной конфигурации, отсортированный по коду. Не обращается к провайдеру и не запрашивает значения секретов.

**operationId:** `get_services`

## Авторизация

HTTPBearer / BrowserSession

Условия браузерного доступа: [авторизация](../../operations/sso.md). Изменяющие данные запросы к сессиям требуют Bearer-ключ.

## Ответы

| Код | Описание | Содержимое |
| --- | --- | --- |
| 200 | Настроенные сервисы | `application/json`: [Services](schema-services.md) |
| 401 | Требуется авторизация | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 503 | Авторизация временно недоступна | `application/json`: [ErrorResponse](schema-errorresponse.md) |

[HTTP API](index.md)
