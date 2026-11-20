# Profile



**Тип:** object additionalProperties: <code>false</code>

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `id` | Да | string |  format: <code>"uuid"</code> |
| `name` | Да | string |  minLength: <code>1</code><br>maxLength: <code>255</code> |
| `description` | Да | string / null |  maxLength: <code>4096</code> |
| `harness` | Да | string |  enum: <code>["codex","opencode"]</code> |
| `account_id` | Да | string |  format: <code>"uuid"</code> |
| `account_name` | Да | string |  minLength: <code>1</code><br>maxLength: <code>255</code> |
| `account_active` | Да | boolean |   |
| `active` | Да | boolean |   |
| `available` | Да | boolean |   |
| `model` | Да | string |  minLength: <code>1</code><br>maxLength: <code>255</code> |
| `codex` | Да | [CodexProfile](schema-codexprofile.md) |   |
| `opencode` | Нет | [OpenCodeProfile](schema-opencodeprofile.md) |   |
| `instructions` | Да | string |   |

## JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": [
    "id",
    "name",
    "description",
    "harness",
    "account_id",
    "account_name",
    "account_active",
    "active",
    "available",
    "model",
    "codex",
    "instructions"
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
    "description": {
      "type": [
        "string",
        "null"
      ],
      "maxLength": 4096
    },
    "harness": {
      "type": "string",
      "enum": [
        "codex",
        "opencode"
      ]
    },
    "account_id": {
      "type": "string",
      "format": "uuid"
    },
    "account_name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 255
    },
    "account_active": {
      "type": "boolean"
    },
    "active": {
      "type": "boolean"
    },
    "available": {
      "type": "boolean"
    },
    "model": {
      "type": "string",
      "minLength": 1,
      "maxLength": 255
    },
    "codex": {
      "$ref": "#/components/schemas/CodexProfile"
    },
    "opencode": {
      "$ref": "#/components/schemas/OpenCodeProfile"
    },
    "instructions": {
      "type": "string"
    }
  }
}
```

[Все схемы](schemas.md) · [HTTP API](index.md)
