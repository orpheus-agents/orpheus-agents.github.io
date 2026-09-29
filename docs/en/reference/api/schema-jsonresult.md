# JSONResult



**Type:** object

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `original_bytes` | Yes | integer / null |   |
| `type` | Yes | string |  const: <code>"json"</code><br>default: <code>"json"</code> |
| `value` | Yes | any |   |

## JSON Schema

```json
{
  "properties": {
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
    "type": {
      "const": "json",
      "default": "json",
      "title": "Type",
      "type": "string"
    },
    "value": {
      "title": "Value",
      "x-go-type": "json.RawMessage"
    }
  },
  "required": [
    "value",
    "original_bytes",
    "type"
  ],
  "title": "JSONResult",
  "type": "object"
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
