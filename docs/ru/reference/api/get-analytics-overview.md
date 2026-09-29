# Обзор аналитики

```http
GET /api/v1/analytics/overview
```

Число запусков и расход для задач, принятых в [from,to), те же итоги по namespace и текущие активные сессии. Времена в UTC.

**operationId:** `get_analytics_overview`

## Авторизация

HTTPBearer / BrowserSession

Условия браузерного доступа: [авторизация](../../operations/sso.md). Изменяющие данные запросы к сессиям требуют Bearer-ключ.

## Параметры

| Имя | Где | Обязательный | Тип | Описание и ограничения |
| --- | --- | --- | --- | --- |
| `window` | query | Нет | string | Скользящее окно относительно времени сервера. По умолчанию 24h. Нельзя сочетать с from/to. enum: <code>["24h","7d","30d"]</code> |
| `from` | query | Нет | string | Включённая нижняя граница RFC3339 со смещением. Требует to. format: <code>"date-time"</code> |
| `to` | query | Нет | string | Исключённая верхняя граница RFC3339 со смещением. Требует from и не может быть позже as_of. Диапазон до 31 дня. format: <code>"date-time"</code> |
| `bucket` | query | Нет | string | Группировка по локальным календарным часам или дням. До 800 интервалов. enum: <code>["hour","day"]</code><br>default: <code>"hour"</code> |
| `timezone` | query | Нет | string | Часовой пояс IANA для границ интервалов. Времена в ответе указаны в UTC. default: <code>"UTC"</code> |
| `namespace` | query | Нет | string | Точное совпадение namespace. Без фильтра включаются все namespace и null. minLength: <code>1</code><br>maxLength: <code>128</code> |

## Ответы

| Код | Описание | Содержимое |
| --- | --- | --- |
| 200 | Снимок аналитики | `application/json`: [AnalyticsOverview](schema-analyticsoverview.md) |
| 401 | Требуется авторизация | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 422 | Некорректный запрос | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 503 | Аналитика недоступна или произошло переполнение | `application/json`: [ErrorResponse](schema-errorresponse.md) |

[HTTP API](index.md)
