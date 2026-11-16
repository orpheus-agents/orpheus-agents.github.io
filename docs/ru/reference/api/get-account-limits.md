# Лимиты аккаунтов

```http
GET /api/v1/accounts/limits
```

Сохранённое наблюдение worker только для чтения. Запрос не обращается к провайдеру и не обновляет credentials. Cache-Control: no-store.

**operationId:** `get_account_limits`

## Авторизация

HTTPBearer / BrowserSession

Условия браузерного доступа: [авторизация](../../operations/sso.md). Изменяющие данные запросы к сессиям требуют Bearer-ключ.

## Параметры

| Имя | Где | Обязательный | Тип | Описание и ограничения |
| --- | --- | --- | --- | --- |
| `account_ids` | query | Нет | array&lt;string&gt; | UUID аккаунтов через запятую. Без параметра возвращаются все аккаунты с файловой авторизацией. minItems: <code>1</code><br>maxItems: <code>200</code> |

## Ответы

| Код | Описание | Содержимое |
| --- | --- | --- |
| 200 | Снимок лимитов аккаунтов | `application/json`: [AccountLimits](schema-accountlimits.md) |
| 401 | Требуется авторизация | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 503 | Лимиты аккаунтов недоступны | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| default | Некорректные данные (422), нет авторизации (401), запрещённый Origin (403), запись не найдена (404), конфликт (409) или хранилище недоступно (503). | `application/json`: [ErrorResponse](schema-errorresponse.md) |

[HTTP API](index.md)
