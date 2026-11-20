# CreateLLMAccount



**Тип:** object additionalProperties: <code>false</code>

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `name` | Да | string |  minLength: <code>1</code><br>maxLength: <code>255</code> |
| `harness` | Да | string |  enum: <code>["codex","opencode"]</code> |
| `provider` | Нет | string | ID интеграции провайдера модели. Для API-ключа OpenCode обязателен. При авторизации через OAuth определяется из файла аккаунта OpenCode Console. minLength: <code>1</code><br>maxLength: <code>128</code> |
| `auth_mode` | Да | string |  enum: <code>["account","api_key"]</code> |
| `active` | Нет | boolean |  default: <code>true</code> |
| `credential_store` | Нет | string |  minLength: <code>1</code> |
| `auth_file` | Нет | [AuthFile](schema-authfile.md) |   |
| `api_key` | Нет | string |  minLength: <code>1</code> |

## JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": [
    "name",
    "harness",
    "auth_mode"
  ],
  "properties": {
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
      "type": "boolean",
      "default": true
    },
    "credential_store": {
      "type": "string",
      "minLength": 1
    },
    "auth_file": {
      "$ref": "#/components/schemas/AuthFile"
    },
    "api_key": {
      "type": "string",
      "minLength": 1,
      "writeOnly": true
    }
  },
  "x-go-type": "json.RawMessage"
}
```

[Все схемы](schemas.md) · [HTTP API](index.md)
