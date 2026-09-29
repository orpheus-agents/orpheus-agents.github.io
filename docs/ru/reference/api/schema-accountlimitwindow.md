# AccountLimitWindow



**Тип:** object additionalProperties: <code>false</code>

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `used_percent` | Да | number |  format: <code>"double"</code><br>minimum: <code>0</code> |
| `remaining_percent` | Да | number |  format: <code>"double"</code><br>minimum: <code>0</code> |
| `window_minutes` | Да | integer / null |  minimum: <code>1</code> |
| `resets_at` | Да | string / null |  format: <code>"date-time"</code> |

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

[Все схемы](schemas.md) · [HTTP API](index.md)
