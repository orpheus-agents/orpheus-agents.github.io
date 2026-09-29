# HooksConfiguration



**Тип:** object additionalProperties: <code>false</code>

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `after_create` | Нет | string |   |
| `before_run` | Нет | string |   |
| `after_run` | Нет | string |   |
| `before_remove` | Нет | string |   |
| `timeout_seconds` | Да | integer |  minimum: <code>1</code><br>maximum: <code>2147483647</code> |

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

[Все схемы](schemas.md) · [HTTP API](index.md)
