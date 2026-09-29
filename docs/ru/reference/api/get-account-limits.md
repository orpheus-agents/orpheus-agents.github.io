# Лимиты аккаунтов

```http
GET /api/v1/accounts/limits
```

Сохранённое наблюдение worker только для чтения. Запрос не обращается к провайдеру и не обновляет credentials. Cache-Control: no-store.

**operationId:** `get_account_limits`

## Авторизация

HTTPBearer / BrowserSession

Условия браузерного доступа: [авторизация](../../operations/sso.md). Изменяющие данные запросы к сессиям требуют Bearer-ключ.

## Ответы

| Код | Описание | Содержимое |
| --- | --- | --- |
| 200 | Снимок лимитов аккаунтов | `application/json`: [AccountLimits](schema-accountlimits.md) |
| 401 | Требуется авторизация | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 503 | Лимиты аккаунтов недоступны | `application/json`: [ErrorResponse](schema-errorresponse.md) |

[HTTP API](index.md)
