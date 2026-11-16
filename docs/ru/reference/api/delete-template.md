# Удаление шаблона

```http
DELETE /api/v1/templates/{id}
```

Не изменяет AgentBox и принятые сессии. Для браузерной записи нужны Origin и X-Orpheus-CSRF.

**operationId:** `delete_template`

## Авторизация

HTTPBearer / BrowserSession

Условия браузерного доступа: [авторизация](../../operations/sso.md). Изменяющие данные запросы к сессиям требуют Bearer-ключ.

## Параметры

| Имя | Где | Обязательный | Тип | Описание и ограничения |
| --- | --- | --- | --- | --- |
| `id` | path | Да | string |  format: <code>"uuid"</code> |

## Ответы

| Код | Описание | Содержимое |
| --- | --- | --- |
| 204 | Удалено |  |
| default | Некорректный ввод (422), нет авторизации (401), запрещённый Origin браузера (403), запись не найдена (404), дубликат (409) или недоступный провайдер/хранилище (503). | `application/json`: [ErrorResponse](schema-errorresponse.md) |

[HTTP API](index.md)
