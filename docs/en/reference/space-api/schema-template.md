# Template



**Type:** object additionalProperties: <code>false</code>

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `id` | Yes | string |  format: <code>"uuid"</code> |
| `name` | Yes | string |   |
| `template_name` | Yes | string |   |
| `tag` | Yes | string / null |   |
| `description` | Yes | string / null |   |
| `active` | Yes | boolean |   |
| `is_default` | Yes | boolean |   |

## JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": [
    "id",
    "name",
    "template_name",
    "tag",
    "description",
    "active",
    "is_default"
  ],
  "properties": {
    "id": {
      "type": "string",
      "format": "uuid"
    },
    "name": {
      "type": "string"
    },
    "template_name": {
      "type": "string"
    },
    "tag": {
      "type": "string",
      "nullable": true
    },
    "description": {
      "type": "string",
      "nullable": true
    },
    "active": {
      "type": "boolean"
    },
    "is_default": {
      "type": "boolean"
    }
  }
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
