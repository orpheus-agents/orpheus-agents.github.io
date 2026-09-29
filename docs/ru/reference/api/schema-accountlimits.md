# AccountLimits



**Тип:** object additionalProperties: <code>false</code>

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `as_of` | Да | string |  format: <code>"date-time"</code> |
| `stale_after_seconds` | Да | integer |  minimum: <code>1</code> |
| `items` | Да | array&lt;[AccountLimitItem](schema-accountlimititem.md)&gt; |   |

## JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": [
    "as_of",
    "stale_after_seconds",
    "items"
  ],
  "properties": {
    "as_of": {
      "type": "string",
      "format": "date-time"
    },
    "stale_after_seconds": {
      "type": "integer",
      "minimum": 1
    },
    "items": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/AccountLimitItem"
      }
    }
  }
}
```

[Все схемы](schemas.md) · [HTTP API](index.md)
