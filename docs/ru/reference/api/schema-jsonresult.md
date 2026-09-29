# JSONResult



**Тип:** object

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `original_bytes` | Да | integer / null |   |
| `type` | Да | string |  const: <code>"json"</code><br>default: <code>"json"</code> |
| `value` | Да | any |   |

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

[Все схемы](schemas.md) · [HTTP API](index.md)
