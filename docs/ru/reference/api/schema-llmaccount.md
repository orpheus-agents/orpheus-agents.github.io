# LLMAccount



**Тип:** object additionalProperties: <code>false</code>

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `id` | Да | string |  format: <code>"uuid"</code> |
| `name` | Да | string |  minLength: <code>1</code><br>maxLength: <code>255</code> |
| `harness` | Да | string |  enum: <code>["codex"]</code> |
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
        "codex"
      ]
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
