# Profile



**Type:** object additionalProperties: <code>false</code>

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `id` | Yes | string |  format: <code>"uuid"</code> |
| `account_id` | Yes | string |  format: <code>"uuid"</code> |
| `account_name` | Yes | string |   |
| `account_active` | Yes | boolean |   |
| `active` | Yes | boolean |   |
| `available` | Yes | boolean |   |
| `name` | Yes | string |   |
| `description` | Yes | string / null |   |
| `harness` | Yes | string |  enum: <code>["codex"]</code> |
| `model` | Yes | string |  minLength: <code>1</code> |
| `codex` | Yes | [CodexProfile](schema-codexprofile.md) |   |
| `instructions` | Yes | string |   |
| `is_default` | Yes | boolean |   |

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

[All schemas](schemas.md) · [HTTP API](index.md)
