# Сохранённая история запусков

```http
GET /api/v1/schedules/{id}/occurrences
```

Сохранённая история запусков

**operationId:** `ListOccurrences`

## Авторизация

bearerAuth / browserSession / Без авторизации в режиме anonymous

Условия доступа, браузерной записи и SAML callback: [авторизация Space](../../space/access.md).

## Параметры

| Имя | Где | Обязательный | Тип | Описание и ограничения |
| --- | --- | --- | --- | --- |
| `id` | path | Да | string |  format: <code>"uuid"</code> |
| `limit` | query | Нет | integer |  default: <code>50</code><br>minimum: <code>1</code><br>maximum: <code>200</code> |
| `cursor` | query | Нет | string | Непрозрачный курсор, привязанный к нормализованным фильтрам. Новые задания не попадают в начатый обход. minLength: <code>1</code><br>maxLength: <code>8192</code> |

## Ответы

| Код | Описание | Содержимое |
| --- | --- | --- |
| 200 | Успешный ответ | `application/json`: [OccurrencePage](schema-occurrencepage.md) |
| default | Структурированная ошибка. 401 — авторизация, 403 — CSRF, 404 — не найдено, 409 — конфликт, 422 — валидация, 503 — сервис недоступен. | `application/json`: [Problem](schema-problem.md) |

[HTTP API](index.md)
