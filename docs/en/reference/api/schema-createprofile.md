# CreateProfile



**Type:** object additionalProperties: <code>false</code>

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `name` | Yes | string |  minLength: <code>1</code><br>maxLength: <code>255</code> |
| `account_id` | Yes | string |  format: <code>"uuid"</code> |
| `description` | No | string / null |  maxLength: <code>4096</code> |
| `model` | Yes | string |  minLength: <code>1</code><br>maxLength: <code>255</code> |
| `instructions` | No | string |  maxLength: <code>65536</code> |
| `codex` | No | [CodexProfile](schema-codexprofile.md) |   |
| `active` | No | boolean |  default: <code>true</code> |

## JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": [
    "name",
    "account_id",
    "model"
  ],
  "properties": {
    "name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 255
    },
    "account_id": {
      "type": "string",
      "format": "uuid"
    },
    "description": {
      "type": [
        "string",
        "null"
      ],
      "maxLength": 4096
    },
    "model": {
      "type": "string",
      "minLength": 1,
      "maxLength": 255
    },
    "instructions": {
      "type": "string",
      "maxLength": 65536
    },
    "codex": {
      "$ref": "#/components/schemas/CodexProfile"
    },
    "active": {
      "type": "boolean",
      "default": true
    }
  }
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
