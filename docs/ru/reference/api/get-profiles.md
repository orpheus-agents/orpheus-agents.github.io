# Каталог профилей

```http
GET /api/v1/profiles
```

Каталог БД, упорядоченный по (name, id). Курсоры вперёд и назад связаны с фильтрами. Изменения действуют для новых сессий. Принятые сессии сохраняют аккаунт и снимок настроек исполнения.

**operationId:** `get_profiles`

## Авторизация

HTTPBearer / BrowserSession

Условия браузерного доступа: [авторизация](../../operations/sso.md). Изменяющие данные запросы к сессиям требуют Bearer-ключ.

## Параметры

| Имя | Где | Обязательный | Тип | Описание и ограничения |
| --- | --- | --- | --- | --- |
| `active` | query | Нет | boolean |   |
| `name` | query | Нет | string | Точное имя с учётом регистра. Несовместимо с name_contains. minLength: <code>1</code> |
| `name_contains` | query | Нет | string | Подстрока имени без учёта регистра. Несовместимо с name. minLength: <code>1</code> |
| `limit` | query | Нет | integer |  default: <code>50</code><br>minimum: <code>1</code><br>maximum: <code>200</code> |
| `cursor` | query | Нет | string |  minLength: <code>1</code><br>maxLength: <code>8192</code> |
| `available` | query | Нет | boolean | Совместная доступность профиля и аккаунта.  |

## Ответы

| Код | Описание | Содержимое |
| --- | --- | --- |
| 200 | Список профилей | `application/json`: [Profiles](schema-profiles.md) |
| default | Некорректные данные (422), нет авторизации (401), запрещённый Origin (403), запись не найдена (404), конфликт (409) или хранилище недоступно (503). | `application/json`: [ErrorResponse](schema-errorresponse.md) |

[HTTP API](index.md)
