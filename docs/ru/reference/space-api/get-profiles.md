# Страница профилей моделей Orpheus

```http
GET /api/v1/profiles
```

Возвращает активные и неактивные профили. Для выбора используйте available=true. Для сохранённого выбора запрашивайте точное имя без фильтра доступности. Фильтры имени несовместимы друг с другом. Курсоры связаны с фильтрами.

**operationId:** `GetProfiles`

## Авторизация

bearerAuth / browserSession / Без авторизации в режиме anonymous

Условия доступа, браузерной записи и SAML callback: [авторизация Space](../../space/access.md).

## Параметры

| Имя | Где | Обязательный | Тип | Описание и ограничения |
| --- | --- | --- | --- | --- |
| `active` | query | Нет | boolean |   |
| `available` | query | Нет | boolean |   |
| `name` | query | Нет | string | Точное имя профиля с учётом регистра. minLength: <code>1</code> |
| `name_contains` | query | Нет | string | Подстрока имени без учёта регистра. minLength: <code>1</code> |
| `limit` | query | Нет | integer |  default: <code>50</code><br>minimum: <code>1</code><br>maximum: <code>200</code> |
| `cursor` | query | Нет | string |  minLength: <code>1</code><br>maxLength: <code>8192</code> |

## Ответы

| Код | Описание | Содержимое |
| --- | --- | --- |
| 200 | Успешный ответ | `application/json`: [Profiles](schema-profiles.md) |
| default | Структурированная ошибка. 401 — авторизация, 403 — CSRF или schedule_forbidden, 404 — не найдено, 409 — конфликт, 422 — валидация, 503 — сервис недоступен. | `application/json`: [Problem](schema-problem.md) |

[HTTP API](index.md)
