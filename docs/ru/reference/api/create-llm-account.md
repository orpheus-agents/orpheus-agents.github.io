# Создание LLM-аккаунта

```http
POST /api/v1/llm-accounts
```

Создание LLM-аккаунта

**operationId:** `create_llm_account`

## Авторизация

HTTPBearer / BrowserSession

Условия браузерного доступа: [авторизация](../../operations/sso.md). Изменяющие данные запросы к сессиям требуют Bearer-ключ.

## Тело запроса

`application/json`: [CreateLLMAccount](schema-createllmaccount.md)

```json
{
  "$ref": "#/components/schemas/CreateLLMAccount"
}
```

## Ответы

| Код | Описание | Содержимое |
| --- | --- | --- |
| 201 | Создание LLM-аккаунта | `application/json`: [LLMAccountDetails](schema-llmaccountdetails.md) |
| default | Некорректные данные (422), нет авторизации (401), запрещённый Origin (403), запись не найдена (404), конфликт (409) или хранилище недоступно (503). | `application/json`: [ErrorResponse](schema-errorresponse.md) |

[HTTP API](index.md)
