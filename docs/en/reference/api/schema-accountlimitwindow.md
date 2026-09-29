# AccountLimitWindow



**Type:** object additionalProperties: <code>false</code>

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `used_percent` | Yes | number |  format: <code>"double"</code><br>minimum: <code>0</code> |
| `remaining_percent` | Yes | number |  format: <code>"double"</code><br>minimum: <code>0</code> |
| `window_minutes` | Yes | integer / null |  minimum: <code>1</code> |
| `resets_at` | Yes | string / null |  format: <code>"date-time"</code> |

## JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": [
    "used_percent",
    "remaining_percent",
    "window_minutes",
    "resets_at"
  ],
  "properties": {
    "used_percent": {
      "type": "number",
      "format": "double",
      "minimum": 0
    },
    "remaining_percent": {
      "type": "number",
      "format": "double",
      "minimum": 0
    },
    "window_minutes": {
      "type": [
        "integer",
        "null"
      ],
      "minimum": 1
    },
    "resets_at": {
      "type": [
        "string",
        "null"
      ],
      "format": "date-time"
    }
  }
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
