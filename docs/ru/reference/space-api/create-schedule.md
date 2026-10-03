# Создание задания

```http
POST /api/v1/schedules
```

Пользователи SAML без прав администратора создают только на свой email. Пропуск владельца подставляет email сессии. Явный null или другой владелец возвращают 403 schedule_forbidden. Bearer, anonymous и администраторы имеют полный доступ.

**operationId:** `CreateSchedule`

## Авторизация

bearerAuth / browserSession / Без авторизации в режиме anonymous

Условия доступа, браузерной записи и SAML callback: [авторизация Space](../../space/access.md).

## Параметры

| Имя | Где | Обязательный | Тип | Описание и ограничения |
| --- | --- | --- | --- | --- |
| `Idempotency-Key` | header | Нет | string | Повтор с тем же нормализованным телом возвращает исходный ответ. У ключей нет срока истечения. format: <code>"uuid"</code> |

## Тело запроса

`application/json`: [CreateSchedule](schema-createschedule.md)

```json
{
  "$ref": "#/components/schemas/CreateSchedule"
}
```

## Ответы

| Код | Описание | Содержимое |
| --- | --- | --- |
| 201 | Успешный ответ | `application/json`: [Schedule](schema-schedule.md) |
| default | Структурированная ошибка. 401 — авторизация, 403 — CSRF или schedule_forbidden, 404 — не найдено, 409 — конфликт, 422 — валидация, 503 — сервис недоступен. | `application/json`: [Problem](schema-problem.md) |

[HTTP API](index.md)
