# Страница шаблонов Orpheus

```http
GET /api/v1/templates
```

Возвращает активные и неактивные шаблоны. Фильтры по имени взаимоисключающие. Курсоры привязаны к фильтрам. После изменения фильтров начните с первой страницы.

**operationId:** `GetTemplates`

## Авторизация

bearerAuth / browserSession / Без авторизации в режиме anonymous

Условия доступа, браузерной записи и SAML callback: [авторизация Space](../../space/access.md).

## Параметры

| Имя | Где | Обязательный | Тип | Описание и ограничения |
| --- | --- | --- | --- | --- |
| `active` | query | Нет | boolean |   |
| `name` | query | Нет | string | Точное сохранённое имя с учётом регистра, включая team slug и тег, если они есть. minLength: <code>1</code> |
| `name_contains` | query | Нет | string | Буквальное вхождение в сохранённое имя без учёта регистра. minLength: <code>1</code> |
| `limit` | query | Нет | integer |  default: <code>50</code><br>minimum: <code>1</code><br>maximum: <code>200</code> |
| `cursor` | query | Нет | string |  minLength: <code>1</code><br>maxLength: <code>8192</code> |

## Ответы

| Код | Описание | Содержимое |
| --- | --- | --- |
| 200 | Успешный ответ | `application/json`: [Templates](schema-templates.md) |
| default | Структурированная ошибка. 401 — авторизация, 403 — CSRF или schedule_forbidden, 404 — не найдено, 409 — конфликт, 422 — валидация, 503 — сервис недоступен. | `application/json`: [Problem](schema-problem.md) |

[HTTP API](index.md)
