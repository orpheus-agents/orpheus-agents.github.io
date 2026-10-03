# Сброс контекста следующего запуска

```http
POST /api/v1/schedules/{id}/reset-session
```

Пользователи SAML без прав администратора сбрасывают контекст только своих заданий. Запрещённая запись возвращает 403 schedule_forbidden.

**operationId:** `ResetSession`

## Авторизация

bearerAuth / browserSession / Без авторизации в режиме anonymous

Условия доступа, браузерной записи и SAML callback: [авторизация Space](../../space/access.md).

## Параметры

| Имя | Где | Обязательный | Тип | Описание и ограничения |
| --- | --- | --- | --- | --- |
| `id` | path | Да | string |  format: <code>"uuid"</code> |

## Ответы

| Код | Описание | Содержимое |
| --- | --- | --- |
| 200 | Успешный ответ | `application/json`: [Schedule](schema-schedule.md) |
| default | Структурированная ошибка. 401 — авторизация, 403 — CSRF или schedule_forbidden, 404 — не найдено, 409 — конфликт, 422 — валидация, 503 — сервис недоступен. | `application/json`: [Problem](schema-problem.md) |

[HTTP API](index.md)
