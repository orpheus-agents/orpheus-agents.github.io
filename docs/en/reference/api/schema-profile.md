# Profile



**Type:** object additionalProperties: <code>false</code>

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `id` | Yes | string |  format: <code>"uuid"</code> |
| `name` | Yes | string |  minLength: <code>1</code><br>maxLength: <code>255</code> |
| `description` | Yes | string / null |  maxLength: <code>4096</code> |
| `harness` | Yes | string |  enum: <code>["codex"]</code> |
| `account_id` | Yes | string |  format: <code>"uuid"</code> |
| `account_name` | Yes | string |  minLength: <code>1</code><br>maxLength: <code>255</code> |
| `account_active` | Yes | boolean |   |
| `active` | Yes | boolean |   |
| `available` | Yes | boolean |   |
| `model` | Yes | string |  minLength: <code>1</code><br>maxLength: <code>255</code> |
| `codex` | Yes | [CodexProfile](schema-codexprofile.md) |   |
| `instructions` | Yes | string |   |

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
        "codex"
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
    "instructions": {
      "type": "string"
    }
  }
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
