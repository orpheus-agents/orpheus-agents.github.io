# Изменение полей задания

```http
PATCH /api/v1/schedules/{id}
```

Пользователи SAML без прав администратора меняют только свои задания и не могут изменить или очистить владельца. Запрещённая запись возвращает 403 schedule_forbidden.

**operationId:** `UpdateSchedule`

## Авторизация

bearerAuth / browserSession / Без авторизации в режиме anonymous

Условия доступа, браузерной записи и SAML callback: [авторизация Space](../../space/access.md).

## Параметры

| Имя | Где | Обязательный | Тип | Описание и ограничения |
| --- | --- | --- | --- | --- |
| `id` | path | Да | string |  format: <code>"uuid"</code> |

## Тело запроса

`application/json`: [UpdateSchedule](schema-updateschedule.md)

```json
{
  "$ref": "#/components/schemas/UpdateSchedule"
}
```

## Ответы

| Код | Описание | Содержимое |
| --- | --- | --- |
| 200 | Успешный ответ | `application/json`: [Schedule](schema-schedule.md) |
| default | Структурированная ошибка. 401 — авторизация, 403 — CSRF или schedule_forbidden, 404 — не найдено, 409 — конфликт, 422 — валидация, 503 — сервис недоступен. | `application/json`: [Problem](schema-problem.md) |

[HTTP API](index.md)
