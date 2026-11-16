# Создание профиля

```http
POST /api/v1/profiles
```

Создание профиля

**operationId:** `create_profile`

## Авторизация

HTTPBearer / BrowserSession

Условия браузерного доступа: [авторизация](../../operations/sso.md). Изменяющие данные запросы к сессиям требуют Bearer-ключ.

## Тело запроса

`application/json`: [CreateProfile](schema-createprofile.md)

```json
{
  "$ref": "#/components/schemas/CreateProfile"
}
```

## Ответы

| Код | Описание | Содержимое |
| --- | --- | --- |
| 201 | Создание профиля | `application/json`: [Profile](schema-profile.md) |
| default | Некорректные данные (422), нет авторизации (401), запрещённый Origin (403), запись не найдена (404), конфликт (409) или хранилище недоступно (503). | `application/json`: [ErrorResponse](schema-errorresponse.md) |

[HTTP API](index.md)
