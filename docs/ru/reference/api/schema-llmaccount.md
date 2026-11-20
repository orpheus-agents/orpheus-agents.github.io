# LLMAccount



**Тип:** object additionalProperties: <code>false</code>

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `id` | Да | string |  format: <code>"uuid"</code> |
| `name` | Да | string |  minLength: <code>1</code><br>maxLength: <code>255</code> |
| `harness` | Да | string |  enum: <code>["codex","opencode"]</code> |
| `provider` | Да | string | ID интеграции провайдера модели. Для API-ключа OpenCode обязателен. При авторизации через OAuth определяется из файла аккаунта OpenCode Console. minLength: <code>1</code><br>maxLength: <code>128</code> |
| `auth_mode` | Да | string |  enum: <code>["account","api_key"]</code> |
| `active` | Да | boolean |   |
| `credential_store` | Да | string / null |   |
| `profiles` | Да | array&lt;string&gt; |   |

## JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": [
    "id",
    "name",
    "harness",
    "auth_mode",
    "provider",
    "active",
    "credential_store",
    "profiles"
  ],
  "properties": {
    "id": {
      "type": "string",
      "format": "uuid"
    },
    "name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 255
    },
    "harness": {
      "type": "string",
      "enum": [
        "codex",
        "opencode"
      ]
    },
    "provider": {
      "type": "string",
      "minLength": 1,
      "maxLength": 128,
      "description": "Native model integration ID. Required for OpenCode API keys and inferred from the OpenCode Console account file for OAuth."
    },
    "auth_mode": {
      "type": "string",
      "enum": [
        "account",
        "api_key"
      ]
    },
    "active": {
      "type": "boolean"
    },
    "credential_store": {
      "type": [
        "string",
        "null"
      ]
    },
    "profiles": {
      "type": "array",
      "items": {
        "type": "string"
      }
    }
  }
}
```

[Все схемы](schemas.md) · [HTTP API](index.md)
