# Template



**Type:** object additionalProperties: <code>false</code>

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `name` | Yes | string |   |
| `description` | Yes | string / null |   |
| `is_default` | Yes | boolean |   |

## JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": [
    "name",
    "description",
    "is_default"
  ],
  "properties": {
    "name": {
      "type": "string"
    },
    "description": {
      "type": "string",
      "nullable": true
    },
    "is_default": {
      "type": "boolean"
    }
  }
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
