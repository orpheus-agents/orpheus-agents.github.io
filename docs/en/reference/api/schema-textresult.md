# TextResult



**Type:** object

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `exit_code` | No | integer / null |   |
| `original_bytes` | Yes | integer / null |   |
| `text` | Yes | string |   |
| `type` | Yes | string |  const: <code>"text"</code><br>default: <code>"text"</code> |

## JSON Schema

```json
{
  "properties": {
    "exit_code": {
      "anyOf": [
        {
          "type": "integer"
        },
        {
          "type": "null"
        }
      ],
      "title": "Exit Code"
    },
    "original_bytes": {
      "anyOf": [
        {
          "type": "integer"
        },
        {
          "type": "null"
        }
      ],
      "title": "Original Bytes"
    },
    "text": {
      "title": "Text",
      "type": "string"
    },
    "type": {
      "const": "text",
      "default": "text",
      "title": "Type",
      "type": "string"
    }
  },
  "required": [
    "text",
    "original_bytes",
    "type"
  ],
  "title": "TextResult",
  "type": "object"
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
