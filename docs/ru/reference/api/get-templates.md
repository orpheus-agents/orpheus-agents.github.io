# Каталог шаблонов

```http
GET /api/v1/templates
```

Каталог из базы, упорядоченный по (name, id). Непрозрачные курсоры вперёд и назад привязаны к фильтрам. Провайдер не вызывается. Для новой сессии нужно точное имя активного шаблона из каталога. Изменения не влияют на принятые сессии и идемпотентные повторы.

**operationId:** `get_templates`

## Авторизация

HTTPBearer / BrowserSession

Условия браузерного доступа: [авторизация](../../operations/sso.md). Изменяющие данные запросы к сессиям требуют Bearer-ключ.

## Параметры

| Имя | Где | Обязательный | Тип | Описание и ограничения |
| --- | --- | --- | --- | --- |
| `active` | query | Нет | boolean |   |
| `name` | query | Нет | string | Точное имя с учётом регистра. Несовместимо с name_contains. minLength: <code>1</code> |
| `name_contains` | query | Нет | string | Буквальное вхождение в имя без учёта регистра. Несовместимо с name. minLength: <code>1</code> |
| `limit` | query | Нет | integer |  default: <code>50</code><br>minimum: <code>1</code><br>maximum: <code>200</code> |
| `cursor` | query | Нет | string |  minLength: <code>1</code><br>maxLength: <code>8192</code> |

## Ответы

| Код | Описание | Содержимое |
| --- | --- | --- |
| 200 | Одна страница. На соответствующих границах курсоры равны null. | `application/json`: [Templates](schema-templates.md) |
| default | Некорректный ввод (422), нет авторизации (401), запрещённый Origin браузера (403), запись не найдена (404), дубликат (409) или недоступный провайдер/хранилище (503). | `application/json`: [ErrorResponse](schema-errorresponse.md) |

[HTTP API](index.md)
