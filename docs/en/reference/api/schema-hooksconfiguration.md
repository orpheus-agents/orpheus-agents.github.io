# HooksConfiguration



**Type:** object additionalProperties: <code>false</code>

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `after_create` | No | string |   |
| `before_run` | No | string |   |
| `after_run` | No | string |   |
| `before_remove` | No | string |   |
| `timeout_seconds` | Yes | integer |  minimum: <code>1</code><br>maximum: <code>2147483647</code> |

## JSON Schema

```json
{
  "additionalProperties": false,
  "properties": {
    "after_create": {
      "type": "string"
    },
    "before_run": {
      "type": "string"
    },
    "after_run": {
      "type": "string"
    },
    "before_remove": {
      "type": "string"
    },
    "timeout_seconds": {
      "type": "integer",
      "minimum": 1,
      "maximum": 2147483647
    }
  },
  "required": [
    "timeout_seconds"
  ],
  "type": "object"
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
