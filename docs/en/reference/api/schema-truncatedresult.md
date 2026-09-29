# TruncatedResult



**Type:** object

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `exit_code` | No | integer / null |   |
| `head` | Yes | string |   |
| `original_bytes` | Yes | integer / null |   |
| `source_type` | No | string |  enum: <code>["text","json"]</code><br>default: <code>"text"</code> |
| `tail` | Yes | string |   |
| `type` | Yes | string |  const: <code>"truncated_text"</code><br>default: <code>"truncated_text"</code> |

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
    "head": {
      "title": "Head",
      "type": "string"
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
    "source_type": {
      "default": "text",
      "enum": [
        "text",
        "json"
      ],
      "title": "Source Type",
      "type": "string"
    },
    "tail": {
      "title": "Tail",
      "type": "string"
    },
    "type": {
      "const": "truncated_text",
      "default": "truncated_text",
      "title": "Type",
      "type": "string"
    }
  },
  "required": [
    "head",
    "tail",
    "original_bytes",
    "type"
  ],
  "title": "TruncatedResult",
  "type": "object"
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
