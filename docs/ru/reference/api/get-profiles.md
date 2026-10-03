# Каталог профилей

```http
GET /api/v1/profiles
```

Возвращает полный каталог из локальной конфигурации, упорядоченный по имени. Не обращается к провайдерам или хранилищу учётных данных.

**operationId:** `get_profiles`

## Авторизация

HTTPBearer / BrowserSession

Условия браузерного доступа: [авторизация](../../operations/sso.md). Изменяющие данные запросы к сессиям требуют Bearer-ключ.

## Ответы

| Код | Описание | Содержимое |
| --- | --- | --- |
| 200 | Настроенные профили | `application/json`: [Profiles](schema-profiles.md) |
| 401 | Требуется авторизация | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 503 | Авторизация временно недоступна | `application/json`: [ErrorResponse](schema-errorresponse.md) |

[HTTP API](index.md)
