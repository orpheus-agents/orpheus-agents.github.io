# Profile



**Тип:** object additionalProperties: <code>false</code>

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `id` | Да | string |  format: <code>"uuid"</code> |
| `account_id` | Да | string |  format: <code>"uuid"</code> |
| `account_name` | Да | string |   |
| `account_active` | Да | boolean |   |
| `active` | Да | boolean |   |
| `available` | Да | boolean |   |
| `name` | Да | string |   |
| `description` | Да | string / null |   |
| `harness` | Да | string |  enum: <code>["codex"]</code> |
| `model` | Да | string |  minLength: <code>1</code> |
| `codex` | Да | [CodexProfile](schema-codexprofile.md) |   |
| `instructions` | Да | string |   |
| `is_default` | Да | boolean |   |

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
    "instructions",
    "is_default"
  ],
  "properties": {
    "id": {
      "type": "string",
      "format": "uuid"
    },
    "account_id": {
      "type": "string",
      "format": "uuid"
    },
    "account_name": {
      "type": "string"
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
    "name": {
      "type": "string"
    },
    "description": {
      "type": "string",
      "nullable": true
    },
    "harness": {
      "type": "string",
      "enum": [
        "codex"
      ]
    },
    "model": {
      "type": "string",
      "minLength": 1
    },
    "codex": {
      "$ref": "#/components/schemas/CodexProfile"
    },
    "instructions": {
      "type": "string"
    },
    "is_default": {
      "type": "boolean"
    }
  }
}
```

[Все схемы](schemas.md) · [HTTP API](index.md)
