# Изменение шаблона

```http
PATCH /api/v1/templates/{id}
```

Имя и тег не изменяются. Пустое описание и описание из пробелов превращаются в null. AgentBox не вызывается. Для браузерной записи нужны Origin и X-Orpheus-CSRF.

**operationId:** `update_template`

## Авторизация

HTTPBearer / BrowserSession

Условия браузерного доступа: [авторизация](../../operations/sso.md). Изменяющие данные запросы к сессиям требуют Bearer-ключ.

## Параметры

| Имя | Где | Обязательный | Тип | Описание и ограничения |
| --- | --- | --- | --- | --- |
| `id` | path | Да | string |  format: <code>"uuid"</code> |

## Тело запроса

`application/json`: [UpdateTemplate](schema-updatetemplate.md)

```json
{
  "$ref": "#/components/schemas/UpdateTemplate"
}
```

## Ответы

| Код | Описание | Содержимое |
| --- | --- | --- |
| 200 | Обновлённый шаблон | `application/json`: [Template](schema-template.md) |
| default | Некорректный ввод (422), нет авторизации (401), запрещённый Origin браузера (403), запись не найдена (404), дубликат (409) или недоступный провайдер/хранилище (503). | `application/json`: [ErrorResponse](schema-errorresponse.md) |

[HTTP API](index.md)
