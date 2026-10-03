# Каталог шаблонов

```http
GET /api/v1/templates
```

Возвращает полный каталог из локальной конфигурации, упорядоченный по имени. Не обращается к провайдерам или хранилищу учётных данных.

**operationId:** `get_templates`

## Авторизация

HTTPBearer / BrowserSession

Условия браузерного доступа: [авторизация](../../operations/sso.md). Изменяющие данные запросы к сессиям требуют Bearer-ключ.

## Ответы

| Код | Описание | Содержимое |
| --- | --- | --- |
| 200 | Настроенные шаблоны | `application/json`: [Templates](schema-templates.md) |
| 401 | Требуется авторизация | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 503 | Авторизация временно недоступна | `application/json`: [ErrorResponse](schema-errorresponse.md) |

[HTTP API](index.md)
