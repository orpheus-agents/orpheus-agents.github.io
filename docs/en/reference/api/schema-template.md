# Template



**Type:** object additionalProperties: <code>false</code>

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `id` | Yes | string |  format: <code>"uuid"</code> |
| `name` | Yes | string | Exact normalized reference including the optional tag.  |
| `template_name` | Yes | string |   |
| `tag` | Yes | string / null |   |
| `description` | Yes | string / null |   |
| `active` | Yes | boolean |   |

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
    "active"
  ],
  "properties": {
    "id": {
      "type": "string",
      "format": "uuid"
    },
    "name": {
      "type": "string",
      "description": "Exact normalized reference including the optional tag."
    },
    "template_name": {
      "type": "string"
    },
    "tag": {
      "type": [
        "string",
        "null"
      ]
    },
    "description": {
      "type": [
        "string",
        "null"
      ]
    },
    "active": {
      "type": "boolean"
    }
  }
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
