# Регистрация шаблона

```http
POST /api/v1/templates
```

Требуются успешные проверки alias и тега. Для браузерной записи нужны настроенный Origin и заголовок X-Orpheus-CSRF со значением 1. Активные записи сразу доступны новым сессиям без перезапуска API и worker.

**operationId:** `create_template`

## Авторизация

HTTPBearer / BrowserSession

Условия браузерного доступа: [авторизация](../../operations/sso.md). Изменяющие данные запросы к сессиям требуют Bearer-ключ.

## Тело запроса

`application/json`: [CreateTemplate](schema-createtemplate.md)

```json
{
  "$ref": "#/components/schemas/CreateTemplate"
}
```

## Ответы

| Код | Описание | Содержимое |
| --- | --- | --- |
| 201 | Зарегистрированный шаблон | `application/json`: [Template](schema-template.md) |
| default | Некорректный ввод (422), нет авторизации (401), запрещённый Origin браузера (403), запись не найдена (404), дубликат (409) или недоступный провайдер/хранилище (503). | `application/json`: [ErrorResponse](schema-errorresponse.md) |

[HTTP API](index.md)
