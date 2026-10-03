# Пять ближайших срабатываний

```http
POST /api/v1/schedules/preview
```

Пять ближайших срабатываний

**operationId:** `PreviewSchedule`

## Авторизация

bearerAuth / browserSession / Без авторизации в режиме anonymous

Условия доступа, браузерной записи и SAML callback: [авторизация Space](../../space/access.md).

## Тело запроса

`application/json`: [PreviewInput](schema-previewinput.md)

```json
{
  "$ref": "#/components/schemas/PreviewInput"
}
```

## Ответы

| Код | Описание | Содержимое |
| --- | --- | --- |
| 200 | Успешный ответ | `application/json`: [Preview](schema-preview.md) |
| default | Структурированная ошибка. 401 — авторизация, 403 — CSRF или schedule_forbidden, 404 — не найдено, 409 — конфликт, 422 — валидация, 503 — сервис недоступен. | `application/json`: [Problem](schema-problem.md) |

[HTTP API](index.md)
