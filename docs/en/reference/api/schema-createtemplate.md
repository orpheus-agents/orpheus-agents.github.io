# CreateTemplate



**Type:** object additionalProperties: <code>false</code>

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `template_name` | Yes | string | Own-project alias, optionally prefixed by its team slug. Normalized to lowercase. minLength: <code>1</code><br>maxLength: <code>255</code><br>pattern: <code>"^[A-Za-z0-9_-]+(/[A-Za-z0-9_-]+)?$"</code> |
| `tag` | No | string / null | Normalized to lowercase; UUID build references are rejected. Omission or null checks default but stores an untagged reference. minLength: <code>1</code><br>maxLength: <code>128</code><br>pattern: <code>"^[A-Za-z0-9_.-]+$"</code> |
| `description` | No | string / null |  maxLength: <code>4096</code> |
| `active` | No | boolean |  default: <code>true</code> |

## JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": [
    "template_name"
  ],
  "properties": {
    "template_name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 255,
      "pattern": "^[A-Za-z0-9_-]+(/[A-Za-z0-9_-]+)?$",
      "description": "Own-project alias, optionally prefixed by its team slug. Normalized to lowercase."
    },
    "tag": {
      "type": [
        "string",
        "null"
      ],
      "minLength": 1,
      "maxLength": 128,
      "pattern": "^[A-Za-z0-9_.-]+$",
      "description": "Normalized to lowercase; UUID build references are rejected. Omission or null checks default but stores an untagged reference."
    },
    "description": {
      "type": [
        "string",
        "null"
      ],
      "maxLength": 4096
    },
    "active": {
      "type": "boolean",
      "default": true
    }
  }
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
