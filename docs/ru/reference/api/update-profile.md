# Изменение профиля

```http
PATCH /api/v1/profiles/{id}
```

Изменение профиля

**operationId:** `update_profile`

## Авторизация

HTTPBearer / BrowserSession

Условия браузерного доступа: [авторизация](../../operations/sso.md). Изменяющие данные запросы к сессиям требуют Bearer-ключ.

## Параметры

| Имя | Где | Обязательный | Тип | Описание и ограничения |
| --- | --- | --- | --- | --- |
| `id` | path | Да | string |  format: <code>"uuid"</code> |

## Тело запроса

`application/json`: [UpdateProfile](schema-updateprofile.md)

```json
{
  "$ref": "#/components/schemas/UpdateProfile"
}
```

## Ответы

| Код | Описание | Содержимое |
| --- | --- | --- |
| 200 | Изменение профиля | `application/json`: [Profile](schema-profile.md) |
| default | Некорректные данные (422), нет авторизации (401), запрещённый Origin (403), запись не найдена (404), конфликт (409) или хранилище недоступно (503). | `application/json`: [ErrorResponse](schema-errorresponse.md) |

[HTTP API](index.md)
